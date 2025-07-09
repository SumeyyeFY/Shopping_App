import { Injectable, inject, OnInit, Input } from '@angular/core';
import { ProductProperties } from './product-properties';
import { ProductInfo } from './product-info';
import { Observable, switchMap, map, forkJoin } from 'rxjs';

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
          this.product = data;
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

  /**
   * Adds quantities from a Map (productId -> quantityToReturn) back to product stock.
   *
   * @param itemsToReturn A Map where key is productId and value is the quantity to add back.
   * @returns An Observable that completes when all updates are processed.
   */
  addQuantitiesToStock(): Observable<ProductProperties[]> {
    const updateObservables: Observable<ProductProperties | undefined>[] = [];

    this.purchaseMap.forEach((quantityToReturn, productId) => {
      const updateObservable = this.productInfo.getProductPropertiesById(productId).pipe(
        switchMap(product => {
          if (product) {
            const newQuantity = product.avaliableNumber + quantityToReturn;
            const updatedProduct: ProductProperties = { ...product, avaliableNumber: newQuantity };
            return this.productInfo.updateProduct(updatedProduct);
          } else {
            console.warn(`Product with ID ${productId} not found. Cannot add quantity back to stock.`);
            return new Observable<ProductProperties | undefined>(observer => {
              observer.next(undefined);
              observer.complete();
            });
          }
        })
      );
      updateObservables.push(updateObservable);
    });

    console.log("cleared");
    return forkJoin(updateObservables).pipe(
      map(results => results.filter(p => p !== undefined) as ProductProperties[]) // Filter out undefined results
    );
  }

  removeAllProducts() { //Returns back to stock
    const keys = Array.from(this.purchaseMap.keys());
    var length = keys.length;

    this.purchaseMap.forEach((quantity, id) => {
      if (id) {
        console.log("id: " + id);
        console.log("quantity: " + quantity);
        this.productInfo.getProductPropertiesById(id).subscribe(
          (data) => {
            if (data) {
              this.product = data;
              console.log("data: " + data);
              console.log("product: " + this.product);

              if (this.product) {
                console.log("avNum befotre: " + this.product.avaliableNumber);
                console.log("quantity: " + quantity);
                const newNumber = this.product.avaliableNumber += quantity;
                console.log("avNum after: " + this.product.avaliableNumber);

                const dataToUpdate: Partial<ProductProperties> = {
                  avaliableNumber: newNumber
                };

                var avNumAfter
                this.productInfo.updateDataItem(this.product.id, dataToUpdate).subscribe(
                  (response) => {
                    avNumAfter = response.avaliableNumber;
                    console.log("updated: " + avNumAfter);
                  }
                )
              }
            }
          }
        )
      }
    })

    this.addedProductProperties = [];
    this.chartTotal = 0;
    this.numberOfProducts = 0;
    this.purchaseMap.clear();
    console.log("All removed");

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
