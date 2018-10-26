import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSettingsComponent } from './source-settings.component';

describe('SourceSettingsComponent', () => {
  let component: SourceSettingsComponent;
  let fixture: ComponentFixture<SourceSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
