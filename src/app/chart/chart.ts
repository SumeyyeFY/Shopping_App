import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductProperties } from '../product-properties';
import { ProductInfo } from '../product-info';
import { Product } from '../product/product';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, Product],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart {
  addedProductPropertiess: ProductProperties[] = [
    {
      "id": 0,
      "photo": "/assets/sneakers.jpg",
      "name": "Sneakers",
      "brand": "New Shoes",
      "price": 100,
      "avaliableNumber": 1
    },
    {
      "id": 1,
      "photo": "/assets/dress.jpg",
      "name": "Dress",
      "brand": "Clothing com",
      "price": 200,
      "avaliableNumber": 1
    }
  ];
  productInfo: ProductInfo = inject(ProductInfo);
}
