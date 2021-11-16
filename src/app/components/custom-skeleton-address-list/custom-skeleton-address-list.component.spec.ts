import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonAddressListComponent } from './custom-skeleton-address-list.component';

describe('CustomSkeletonAddressListComponent', () => {
  let component: CustomSkeletonAddressListComponent;
  let fixture: ComponentFixture<CustomSkeletonAddressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSkeletonAddressListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
