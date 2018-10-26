import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { RouteGeneratorService } from '../../shared/services/route-generator.service';
import { MenuLinksGeneratorService } from '../../core/services/menu-links-generator.service';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss']
})
export class ExpenseTrackerComponent implements OnInit {
  routeArray: any[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _routeGeneratorService: RouteGeneratorService,
    private _menuLinksGeneratorService: MenuLinksGeneratorService
  ) {
    this.routeArray = _routeGeneratorService.getMenuRouteList(
      'expenseTrackerTab'
    );
    _activatedRoute.routeConfig.children = this.routeArray;
    if (
      _router.url === '/expensetracker' &&
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
