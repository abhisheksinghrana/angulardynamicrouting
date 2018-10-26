import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navigationDetails: any;

  constructor(
    private _winRef: WindowRefService,
    private _navigationService: NavigationService
  ) {
    this.navigationDetails = {};
  }

  ngOnInit() {
    this._navigationService.get().subscribe(
      response => {
        this.navigationDetails = response;
        this._generateNavigationBar();
      },
      error => {}
    );
  }

  private _generateNavigationBar() {
    this._winRef.nativeWindow.navigationContainer = 'navigation';
    this._winRef.nativeWindow.footerContainer = 'footer';
    this._winRef.nativeWindow.showAppMenu = true;
    this._winRef.nativeWindow.showCenterMenu = true;
    this._winRef.nativeWindow.showOrgLevelTree = true;
    this._winRef.nativeWindow.showSettings = true;
    this._winRef.nativeWindow.levelId = this.navigationDetails.levelId;
    this._winRef.nativeWindow.extraSettings = this.navigationDetails.extraSettings;
    const d = document,
      s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src =
      this.navigationDetails.baseUrl + 'scripts/cockpit.navigation.loader.js';
    const x = d.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    s.onload = () => {
      this._winRef.nativeWindow.navigation.loader.init(
        this.navigationDetails.baseUrl
      );
    };
  }
}
