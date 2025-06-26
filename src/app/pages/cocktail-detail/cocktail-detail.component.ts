import { NgClass } from '@angular/common';
import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailItem } from '../../@types/dto/get-cocktails';
import { Cocktail } from '../../@types/internal/cocktails';
import { CocktailStoreService } from '../../services/cocktail-store.service';
import { CocktailsTagsComponent } from "../../components/cocktails-tags/cocktails-tags.component";
import { LikeStarComponent } from "../../components/like-star/like-star.component";

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [RouterLink, CocktailsTagsComponent, LikeStarComponent],
  templateUrl: './cocktail-detail.component.html',
  styleUrl: './cocktail-detail.component.scss'
})
export class CocktailDetailComponent {
  /**
   * The cocktail store service dependency.
   */
  private readonly storeService = inject(CocktailStoreService);

  /**
   * The cocktail dto associated with the view page.
   * 
   * This identifier should be provided by the angular router using component input binding and the associated resolver.
   * 
   * @see cocktailResolver
   * @see withComponentInputBinding
   */
  public readonly cocktail: Signal<CocktailItem | undefined> = input<CocktailItem>();

  /**
   * The list of all likes, wrapped in a signal.
   */
  private readonly likedId: Signal<string[]> = this.storeService.getLikedId();

  /**
   * A computed signal wrapping the cocktail internal representation. If the page doesn't
   * have information on the cocktail yet, value is null.
   */
  public readonly cocktailBO: Signal<Cocktail | null> = computed((): Cocktail | null => {
    const cocktail = this.cocktail();
    const likedId = this.likedId();

    let newCocktailObject: Cocktail | null = null;
    if (cocktail) {
      newCocktailObject = { ...cocktail, liked: likedId.includes(cocktail.id) }
    }

    return newCocktailObject;
  });

  /**
   * Handles the icon-star's click by toggling the like status of the 
   * cocktail associated with the viewed page. 
   */
  public onToggleLike() {
    const cocktail = this.cocktail();
    if (cocktail) {
      this.storeService.toggleLike(cocktail.id);
    }
  }
}
