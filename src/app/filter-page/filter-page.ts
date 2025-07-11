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
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];
  text: string = "";
  max:number = 10000;
  min:number = 0;

  constructor(private router: Router, private productInfo: ProductInfo) {}

  filterResults(text = "", max=10000, min=0) {
    this.text = text;

    if(max===0)
      max = 10000;

    this.max = max;
    this.min = min;

    if(!this.router.navigate(['/filtered-page', this.text, this.max, this.min])){
      this.router.navigate(['/']);
    }
  } 

}
