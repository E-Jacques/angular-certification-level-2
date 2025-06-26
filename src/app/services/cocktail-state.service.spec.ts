import { TestBed } from '@angular/core/testing';
import { CocktailStateService } from './cocktail-state.service';
import { CocktailHttpService } from './http/cocktail-http.service';
import { of, Subject } from 'rxjs';
import { GetCocktailsDto } from '../@types/dto/get-cocktails';
import { CocktailStoreService } from './cocktail-store.service';
import { signal, WritableSignal } from '@angular/core';

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

describe('CocktailStateService', () => {
  let service: CocktailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
      .overrideProvider(CocktailHttpService, { useValue: { getCocktails: () => of([]) } })
      .overrideProvider(CocktailStoreService, { useValue: { getLikedId: () => signal<string[]>([]).asReadonly() } });
  });

  it("should initialize the cocktail list as an empty array while waiting for http response", async (): Promise<void> => {
    const cocktailsMock: Subject<GetCocktailsDto> = new Subject<GetCocktailsDto>();
    const httpService = TestBed.inject(CocktailHttpService);
    spyOn(httpService, 'getCocktails').and.returnValue(cocktailsMock.asObservable());

    service = TestBed.inject(CocktailStateService);
    const cocktails1 = service.getCocktails();
    expect(cocktails1()).toHaveSize(0);

    cocktailsMock.next(COCKTAILS);
    const cocktails2 = service.getCocktails();
    expect(cocktails2()).toHaveSize(2);
  });

  it('should initialize the cocktail list using the http response', () => {
    const httpService = TestBed.inject(CocktailHttpService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));

    service = TestBed.inject(CocktailStateService);

    const cocktails = service.getCocktails();
    expect(cocktails()).toEqual([
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
  });

  it("should use the cocktail store to determine if a cocktail have been liked", () => {
    const httpService = TestBed.inject(CocktailHttpService);
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));
    spyOn(storeService, 'getLikedId').and.returnValue(signal(["2"]).asReadonly());

    service = TestBed.inject(CocktailStateService);

    const cocktails = service.getCocktails();
    expect(cocktails()).toEqual([
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
  });

  it("should dynamically update the liked state in the subscription", async (): Promise<void> => {
    const liked: WritableSignal<string[]> = signal<string[]>([]);
    const httpService = TestBed.inject(CocktailHttpService);
    const storeService = TestBed.inject(CocktailStoreService);
    spyOn(httpService, 'getCocktails').and.returnValue(of(COCKTAILS));
    spyOn(storeService, 'getLikedId').and.returnValue(liked.asReadonly());

    service = TestBed.inject(CocktailStateService);
    const cocktails = service.getCocktails();
    expect(cocktails()).toEqual([
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

    liked.set(["1"]);
    expect(cocktails()).toEqual([
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
