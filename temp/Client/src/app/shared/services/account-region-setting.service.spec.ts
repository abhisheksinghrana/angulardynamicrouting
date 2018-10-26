import { TestBed, inject } from '@angular/core/testing';

import { AccountRegionSettingService } from './account-region-setting.service';

describe('AccountRegionSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountRegionSettingService]
    });
  });

  it('should be created', inject([AccountRegionSettingService], (service: AccountRegionSettingService) => {
    expect(service).toBeTruthy();
  }));
});
