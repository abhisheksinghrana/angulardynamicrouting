import { TestBed, inject } from '@angular/core/testing';

import { ThirdPartyConfigurationService } from './third-party-configuration.service';

describe('ThirdPartyConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdPartyConfigurationService]
    });
  });

  it('should be created', inject([ThirdPartyConfigurationService], (service: ThirdPartyConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
