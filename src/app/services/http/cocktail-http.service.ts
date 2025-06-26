import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CocktailItem as CocktailItemDto, GetCocktailsDto } from '../../@types/dto/get-cocktails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailHttpService {
  private httpClient = inject(HttpClient);

  /**
   * Send an HTTP request to `GET /cocktails`.
   * 
   * @returns the response received.
   */
  public getCocktails(): Observable<GetCocktailsDto> {
    return this.httpClient.get<GetCocktailsDto>('/cocktails');
  }

  /**
   * Send an HTTP request to `GET /cocktails/:id`.
   * 
   * @returns the response received.
   */
  public getCocktailById(id: string): Observable<CocktailItemDto> {
    return this.httpClient.get<CocktailItemDto>(`/cocktails/${id}`);
  }
}
