import { Component, Input } from '@angular/core';
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
export class CocktailCardComponent {
  @Input({ required: true }) cocktail!: Cocktail;
}
