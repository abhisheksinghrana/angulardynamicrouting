import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { formatFloat } from '../helper-functions/util';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  @Input()
  max: number;
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete'
  ];

  constructor(private _element: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 65) {
      return;
    }
    const current: string = this._element.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
    if (this.max && formatFloat(next) > this.max) {
      this._element.nativeElement.value = '';
    }
  }
}
