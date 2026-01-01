import { TestBed } from '@angular/core/testing';

import { GoldDollarConverterService } from './gold-dollar-converter.service';

describe('GoldDollarConverterService', () => {
  let service: GoldDollarConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldDollarConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
