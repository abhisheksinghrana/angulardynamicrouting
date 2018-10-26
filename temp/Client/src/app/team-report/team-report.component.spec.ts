import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReportComponent } from './team-report.component';

describe('TeamReportComponent', () => {
  let component: TeamReportComponent;
  let fixture: ComponentFixture<TeamReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
