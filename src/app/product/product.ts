import { Component, Input } from '@angular/core';
import { ProductProperties } from '../product-properties';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  @Input() productProperties!:ProductProperties;
}
