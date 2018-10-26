import { TestBed, inject } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';

describe('TimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesheetService]
    });
  });

  it('should be created', inject([TimesheetService], (service: TimesheetService) => {
    expect(service).toBeTruthy();
  }));
});
