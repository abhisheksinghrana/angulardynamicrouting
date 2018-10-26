import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTimesheetComponent } from './submit-timesheet.component';

describe('SubmitTimesheetComponent', () => {
  let component: SubmitTimesheetComponent;
  let fixture: ComponentFixture<SubmitTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
