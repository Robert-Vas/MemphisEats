import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomOkComponent } from './custom-ok.component';

describe('CustomOkComponent', () => {
  let component: CustomOkComponent;
  let fixture: ComponentFixture<CustomOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOkComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
