import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemHoursComponent } from './work-item-hours.component';

describe('WorkItemHoursComponent', () => {
  let component: WorkItemHoursComponent;
  let fixture: ComponentFixture<WorkItemHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkItemHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
