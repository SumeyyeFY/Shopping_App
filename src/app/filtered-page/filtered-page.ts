import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterPage } from '../filter-page/filter-page';
import { ProductInfo } from '../product-info';
import { Observable, Subscription, switchMap, interval, startWith } from 'rxjs';
import { ProductProperties } from '../product-properties';
import { Product } from '../product/product';
import { browserRefreshed } from '../app';

@Component({
  selector: 'app-filtered-page',
  imports: [CommonModule, RouterModule, Product],
  templateUrl: './filtered-page.html',
  styleUrl: './filtered-page.css'
})
export class FilteredPage implements OnInit, OnDestroy {
  @Input() text: string = "";
  @Input() min: number = 0;
  @Input() max: number = 1000000;

  route: ActivatedRoute = inject(ActivatedRoute);
  intervalPeriod = 500;
  products$: Observable<ProductProperties[] | []>
  productPropertyList: ProductProperties[] = [];
  filteredResults: ProductProperties[] = [];
  subscription: Subscription;

  constructor(private router: Router, private productInfo: ProductInfo) {

    this.text = this.route.snapshot.params["text"];
    console.log("text: " + this.text);
    this.max = this.route.snapshot.params["max"];
    console.log("max: " + this.max);
    this.min = this.route.snapshot.params["min"];
    console.log("min: " + this.min);

    this.products$ = this.productInfo.getAllProductProperties();
    this.subscription = this.products$.subscribe();

    if (this.text && this.max && this.min) {

      this.subscription = this.products$.subscribe(
        (data) => {
          this.productPropertyList = data;
          console.log(data);
          this.filteredResults = [...this.productPropertyList];
          this.filteredResults = this.filteredResults.filter(product => product.name.toLowerCase().includes(this.text.toLowerCase()) &&
            product.price <= this.max && product.price > this.min && product.avaliableNumber > 0);

          console.log(this.filteredResults);
        }
      );
    }else {
      this.router.navigate(['/filter-page']);
    }

  }

  ngOnInit() {
    if (this.text && this.max && this.min) {
      this.products$ = interval(this.intervalPeriod).pipe(
        startWith(0),
        switchMap(() => this.productInfo.getAllProductProperties())
      );

      this.subscription = this.products$.subscribe(
        (data) => {
          this.productPropertyList = data;
          this.filteredResults = [...this.productPropertyList];
          this.filteredResults = this.filteredResults.filter(product => product.name.toLowerCase().includes(this.text.toLowerCase()) &&
            product.price <= this.max && product.price > this.min && product.avaliableNumber > 0);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
