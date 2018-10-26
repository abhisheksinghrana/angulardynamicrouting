import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-item-hours',
  templateUrl: './work-item-hours.component.html',
  styleUrls: ['./work-item-hours.component.scss']
})
export class WorkItemHoursComponent implements OnInit {
  @Input() worklogDetails: any;

  constructor() {}

  ngOnInit() {}
}
