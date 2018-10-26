import { TestBed, inject } from '@angular/core/testing';

import { GroupByPreferencesService } from './group-by-preferences.service';

describe('GroupByPreferencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupByPreferencesService]
    });
  });

  it('should be created', inject([GroupByPreferencesService], (service: GroupByPreferencesService) => {
    expect(service).toBeTruthy();
  }));
});
