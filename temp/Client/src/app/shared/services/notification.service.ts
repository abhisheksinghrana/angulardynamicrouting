import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationComponent } from '../components/notification/notification.component';

@Injectable()
export class NotificationService {
  constructor(private _ngbModal: NgbModal) {}

  openNotificationModal(data) {
    const notificationModalInstance = this._ngbModal.open(NotificationComponent, {
      windowClass: 'notification-dialog',
      backdrop: 'static',
      keyboard: false
    });

    notificationModalInstance.componentInstance.data = data;

    notificationModalInstance.result.then((result: any) => {});
  }
}
