import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { CocktailStateService } from '../../services/cocktail-state.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CocktailCardComponent } from '../../components/cocktail-card/cocktail-card.component';
import { FilterHeaderComponent } from '../../components/filter-header/filter-header.component';
import { Cocktail } from '../../@types/internal/cocktails';
import { Component, EventEmitter, Output } from '@angular/core';
import { CocktailStoreService } from '../../services/cocktail-store.service';


describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let cocktails$: Subject<Cocktail[]>;

  beforeEach(async () => {
    cocktails$ = new BehaviorSubject<Cocktail[]>([]);

    await TestBed.configureTestingModule({
      imports: [CocktailListComponent]
    })
      .overrideProvider(CocktailStateService, { useValue: { getCocktails: () => cocktails$.asObservable() } })
      .overrideProvider(CocktailStoreService, { useValue: { toggleLike: () => { } } })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display all cocktails with its own card', () => {
    cocktails$.next([
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

    expect(fixture.debugElement.queryAll(By.directive(CocktailCardComponent))).toHaveSize(2);
  });

  it("should handle the empty cocktail list gracefully", () => {
    cocktails$.next([]);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.directive(CocktailCardComponent))).toHaveSize(0);
    expect(fixture.nativeElement.textContent).toContain('No cocktails found');
  });

  it("should handle the filter header by remove cocktails that don't match the filter", () => {
    cocktails$.next([
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

    const cocktailCards = fixture.debugElement.queryAll(By.directive(CocktailCardComponent));
    expect(cocktailCards).toHaveSize(1);
    expect(cocktailCards[0].componentInstance.cocktail.name).toBe('Virgin Mojito');
  });

  it("should execute the toggleLike method when received an event from cocktail card", (): void => {
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(storeService, "toggleLike");

    cocktails$.next([
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

    const cocktailCards: CocktailCardComponent[] = fixture.debugElement.queryAll(By.directive(CocktailCardComponent)).map(el => el.componentInstance);
    cocktailCards[1].toggleLike.emit();
    fixture.detectChanges();

    expect(storeService.toggleLike).toHaveBeenCalledWith("2");
  });
});
