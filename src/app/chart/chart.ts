import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { Product } from '../product/product';
import { ChartOperations } from '../chart-operations';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, Product, RouterModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart {
  chartOperator: ChartOperations = inject(ChartOperations);
  addedProductProperties: ProductProperties[] = [];
  chartTotal: Number;
  numberOfProducts: Number;

  constructor() {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    this.addedProductProperties = this.chartOperator.addedProductProperties;
  }
}
