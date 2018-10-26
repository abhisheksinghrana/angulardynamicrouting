import { TestBed, inject } from '@angular/core/testing';

import { EmployeeTimesheetService } from './employee-timesheet.service';

describe('EmployeeTimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeTimesheetService]
    });
  });

  it('should be created', inject(
    [EmployeeTimesheetService],
    (service: EmployeeTimesheetService) => {
      expect(service).toBeTruthy();
    }
  ));
});
