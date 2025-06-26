import { TestBed } from "@angular/core/testing";
import { provideStorage, STORAGE } from "./provide-storage";
import { InMemoryStorage } from "./in-memory-storage";

describe('provideStorage', () => {
    it("should expose the passed storage in the injection token", (): void => {
        TestBed.configureTestingModule({
            providers: [provideStorage(new InMemoryStorage())]
        });

        expect(TestBed.inject(STORAGE)).toBeInstanceOf(InMemoryStorage);
    });

    it("should expose window.localStorage if no specific storage is passed", (): void => {
        TestBed.configureTestingModule({
            providers: [provideStorage()]
        });

        expect(TestBed.inject(STORAGE)).toBe(window.localStorage);
    })
})