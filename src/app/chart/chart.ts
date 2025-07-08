import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
export class Chart{
  chartOperator: ChartOperations = inject(ChartOperations);
  //addedProductProperties: ProductProperties[] = [];
  chartTotal: number;
  numberOfProducts: number;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartTotal = this.chartOperator.chartTotal;
    this.numberOfProducts = this.chartOperator.numberOfProducts;
    //this.addedProductProperties = this.chartOperator.addedProductProperties;
  }

  removeAllProducts() { //Returns back to stock
    const keyIterator = this.chartOperator.purchaseMap.keys();
    for (const id of keyIterator) {
      var quantity = (this.chartOperator.purchaseMap.get(id)) as number;
      for (var i = quantity; i > 0; i--){
        this.chartOperator.removeFromChart(id);
        this.cdr.detectChanges(); 
      }
    } 
    this.chartOperator.addedProductProperties = [];
    this.chartOperator.chartTotal = 0;
    this.chartOperator.numberOfProducts = 0;
    this.chartOperator.purchaseMap.clear();
    console.log("All removed");
  }
}
