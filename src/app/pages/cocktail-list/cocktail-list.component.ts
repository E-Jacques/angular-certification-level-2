import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FilterHeaderComponent } from "../../components/filter-header/filter-header.component";
import { CocktailFilter } from '../../@types/internal/filter';
import { CocktailStateService } from '../../services/cocktail-state.service';
import { AsyncPipe } from '@angular/common';
import { CocktailCardComponent } from "../../components/cocktail-card/cocktail-card.component";
import { FilterCocktailsPipe } from "../../pipes/filter-cocktails.pipe";
import { CocktailStoreService } from '../../services/cocktail-store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [FilterHeaderComponent, CocktailCardComponent, FilterCocktailsPipe],
  providers: [FilterCocktailsPipe],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent {
  /**
   * The cocktail state service dependency.
   */
  private stateService = inject(CocktailStateService);

  /**
   * The cocktail store service dependency.
   */
  private storeService = inject(CocktailStoreService);

  /**
   * The filter object, wrapped in a signal, that is used to filter unwanted cocktails.
   */
  protected filter: WritableSignal<CocktailFilter> = signal<CocktailFilter>({});

  /**
   * The list, wrapped in an observable, of all cocktails.
   */
  protected cocktails = this.stateService.getCocktails();

  /**
   * Handles the filter change.
   * 
   * Update the filter signal with the new value.
   * 
   * @see FilterHeaderComponent
   */
  onFilterChange(newFilter: CocktailFilter) {
    this.filter.set(newFilter);
  }

  /**
   * Handles the 'toggleLike' event from cocktail card.
   * 
   * @param id the identifier of the liked cocktail.
   */
  onCocktailToggleLike(id: string) {
    this.storeService.toggleLike(id);
  }
}
