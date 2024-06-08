import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { clear } from 'node:console';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  id: number = 0;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.recipeForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      imagePath: ['',Validators.required],
      ingredients: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
    this.getRecipeForm();
  }

  getRecipeForm() {
    if (this.editMode == true) {
      this.recipeService.getRecipe(this.id).subscribe(res => {
        this.loadRecipeForm(res);
      })
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  loadRecipeForm(recipe: any) {
    this.recipeForm.patchValue({
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath,
    })
    if (recipe.ingredients.length>0) {
      this.ingredients.clear();
      for (let ingredient of recipe.ingredients) {
        this.ingredients.push(this.formBuilder.group({
          name: [ingredient.name,Validators.required],
          amount: [ingredient.amount,[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')] ]
        })) 
      }
    }
  }

  onAddIngredient() {
    this.ingredients.push(this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    }));
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value).subscribe(() => {
        this.onCancel();
      });
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(() => {
        this.onCancel();
      });
    }
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteIngredient(index:number){
    if(this.id !== null && index !== null){
      this.recipeService.deleteIngredient(this.id, index).subscribe(()=>{
         this.getRecipeForm();
      })
    }
  }

}


