import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationBarComponent } from './confirmation-bar.component';

describe('ConfirmationBarComponent', () => {
  let component: ConfirmationBarComponent;
  let fixture: ComponentFixture<ConfirmationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
