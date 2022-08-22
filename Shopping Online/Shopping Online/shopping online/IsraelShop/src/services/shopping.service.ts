import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, EMPTY, Subject } from 'rxjs';
import { Product } from '../model/Product';
import { Res } from '../model/Res';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  currentCartId: number = -1;

  constructor(private http: HttpClient, private authService: AuthService) { }

  createPoduct(product:Product): Observable<Res>{
    return this.http.post<Res>('http://localhost:3000/api/createproduct', product)
  }

  updatePoduct(product:Product): Observable<Res>{
    return this.http.post<Res>('http://localhost:3000/api/updateproduct', product)
  }

  getAllProducts() {
    return this.http.get<Res>('http://localhost:3000/api/getallproducts')
  }

  getProductByCategoryId(productId: number) {
    const data = {id: productId};
    return this.http.get<Res>('http://localhost:3000/api/getproductsbycategoryid', {params: data})
  }

  createNewCart(): Observable<Res>{
    const data = {id: this.authService.getUserData().id};
    return this.http.post<Res>('http://localhost:3000/api/createnewcart', data)
  }

  addProductToCurrentCart(selectedProduct:Product, currentCartId:number, quantity:number): Observable<Res>{
    const data = {cart_id: currentCartId, product: selectedProduct, quantity: quantity};
    return this.http.post<Res>('http://localhost:3000/api/addproducttoCurrentcart', data)
  }

  checkIfOpenCartExist(){
    console.log("this.authService.getUserData().id: ", this.authService.getUserData().id)
    const data = {userId: this.authService.getUserData().id};
    return this.http.get<Res>('http://localhost:3000/api/checkifopencartexist', {params: data})
  }

  getOpenCartProducts(){
    const data = {cartId: this.getCurrentCartId()};
    return this.http.get<Res>('http://localhost:3000/api/getopencartproducts', {params: data})
  }

  getNumberOfOrders(){
    return this.http.get<Res>('http://localhost:3000/api/getnumberoforders')
  }

  getNumberProductsInStore(){
    return this.http.get<Res>('http://localhost:3000/api/getnumberproductsinstore')
  }

  createOrder(city:string, street:string, selectedDate:Date, creditCard:string, totalPrice:number): Observable<Res>{
    const data = {
      cart_id: this.getCurrentCartId(),
      userId: this.authService.getUserData().id,
      city: city,
      street: street,
      selectedDate: selectedDate,
      creditCard: creditCard,
      totalPrice: totalPrice };
    return this.http.post<Res>('http://localhost:3000/api/createorder', data)
  }

  searchProductByName(productnameSearch:string){
    const data = {productName: productnameSearch};
    return this.http.get<Res>('http://localhost:3000/api/searchproductbyName', {params: data})
  }

  removeProductFromCart(selectedProduct:Product): Observable<Res>{
    const data = {cart_id: this.getCurrentCartId(), productId: selectedProduct.id};
    return this.http.post<Res>('http://localhost:3000/api/removeproductfromcart', data)
  }

  saveCurrentCartId(id:number){
    console.log('id: ', id);
    this.currentCartId = id;
    // sessionStorage.setItem("currentCartId", String(id));
    // this.userData.next(data);
  }

  getCurrentCartId(): number {
    return this.currentCartId;
    // let data = sessionStorage.getItem("currentCartId")!;
    // if (data) {
    //   console.log('Number(data): ', Number(data));
    //   return Number(data);
    // }
    // return -1
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error instanceof ErrorEvent) {
      errorMessage = `Error: ${errorRes.error.message}`;
    } else {
      errorMessage = `Error Code: ${errorRes.status}\nMessage: ${errorRes.message}`;
    }
    window.alert('An error occurred while retrieving the recipes.');
    return throwError(errorMessage);
  }
}
