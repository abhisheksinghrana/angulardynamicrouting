import { TestBed, inject } from '@angular/core/testing';

import { TimeWorklogService } from './time-worklog.service';

describe('TimeWorklogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeWorklogService]
    });
  });

  it('should be created', inject([TimeWorklogService], (service: TimeWorklogService) => {
    expect(service).toBeTruthy();
  }));
});
