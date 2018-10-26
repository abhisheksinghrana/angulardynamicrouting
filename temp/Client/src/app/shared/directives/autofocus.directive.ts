import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  private _autofocus;

  constructor(private _element: ElementRef) {}

  ngAfterViewInit() {
    if (this._autofocus) {
      const el: HTMLInputElement = this._element.nativeElement;

      if (el.focus) {
        el.focus();
      } else {
        console.warn(
          'AutofocusDirective: There is no .focus() method on the element:',
          this._element.nativeElement
        );
      }
    }
  }

  @Input()
  public set autofocus(value: any) {
    this._autofocus =
      value !== false &&
      value !== null &&
      value !== undefined &&
      value !== 0 &&
      value !== 'false' &&
      value !== 'null' &&
      value !== 'undefined' &&
      value !== '0';
  }
}
