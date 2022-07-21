import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExpFormComponent } from './work-exp-form.component';

describe('WorkExpFormComponent', () => {
  let component: WorkExpFormComponent;
  let fixture: ComponentFixture<WorkExpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
