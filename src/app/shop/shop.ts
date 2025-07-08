import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class Shop implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo: ProductInfo = inject(ProductInfo);
  shopName: string;
  productPropertiesList: ProductProperties[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.shopName = this.route.snapshot.params["shop"];
  }

  ngOnInit(): void {
      this.productInfo.getAllProductProperties().subscribe(
        (data: ProductProperties[]) => {
          this.productPropertiesList = data.filter(data => data.shop === this.shopName);
          this.cdr.detectChanges();
        }
      )
  }
}
