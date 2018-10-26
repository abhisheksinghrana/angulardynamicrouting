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
export class TeamReportAccessGuard implements CanActivate, CanActivateChild {
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isReportTabAllowed()) {
      this._router.navigate(['/timesheet']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.isReportTabAllowed()) {
      this._router.navigate(['/timesheet']);
      return false;
    }
    return true;
  }

  isReportTabAllowed(): boolean {
    return this._userService.userDetails.isDisplayReport;
  }
}
