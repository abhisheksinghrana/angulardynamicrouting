import { TestBed, inject } from '@angular/core/testing';

import { RouteGeneratorService } from './route-generator.service';

describe('RouteGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteGeneratorService]
    });
  });

  it('should be created', inject([RouteGeneratorService], (service: RouteGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
