import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSkillItemComponent } from './lang-skill-item.component';

describe('LangSkillItemComponent', () => {
  let component: LangSkillItemComponent;
  let fixture: ComponentFixture<LangSkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangSkillItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSkillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
