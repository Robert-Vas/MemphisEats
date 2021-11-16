import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonSlidesNewComponent } from './custom-skeleton-slides-new.component';

describe('CustomSkeletonSlidesNewComponent', () => {
  let component: CustomSkeletonSlidesNewComponent;
  let fixture: ComponentFixture<CustomSkeletonSlidesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSkeletonSlidesNewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonSlidesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
