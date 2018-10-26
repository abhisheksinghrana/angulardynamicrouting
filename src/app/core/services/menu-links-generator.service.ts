import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MenuLinksGeneratorService {
  menuList = new EventEmitter<any>();

  constructor() {}

  generate(menuLinksArray: any[]) {
    this.menuList.emit(menuLinksArray);
  }
}
