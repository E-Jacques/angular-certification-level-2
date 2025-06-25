import { inject, Injectable, Signal } from '@angular/core';
import { CocktailItem, GetCocktailsDto } from '../@types/dto/get-cocktails';
import { BehaviorSubject, combineLatest, concatMap, Observable, of, startWith } from 'rxjs';
import { CocktailHttpService } from './http/cocktail-http.service';
import { Cocktail } from '../@types/internal/cocktails';
import { CocktailStoreService } from './cocktail-store.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailStateService {
  /**
   * The http service dependency.
   */
  private httpService = inject(CocktailHttpService);
  /**
   * The store service dependency.
   */
  private storeService = inject(CocktailStoreService);

  /**
   * A subject wrapping the internal cocktail list.
   */
  private readonly cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject<Cocktail[]>([]);

  constructor() {
    combineLatest([this.httpService.getCocktails(), this.storeService.getLikedId()]).subscribe({
      next: ([cocktails, liked]) => {
        this.cocktails.next(cocktails.map(cocktail => this.fromDtoToInternal(cocktail, liked)));
      }, error: () => {
        this.cocktails.next([]); // Reset to empty on error
      }
    });
  }

  /**
   * Getter for the cocktails observable.
   * 
   * @returns the cocktails list
   */
  public getCocktails(): Observable<Cocktail[]> {
    return this.cocktails.asObservable();
  }

  /**
   * Map the DTO to the internal type.
   * 
   * @param cocktail the dto
   * @param likedId the list of liked cocktails
   * @returns the internal type
   */
  public fromDtoToInternal(cocktail: CocktailItem, likedId: string[]): Cocktail {
    return { ...cocktail, liked: likedId.includes(cocktail.id) }
  }
}
