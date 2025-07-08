import { Component, Input, inject, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductInfo } from '../product-info';
import { ProductProperties } from '../product-properties';
import { ChartOperations } from '../chart-operations';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit{
  @Input() productId: number;
  @ViewChild('defButton') myButtonRef!: ElementRef<HTMLButtonElement>;
  route: ActivatedRoute = inject(ActivatedRoute);
  productInfo = inject(ProductInfo);
  chartOperator = inject(ChartOperations);
  productProperty: ProductProperties | undefined;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(private renderer:Renderer2) {
    this.productId = Number(this.route.snapshot.params["id"]);
    this.productInfo.getProductPropertiesById(this.productId).subscribe({
      next: (data) => {
        this.productProperty = data
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const productId = Number(params.get('id'));
        if(productId){
          this.productInfo.getProductPropertiesById(+ productId).subscribe(
            (data) => {
              this.productProperty = data;
              this.cdr.detectChanges();
              console.log(data);
            }
          )
        }
      })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.selectRootElement(this.myButtonRef.nativeElement).click();
      console.log('Button clicked programmatically via Renderer2');
    }, 10);
  }

  onButtonClick() {
    console.log('Button was actually clicked (or programmatically triggered)');
  }
}
