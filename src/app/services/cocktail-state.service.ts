import { computed, inject, Injectable, Signal } from '@angular/core';
import { CocktailItem, GetCocktailsDto } from '../@types/dto/get-cocktails';
import { BehaviorSubject, combineLatest, concatMap, map, Observable, of, startWith } from 'rxjs';
import { CocktailHttpService } from './http/cocktail-http.service';
import { Cocktail } from '../@types/internal/cocktails';
import { CocktailStoreService } from './cocktail-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CocktailStateService {
  /**
   * The http service dependency.
   */
  private readonly httpService = inject(CocktailHttpService);
  /**
   * The store service dependency.
   */
  private readonly storeService = inject(CocktailStoreService);

  private readonly rawCocktails: Signal<GetCocktailsDto | undefined> = toSignal(this.httpService.getCocktails());

  /**
   * A subject wrapping the internal cocktail list.
   */
  private readonly cocktails: Signal<Cocktail[]> = computed(() => {
    const raw = this.rawCocktails();
    const likedId = this.storeService.getLikedId()();

    if (raw) {
      return raw.map(cocktail => this.fromDtoToInternal(cocktail, likedId))
    } else {
      return [];
    }
  });

  /**
   * Getter for the cocktails observable.
   * 
   * @returns the cocktails list
   */
  public getCocktails(): Signal<Cocktail[]> {
    return this.cocktails;
  }

  public getCocktail(id: string): Observable<CocktailItem> {
    return this.httpService.getCocktailById(id);
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
