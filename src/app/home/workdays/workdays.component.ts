import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { RouteGeneratorService } from '../../shared/services/route-generator.service';
import { MenuLinksGeneratorService } from '../../core/services/menu-links-generator.service';

@Component({
  selector: 'app-workdays',
  templateUrl: './workdays.component.html',
  styleUrls: ['./workdays.component.scss']
})
export class WorkdaysComponent implements OnInit {
  routeArray: any[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _routeGeneratorService: RouteGeneratorService,
    private _menuLinksGeneratorService: MenuLinksGeneratorService
  ) {
    this.routeArray = _routeGeneratorService.getMenuRouteList('workDaysTab');
    _activatedRoute.routeConfig.children = this.routeArray;
    if (
      _router.url === '/workdays' &&
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
