import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';

import { UserService } from '../core/services/user.service';
import { MenuLinksGeneratorService } from '../core/services/menu-links-generator.service';
import { RegionService } from '../core/services/region.service';

import { RouteMappingConstants } from '../shared/constants/route-mapping.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  regionForm: FormGroup;
  menuList: any[];
  regionList: any[];
  alive: boolean;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _menuLinksGeneratorService: MenuLinksGeneratorService,
    private _regionService: RegionService,
    private _formBuilder: FormBuilder
  ) {
    if (
      _router.url === '/' &&
      _userService.userDetails.appPermissions &&
      _userService.userDetails.appPermissions.length
    ) {
      _router.navigate([
        RouteMappingConstants[_userService.userDetails.appPermissions[0].name]
          .path
      ]);
    }
    this.menuList = [];
    this.regionList = [];
    this.alive = true;
  }

  ngOnInit() {
    this._menuLinksGeneratorService.menuList
      .takeWhile(() => this.alive)
      .subscribe((menuList: any[]) => {
        setTimeout(() => {
          if (menuList && menuList.length) {
            this.menuList = menuList;
          } else {
            this.menuList = [];
          }
        });
      });
    this.regionForm = this._formBuilder.group({
      regionId: null
    });
    this.getRegionList();
    this._regionService.triggerRegionUpdated
      .takeWhile(() => this.alive)
      .subscribe((response: any) => {
        this.getRegionWiseData();
      });
  }

  getRegionList() {
    this._regionService
      .getRegionList()
      .takeWhile(() => this.alive)
      .subscribe(regions => {
        this.regionList = regions;
        for (const region of this.regionList) {
          if (region.id === this._userService.userDetails.userRegion.id) {
            this.regionForm.patchValue({
              regionId: region.id
            });
            break;
          }
        }
        this.getRegionWiseData();
      });
  }

  getRegionWiseData() {
    this._regionService.updateRegion(this.regionForm.get('regionId').value);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
