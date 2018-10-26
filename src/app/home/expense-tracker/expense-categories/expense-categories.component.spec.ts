import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoriesComponent } from './expense-categories.component';

describe('ExpenseCategoriesComponent', () => {
  let component: ExpenseCategoriesComponent;
  let fixture: ComponentFixture<ExpenseCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
