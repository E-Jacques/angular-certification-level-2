import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeStarComponent } from './like-star.component';
import { COCKTAIL } from '../../utils/mock-cocktail';
import { By } from '@angular/platform-browser';

describe('LikeStarComponent', () => {
  let component: LikeStarComponent;
  let fixture: ComponentFixture<LikeStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeStarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LikeStarComponent);
    fixture.componentRef.setInput("cocktail", COCKTAIL);
    component = fixture.componentInstance;
    spyOn(component.toggle, 'emit');
    fixture.detectChanges();
  });

  it("should apply the active class to the icon-star element if cocktail is liked", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, liked: true });
    fixture.detectChanges();
    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    expect(starElement.className).toContain("active")
  })

  it("shouldn't apply the active class to the icon-star element if cocktail is not liked", () => {
    fixture.componentRef.setInput("cocktail", { ...COCKTAIL, liked: false });
    fixture.detectChanges();
    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    expect(starElement.className).not.toContain("active")
  });

  it("should emit a 'toggle' event when user click icon-star", () => {
    const starElement: HTMLElement = fixture.debugElement.query(By.css('.icon-star')).nativeElement;
    starElement.click();
    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
