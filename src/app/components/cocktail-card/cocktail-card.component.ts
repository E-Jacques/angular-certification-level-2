import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cocktail } from '../../@types/internal/cocktails';
import { NgClass } from '@angular/common';
import { JoinPipe } from "../../pipes/join.pipe";

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [NgClass, JoinPipe],
  providers: [JoinPipe],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss'
})
/**
 * A card that present a cocktail to the user
 * 
 * @example
 * ```html
 * <app-cocktail-card [cocktail]="..." (toggleLike)="onToggleLike()"></app-cocktail-card>
 * ```
 */
export class CocktailCardComponent {
  /**
   * The internal object representing a cocktail. Those informations are used to render the card.
   */
  @Input({ required: true }) cocktail!: Cocktail;

  /**
   * Triggered when user clicked the star icon
   */
  @Output() toggleLike = new EventEmitter<void>();

  /**
   * Handle the click event on the icon star element.
   * 
   * Emit an 'toggleLike' event to parent component.
   */
  public onIconStarClick() {
    this.toggleLike.emit();
  }
}
