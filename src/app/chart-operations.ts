import { Injectable, inject } from '@angular/core';
import { ProductProperties } from './product-properties';
import { ProductInfo } from './product-info';

@Injectable({
  providedIn: 'root'
})
export class ChartOperations {
  addedProductProperties: ProductProperties[] = [];
  purchaseMap: Map<Number, Number>;
  productInfo: ProductInfo = inject(ProductInfo);
  numberOfProducts: number;
  chartTotal: number;

  constructor() {
    this.purchaseMap = new Map<Number, number>;
    this.chartTotal = 0;
    this.numberOfProducts = 0;
  }

  addToChart(id: Number) {
    if (this.productInfo.getProductPropertiesById(id)!.avaliableNumber > 0) {
      if (!this.addedProductProperties.find(product => product.id === id))
        this.addedProductProperties.push(this.productInfo.getProductPropertiesById(id)!);
      
      this.chartTotal += this.productInfo.getProductPropertiesById(id)!.price;
      this.numberOfProducts += 1;

      const prev = (this.purchaseMap.get(id) ?? 0) as number;
      this.purchaseMap.set(id, prev + 1);

      this.productInfo.getProductPropertiesById(id)!.avaliableNumber -= 1;
      console.log(id + " added to chart! ");
      console.log("current num of purchases: " + this.purchaseMap.get(id));
    }
  }

  removeFromChart(id: Number) {
    if (this.addedProductProperties.find(productProperty => productProperty.id === id)) {
      console.log(id + " is found for removal")
      this.chartTotal -= this.productInfo.getProductPropertiesById(id)!.price;
      this.numberOfProducts -= 1;

      const prev = (this.purchaseMap.get(id) ?? 0) as number;
      this.purchaseMap.set(id, prev - 1);

      this.productInfo.getProductPropertiesById(id)!.avaliableNumber += 1;

      if (prev <= 1) {
      this.addedProductProperties = this.addedProductProperties.filter(
        product => product !== this.addedProductProperties.find(productProperty => productProperty.id === id));
      }
      console.log(id + " is removed: " + (prev - 1));
    }
  }

  removeAllProducts() {
    this.addedProductProperties = [];
    this.chartTotal = 0;
    this.numberOfProducts = 0;
    this.purchaseMap.clear();
    console.log("All removed")
  }
}
