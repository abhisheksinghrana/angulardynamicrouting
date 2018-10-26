import { TestBed, inject } from '@angular/core/testing';

import { RequestTypeService } from './request-type.service';

describe('RequestTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestTypeService]
    });
  });

  it('should be created', inject([RequestTypeService], (service: RequestTypeService) => {
    expect(service).toBeTruthy();
  }));
});
