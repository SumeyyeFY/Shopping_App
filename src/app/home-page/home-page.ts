import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product/product';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';
import { Chart } from "../chart/chart";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, Product, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit{
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];

  constructor(private productInfo: ProductInfo, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(){
    this.productInfo.getAllProductProperties().subscribe(
      (data) => {
        this.productPropertyList = data;
        this.filteredResults = [...this.productPropertyList];
        this.filteredResults = this.filteredResults.filter(product => product.avaliableNumber > 0);
        this.cdr.detectChanges();
      }
    )
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