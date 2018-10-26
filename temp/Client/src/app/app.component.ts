import { Component, OnInit } from '@angular/core';

import { AppService } from './shared/services/app.service';
import { UserService } from './core/services/user.service';
import { SpinnerService } from './core/services/spinner.service';

import { GlobalConstants } from './shared/constants/global.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  globalConstants: any;
  userDetails: any;
  isLoading: boolean;

  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _spinnerService: SpinnerService
  ) {
    this.globalConstants = GlobalConstants;
    this.userDetails = {};
    this.isLoading = true;
  }

  ngOnInit() {
    this.userDetails = this._userService.userDetails;
    this.getFeatureToggleConfig();
    this.getEnvironmentConfig();
  }

  getFeatureToggleConfig() {
    this._appService.getFeatureToggleConfig().subscribe(
      response => {
        GlobalConstants.featureToggleConfig = this.globalConstants.featureToggleConfig = response;
      },
      error => {
        GlobalConstants.featureToggleConfig = {};
      }
    );
  }

  getEnvironmentConfig() {
    this._appService.getEnvironmentConfig().subscribe(
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
}
