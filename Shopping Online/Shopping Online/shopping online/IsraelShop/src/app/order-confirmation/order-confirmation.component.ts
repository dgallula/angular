import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from '../../model/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  cart:Product[] = [];
  cartTemp:Product[] = [];
  totalPrice:number = 0;
  formOrder: FormGroup;
  config = {};
  error: string = '';
  orderSuccess:boolean = false;

  constructor(private shoppingService:  ShoppingService, private router: Router) {
    this.formOrder = new FormGroup({
      city: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      street: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      selectedDate: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(1), Validators.maxLength(50), Validators.required] }),
      creditCard: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(4), Validators.maxLength(50), Validators.required] })
    });
   }

  ngOnInit(): void {
    this.generateOrder();

  }

  generateOrder(){
      const currentCartId = this.shoppingService.getCurrentCartId();
      console.log("ici3");
      if (currentCartId != -1){
        this.shoppingService.getOpenCartProducts().subscribe( response => {
          console.log("response: ", response);
          if (response.success){
            console.log("Object(response.data): ", Object(response.data));
            this.cart =  Object(response.data);
            this.cartTemp =  Object(response.data);
            let arrayPrices:number[] = [];
            this.cart.map( product => arrayPrices.push(product.price! * product.quantity!));
            console.log("arrayPrices: ", arrayPrices);
            this.totalPrice = arrayPrices.reduce((total, value) => {
              console.log("total: ", total);
              console.log("value: ", value);
              return total + value;
            });
          }
          else{
          this.error = response.error;
          }
        });
    }
  }

  searchProduct(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    console.log("value: ", value);
    if (value == ""){
      this.cartTemp = this.cart
    }
    else{
      this.cartTemp = this.cart.filter(product => product.name?.toLowerCase().includes(value.toLowerCase()));
    }
  }

  onSubmitOrder(){
    console.log(this.formOrder);
    this.error = '';
    const city = this.formOrder.value.city;
    const street = this.formOrder.value.street;
    const selectedDate = this.formOrder.value.selectedDate;
    const creditCard = this.formOrder.value.creditCard;
    let fixedDate = "";
    if (selectedDate != "" && selectedDate != null){
      fixedDate = this.convertDigitIn(selectedDate);
    }
    if (this.formOrder.valid) {
      const pickedDate = new Date(fixedDate);
      const today = new Date();
      console.log('pickedDate: ', pickedDate);
      console.log('today: ', today);
    if (pickedDate > today){
      this.shoppingService.createOrder(city, street, selectedDate, creditCard, this.totalPrice).subscribe( response => {
        console.log('response: ', response);
        if (response.success){
          console.log("Object(response.data): ", Object(response.data));
          this.orderSuccess = true;
            this.router.navigate(['/success']);
        }
        else{
        this.error = response.error;
        }
      });
    }
    else{
      this.error = 'You cannot choose a date that has already passed.';
    }
    }
    else {
      console.log('here4');
      this.error = 'Some fields are not valid please verify and retry.';
    }
    this.orderSuccess = false;
  }

 convertDigitIn = (str: string) => {
    return str.split('-').reverse().join('-');
  }

}
