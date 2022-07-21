import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSkillFormComponent } from './lang-skill-form.component';

describe('LangSkillFormComponent', () => {
  let component: LangSkillFormComponent;
  let fixture: ComponentFixture<LangSkillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangSkillFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
