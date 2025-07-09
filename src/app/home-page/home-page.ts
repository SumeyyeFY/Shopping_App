import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product/product';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, Product, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit, OnDestroy{
  intervalPeriod: number;
  products$: Observable<ProductProperties[] | []>
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];
  subscription: Subscription;

  constructor(private productInfo: ProductInfo, private cdr: ChangeDetectorRef) {
    this.intervalPeriod = 500;
    this.products$ = this.productInfo.getAllProductProperties();

    this.subscription = this.products$.subscribe(
      (data) => {
        this.productPropertyList = data;
        this.filteredResults = [...this.productPropertyList];
        this.filteredResults = this.filteredResults.filter(product => product.avaliableNumber > 0);
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
        this.filteredResults = this.filteredResults.filter(product => product.avaliableNumber > 0);
      });
  }

  ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }

  filterResults(text: string) {
    if(!text) this.filteredResults = this.productPropertyList;

    this.filteredResults = this.productPropertyList.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase()));
    
    console.log(text + " filtered");
  } 

  filterByRange(max: number, min: number=0){
    this.filteredResults = this.productPropertyList.filter(
      product => product?.price < max && product?.price > min)
  }
}