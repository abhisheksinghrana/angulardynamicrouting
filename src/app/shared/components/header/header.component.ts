import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

import { RouteMappingConstants } from '../../constants/route-mapping.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuTabList: any[];

  constructor(private _userService: UserService) {
    this.menuTabList = [];
    if (_userService.userDetails && _userService.userDetails.appPermissions) {
      for (const menutab of _userService.userDetails.appPermissions) {
        this.menuTabList.push(RouteMappingConstants[menutab.name]);
      }
    }
  }

  ngOnInit() {}
}
