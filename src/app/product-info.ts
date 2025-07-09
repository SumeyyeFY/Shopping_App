import { Injectable, inject } from '@angular/core';
import { ProductProperties } from './product-properties';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  updateDataItem(id: number, updatedData: Partial<ProductProperties>): Observable<ProductProperties> {
    return this.http.put<ProductProperties>(`${this.url}/${id}`, updatedData);
  }

  getDataById(id: number): Observable<ProductProperties | undefined> {
    return this.http.get<ProductProperties[]>(this.url).pipe(
      map((items: ProductProperties[]) => items.find(item => Number(item.id) === id))
    );
  }
}
