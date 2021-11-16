import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonHomeMemphisEatsComponent } from './custom-skeleton-home-memphiseats.component';

describe('CustomSkeletonHomeMemphisEatsComponent', () => {
  let component: CustomSkeletonHomeMemphisEatsComponent;
  let fixture: ComponentFixture<CustomSkeletonHomeMemphisEatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSkeletonHomeMemphisEatsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonHomeMemphisEatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
