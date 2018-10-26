import { Injectable } from '@angular/core';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class UtilService {
  constructor(private _notificationService: NotificationService) {}

  handleError(errorDetails: Response | any) {
    const data = {
      title: 'Error',
      description: 'Something went wrong! Please try again later.'
    };
    if (errorDetails && errorDetails.json) {
      const errorObj: any = errorDetails.json();
      if (errorObj.error.message) {
        data.description = errorObj.error.message;
        this._notificationService.openNotificationModal(data);
      }
    } else if (errorDetails && errorDetails.error) {
      data.description =
        errorDetails.error.exceptionMessage ||
        'Something went wrong! Please try again later.';
      this._notificationService.openNotificationModal(data);
    } else {
      this._notificationService.openNotificationModal(data);
    }
  }
}
