import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { RouteGeneratorService } from '../../shared/services/route-generator.service';
import { MenuLinksGeneratorService } from '../../core/services/menu-links-generator.service';

@Component({
  selector: 'app-leave-tracker',
  templateUrl: './leave-tracker.component.html',
  styleUrls: ['./leave-tracker.component.scss']
})
export class LeaveTrackerComponent implements OnInit {
  routeArray: any[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _routeGeneratorService: RouteGeneratorService,
    private _menuLinksGeneratorService: MenuLinksGeneratorService
  ) {
    this.routeArray = _routeGeneratorService.getMenuRouteList(
      'leaveTrackerTab'
    );
    _activatedRoute.routeConfig.children = this.routeArray;
    if (
      _router.url === '/leavetracker' &&
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
