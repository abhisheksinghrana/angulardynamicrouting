import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { UtilService } from '../services/util.service';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  @Input() max: number;
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(
    private _element: ElementRef,
    private _utilService: UtilService
  ) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this._element.nativeElement.value;
    const next: string = current.concat(event.key);
    if (
      (next && !String(next).match(this.regex)) ||
      (this.max && this._utilService.parseFloat(next) > this.max)
    ) {
      event.preventDefault();
    }
  }
}
