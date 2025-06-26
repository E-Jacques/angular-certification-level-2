import { ResolveFn } from '@angular/router';
import { CocktailItem } from '../@types/dto/get-cocktails';
import { inject } from '@angular/core';
import { CocktailStateService } from '../services/cocktail-state.service';

export const cocktailResolver: ResolveFn<CocktailItem> = (route, _) => {
  return inject(CocktailStateService).getCocktail(route.paramMap.get("id")!);
};
