import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExpItemComponent } from './work-exp-item.component';

describe('WorkExpItemComponent', () => {
  let component: WorkExpItemComponent;
  let fixture: ComponentFixture<WorkExpItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExpItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExpItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
