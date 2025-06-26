import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { cocktailResolver } from './cocktail.resolver';
import { CocktailItem } from '../@types/dto/get-cocktails';
import { CocktailStateService } from '../services/cocktail-state.service';
import { isObservable, Observable, of } from 'rxjs';

describe('cocktailResolver', () => {
  const executeResolver: ResolveFn<CocktailItem> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => cocktailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({}).overrideProvider(CocktailStateService, {
      useValue: {
        getCocktail: () => of<CocktailItem>(
          {
            id: "my-id",
            name: 'Mojito',
            isAlcoholic: true,
            imageUrl: 'https://example.com/mojito.jpg',
            ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
            instructions: 'Mix all ingredients and serve chilled.'
          })
      }
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it("should call state service using identifier", (done) => {
    const response = executeResolver({ paramMap: convertToParamMap({ id: "my-id" }) } as ActivatedRouteSnapshot, null as unknown as RouterStateSnapshot)
    expect(response).toBeInstanceOf(Observable);
    if (isObservable(response)) {
      response.subscribe((data) => {
        expect(data).toEqual({
          id: "my-id",
          name: 'Mojito',
          isAlcoholic: true,
          imageUrl: 'https://example.com/mojito.jpg',
          ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
          instructions: 'Mix all ingredients and serve chilled.'
        })
        done();
      })
    }
  })
});
