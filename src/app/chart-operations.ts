import { Injectable, inject, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductProperties } from './product-properties';
import { ProductInfo } from './product-info';
import { Observable, Subscription, switchMap, interval, startWith, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartOperations implements OnInit, OnDestroy {
  @Input() productId!: number;
  @Input() shopName!: number;
  addedProductProperties: ProductProperties[] = [];
  addedIds: number[] = [];
  purchaseMap: Map<number, number>;
  productInfo: ProductInfo = inject(ProductInfo);
  numberOfProducts: number;
  chartTotal: number;
  products$: Observable<ProductProperties[] | []>;
  product: ProductProperties | undefined;
  subscription: Subscription;

  constructor() {
    this.purchaseMap = new Map<number, number>;
    this.chartTotal = 0;
    this.numberOfProducts = 0;
    this.products$ = this.productInfo.getAllProductProperties();

    this.subscription = this.products$.subscribe(
      (data) => {
        this.addedProductProperties = data;
        this.addedIds = Array.from(this.purchaseMap.keys());

        this.addedProductProperties = this.addedProductProperties.filter(product =>
          this.addedIds.includes(product.id));
      });
  }

  ngOnInit(): void {
    /*if (this.productId) {
      this.productInfo.getProductPropertiesById(this.productId).subscribe(
        (data) => {
          this.product = data;
        }
      )
    }*/

    this.products$ = interval(500).pipe(
      startWith(0),
      switchMap(() => this.productInfo.getAllProductProperties())
    );

    this.subscription = this.products$.subscribe(
      (data) => {
        this.addedProductProperties = data;
        this.addedIds = Array.from(this.purchaseMap.keys());

        this.addedProductProperties = this.addedProductProperties.filter(product =>
          this.addedIds.includes(product.id));
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  removeAllProducts() { //Returns back to stock
    const keys = Array.from(this.purchaseMap.keys());
    var length = keys.length;

    this.purchaseMap.forEach((quantity, id) => {
      if (id) {
        this.productInfo.getProductPropertiesById(id).subscribe(
          (data) => {
            if (data) {
              this.product = data;

              if (this.product) {
                const newNumber = this.product.avaliableNumber += quantity;

                const dataToUpdate: Partial<ProductProperties> = {
                  photo: this.product.photo,
                  name: this.product.name,
                  shop: this.product.shop,
                  price: this.product.price,
                  avaliableNumber: newNumber
                };

                var avNumAfter
                this.productInfo.updateDataItem(this.product.id, dataToUpdate).subscribe(
                  (response) => {
                    avNumAfter = response.avaliableNumber;
                  });
              }
            }
          });
      }
    });

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
