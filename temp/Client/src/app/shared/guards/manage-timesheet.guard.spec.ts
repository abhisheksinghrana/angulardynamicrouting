import { TestBed, async, inject } from '@angular/core/testing';

import { ManageTimesheetGuard } from './manage-timesheet.guard';

describe('ManageTimesheetGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageTimesheetGuard]
    });
  });

  it('should ...', inject([ManageTimesheetGuard], (guard: ManageTimesheetGuard) => {
    expect(guard).toBeTruthy();
  }));
});
