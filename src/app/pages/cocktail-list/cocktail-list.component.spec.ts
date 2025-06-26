import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cocktail } from '../../@types/internal/cocktails';
import { CocktailCardComponent } from '../../components/cocktail-card/cocktail-card.component';
import { FilterHeaderComponent } from '../../components/filter-header/filter-header.component';
import { CocktailStateService } from '../../services/cocktail-state.service';
import { CocktailStoreService } from '../../services/cocktail-store.service';
import { CocktailListComponent } from './cocktail-list.component';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  template: ''
})
export class FakeCocktailCardComponent {
  public readonly cocktail: InputSignal<Cocktail> = input.required<Cocktail>();
  public readonly toggleLike: OutputEmitterRef<void> = output<void>();
}

describe('CocktailListComponent', () => {
  let fixture: ComponentFixture<CocktailListComponent>;
  let cocktails: WritableSignal<Cocktail[]>;

  beforeEach(async () => {
    cocktails = signal<Cocktail[]>([]);

    await TestBed.configureTestingModule({
      imports: [CocktailListComponent]
    })
      .overrideComponent(CocktailListComponent, {
        add: { imports: [FakeCocktailCardComponent] },
        remove: { imports: [CocktailCardComponent] }
      })
      .overrideProvider(CocktailStateService, { useValue: { getCocktails: () => cocktails.asReadonly() } })
      .overrideProvider(CocktailStoreService, { useValue: { toggleLike: () => { } } })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailListComponent);
    fixture.detectChanges();
  });

  it('should display all cocktails with its own card', () => {
    cocktails.set([
      {
        id: "1",
        name: 'Mojito',
        isAlcoholic: true,
        liked: false,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      },
      {
        id: "2",
        name: 'Virgin Mojito',
        isAlcoholic: false,
        liked: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      }
    ]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.directive(FakeCocktailCardComponent))).toHaveSize(2);
  });

  it("should handle the empty cocktail list gracefully", () => {
    cocktails.set([]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.directive(FakeCocktailCardComponent))).toHaveSize(0);
    expect(fixture.nativeElement.textContent).toContain('No cocktails found');
  });

  it("should handle the filter header by remove cocktails that don't match the filter", () => {
    cocktails.set([
      {
        id: "1",
        name: 'Mojito',
        isAlcoholic: true,
        liked: false,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      },
      {
        id: "2",
        name: 'Virgin Mojito',
        isAlcoholic: false,
        liked: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      }
    ]);
    fixture.detectChanges();

    const filterHeaderComponent: FilterHeaderComponent = fixture.debugElement.query(By.directive(FilterHeaderComponent)).componentInstance;
    filterHeaderComponent.filterChange.emit({ name: 'irg' });
    fixture.detectChanges();

    const cocktailCards: FakeCocktailCardComponent[] = fixture.debugElement.queryAll(By.directive(FakeCocktailCardComponent)).map(a => a.componentInstance);
    expect(cocktailCards).toHaveSize(1);
    expect(cocktailCards[0].cocktail().name).toBe('Virgin Mojito');
  });

  it("should execute the toggleLike method when received an event from cocktail card", (): void => {
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(storeService, "toggleLike");

    cocktails.set([
      {
        id: "1",
        name: 'Mojito',
        isAlcoholic: true,
        liked: false,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      },
      {
        id: "2",
        name: 'Virgin Mojito',
        isAlcoholic: false,
        liked: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      }
    ]);
    fixture.detectChanges();

    const cocktailCards: FakeCocktailCardComponent[] = fixture.debugElement.queryAll(By.directive(FakeCocktailCardComponent)).map(el => el.componentInstance);
    cocktailCards[1].toggleLike.emit();
    fixture.detectChanges();

    expect(storeService.toggleLike).toHaveBeenCalledWith("2");
  });
});
