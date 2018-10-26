import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() data: any;

  constructor(private _ngbActiveModal: NgbActiveModal) {}

  ngOnInit() {}

  close() {
    this._ngbActiveModal.close(true);
  }
}
