import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';

import { NotificationService } from '../../../shared/services/notification.service';
import { TimeCategoriesService } from '../services/time-categories.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { UtilService } from '../../../shared/services/util.service';
import { RegionService } from '../../../core/services/region.service';

import { TimeCategory } from '../models/time-category.interface';

import { CustomValidators } from '../../../shared/directives/custom-validators';

@Component({
  selector: 'app-time-categories',
  templateUrl: './time-categories.component.html',
  styleUrls: ['./time-categories.component.scss']
})
export class TimeCategoriesComponent implements OnInit, OnDestroy {
  timeAddCategoryForm: FormGroup;
  timeCategoryListForm: FormGroup;
  showAddCategoryFields: boolean;
  regionId: string;
  alive: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _spinnerService: SpinnerService,
    private _utilService: UtilService,
    private _timeCategoriesService: TimeCategoriesService,
    private _regionService: RegionService
  ) {
    this.showAddCategoryFields = false;
    this.alive = true;
  }

  ngOnInit() {
    this.regionId = null;
    this.timeAddCategoryForm = this._formBuilder.group({
      id: null,
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.noWhiteSpace
        ]
      ],
      description: [
        '',
        [Validators.maxLength(250), CustomValidators.noWhiteSpace]
      ],
      isBillable: true,
      isActive: true,
      regionId: null
    });
    this.timeCategoryListForm = this._formBuilder.group({
      categoriesList: this._formBuilder.array([])
    });
    this.subscribeToRegion();
  }

  subscribeToRegion() {
    this._regionService.regionUpdatedObservable
      .takeWhile(() => this.alive)
      .subscribe((region: string) => {
        if (this.regionId !== region) {
          this.regionId = region;
          this.getCategory();
        }
      });
    if (!this.regionId) {
      this._regionService.triggerRegionUpdated.next();
    }
  }

  onAddCategoryFocus() {
    this.showAddCategoryFields = true;
  }

  get categoryListcontrol() {
    return <FormArray>this.timeCategoryListForm.controls['categoriesList'];
  }

  initCategory(category: any) {
    return this._formBuilder.group({
      id: category.id,
      name: [
        category.name,
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.noWhiteSpace
        ]
      ],
      description: [
        category.description,
        [Validators.maxLength(250), CustomValidators.noWhiteSpace]
      ],
      isBillable: {
        value: category.isBillable,
        disabled: true
      },
      isActive: category.isActive,
      regionId: category.regionId
    });
  }

  getCategory() {
    this._spinnerService.startSpinner();
    this.removeTimeCategoryList();
    this._timeCategoriesService
      .list(this.regionId)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          for (const category of response) {
            this.categoryListcontrol.push(this.initCategory(category));
          }
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  addCategory({ value, invalid }: { value: TimeCategory; invalid: boolean }) {
    if (invalid) {
      return;
    }
    value.regionId = this.regionId;
    this._spinnerService.startSpinner();
    this._timeCategoriesService
      .add(value)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.categoryListcontrol.insert(0, this.initCategory(response));
          this.resetAddCategoryForm();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  editCategory(event) {
    this._spinnerService.startSpinner();
    this._timeCategoriesService
      .update(this.categoryListcontrol.at(event.index).value)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
          this.categoryListcontrol.at(event.index).patchValue(event.oldValues);
        }
      );
  }

  deleteCategory(index) {
    this._spinnerService.startSpinner();
    this._timeCategoriesService
      .delete(this.categoryListcontrol.at(index).get('id').value)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.categoryListcontrol.removeAt(index);
          this._notificationService.openNotificationModal({
            title: 'Info',
            description: 'Category deleted successfully.'
          });
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  resetAddCategoryForm() {
    this.timeAddCategoryForm.reset();
    this.timeAddCategoryForm.patchValue({
      isBillable: true
    });
  }

  removeTimeCategoryList() {
    while (this.categoryListcontrol.length) {
      this.categoryListcontrol.removeAt(0);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
