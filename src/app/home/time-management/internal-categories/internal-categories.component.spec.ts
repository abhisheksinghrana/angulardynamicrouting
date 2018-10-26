import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalCategoriesComponent } from './internal-categories.component';

describe('InternalCategoriesComponent', () => {
  let component: InternalCategoriesComponent;
  let fixture: ComponentFixture<InternalCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
