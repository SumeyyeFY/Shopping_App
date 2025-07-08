import { Injectable, inject } from '@angular/core';
import { ProductProperties } from './product-properties';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInfo {
  url = "http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  getAllProductProperties() : Observable<ProductProperties[]> {
    return this.http.get<ProductProperties[]>(this.url);
  }

  getProductPropertiesById(id: number) : Observable<ProductProperties | undefined> {
    return this.http.get<ProductProperties | undefined>(`${this.url}/${id}`);
  }

  updateProduct(product: ProductProperties) : Observable<ProductProperties | undefined> {
    return this.http.put<ProductProperties>(`${this.url}/${product.id}`, product);
  }
}
