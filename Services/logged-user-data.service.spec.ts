import { TestBed } from '@angular/core/testing';

import { LoggedUserDataService } from './logged-user-data.service';

describe('LoggedUserDataService', () => {
  let service: LoggedUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
