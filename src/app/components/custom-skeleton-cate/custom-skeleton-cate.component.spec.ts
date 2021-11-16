import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonCateComponent } from './custom-skeleton-cate.component';

describe('CustomSkeletonCateComponent', () => {
  let component: CustomSkeletonCateComponent;
  let fixture: ComponentFixture<CustomSkeletonCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSkeletonCateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
