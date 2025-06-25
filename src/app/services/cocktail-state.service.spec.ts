import { TestBed } from '@angular/core/testing';

import { CocktailStateService } from './cocktail-state.service';
import { CocktailHttpService } from './http/cocktail-http.service';
import { firstValueFrom, lastValueFrom, of, Subject } from 'rxjs';
import { GetCocktailsDto } from '../@types/dto/get-cocktails';
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
    TestBed.configureTestingModule({
    }).overrideProvider(CocktailHttpService, { useValue: { getCocktails: () => of([]) } });
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
      ]);
      done();
    });
  });
});
