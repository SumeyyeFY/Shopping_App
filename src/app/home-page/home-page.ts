import { Component } from '@angular/core';
import { Product } from '../product/product';
import { ProductProperties } from '../product-properties';

@Component({
  selector: 'app-home-page',
  imports: [Product],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  productPropertyList: ProductProperties[] = [
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
      "brand": "Clothingcom",
      "price": 200,
      "avaliableNumber": 1
    },
    {
      "id": 2,
      "photo": "/assets/heels.jpg",
      "name": "Heels",
      "brand": "New Shoes",
      "price": 100,
      "avaliableNumber": 1
    },
    {
      "id": 3,
      "photo": "/assets/skirt.jpg",
      "name": "Skirt",
      "brand": "Clothing com",
      "price": 200,
      "avaliableNumber": 1
    },
    {
      "id": 4,
      "photo": "C:/assets/tshirt.jpg",
      "name": "Tshirt",
      "brand": "Clothing com",
      "price": 200,
      "avaliableNumber": 1
    }
  ];
}
