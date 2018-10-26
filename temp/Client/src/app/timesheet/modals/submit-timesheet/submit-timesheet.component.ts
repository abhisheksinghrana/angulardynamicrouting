import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submit-timesheet',
  templateUrl: './submit-timesheet.component.html',
  styleUrls: ['./submit-timesheet.component.scss']
})
export class SubmitTimesheetComponent implements OnInit {
  @Input() data: any;

  constructor(private _ngbActiveModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.data.weeklyWorkingHours > this.data.totalSpentHours) {
      this.data.title = 'Oops... You are missing hours';
      this.data.description =
        'Please check your hours and fill in your leaves.';
      this.data.type = 2;
    } else {
      this.data.title = 'Submit your hours';
      this.data.description =
        'After you submit your hours you can\'t edit it anymore.';
      this.data.type = 1;
    }
  }

  close(result) {
    this._ngbActiveModal.close(result);
  }
}
