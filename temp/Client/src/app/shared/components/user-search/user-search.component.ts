import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  @Output() getSearchListEmitter = new EventEmitter<any>();
  @Output() getRecentSearchListEmitter = new EventEmitter<any>();
  @Output() onItemSelectionEmitter = new EventEmitter<any>();
  @Input() recentSearchList: any[];
  @Input() searchList: any[];
  @Input() searchDefaultParams: any;

  env: any;
  searchParams: any;
  searchListTimeout: any;

  constructor() {
    this.env = environment;
    this.recentSearchList = [];
    this.searchList = [];
  }

  ngOnInit() {
    this.searchParams = this.searchDefaultParams;
    this.getRecentSearchList();
  }

  onSearchTextChange() {
    this.searchParams.page = 0;
    this.searchParams.pageSize = 10;
    this.getSearchList();
  }

  onLoadMoreData() {
    this.searchParams.page++;
    this.getSearchListEmitter.emit(this.searchParams);
  }

  getSearchList() {
    if (this.searchListTimeout) {
      clearTimeout(this.searchListTimeout);
    }

    this.searchListTimeout = setTimeout(() => {
      this.getSearchListEmitter.emit(this.searchParams);
    }, 1000);
  }

  getRecentSearchList() {
    const recentSearchParams: any = {};
    recentSearchParams.page = 0;
    recentSearchParams.pageSize = 3;
    this.getRecentSearchListEmitter.emit(recentSearchParams);
  }

  onItemSelection(item) {
    this.onItemSelectionEmitter.emit(item);
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    if (this.searchListTimeout) {
      clearTimeout(this.searchListTimeout);
    }
  }
}
