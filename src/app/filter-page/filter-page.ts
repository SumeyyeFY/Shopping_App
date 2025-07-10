import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { ProductProperties } from '../product-properties';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';
import { ProductInfo } from '../product-info';

@Component({
  selector: 'app-filter-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './filter-page.html',
  styleUrl: './filter-page.css'
})
export class FilterPage {
  intervalPeriod: number;
  products$: Observable<ProductProperties[] | []>
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];
  subscription: Subscription;

  constructor(private router: Router, private productInfo: ProductInfo) {
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

  filterResults(text: string = "", max: number=100000, min: number=0) {
    if(!text) this.filteredResults = this.productPropertyList;

    this.filteredResults = this.productPropertyList.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase()));

    this.filteredResults = this.productPropertyList.filter(
      product => product?.price < max && product?.price > min);
    
    console.log(text + " filtered");

      this.router.navigate(['/filtered-page']);
  } 

}
