import { TestBed } from '@angular/core/testing';

import { ErgastServiceService } from './ergast-service.service';

describe('ErgastServiceService', () => {
  let service: ErgastServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErgastServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
