import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';

import { InternalCategoriesService } from '../services/internal-categories.service';
import { TimeCategoriesService } from '../services/time-categories.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { UtilService } from '../../../shared/services/util.service';
import { RegionService } from '../../../core/services/region.service';

import { InternalCategory } from '../models/internal-category.interface';
import { TimeCategory } from '../models/time-category.interface';

import { CustomValidators } from '../../../shared/directives/custom-validators';

@Component({
  selector: 'app-internal-categories',
  templateUrl: './internal-categories.component.html',
  styleUrls: ['./internal-categories.component.scss']
})
export class InternalCategoriesComponent implements OnInit, OnDestroy {
  timeAddInternalCategoryForm: FormGroup;
  timeInternalCategoryListForm: FormGroup;
  showAddCategoryFields: boolean;
  categoryList: Array<TimeCategory>;
  regionId: string;
  alive: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _internalCategoriesService: InternalCategoriesService,
    private _timeCategoriesService: TimeCategoriesService,
    private _notificationService: NotificationService,
    private _spinnerService: SpinnerService,
    private _utilService: UtilService,
    private _regionService: RegionService
  ) {
    this.showAddCategoryFields = false;
    this.alive = true;
  }

  ngOnInit() {
    this.regionId = null;
    this.timeAddInternalCategoryForm = this._formBuilder.group({
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
      categoryId: [null, [Validators.required]],
      isActive: true,
      regionId: null
    });
    this.timeInternalCategoryListForm = this._formBuilder.group({
      categoriesInternalList: this._formBuilder.array([])
    });

    this.subscribeToRegion();
  }

  subscribeToRegion() {
    this._regionService.regionUpdatedObservable
      .takeWhile(() => this.alive)
      .subscribe((region: string) => {
        if (this.regionId !== region) {
          this.regionId = region;
          this._spinnerService.startSpinner();
          this._timeCategoriesService
            .list(this.regionId)
            .takeWhile(() => this.alive)
            .subscribe(
              response => {
                this._spinnerService.stopSpinner();
                this.categoryList = response;
                this.getInternalCategory();
              },
              error => {
                this._spinnerService.stopSpinner();
                this._utilService.handleError(error);
              }
            );
        }
      });
    if (!this.regionId) {
      this._regionService.triggerRegionUpdated.next();
    }
  }

  onAddInternalCategoryFocus() {
    this.showAddCategoryFields = true;
  }

  get categoryListcontrol() {
    return <FormArray>this.timeInternalCategoryListForm.controls[
      'categoriesInternalList'
    ];
  }

  initInternalCategory(category: any) {
    category.categoryName = this._utilService.findObjectKeyValueByKey(
      this.categoryList,
      'id',
      category.categoryId,
      'name'
    );
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
      categoryId: [category.categoryId, [Validators.required]],
      categoryName: category.categoryName,
      isActive: category.isActive,
      regionId: category.regionId
    });
  }

  getInternalCategory() {
    this._spinnerService.startSpinner();
    this.removeTimeCategoryList();
    this._internalCategoriesService
      .list(this.regionId)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          for (const category of response) {
            this.categoryListcontrol.push(this.initInternalCategory(category));
          }
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  addInternalCategory({
    value,
    invalid
  }: {
    value: InternalCategory;
    invalid: boolean;
  }) {
    if (invalid) {
      return;
    }
    value.regionId = this.regionId;
    this._spinnerService.startSpinner();
    this._internalCategoriesService
      .add(value)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.categoryListcontrol.insert(
            0,
            this.initInternalCategory(response)
          );
          this.resetAddCategoryForm();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  editInternalCategory(event) {
    this._spinnerService.startSpinner();
    this._internalCategoriesService
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

  deleteInternalCategory(index) {
    this._spinnerService.startSpinner();
    this._internalCategoriesService
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
    this.timeAddInternalCategoryForm.reset();
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
