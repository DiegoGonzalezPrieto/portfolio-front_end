import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelButtonComponent } from './del-button.component';

describe('DelButtonComponent', () => {
  let component: DelButtonComponent;
  let fixture: ComponentFixture<DelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
