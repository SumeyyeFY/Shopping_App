import { Component, inject } from '@angular/core';
import { Product } from '../product/product';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';
import { Chart } from "../chart/chart";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, Product, Chart, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  productPropertyList: ProductProperties[] = [];
  productInfo: ProductInfo = inject(ProductInfo);
  filteredResults: ProductProperties[] = [];

  constructor() {
    this.productPropertyList = this.productInfo.getAllProductProperties();
    this.filteredResults = this.productPropertyList;
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
