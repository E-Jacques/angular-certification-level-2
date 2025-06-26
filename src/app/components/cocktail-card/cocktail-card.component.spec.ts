import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardComponent } from './cocktail-card.component';
import { By } from '@angular/platform-browser';
import { JoinPipe } from '../../pipes/join.pipe';
import { Cocktail } from '../../@types/internal/cocktails';
import { RouterLink } from '@angular/router';
import { FakeRouterLinkDirective } from '../../utils/fake-router-link.directive';
import { COCKTAIL } from '../../utils/mock-cocktail';
import { LikeStarComponent } from '../like-star/like-star.component';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JoinPipe],
      imports: [CocktailCardComponent]
    })
      .overrideComponent(CocktailCardComponent, {
        add: { imports: [FakeRouterLinkDirective] },
        remove: { imports: [RouterLink] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cocktail', COCKTAIL);
    spyOn(component.toggleLike, 'emit');
    fixture.detectChanges();
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

  it("should emit a 'toggleLike' event when user toggle the like star component", () => {
    const likeStarComponent: LikeStarComponent = fixture.debugElement.query(By.directive(LikeStarComponent)).componentInstance;
    likeStarComponent.toggle.emit();
    expect(component.toggleLike.emit).toHaveBeenCalled();
  });
});
