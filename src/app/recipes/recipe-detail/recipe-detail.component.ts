import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  recipe: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router:Router
  ) { 
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeDetails(id).subscribe(res=>{
      this.recipe = res;
    })
  }

  onAddToShoppingList(){}

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.recipeService.deleteRecipe(id).subscribe(()=>{
      this.router.navigate(['/recipes']);
    })
  }
}
