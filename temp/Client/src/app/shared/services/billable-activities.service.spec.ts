import { TestBed, inject } from '@angular/core/testing';

import { BillableActivitiesService } from './billable-activities.service';

describe('BillableActivitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillableActivitiesService]
    });
  });

  it('should be created', inject([BillableActivitiesService], (service: BillableActivitiesService) => {
    expect(service).toBeTruthy();
  }));
});
