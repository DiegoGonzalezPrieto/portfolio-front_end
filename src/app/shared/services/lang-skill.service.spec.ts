import { TestBed } from '@angular/core/testing';

import { LangSkillService } from './lang-skill.service';

describe('LangSkillService', () => {
  let service: LangSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
