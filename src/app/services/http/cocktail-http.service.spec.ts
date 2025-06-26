import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CocktailHttpService } from './cocktail-http.service';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('CocktailHttpService', () => {
  let service: CocktailHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CocktailHttpService);
  });

  it("should make an HTTP GET request to '/cocktails'", (done) => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const cocktails$ = firstValueFrom(service.getCocktails());

    const req = httpTesting.expectOne('/cocktails');
    expect(req.request.method).toBe('GET');
    req.flush([
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

    cocktails$.then(cocktails => {
      expect(cocktails.length).toBe(2);
      expect(cocktails[0].name).toBe('Mojito');
      expect(cocktails[1].name).toBe('Virgin Mojito');
      done();
    });
  });

  it("should make an HTTP GET request to '/cocktails/:id'", (done): void => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const cocktails$ = firstValueFrom(service.getCocktailById("123"));

    const req = httpTesting.expectOne('/cocktails/123');
    expect(req.request.method).toBe('GET');
    req.flush(
      {
        id: "123",
        name: 'Mojito',
        isAlcoholic: true,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
      });

    cocktails$.then(cocktail => {
      expect(cocktail.name).toBe('Mojito');
      done();
    });
  })
});