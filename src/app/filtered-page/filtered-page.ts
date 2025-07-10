import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterPage } from '../filter-page/filter-page';
import { ProductInfo } from '../product-info';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';
import { ProductProperties } from '../product-properties';
import { Product } from '../product/product';

@Component({
  selector: 'app-filtered-page',
  imports: [CommonModule, RouterModule, Product],
  templateUrl: './filtered-page.html',
  styleUrl: './filtered-page.css'
})
export class FilteredPage implements OnInit, OnDestroy{
  @Input() filter!: string;
  @Input() min!: number;
  @Input() max!: number;

  route: ActivatedRoute = inject(ActivatedRoute);
  intervalPeriod = 500;
  products$: Observable<ProductProperties[] | []>
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];
  subscription: Subscription;

  constructor(private productInfo: ProductInfo) {
    this.filter = this.route.snapshot.params["filter"];
    this.min = this.route.snapshot.params["min"];
    this.max = this.route.snapshot.params["max"];

    this.products$ = this.productInfo.getAllProductProperties();

    this.subscription = this.products$.subscribe(
      (data) => {
        this.productPropertyList = data;
        this.filteredResults = [...this.productPropertyList];
        this.filteredResults = this.filteredResults.filter(product => 
          product.avaliableNumber > 0 && product.name.includes(this.filter) &&
          product.price > this.min && product.price < this.max);
      });
  }

  ngOnInit(){
    this.products$ = interval(this.intervalPeriod).pipe(
      startWith(0),
      switchMap(() => this.productInfo.getAllProductProperties())
    );

    this.subscription = this.products$.subscribe(
      (data) => {
        this.productPropertyList = data;
        this.filteredResults = [...this.productPropertyList];
        this.filteredResults = this.filteredResults.filter(product => 
          product.avaliableNumber > 0 && product.name.includes(this.filter) &&
          product.price > this.min && product.price < this.max);
      });
  }

  ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }
}
