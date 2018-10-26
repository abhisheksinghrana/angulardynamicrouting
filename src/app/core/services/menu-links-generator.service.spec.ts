import { TestBed, inject } from '@angular/core/testing';

import { MenuLinksGeneratorService } from './menu-links-generator.service';

describe('MenuLinksGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuLinksGeneratorService]
    });
  });

  it('should be created', inject([MenuLinksGeneratorService], (service: MenuLinksGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
