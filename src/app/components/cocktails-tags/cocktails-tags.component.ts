import { Component, input, InputSignal } from '@angular/core';
import { Cocktail } from '../../@types/internal/cocktails';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cocktails-tags',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cocktails-tags.component.html',
  styleUrl: './cocktails-tags.component.scss'
})
/**
 * Allows to display a list of tags (actually only one) from a cocktail object.
 * 
 * @example
 * ```html
 * <app-cocktail-tags [cocktail]="..."></app-cocktails-tags>
 * ```
 */
export class CocktailsTagsComponent {
  /**
   * The cocktail from which to display the tags.
   */
  public readonly cocktail: InputSignal<Cocktail> = input.required<Cocktail>();
}
