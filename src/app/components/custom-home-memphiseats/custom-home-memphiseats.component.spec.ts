import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHomeMemphisEatsComponent } from './custom-home-memphiseats.component';

describe('CustomHomeMemphisEatsComponent', () => {
  let component: CustomHomeMemphisEatsComponent;
  let fixture: ComponentFixture<CustomHomeMemphisEatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomHomeMemphisEatsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHomeMemphisEatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
