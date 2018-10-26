import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLogComponent } from './add-new-log.component';

describe('AddNewLogComponent', () => {
  let component: AddNewLogComponent;
  let fixture: ComponentFixture<AddNewLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
