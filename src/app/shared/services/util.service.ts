import { Injectable } from '@angular/core';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class UtilService {
  constructor(private _notificationService: NotificationService) {}

  public handleError(errorDetails?: Response | any) {
    const data = {
      title: 'Error',
      description: 'Something went wrong! Please try again later.'
    };
    if (errorDetails && errorDetails.error && errorDetails.error.error) {
      if (errorDetails.error.error.message) {
        data.description = errorDetails.error.error.message;
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

  public parseFloat(number: any, precision: number = 2): number {
    return (
      Math.round(
        parseFloat((number * Math.pow(10, precision)).toFixed(precision))
      ) / Math.pow(10, precision)
    );
  }

  public findObjectIndexByKey(array: any[], key: string, value) {
    return array
      .map(function(val) {
        return val[key];
      })
      .indexOf(value);
  }

  public findObjectKeyValueByKey(
    array: any[],
    key: string,
    value: any,
    keyName: string
  ) {
    const index = this.findObjectIndexByKey(array, key, value);
    if (index !== -1) {
      return array[index][keyName];
    } else {
      return null;
    }
  }
}
