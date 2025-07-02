import { TestBed } from '@angular/core/testing';

import { ChartOperations } from './chart-operations';

describe('ChartOperations', () => {
  let service: ChartOperations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartOperations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
