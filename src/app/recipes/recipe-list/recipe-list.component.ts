import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]= [];
  id: number | undefined;

  constructor( 
    private recipeService : RecipeService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getRecipeList();
  }

  getRecipeList(){
    this.recipeService.getRecipesList().subscribe(res=>{
      this.recipes = res;
    })
  }

  getRecipeDetails(id:number){
     this.router.navigate(['/recipes/'+id]);
  }

  onAddRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
}
