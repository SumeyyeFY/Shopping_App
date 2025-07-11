import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPage } from './filter-page';

describe('FilterPage', () => {
  let component: FilterPage;
  let fixture: ComponentFixture<FilterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
