import { Injectable, inject, OnInit, Input } from '@angular/core';
import { ProductProperties } from './product-properties';
import { ProductInfo } from './product-info';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartOperations implements OnInit {
  @Input() productId!: number;
  @Input() shopName!: number;
  addedProductProperties: ProductProperties[] = [];
  purchaseMap: Map<number, number>;
  productInfo: ProductInfo = inject(ProductInfo);
  numberOfProducts: number;
  chartTotal: number;
  product: ProductProperties | undefined;

  constructor() {
    this.purchaseMap = new Map<number, number>;
    this.chartTotal = 0;
    this.numberOfProducts = 0;
  }

  ngOnInit(): void {
    if (this.productId) {
      this.productInfo.getProductPropertiesById(this.productId).subscribe(
        (data) => {
          data = data;
        }
      )
    }
  }

  addToChart(id: number) {
    this.productId = id;

    if (this.productId) {
      this.productInfo.getProductPropertiesById(this.productId).subscribe(
        (data) => {
          this.product = data;

          if (this.product!.avaliableNumber > 0) {
            if (!this.addedProductProperties.find(product => product.id == id))
              this.addedProductProperties.push(this.product!);


            this.chartTotal += this.product!.price;
            this.numberOfProducts += 1;

            const prev = (this.purchaseMap.get(id) ?? 0) as number;
            this.purchaseMap.set(id, prev + 1);

            this.product!.avaliableNumber -= 1;
            this.productInfo.updateProduct(this.product!).subscribe(
              updatedUser => { }
            );
          }
          console.log(this.product?.name + " is added to chart! ");
        }
      )
    }
    this.product = undefined;
  }

  removeFromChart(id: number) {
    this.productInfo.getProductPropertiesById(id).subscribe({
      next: (data) => {
        this.product = data;

        if (this.addedProductProperties.find(productProperty => productProperty.id == id)) {
          this.chartTotal -= this.product!.price;
          this.numberOfProducts -= 1;

          const prev = (this.purchaseMap.get(id) ?? 0) as number;
          this.purchaseMap.set(id, prev - 1);

          this.product!.avaliableNumber += 1;

          if (prev <= 1) {
            this.addedProductProperties = this.addedProductProperties.filter(
              product => product !== this.addedProductProperties.find(productProperty => productProperty.id == id));
          }
          this.productInfo.updateProduct(data!).subscribe(
            updatedUser => { });

          console.log(this.product?.name + " is removed from chart! ");
          console.log("remains: " + this.product?.avaliableNumber);
        }
      }
    });
    this.product = undefined;
  }

  buyProducts() {
    //data!.avaliableNumber += (this.purchaseMap.get(data?.id!)) as number;
    this.addedProductProperties = [];
    this.chartTotal = 0;
    this.numberOfProducts = 0;
    this.purchaseMap.clear();
    console.log("All bought. ")
  }
}
