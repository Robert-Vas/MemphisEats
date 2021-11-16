import {Component, Input} from '@angular/core';
import {AddressModel} from '../../shared/model';

@Component({
  selector: 'custom-address-list',
  templateUrl: './custom-address-list.component.html',
  styleUrls: ['./custom-address-list.component.scss'],
})
export class CustomAddressListComponent {
  img = 'assets/img/my/adbg.jpg';
  @Input() list: Array<AddressModel>;
  constructor() { }

}
