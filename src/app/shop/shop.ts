import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../product/product';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterModule, Product],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit, OnDestroy{
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo: ProductInfo = inject(ProductInfo);
  shopName: string;
  productPropertiesList: ProductProperties[] = [];
  intervalPeriod = 500;
  products$: Observable<ProductProperties[] | []>;
  shopProducts: ProductProperties[] = [];
  subscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
    this.shopName = this.route.snapshot.params["shop"];
    this.products$ = this.productInfo.getAllProductProperties();

    this.subscription = this.products$.subscribe(
      (data) => {
        //this.productPropertiesList = data;
        this.shopProducts = data;
        console.log(this.shopProducts);
        this.shopProducts = this.shopProducts.filter(data => data.shop === this.shopName);
        console.log(this.shopProducts);
      });
  }

  ngOnInit(): void {
      /*this.productInfo.getAllProductProperties().subscribe(
        (data: ProductProperties[]) => {
          this.productPropertiesList = data.filter(data => data.shop === this.shopName);
          this.cdr.detectChanges();
        }
      );*/

    this.products$ = interval(this.intervalPeriod).pipe( 
      startWith(0), 
      switchMap(() => this.productInfo.getAllProductProperties())
    );

    this.subscription = this.products$.subscribe(
      (data) => {
        //this.productPropertiesList = data;
        this.shopProducts = data;
        this.shopProducts = this.shopProducts.filter(data => data.shop === this.shopName);
      });
  }

  ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }
}
