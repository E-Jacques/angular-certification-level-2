import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../@types/internal/cocktails';
import { CocktailFilter } from '../@types/internal/filter';

type CocktailKey = keyof Cocktail;

@Pipe({
  name: 'filterCocktails',
  standalone: true
})
/**
 * A pipe that filters all cocktails which doesn't respect the specified filter rules.
 * 
 * @example
 * ```html
 * @for (cocktail of cocktails | filterCocktails: filter(); track cocktail.id) {
 *  ...
 * }
 * ```
 */
export class FilterCocktailsPipe implements PipeTransform {
  /**
   * Check if the cocktail respects all specified filters. The check are only
   * done on object that can be stringified for now. Check are not case sensitive.
   * 
   * @param cocktail the cocktail to check
   * @param filter the filters to apply
   * @returns if the cocktail respects all filters
   */
  private isRespectingFilters(cocktail: Cocktail, filter: CocktailFilter): boolean {
    return Object.entries(filter).every(([key, val]) => {
      return cocktail[<CocktailKey>key].toString().toLowerCase().includes(val.toLowerCase());
    });;
  }

  /**
   * Apply a filter to a list of cocktails.
   * 
   * @param value the cocktail list to filter
   * @param filter the filter to apply
   * @returns the filtered cocktail list
   */
  transform(value: Cocktail[], filter: CocktailFilter): Cocktail[] {
    return value.filter(cocktail => this.isRespectingFilters(cocktail, filter));
  }

}
