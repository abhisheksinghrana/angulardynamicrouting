import {
  Directive,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input
} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appCustomScroll]'
})
export class CustomScrollDirective implements OnInit, AfterViewInit {
  element: Element;
  @Input('axis') axis = 'y';

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    this.element = this._element.nativeElement;
  }

  ngAfterViewInit() {
    this._initCustomScrollbar();
  }

  private _initCustomScrollbar() {
    const axis: 'x' | 'y' | 'yx' = <'x' | 'y' | 'yx'>this.axis;
    $(this.element).mCustomScrollbar({
      scrollInertia: 500,
      theme: 'dark-thick',
      axis: axis
    });
  }
}
