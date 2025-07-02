import { Injectable, inject } from '@angular/core';
import { ProductProperties } from './product-properties';
import { ProductInfo } from './product-info';

@Injectable({
  providedIn: 'root'
})
export class ChartOperations {
  addedProductPropertiess: ProductProperties[] = [];
  productInfo: ProductInfo = inject(ProductInfo);
  numberOfProducts: number;
  chartTotal: number;

  constructor() { 
    this.chartTotal = 0;
    this.numberOfProducts = 0;
  }

  addToChart(id:Number) {
    this.addedProductPropertiess.push(this.productInfo.getProductPropertiesById(id)!);
    this.chartTotal += this.productInfo.getProductPropertiesById(id)!.price;
    this.numberOfProducts += 1;
    console.log(id + " added to chart! ");
  }

  removeFromChart(id:Number) {
    console.log(id + " is removed");
    if(this.addedProductPropertiess.find(productProperty => productProperty.id === id)){
      this.chartTotal -= this.productInfo.getProductPropertiesById(id)!.price;
      this.numberOfProducts -= 1;
    }
    this.addedProductPropertiess = this.addedProductPropertiess.filter(
      product => product !== this.addedProductPropertiess.find(productProperty => productProperty.id === id));
  }

  removeAllProducts() {
    this.addedProductPropertiess = [];
    this.chartTotal = 0;
    this.numberOfProducts = 0;
    console.log("All removed")
  }
}
