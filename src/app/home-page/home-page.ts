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

  constructor() {
    this.productPropertyList = this.productInfo.getAllProductProperties();
  }
}
