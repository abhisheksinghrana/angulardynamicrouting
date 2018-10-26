import { TestBed, inject } from '@angular/core/testing';

import { CalendarNavigationService } from './calendar-navigation.service';

describe('CalendarNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarNavigationService]
    });
  });

  it('should be created', inject([CalendarNavigationService], (service: CalendarNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
