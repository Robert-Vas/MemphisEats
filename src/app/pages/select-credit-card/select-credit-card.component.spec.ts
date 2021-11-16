import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCreditCardModal } from './select-credit-card.component';

describe('SelectCreditCardModal', () => {
  let component: SelectCreditCardModal;
  let fixture: ComponentFixture<SelectCreditCardModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCreditCardModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCreditCardModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
