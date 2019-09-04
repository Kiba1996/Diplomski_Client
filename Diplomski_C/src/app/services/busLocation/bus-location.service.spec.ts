import { TestBed } from '@angular/core/testing';

import { BusLocationService } from './bus-location.service';

describe('BusLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusLocationService = TestBed.get(BusLocationService);
    expect(service).toBeTruthy();
  });
});
