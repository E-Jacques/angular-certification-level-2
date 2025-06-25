import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCocktailsDto } from '../../@types/dto/get-cocktails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailHttpService {
  private httpClient = inject(HttpClient);

  public getCocktails(): Observable<GetCocktailsDto> {
    return this.httpClient.get<GetCocktailsDto>('/cocktails');
  }
}
