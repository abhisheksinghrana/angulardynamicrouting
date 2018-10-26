import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimesheetLogComponent } from './manage-timesheet-log.component';

describe('TimesheetLogComponent', () => {
  let component: ManageTimesheetLogComponent;
  let fixture: ComponentFixture<ManageTimesheetLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTimesheetLogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTimesheetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
