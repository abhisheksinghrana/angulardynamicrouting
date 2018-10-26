import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayLeavesComponent } from './holiday-leaves.component';

describe('HolidayLeavesComponent', () => {
  let component: HolidayLeavesComponent;
  let fixture: ComponentFixture<HolidayLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
