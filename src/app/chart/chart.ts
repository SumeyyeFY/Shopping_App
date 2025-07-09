import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class Chart implements OnInit{
  chartOperator: ChartOperations = inject(ChartOperations);
  addedProductProperties: ProductProperties[] = [];
  addedIds: number[] = [];
  chartTotal: number;
  numberOfProducts: number;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    this.addedProductProperties = this.chartOperator.addedProductProperties;
  }

  ngOnInit(): void {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    this.addedProductProperties = this.chartOperator.addedProductProperties;
      this.cdr.detectChanges();  
  }
}
