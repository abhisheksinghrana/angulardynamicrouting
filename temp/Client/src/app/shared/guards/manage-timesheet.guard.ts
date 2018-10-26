import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class ManageTimesheetGuard implements CanActivate, CanActivateChild {
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isManageTimesheetAllowed()) {
      this._router.navigate(['/timesheet']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.isManageTimesheetAllowed()) {
      this._router.navigate(['/timesheet']);
      return false;
    }
    return true;
  }

  isManageTimesheetAllowed(): boolean {
    if (
      this._userService.userDetails.permissionsObj &&
      !this._userService.userDetails.permissionsObj['ManageTimesheet']
    ) {
      return false;
    }
    return true;
  }
}
