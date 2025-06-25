import { Cocktail } from '../@types/internal/cocktails';
import { FilterCocktailsPipe } from './filter-cocktails.pipe';

describe('FilterCocktailsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCocktailsPipe();
    expect(pipe).toBeTruthy();
  });

  it("should correctly handle empty filters", () => {
    const pipe = new FilterCocktailsPipe();
    const cocktails = [
      { id: "1", name: 'Mojito', isAlcoholic: true, imageUrl: '', ingredients: [], instructions: '' },
      { id: "2", name: 'Virgin Mojito', isAlcoholic: false, imageUrl: '', ingredients: [], instructions: '' }
    ];
    expect(pipe.transform(cocktails, {})).toEqual(cocktails);
  });

  it("should correctly handle empty cocktail lists", () => {
    const pipe = new FilterCocktailsPipe();
    expect(pipe.transform([], { name: 'my filtered name' })).toEqual([]);
  });

  it("should be able to filter cocktails by name", () => {
    const pipe = new FilterCocktailsPipe();
    const cocktails = [
      { id: "1", name: 'Mojito', isAlcoholic: true, imageUrl: '', ingredients: [], instructions: '' },
      { id: "2", name: 'Virgin Mojito', isAlcoholic: false, imageUrl: '', ingredients: [], instructions: '' }
    ];
    const filteredCocktails = pipe.transform(cocktails, { name: 'Virgin' });
    expect(filteredCocktails).toEqual([
      { id: "2", name: 'Virgin Mojito', isAlcoholic: false, imageUrl: '', ingredients: [], instructions: '' }
    ]);
  });

  it("should ignore case", () => {
    const pipe = new FilterCocktailsPipe();
    const cocktails = [
      { id: "1", name: 'Mojito', isAlcoholic: true, imageUrl: '', ingredients: [], instructions: '' },
      { id: "2", name: 'VirGIn Mojito', isAlcoholic: false, imageUrl: '', ingredients: [], instructions: '' }
    ];
    expect(pipe.transform(cocktails, { name: "viRgIn" })).toHaveSize(1);
  })
});
