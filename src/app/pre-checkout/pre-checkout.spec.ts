import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCheckout } from './pre-checkout';

describe('PreCheckout', () => {
  let component: PreCheckout;
  let fixture: ComponentFixture<PreCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
