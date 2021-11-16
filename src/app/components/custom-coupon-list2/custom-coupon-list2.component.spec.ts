import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCouponList2Component } from './custom-coupon-list2.component';

describe('CustomCouponList2Component', () => {
  let component: CustomCouponList2Component;
  let fixture: ComponentFixture<CustomCouponList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCouponList2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCouponList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
