import { TestBed, inject } from '@angular/core/testing';

import { NonBillableActivitiesService } from './non-billable-activities.service';

describe('NonBillableActivitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonBillableActivitiesService]
    });
  });

  it('should be created', inject([NonBillableActivitiesService], (service: NonBillableActivitiesService) => {
    expect(service).toBeTruthy();
  }));
});
