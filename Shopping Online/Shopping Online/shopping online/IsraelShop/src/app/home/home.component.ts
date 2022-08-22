import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ShoppingService } from '../../services/shopping.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  showForm: Boolean = true;
  loginSuccess: Boolean = false;
  loginFailure: Boolean = false;
  error: string = '';
  showStartShopping: Boolean = true;
  currentCartDate = Date();
  numberOfOrders: number = 0;
  numberProductsInStore: number = 0;
  userIsAuthenticate:boolean = false;
  userIsAdmin:boolean = false;

  constructor(private authService: AuthService, private shoppingService:  ShoppingService) {
    this.form = new FormGroup({
      id: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] }),
      password: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(50), Validators.required] })
    });
   }

  ngOnInit(): void {
    if(this.authService.userIsAuthenticate()){
      this.showForm = false;
      this.loginSuccess = true;
      this.checkIfOpenCartExist();
    }
    else{
      this.showForm = true;
      this.loginSuccess = false;
    };
    this.getNumberOfOrders();
    this.getNumberProductsInStore();
  }

  onSubmit() {
    console.log(this.form);
    this.error = '';
    const id = this.form.value.id;
    const password = this.form.value.password;

    if (this.form.valid) {
        this.authService.login(id,password).subscribe( response => {
          console.log("response: ", response);
          if (response.success){
            const user:User = Object(response.data);
            this.authService.saveUserData(user);
            this.error = '';
            this.loginSuccess = true;
            this.loginFailure = false;
            this.showForm = false;
            console.log("this.authService.userIsAdmin(): ", this.authService.userIsAdmin());
            this.userIsAdmin = this.authService.userIsAdmin();
            this.checkIfOpenCartExist();
          }
          else{
           this.error = response.error;
           this.loginFailure = true;
          }
        });
    }
    else {
      this.error = 'Some fields are not valid please verify and retry.';
      this.loginFailure = true;
    }
  }

  createNewCart(){
    this.shoppingService.createNewCart().subscribe( response => {
        console.log("response: ", response);
        if (response.success){
          const createdId = Object(response.data)["createdId"];
          this.shoppingService.saveCurrentCartId(createdId);
        }
        else{
         this.error = response.error;
         this.loginFailure = true;
        }
      });
  }

  checkIfOpenCartExist(){
    console.log("this.checkIfOpenCartExist() 22");
    this.shoppingService.checkIfOpenCartExist().subscribe( response => {
      console.log("this.checkIfOpenCartExist() 33");
      console.log("response: ", response);
      if (response.success){
        console.log("response.data: ", response.data);
        this.showStartShopping = false;
        const id = Object(response.data)["id"];
        console.log("id: ", id);
        this.currentCartDate = Object(response.data)["creationdate"];
        console.log("Number(response.data): ", id);
        this.shoppingService.saveCurrentCartId(id);
        //display popup
      }
      else{
        if (response.error === 'no open cart exist.'){
          this.createNewCart()
        }
      //  this.error = response.error;
      //  this.loginFailure = true;
       this.showStartShopping = true;
      }
    });
  }

  getNumberOfOrders(){
    this.shoppingService.getNumberOfOrders().subscribe( response => {
      console.log("response: ", response);
      if (response.success){
        this.numberOfOrders = Number(response.data);
      }
      else{
        }
    });
  }

  getNumberProductsInStore(){
    this.shoppingService.getNumberProductsInStore().subscribe( response => {
      console.log("response: ", response);
      if (response.success){
        this.numberProductsInStore = Number(response.data);
      }
      else{
        }
    });
  }

}
