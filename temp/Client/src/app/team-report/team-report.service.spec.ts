import { TestBed, inject } from '@angular/core/testing';

import { TeamReportService } from './team-report.service';

describe('TeamReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamReportService]
    });
  });

  it('should be created', inject([TeamReportService], (service: TeamReportService) => {
    expect(service).toBeTruthy();
  }));
});
