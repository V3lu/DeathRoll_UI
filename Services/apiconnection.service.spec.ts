import { TestBed } from '@angular/core/testing';

import { APIConnectionService } from './apiconnection.service';

describe('APIConnectionService', () => {
  let service: APIConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
