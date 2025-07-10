import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredPage } from './filtered-page';

describe('FilteredPage', () => {
  let component: FilteredPage;
  let fixture: ComponentFixture<FilteredPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
