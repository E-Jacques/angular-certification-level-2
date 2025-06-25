import { TestBed } from '@angular/core/testing';

import { CocktailStateService } from './cocktail-state.service';
import { CocktailHttpService } from './http/cocktail-http.service';
import { BehaviorSubject, firstValueFrom, of, Subject } from 'rxjs';
import { GetCocktailsDto } from '../@types/dto/get-cocktails';
import { CocktailStoreService } from './cocktail-store.service';
const COCKTAILS: GetCocktailsDto = [
  {
    id: "1",
    name: 'Mojito',
    isAlcoholic: true,
    imageUrl: 'https://example.com/mojito.jpg',
    ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
    instructions: 'Mix all ingredients and serve chilled.'
  },
  {
    id: "2",
    name: 'Virgin Mojito',
    isAlcoholic: false,
    imageUrl: 'https://example.com/virgin-mojito.jpg',
    ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
    instructions: 'Mix all ingredients and serve chilled.'
  }
];
describe('CocktailService', () => {
  let service: CocktailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
      .overrideProvider(CocktailHttpService, { useValue: { getCocktails: () => of([]) } })
      .overrideProvider(CocktailStoreService, { useValue: { getLikedId: () => of([]) } });
  });

  it("should initialize the cocktail list as an empty array while waiting for http response", async (): Promise<void> => {
    const cocktailsMock: Subject<GetCocktailsDto> = new Subject<GetCocktailsDto>();
    const httpService = TestBed.inject(CocktailHttpService);
    spyOn(httpService, 'getCocktails').and.returnValue(cocktailsMock.asObservable());

    service = TestBed.inject(CocktailStateService);
    const cocktailsObs1 = service.getCocktails();
    expect(await firstValueFrom(cocktailsObs1)).toHaveSize(0);

    cocktailsMock.next(COCKTAILS);
    const cocktailsObs2 = service.getCocktails();
    expect(await firstValueFrom(cocktailsObs2)).toHaveSize(2);
  });

  it('should initialize the cocktail list using the http response', (done) => {
    const httpService = TestBed.inject(CocktailHttpService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));

    service = TestBed.inject(CocktailStateService);

    service.getCocktails().subscribe(cocktails => {
      expect(cocktails).toEqual([
        {
          id: "1",
          name: 'Mojito',
          liked: false,
          isAlcoholic: true,
          imageUrl: 'https://example.com/mojito.jpg',
          ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
          instructions: 'Mix all ingredients and serve chilled.'
        },
        {
          id: "2",
          name: 'Virgin Mojito',
          liked: false,
          isAlcoholic: false,
          imageUrl: 'https://example.com/virgin-mojito.jpg',
          ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
          instructions: 'Mix all ingredients and serve chilled.'
        }
      ]);
      done();
    });
  });

  it("should use the cocktail store to determine if a cocktail have been liked", (done) => {
    const httpService = TestBed.inject(CocktailHttpService);
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));
    spyOn(storeService, 'getLikedId').and.returnValue(of(["2"]));

    service = TestBed.inject(CocktailStateService);

    service.getCocktails().subscribe(cocktails => {
      expect(cocktails).toEqual([
        {
          id: "1",
          name: 'Mojito',
          liked: false,
          isAlcoholic: true,
          imageUrl: 'https://example.com/mojito.jpg',
          ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
          instructions: 'Mix all ingredients and serve chilled.'
        },
        {
          id: "2",
          name: 'Virgin Mojito',
          liked: true,
          isAlcoholic: false,
          imageUrl: 'https://example.com/virgin-mojito.jpg',
          ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
          instructions: 'Mix all ingredients and serve chilled.'
        }
      ]);
      done();
    });
  });

  it("should dynamically update the liked state in the subscription", async (): Promise<void> => {
    const liked: Subject<string[]> = new BehaviorSubject<string[]>([]);
    const httpService = TestBed.inject(CocktailHttpService);
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));
    spyOn(storeService, 'getLikedId').and.returnValue(liked.asObservable());

    service = TestBed.inject(CocktailStateService);
    const obs = service.getCocktails();
    expect(await firstValueFrom(obs)).toEqual([
      {
        id: "1",
        name: 'Mojito',
        liked: false,
        isAlcoholic: true,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      },
      {
        id: "2",
        name: 'Virgin Mojito',
        liked: false,
        isAlcoholic: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      }
    ]);

    liked.next(["1"]);
    expect(await firstValueFrom(obs)).toEqual([
      {
        id: "1",
        name: 'Mojito',
        liked: true,
        isAlcoholic: true,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      },
      {
        id: "2",
        name: 'Virgin Mojito',
        liked: false,
        isAlcoholic: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      }
    ]);
  })
});
