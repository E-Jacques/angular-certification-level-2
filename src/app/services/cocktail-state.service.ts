import { inject, Injectable, Signal } from '@angular/core';
import { CocktailItem, GetCocktailsDto } from '../@types/dto/get-cocktails';
import { BehaviorSubject, Observable, of, startWith } from 'rxjs';
import { CocktailHttpService } from './http/cocktail-http.service';
import { Cocktail } from '../@types/internal/cocktails';

@Injectable({
  providedIn: 'root'
})
export class CocktailStateService {
  private httpService = inject(CocktailHttpService);

  private readonly cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject<Cocktail[]>([]);

  constructor() {
    this.httpService.getCocktails().subscribe({
      next: cocktails => {
        this.cocktails.next(cocktails);
      }, error: () => {
        this.cocktails.next([]); // Reset to empty on error
      }
    });
  }

  public getCocktails(): Observable<Cocktail[]> {
    return this.cocktails.asObservable();
  }
}
