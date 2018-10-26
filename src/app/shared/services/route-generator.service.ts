import { Injectable } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { RouteMappingConstants } from '../constants/route-mapping.constants';

@Injectable()
export class RouteGeneratorService {
  constructor(private _userService: UserService) {}

  getMenuRouteList(menuId) {
    for (
      let i = 0;
      i < this._userService.userDetails.appPermissions.length;
      i++
    ) {
      if (this._userService.userDetails.appPermissions[i].name === menuId) {
        const childRouteArray: any[] = [];
        for (const childRoute of this._userService.userDetails.appPermissions[i]
          .childRoutes) {
          let routeObj: any = {};
          routeObj = Object.assign(
            {},
            RouteMappingConstants[menuId + '-' + childRoute.name]
          );
          routeObj.route = RouteMappingConstants[menuId].route + routeObj.route;
          childRouteArray.push(routeObj);
        }
        return childRouteArray;
      }
    }
    return [];
  }
}
