import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingWorkComponent } from './logging-work.component';

describe('LoggingWorkComponent', () => {
  let component: LoggingWorkComponent;
  let fixture: ComponentFixture<LoggingWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggingWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
