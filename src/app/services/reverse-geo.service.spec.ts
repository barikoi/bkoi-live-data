import { TestBed } from '@angular/core/testing';

import { ReverseGeoService } from './reverse-geo.service';

describe('ReverseGeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReverseGeoService = TestBed.get(ReverseGeoService);
    expect(service).toBeTruthy();
  });
});
