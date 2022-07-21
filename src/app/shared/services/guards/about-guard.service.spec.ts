import { TestBed } from '@angular/core/testing';

import { AboutGuardService } from './about-guard.service';

describe('AboutGuardService', () => {
  let service: AboutGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
