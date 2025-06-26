import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CocktailItem } from '../../@types/dto/get-cocktails';
import { CocktailStoreService } from '../../services/cocktail-store.service';
import { FakeCocktailCardComponent } from '../cocktail-list/cocktail-list.component.spec';
import { CocktailDetailComponent } from './cocktail-detail.component';
import { FakeRouterLinkDirective } from '../../utils/fake-router-link.directive';

const COCKTAIL: CocktailItem = {
  id: "my-id",
  name: 'Mojito',
  isAlcoholic: true,
  imageUrl: 'https://example.com/mojito.jpg',
  ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
  instructions: 'Mix all ingredients and serve chilled.'
};

describe('CocktailDetailComponent', () => {
  let component: CocktailDetailComponent;
  let fixture: ComponentFixture<CocktailDetailComponent>;
  let likedId: WritableSignal<string[]>;

  beforeEach(async () => {
    likedId = signal<string[]>(["other-id"]);
    await TestBed.configureTestingModule({
      imports: [CocktailDetailComponent]
    })
      .overrideComponent(CocktailDetailComponent, {
        add: { imports: [FakeRouterLinkDirective] },
        remove: { imports: [RouterLink] },
      })
      .overrideProvider(CocktailStoreService, {
        useValue: { toggleLike() { }, getLikedId: () => likedId.asReadonly() }
      })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("cocktail", COCKTAIL);
    fixture.detectChanges();
  });

  it("should display non alcoholic cocktail with 'Non alcoholic' label", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, isAlcoholic: false })
    fixture.detectChanges();

    const labelElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="alcoholic-label"]')).nativeElement;
    expect(labelElement.textContent).toContain('Non alcoholic');
    expect(labelElement.className).toContain('non-alcoholic');
  });

  it("should display alcoholic cocktail with 'Alcoholic' label", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, isAlcoholic: true })
    fixture.detectChanges();

    const labelElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="alcoholic-label"]')).nativeElement;
    expect(labelElement.textContent).toContain('Alcoholic');
    expect(labelElement.className).toContain('alcoholic');
  });

  it("should emit a 'toggleLike' event when user click icon-star", () => {
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(storeService, 'toggleLike');
    fixture.detectChanges();

    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    starElement.click();
    expect(storeService.toggleLike).toHaveBeenCalledWith("my-id");
  });

  it("should apply the active class to the icon-star element if cocktail is liked", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, liked: true });
    likedId.set(["my-id", "other-id"])
    fixture.detectChanges();
    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    expect(starElement.className).toContain("active")
  })

  it("shouldn't apply the active class to the icon-star element if cocktail is not liked", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, liked: false })
    fixture.detectChanges();
    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    expect(starElement.className).not.toContain("active")
  })
});
