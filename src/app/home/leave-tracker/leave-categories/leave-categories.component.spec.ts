import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCategoriesComponent } from './leave-categories.component';

describe('LeaveCategoriesComponent', () => {
  let component: LeaveCategoriesComponent;
  let fixture: ComponentFixture<LeaveCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
