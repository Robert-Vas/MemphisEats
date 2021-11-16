import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonOrderComponent } from './custom-skeleton-order.component';

describe('CustomSkeletonOrderComponent', () => {
  let component: CustomSkeletonOrderComponent;
  let fixture: ComponentFixture<CustomSkeletonOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSkeletonOrderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
