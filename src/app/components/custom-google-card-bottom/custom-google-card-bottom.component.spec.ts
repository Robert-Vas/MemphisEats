import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGoogleCardBottomComponent } from './custom-google-card-bottom.component';

describe('CustomGoogleCardBottomComponent', () => {
  let component: CustomGoogleCardBottomComponent;
  let fixture: ComponentFixture<CustomGoogleCardBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGoogleCardBottomComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGoogleCardBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
