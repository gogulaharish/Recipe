import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredient[] = [];
  private apiUrl = ' http://localhost:3000/ingredients';

  constructor(private http: HttpClient) { }

  getIngridientsList(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  addIngridients(ingredient : Ingredient):Observable<Ingredient>{
    return this.http.post<Ingredient>(this.apiUrl,ingredient);
  }

  getIngridient(id:number):Observable<Ingredient>{
    return this.http.get<Ingredient>(`${this.apiUrl}/${id}`);
  }

  updateIngredient(id:number,ingredient: Ingredient):Observable<Ingredient>{
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient);
  }

  deleteIngredient(id:number):Observable<Ingredient>{
    return this.http.delete<Ingredient>(`${this.apiUrl}/${id}`);
  }


}
