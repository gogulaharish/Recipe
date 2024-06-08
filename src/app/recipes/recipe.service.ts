import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[]= [];
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  getRecipesList():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeDetails(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  getRecipe(id:number): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(this.apiUrl,recipe);
  }

  updateRecipe(id:number, recipe:Recipe):Observable<Recipe>{
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id:number):Observable<Recipe>{
    return this.http.delete<Recipe>(`${this.apiUrl}/${id}`);
  }

  deleteIngredient(recipeId:number, ingredientId:number):Observable<Recipe>{
    return this.http.delete<Recipe>(`${this.apiUrl}/${recipeId}/ingredients/${ingredientId}`);
  }
  

}
