import { Injectable } from '@angular/core';
import { ProductProperties } from './product-properties';

@Injectable({
  providedIn: 'root'
})
export class ProductInfo {
  protected productPropertiesList: ProductProperties[] = [
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
      "photo": "/assets/tshirt.jpg",
      "name": "Tshirt",
      "brand": "Clothing com",
      "price": 200,
      "avaliableNumber": 1
    }
  ];
  constructor() { }

  getAllProductProperties() : ProductProperties[] {
    return this.productPropertiesList;
  }

  getProductPropertiesById(id: Number) : ProductProperties | undefined {
    return this.productPropertiesList.find(productProperty => productProperty.id === id);
  }
}
