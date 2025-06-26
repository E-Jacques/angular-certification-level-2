import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailsTagsComponent } from './cocktails-tags.component';
import { COCKTAIL } from '../../utils/mock-cocktail';
import { By } from '@angular/platform-browser';

describe('CocktailsTagsComponent', () => {
  let component: CocktailsTagsComponent;
  let fixture: ComponentFixture<CocktailsTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailsTagsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailsTagsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("cocktail", COCKTAIL);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
