import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { STORAGE } from '../providers/provide-storage';

export const LIKE_KEY = "likes";

@Injectable({
  providedIn: 'root'
})
/**
 * A service used to handle cocktail persisted states such as likes.
 */
export class CocktailStoreService {
  /**
   * The storage used to persist liked cocktail. 
   */
  private readonly storage = inject(STORAGE);

  /**
   * An subject used to dynamically providing new list of liked cocktails.
   */
  private likedId: WritableSignal<string[]> = signal<string[]>(this.getFromStorage());

  /**
   * Retrieve, from the browser storage, the liked cocktails.
   * 
   * @returns the list of liked cocktail's id.
   */
  private getFromStorage(): string[] {
    const likes = this.storage.getItem(LIKE_KEY);
    if (!likes) return [];

    try {
      return JSON.parse(likes);
    } catch {
      return [];
    }
  }

  /**
   * Persist the array of like cocktail, refers by their id.
   * 
   * @param likes the array to persist
   * 
   * @private
   */
  private persistToStorage(likes: string[]): void {
    this.storage.setItem(LIKE_KEY, JSON.stringify(likes));
  }

  /**
   * Mutate the list of liked cocktails. Apply a toggle, if a cocktail 
   * isn't currently like, it had it to the list of liked cocktail. 
   * Otherwise, it removes it.
   * 
   * @param id the like cocktail id.
   */
  public toggleLike(id: string): void {
    let likes = this.getFromStorage();

    let index = likes.indexOf(id);
    if (index >= 0) {
      likes.splice(index, 1)
    } else {
      likes.push(id)
    }

    this.likedId.set(likes);
    this.persistToStorage(likes);
  }

  /**
   * Getter for the liked cocktails.
   * 
   * @returns an observable wrapping the liked cocktails
   */
  public getLikedId(): Signal<string[]> {
    return this.likedId.asReadonly();
  }
}
