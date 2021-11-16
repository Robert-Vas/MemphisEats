import {Component, Input} from '@angular/core';

@Component({
  selector: 'custom-timeline',
  templateUrl: './custom-timeline.component.html',
  styleUrls: ['./custom-timeline.component.scss'],
})
export class CustomTimelineComponent  {
  @Input() list: any;
  constructor() { }
}
