import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UtilService } from '../../../../shared/services/util.service';

import { TimeCategory } from '../../models/time-category.interface';

import { CustomValidators } from '../../../../shared/directives/custom-validators';

@Component({
  selector: 'app-internal-category-list',
  templateUrl: './internal-category-list.component.html',
  styleUrls: ['./internal-category-list.component.scss']
})
export class InternalCategoryListComponent implements OnInit {
  @Input('parent') parent: FormGroup;
  @Input('categoryList') categoryList: Array<TimeCategory>;
  @Output('deleteInternalCategory')
  deleteInternalCategory: EventEmitter<any> = new EventEmitter<any>();
  @Output('editInternalCategory')
  editInternalCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _utilService: UtilService) {}

  ngOnInit() {}

  onDeleteInternalCategory(category: any) {
    category.showDeleteInternalCategoryConfirmationBar = true;
  }

  onDeleteInternalCategoryConfirmationResponse(
    response: boolean,
    category: any,
    index: number
  ) {
    category.showDeleteInternalCategoryConfirmationBar = false;
    if (response) {
      this.deleteInternalCategory.emit(index);
    }
  }

  onEditInternalCategory(category: any) {
    category.edit = true;
    category.oldValues = category.getRawValue();
  }

  onCancelEdit(category: any) {
    category.edit = false;
    category.patchValue(category.oldValues);
  }

  onConfirmEdit(category: any, index: number) {
    if (category.invalid) {
      return;
    }
    category.patchValue({
      categoryName: this._utilService.findObjectKeyValueByKey(
        this.categoryList,
        'id',
        category.value.categoryId,
        'name'
      )
    });
    category.edit = false;
    this.editInternalCategory.emit({
      index: index,
      oldValues: category.oldValues
    });
  }
}
