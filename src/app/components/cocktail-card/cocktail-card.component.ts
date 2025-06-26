import { Component, EventEmitter, input, Input, InputSignal, output, Output, OutputEmitterRef } from '@angular/core';
import { Cocktail } from '../../@types/internal/cocktails';
import { NgClass } from '@angular/common';
import { JoinPipe } from "../../pipes/join.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [NgClass, JoinPipe, RouterLink],
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
  public readonly cocktail: InputSignal<Cocktail> = input.required<Cocktail>();

  /**
   * Triggered when user clicked the star icon
   */
  public readonly toggleLike: OutputEmitterRef<void> = output<void>();

  /**
   * Handle the click event on the icon star element.
   * 
   * Emit an 'toggleLike' event to parent component.
   */
  public onIconStarClick() {
    this.toggleLike.emit();
  }
}
