import { Component, Input } from '@angular/core';
import { ProductProperties } from '../product-properties';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  @Input() productProperties!:ProductProperties;
  constructor() {}
}
