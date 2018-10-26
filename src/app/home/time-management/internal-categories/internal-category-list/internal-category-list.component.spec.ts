import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalCategoryListComponent } from './internal-category-list.component';

describe('InternalCategoryListComponent', () => {
  let component: InternalCategoryListComponent;
  let fixture: ComponentFixture<InternalCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
