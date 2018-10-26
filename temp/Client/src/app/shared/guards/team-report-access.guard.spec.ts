import { TestBed, async, inject } from '@angular/core/testing';

import { TeamReportAccessGuard } from './team-report-access.guard';

describe('TeamReportAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamReportAccessGuard]
    });
  });

  it('should ...', inject([TeamReportAccessGuard], (guard: TeamReportAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
