import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  cart:Product[] = [];
  totalPrice:number = 0;

  constructor(private shoppingService:  ShoppingService) { }

  ngOnInit(): void {
    this.generateOrder();
  }

  generateOrder(){
    const currentCartId = this.shoppingService.getCurrentCartId();
    console.log("ici2");
    if (currentCartId != -1){
      this.shoppingService.getOpenCartProducts().subscribe( response => {
        console.log("response: ", response);
        if (response.success){
          console.log("Object(response.data): ", Object(response.data));
          this.cart =  Object(response.data);
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
        // this.error = response.error;
        }
      });
  }
}

saveData = ( () => {
  let a = document.createElement("a");
  document.body.appendChild(a);
  return  (data:Product[], fileName:string) => {

  let textFormat = Object.entries(data).map(([key, val]) => {
    return Object.entries(val).map(([key, value]) => {
      console.log("key: ", key);
      console.log("value: ", value);
     return  key + ':' + value;
    });
  } )
  .join('\n\n');

  textFormat += '\n\n';
  textFormat += 'Total Price: ' + String(this.totalPrice) + '₪';

  var json = textFormat,
          blob = new Blob([json], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
          console.log("JSON.stringify(data): ", JSON.stringify(data));
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
})();

  download() {
    this.saveData(this.cart, "my-receipt.txt");
  }

}
