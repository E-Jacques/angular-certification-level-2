import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardComponent } from './cocktail-card.component';
import { By } from '@angular/platform-browser';
import { JoinPipe } from '../../pipes/join.pipe';

const COCKTAIL = {
  id: "1",
  name: 'Mojito',
  isAlcoholic: true,
  imageUrl: 'https://example.com/mojito.jpg',
  ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
  instructions: 'Mix all ingredients and serve chilled.'
};

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JoinPipe],
      imports: [CocktailCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cocktail', COCKTAIL);
    fixture.detectChanges();
  });

  it("should display non alcoholic cocktail with 'Non alcoholic' label", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, isAlcoholic: false });
    fixture.detectChanges();

    const labelElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="alcoholic-label"]')).nativeElement;
    expect(labelElement.textContent).toContain('Non alcoholic');
    expect(labelElement.className).toContain('non-alcoholic');
  });

  it("should display alcoholic cocktail with 'Alcoholic' label", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, isAlcoholic: true });
    fixture.detectChanges();

    const labelElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="alcoholic-label"]')).nativeElement;
    expect(labelElement.textContent).toContain('Alcoholic');
    expect(labelElement.className).toContain('alcoholic');
  });

  it("should format the ingredients by joining them with pipes", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'] });
    fixture.detectChanges();

    const ingredientsElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="ingredients"]')).nativeElement;
    expect(ingredientsElement.textContent).toBe('Mint | Lime | Rum | Sugar | Soda Water');
  });

  it("should add the 'star-<cocktailid>' identifier to the card's star", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, id: "aze123" });
    fixture.detectChanges();

    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    expect(starElement.id).toBe('star-aze123');
  });
});
