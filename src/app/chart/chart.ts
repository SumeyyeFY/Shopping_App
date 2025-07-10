import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { Product } from '../product/product';
import { ChartOperations } from '../chart-operations';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';
import { ProductInfo } from '../product-info';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, Product, RouterModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart implements OnInit, OnDestroy{
  intervalPeriod = 500;
  chartOperator: ChartOperations = inject(ChartOperations);
  productInfo: ProductInfo = inject(ProductInfo);
  addedProductProperties: ProductProperties[] | undefined;
  addedIds: number[] = [];
  chartTotal: number;
  products$: Observable<ProductProperties[] | []>;
  numberOfProducts: number;
  subscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    this.addedProductProperties = this.chartOperator.addedProductProperties;
    this.addedIds = this.chartOperator.addedIds;

    this.products$ = this.productInfo.getAllProductProperties();

    this.subscription = this.products$.subscribe(
      (data) => {
        this.addedProductProperties = data;
        this.addedIds = Array.from(this.chartOperator.purchaseMap.keys());

        this.addedProductProperties = this.addedProductProperties.filter(product =>
          this.addedIds.includes(product.id));

      });
  }

  ngOnInit(): void {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    this.addedProductProperties = this.chartOperator.addedProductProperties;
    this.addedIds = Array.from(this.chartOperator.purchaseMap.keys());
    
    this.products$ = interval(this.intervalPeriod).pipe(
      startWith(0),
      switchMap(() => this.productInfo.getAllProductProperties())
    );

    this.subscription = this.products$.subscribe(
      (data) => {
        this.addedProductProperties = data;
        this.addedIds = Array.from(this.chartOperator.purchaseMap.keys());

        this.addedProductProperties = this.addedProductProperties.filter(product =>
          this.addedIds.includes(product.id));
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
