import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdaysComponent } from './workdays.component';

describe('WorkdaysComponent', () => {
  let component: WorkdaysComponent;
  let fixture: ComponentFixture<WorkdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
