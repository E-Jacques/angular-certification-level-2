import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CocktailItem as CocktailItemDto, GetCocktailsDto } from '../../@types/dto/get-cocktails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailHttpService {
  private httpClient = inject(HttpClient);

  public getCocktails(): Observable<GetCocktailsDto> {
    return this.httpClient.get<GetCocktailsDto>('/cocktails');
  }

  public getCocktailById(id: string): Observable<CocktailItemDto> {
    return this.httpClient.get<CocktailItemDto>(`/cocktails/${id}`);
  }
}
