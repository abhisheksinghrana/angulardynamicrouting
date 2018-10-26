import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackServiceComponent } from './feedback-service.component';

describe('FeedbackServiceComponent', () => {
  let component: FeedbackServiceComponent;
  let fixture: ComponentFixture<FeedbackServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
