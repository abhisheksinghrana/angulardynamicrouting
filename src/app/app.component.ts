import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/takeWhile';

import { AppService } from './shared/services/app.service';
import { UserService } from './core/services/user.service';
import { SpinnerService } from './core/services/spinner.service';

import { GlobalConstants } from './shared/constants/global.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  globalConstants: any;
  userDetails: any;
  isLoading: boolean;
  alive: boolean;

  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _spinnerService: SpinnerService
  ) {
    this.globalConstants = GlobalConstants;
    this.userDetails = {};
    this.isLoading = true;
    this.alive = true;
  }

  ngOnInit() {
    this.userDetails = this._userService.userDetails;
    this.getFeatureToggleConfig();
    this.getEnvironmentConfig();
  }

  getFeatureToggleConfig() {
    this._appService
      .getFeatureToggleConfig()
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          GlobalConstants.featureToggleConfig = this.globalConstants.featureToggleConfig = response;
        },
        error => {
          GlobalConstants.featureToggleConfig = {};
        }
      );
  }

  getEnvironmentConfig() {
    this._appService
      .getEnvironmentConfig()
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          GlobalConstants.feedbackServiceDomain = this.globalConstants.feedbackServiceDomain =
            response.feedbackServiceDomain;
          this.isLoading = false;
        },
        error => {
          this._spinnerService.stopSpinner();
          GlobalConstants.feedbackServiceDomain = '';
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
