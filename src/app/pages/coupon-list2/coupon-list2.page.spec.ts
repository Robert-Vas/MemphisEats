import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponList2Page } from './coupon-list2.page';

describe('CouponList2Page', () => {
  let component: CouponList2Page;
  let fixture: ComponentFixture<CouponList2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponList2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponList2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
