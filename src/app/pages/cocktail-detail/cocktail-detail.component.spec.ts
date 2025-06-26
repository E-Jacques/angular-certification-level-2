import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CocktailStoreService } from '../../services/cocktail-store.service';
import { FakeCocktailCardComponent } from '../cocktail-list/cocktail-list.component.spec';
import { CocktailDetailComponent } from './cocktail-detail.component';
import { FakeRouterLinkDirective } from '../../utils/fake-router-link.directive';
import { COCKTAIL_ITEM } from '../../utils/mock-cocktail';
import { LikeStarComponent } from '../../components/like-star/like-star.component';

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
    fixture.componentRef.setInput("cocktail", COCKTAIL_ITEM);
    fixture.detectChanges();
  });

  it("should emit a 'toggleLike' event when user click icon-star", () => {
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(storeService, 'toggleLike');
    fixture.detectChanges();

    const likeStarComponent: LikeStarComponent = fixture.debugElement.query(By.directive(LikeStarComponent)).componentInstance;
    likeStarComponent.toggle.emit();
    expect(storeService.toggleLike).toHaveBeenCalledWith("my-id");
  });
});
