import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../product/product';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterModule, Product],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo: ProductInfo = inject(ProductInfo);
  shopName: string;
  productPropertiesList: ProductProperties[] = [];

  constructor() {
    this.shopName = this.route.snapshot.params["shop"];
    this.productPropertiesList = this.productInfo.getProductPropertiesByshop(this.shopName)!;
  }
}
