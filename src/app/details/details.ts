import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo } from '../product-info';
import { ProductProperties } from '../product-properties';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo = inject(ProductInfo);
  productProperty: ProductProperties | undefined;

  constructor() {
    const productId = Number(this.route.snapshot.params["id"]);
    this.productProperty = this.productInfo.getProductPropertiesById(productId);
  }
}
