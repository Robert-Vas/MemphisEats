import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomNoticeSlideComponent } from './custom-notice-slide.component';

describe('CustomNoticeSlideComponent', () => {
  let component: CustomNoticeSlideComponent;
  let fixture: ComponentFixture<CustomNoticeSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNoticeSlideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomNoticeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
