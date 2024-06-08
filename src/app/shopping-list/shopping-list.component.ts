import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[]=[];
  shoppingForm : FormGroup; 
  editMode = false;
  editedIngredientId: number = 0;

  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder:FormBuilder,
    private router: Router
  ) { 
    this.shoppingForm = this.formBuilder.group({
      name: ['',Validators.required],
      amount: ['',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.getIngredientsList();
  }

  getIngredientsList(){
    this.shoppingListService.getIngridientsList().subscribe(res=>{
      this.ingredients = res;
    });
  }

  onSubmit() {
    if (this.shoppingForm.valid) {
      if (this.editMode === false) {
        this.shoppingListService.addIngridients(this.shoppingForm.value).subscribe(res => {
          this.ngOnInit();
          this.resetForm();
        });
      }
      else{
        this.shoppingListService.updateIngredient(this.editedIngredientId,this.shoppingForm.value).subscribe(res=>{
          this.ngOnInit();
          this.resetForm();
        })
      }
    }
  }

  onEditItem(id: number){
    this.shoppingListService.getIngridient(id).subscribe(res=>{
      this.shoppingForm.setValue({
        name: res.name,
        amount: res.amount
      })      
      this.editMode = true;
      this.editedIngredientId = res.id;
    });
  }

  resetForm(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIngredientId).subscribe(res=>{
      this.ngOnInit();
      this.resetForm();
    });
  }
  
}
