import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Cocktail } from '../../@types/internal/cocktails';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-like-star',
  standalone: true,
  imports: [NgClass],
  templateUrl: './like-star.component.html',
  styleUrl: './like-star.component.scss'
})
/**
 * A component that display information on cocktail like status.
 * 
 * @example
 * ```html
 * <app-like-star [cocktail]="..."></app-like-star>
 * ```
 */
export class LikeStarComponent {
  /**
   * The cocktail associated with the like button
   */
  public readonly cocktail: InputSignal<Cocktail> = input.required<Cocktail>();

  public readonly toggle: OutputEmitterRef<void> = output<void>();

  /**
   * Handle the click & keyup ('enter' key) event on the icon star element.
   * 
   * Emit an 'toggleLike' event to parent component.
   */
  public onIconStarClick() {
    this.toggle.emit();
  }
}
