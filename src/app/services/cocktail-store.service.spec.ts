import { TestBed } from '@angular/core/testing';
import { CocktailStoreService, LIKE_KEY } from './cocktail-store.service';
import { firstValueFrom } from 'rxjs';
import { InMemoryStorage } from '../providers/in-memory-storage';
import { provideStorage } from '../providers/provide-storage';

describe('CocktailStoreService', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new InMemoryStorage();
    TestBed.configureTestingModule({ providers: [provideStorage(storage)] });
    storage.clear();
  });

  it("retrieve persisted likes at service initialization", async (): Promise<void> => {
    storage.setItem(LIKE_KEY, JSON.stringify(["test-1", "id-2"]));
    const service = TestBed.inject(CocktailStoreService);
    const liked = service.getLikedId();

    expect(liked()).toEqual(["test-1", "id-2"]);
  });

  it("should handle missing key on initialization", async (): Promise<void> => {
    const service = TestBed.inject(CocktailStoreService);
    const liked = service.getLikedId();

    expect(liked()).toEqual([]);
  });

  it("should be resistant to wrongly formatted JSON", async (): Promise<void> => {
    storage.setItem(LIKE_KEY, "invalid_json");
    const service = TestBed.inject(CocktailStoreService);
    const liked = service.getLikedId();

    expect(liked()).toEqual([]);
  });

  describe("should persist new list in storage when toggleLike is called when id", () => {
    let service: CocktailStoreService;

    beforeEach(() => {
      storage.setItem(LIKE_KEY, JSON.stringify(["test-1", "id-2"]));
      spyOn(storage, 'setItem');
      service = TestBed.inject(CocktailStoreService);
    });

    it("is present", () => {
      service.toggleLike("id-2");
      expect(storage.setItem).toHaveBeenCalledWith(LIKE_KEY, '["test-1"]');
    });

    it("is missing", () => {
      service.toggleLike("id-3");
      expect(storage.setItem).toHaveBeenCalledWith(LIKE_KEY, '["test-1","id-2","id-3"]');
    });
  });

  describe("should dynamically update getLikedIds observable on toggleLike", () => {
    let service: CocktailStoreService;

    beforeEach(() => {
      storage.setItem(LIKE_KEY, JSON.stringify(["test-1", "id-2"]));
      service = TestBed.inject(CocktailStoreService);
    });

    it("if present", async (): Promise<void> => {
      service.toggleLike("id-2")
      const liked = service.getLikedId();
      expect(liked()).toEqual(["test-1"]);
    });

    it("if missing", async (): Promise<void> => {
      service.toggleLike("id-3")
      const liked = service.getLikedId();
      expect(liked()).toEqual(["test-1", "id-2", "id-3"]);
    });
  })
});
