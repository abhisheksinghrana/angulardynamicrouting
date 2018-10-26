import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { RouteGeneratorService } from '../../shared/services/route-generator.service';
import { MenuLinksGeneratorService } from '../../core/services/menu-links-generator.service';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})
export class TimeManagementComponent implements OnInit {
  routeArray: any[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _routeGeneratorService: RouteGeneratorService,
    private _menuLinksGeneratorService: MenuLinksGeneratorService
  ) {
    this.routeArray = _routeGeneratorService.getMenuRouteList(
      'timeManagementTab'
    );
    _activatedRoute.routeConfig.children = this.routeArray;
    if (
      _router.url === '/timemanagement' &&
      this.routeArray &&
      this.routeArray.length
    ) {
      _router.navigateByUrl(this.routeArray[0].route);
    }
  }

  ngOnInit() {
    this._menuLinksGeneratorService.generate(this.routeArray);
  }
}
