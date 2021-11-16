import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGuessComponent } from './custom-guess.component';

describe('CustomGuessComponent', () => {
  let component: CustomGuessComponent;
  let fixture: ComponentFixture<CustomGuessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGuessComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
