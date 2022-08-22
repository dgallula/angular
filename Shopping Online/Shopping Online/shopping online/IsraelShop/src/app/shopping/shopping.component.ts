import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal!: ElementRef;

  formProduct: FormGroup;
  error: string = '';
  isAdmin:Boolean = false;
  cart:Product[] = [];
  productList:Product[] = [];
  showForm:Boolean = false;
  productCreationSuccess: Boolean = false;
  isUpdatingMode:Boolean = false;
  totalPrice:number = 0;
  selectedProduct: Product = {};
  formQuantity: FormGroup;
  formSearch: FormGroup;


  constructor(private authService: AuthService, private shoppingService:  ShoppingService, private elementRef:ElementRef) {
    this.formProduct = new FormGroup({
      productname: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      productid: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      productprice: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      picture: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      category: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.formQuantity = new FormGroup({
      quantity: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.formSearch = new FormGroup({
      search: new FormControl(null, { updateOn: 'blur'})
    });
  }

  ngOnInit(): void {
    this.error = '';
    let userData = this.authService.getUserData();
    if (userData.id != ""){
      if (userData.role === 1){
        this.isAdmin = true;
      }
      else{
        this.isAdmin = false;
      }
    }
    else{
      //ask for re connexion
    }
    this.getOpenCartProducts();
    this.getAllProducts();
  }

  getAllProducts(){
    this.shoppingService.getAllProducts().subscribe( response => {
      console.log("response: ", response);
      if (response.success){
        this.productList = Object(response.data);
      }
    });
  }

  displayFormProduct(){
    console.log('displayFormProduct');
    this.showForm = true;
    this.productCreationSuccess = false;
    this.isUpdatingMode = false;
    this.formProduct.reset();
    console.log('this.showForm: ', this.showForm);
  }

  onSubmitForm() {
    console.log(this.formProduct);
    this.error = '';
    const productname = this.formProduct.value.productname;
    const productid = this.formProduct.value.productid;
    const productprice = this.formProduct.value.productprice;
    const picture = this.formProduct.value.picture;
    const category = this.formProduct.value.category;

    if (this.formProduct.valid) {
      console.log('here1');
      console.log("productname: ", productname);
      console.log("productid: ", productid);
      console.log("productprice: ", productprice);
      console.log("picture: ", picture);
      console.log("category: ", category);
        this.error = '';
        const newproduct:Product = {
          id: productid,
          name: productname,
          price: productprice,
          img: picture,
          category_id: category}

      if (this.isUpdatingMode){
        this.shoppingService.updatePoduct(newproduct).subscribe( response => {
          console.log("response 1111: ", response);
          if (response.success){
            this.productCreationSuccess = true;
            this.showForm = false
            this.formProduct.reset();
            this.getAllProducts();
          }
          else{
            this.error = 'Something went wrong thank you to retry.';
            return
          }
        });
      }
      else{
        this.shoppingService.createPoduct(newproduct).subscribe( response => {
          console.log("response 1111: ", response);
          if (response.success){
            this.productCreationSuccess = true;
            this.showForm = false
            this.formProduct.reset();
            this.getAllProducts();
          }
          else{
            this.error = 'Some fields are not valid please verify and retry.';
            return
          }
        });
      }
    }
    else {
      console.log('here4');
      this.error = 'Some fields are not valid please verify and retry.';
    }
    this.productCreationSuccess = false;
  }

  getProductByCategoryId(categoryId: number){
    this.shoppingService.getProductByCategoryId(categoryId).subscribe( response => {
      console.log("response 1111: ", response);
      if (response.success){
       this.productList = Object(response.data);
      }
    });
  }

  selectProduct(product: Product){
    // console.log('index: ', index);
    if (product){
      this.isUpdatingMode = true;
      const selectedProduct = product;
      console.log('selectedProduct: ', selectedProduct);
      this.showForm = true;
      this.formProduct.setValue({
        productname: selectedProduct.name,
        productid: selectedProduct.id,
        productprice: selectedProduct.price,
        picture: selectedProduct.img,
        category: selectedProduct.category_id
      });
  }
  }

  addProductToCart(){
    console.log("this.formProduct: ", this.formQuantity);
    const quant = this.formQuantity.value.quantity;
    const quantity = Number(quant)

    if (this.formQuantity.valid) {

      console.log('here1');
      console.log('quantity: ', quantity);
      console.log('this.selectedProduct: ', this.selectedProduct);
      if(this.isNumber(quantity) && this.selectedProduct) {
        console.log('isNumber');
      const currentCartId = this.shoppingService.getCurrentCartId();
      this.shoppingService.addProductToCurrentCart(this.selectedProduct, currentCartId, quantity).subscribe( response => {
        console.log("response 1111: ", response);
        if (response.success){
        if (this.selectedProduct.price){
          this.getOpenCartProducts();
          this.totalPrice = this.totalPrice + (this.selectedProduct.price * quantity);
        }
        console.log('this.cart: ', this.cart);
        this.formQuantity.reset();
        }
        else{
         this.error = response.error;
        //  this.loginFailure = true;
        }
      });
  }
}
this.modal.nativeElement.style.display = 'none';
  }

  getOpenCartProducts(){
    console.log("ici1");
    const currentCartId = this.shoppingService.getCurrentCartId();
    console.log("currentCartId: ", currentCartId);
    if (currentCartId != -1){
      this.shoppingService.getOpenCartProducts().subscribe( response => {
        console.log("response: ", response);
        if (response.success){
          console.log("Object(response.data): ", Object(response.data));
          this.cart =  Object(response.data);
          let arrayPrices:number[] = [];
          this.cart.map( product => arrayPrices.push(product.totalPrice!));
          console.log("arrayPrices: ", arrayPrices);
          this.totalPrice = arrayPrices.reduce((total, value) => {
            console.log("total: ", total);
            console.log("value: ", value);
            return total + value;
          });
        }
        else{
        // this.error = response.error;
        //  this.loginFailure = true;
        }
      });
  }
  }

  open(product: Product) {
    console.log('in open');
    this.selectedProduct = product;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    console.log('in close');
    this.selectedProduct = {};
    this.modal.nativeElement.style.display = 'none';
    this.formQuantity.reset();
  }

  isNumber = (value: string | number): boolean =>
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

searchProductByName(){
  this.error = '';
  console.log("this.formSearch: ", this.formSearch);
  const productNameSearch = this.formSearch.value.search;
  console.log("productNameSearch : ", productNameSearch);

  if (this.formSearch.valid) {
    this.shoppingService.searchProductByName(productNameSearch).subscribe( response => {
      console.log("response: ", response);
      if (response.success){
        console.log("response.data: ", response.data);
        console.log("Object(response.data);: ", Object(response.data));
        this.productList = Object(response.data);
      this.formSearch.reset();
      }
      else{
       this.error = response.error;
      }
    });
  }
}

removeProductFromCart(product:Product){
  this.shoppingService.removeProductFromCart(product).subscribe( response => {
    console.log("response: ", response);
    if (response.success){
      this.getOpenCartProducts();
    }
    else{
      this.error = response.error;
     }
  });
 }

}
