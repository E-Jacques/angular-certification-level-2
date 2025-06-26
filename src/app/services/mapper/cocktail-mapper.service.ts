import { Injectable } from '@angular/core';
import { CocktailItem } from '../../@types/dto/get-cocktails';
import { Cocktail } from '../../@types/internal/cocktails';

@Injectable({
  providedIn: 'root'
})
export class CocktailMapperService {
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
