import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHoursOverviewComponent } from './user-hours-overview.component';

describe('UserHoursOverviewComponent', () => {
  let component: UserHoursOverviewComponent;
  let fixture: ComponentFixture<UserHoursOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHoursOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHoursOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
