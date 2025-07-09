import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductInfo } from '../product-info';
import { ProductProperties } from '../product-properties';
import { ChartOperations } from '../chart-operations';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit, OnDestroy{
  @Input() productId: number;
  intervalPeriod = 500;
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo = inject(ProductInfo);
  chartOperator = inject(ChartOperations);
  product$: Observable<ProductProperties | undefined>;
  productProperty: ProductProperties | undefined;
  dataSubscription: Subscription;

  constructor() {
    this.productId = Number(this.route.snapshot.params["id"]);
    this.product$ = this.productInfo.getDataById(this.productId);

    this.dataSubscription = this.product$.subscribe(
      (data) => {
      this.productProperty = data;
    });
  }

  ngOnInit(): void {
    this.product$ = interval(this.intervalPeriod).pipe( 
      startWith(0), 
      switchMap(() => this.productInfo.getDataById(this.productId))
    );

    this.dataSubscription = this.product$.subscribe(
      (data) => {
      this.productProperty = data;
    });
  }

  ngOnDestroy(): void {
      if (this.dataSubscription) {
        this.dataSubscription.unsubscribe();
    }
  }
}
