import { Component, Input , inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { ProductProperties } from '../product-properties';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartOperations } from '../chart-operations';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit{
  @Input() productProperties!:ProductProperties;
  chartOperator: ChartOperations = inject(ChartOperations);
  chartSubscription!: Subscription;
  quatityInChart: number = 0;

  constructor(public cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }
}
