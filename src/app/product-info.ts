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
      "shop": "New Shoes",
      "price": 100,
      "avaliableNumber": 10
    },
    {
      "id": 1,
      "photo": "/assets/dress.jpg",
      "name": "Dress",
      "shop": "Clothing com",
      "price": 200,
      "avaliableNumber": 5
    },
    {
      "id": 2,
      "photo": "/assets/heels.jpg",
      "name": "Heels",
      "shop": "New Shoes",
      "price": 100,
      "avaliableNumber": 7
    },
    {
      "id": 3,
      "photo": "/assets/skirt.jpg",
      "name": "Skirt",
      "shop": "Clothing com",
      "price": 200,
      "avaliableNumber": 4
    },
    {
      "id": 4,
      "photo": "/assets/tshirt.jpg",
      "name": "Tshirt",
      "shop": "Clothing com",
      "price": 200,
      "avaliableNumber": 15
    }
  ];
  constructor() { }

  getAllProductProperties() : ProductProperties[] {
    return this.productPropertiesList;
  }

  getProductPropertiesById(id: Number) : ProductProperties | undefined {
    return this.productPropertiesList.find(productProperty => productProperty.id === id);
  }

  getProductPropertiesByshop(shop: string) : ProductProperties[] | undefined {
    return this.productPropertiesList.filter(
      product => product?.shop.toLowerCase().includes(shop.toLowerCase())
    );
  }
}
