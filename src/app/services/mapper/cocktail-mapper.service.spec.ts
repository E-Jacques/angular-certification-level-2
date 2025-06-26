import { TestBed } from '@angular/core/testing';

import { CocktailMapperService } from './cocktail-mapper.service';
import { COCKTAIL, COCKTAIL_ITEM } from '../../utils/mock-cocktail';

describe('CocktailMapperService', () => {
  let service: CocktailMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailMapperService);
  });

  describe('fromDtoToInternal', () => {
    it("should map with liked=true if id is present", () => {
      const data = service.fromDtoToInternal({ ...COCKTAIL_ITEM, id: "aaa" }, ["1r4", "aab", "aaa", "r4a"]);

      expect(data.liked).toBeTrue()
    });
    it("should map with liked=true if id is present", () => {
      const data = service.fromDtoToInternal({ ...COCKTAIL_ITEM, id: "aaa" }, ["1r4", "aab", "r4a"]);

      expect(data.liked).toBeFalse()
    });
  });
});
