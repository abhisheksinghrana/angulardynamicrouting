import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from '../../../../shared/directives/custom-validators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input('parent') parent: FormGroup;
  @Output('deleteCategory')
  deleteCategory: EventEmitter<any> = new EventEmitter<any>();
  @Output('editCategory')
  editCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onDeleteCategory(category: any) {
    category.showDeleteCategoryConfirmationBar = true;
  }

  onDeleteCategoryConfirmationResponse(
    response: boolean,
    category: any,
    index: number
  ) {
    category.showDeleteCategoryConfirmationBar = false;
    if (response) {
      this.deleteCategory.emit(index);
    }
  }

  onEditCategory(category: any) {
    category.edit = true;
    category.oldValues = category.getRawValue();
    category.get('isBillable').enable();
  }

  onCancelEdit(category: any) {
    category.edit = false;
    category.patchValue(category.oldValues);
    this.disableBillable(category);
  }

  onConfirmEdit(category: any, index: number) {
    if (category.invalid) {
      return;
    }
    category.edit = false;
    this.editCategory.emit({ index: index, oldValues: category.oldValues });
    this.disableBillable(category);
  }

  disableBillable(category: any) {
    category.get('isBillable').disable();
  }
}
