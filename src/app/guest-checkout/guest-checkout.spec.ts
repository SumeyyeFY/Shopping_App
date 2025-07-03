import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckout } from './guest-checkout';

describe('GuestCheckout', () => {
  let component: GuestCheckout;
  let fixture: ComponentFixture<GuestCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
