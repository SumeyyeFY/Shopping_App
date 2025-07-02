import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductInfo } from '../product-info';
import { ProductProperties } from '../product-properties';
import { ChartOperations } from '../chart-operations';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo = inject(ProductInfo);
  chartOperator = inject(ChartOperations);
  productProperty: ProductProperties | undefined;

  constructor() {
    const productId = Number(this.route.snapshot.params["id"]);
    this.productProperty = this.productInfo.getProductPropertiesById(productId);
  }
}
