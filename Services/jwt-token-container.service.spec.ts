import { TestBed } from '@angular/core/testing';
import { JwtTokenContainerService } from './jwt-token-container.service';

describe('JwtTokenCOntainerService', () => {
  let service: JwtTokenContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtTokenContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
