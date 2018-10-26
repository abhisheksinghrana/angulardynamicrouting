import {
  Directive,
  ContentChild,
  AfterContentInit,
  ElementRef,
  OnDestroy,
  Inject,
  forwardRef
} from '@angular/core';
import {
  NgbDropdownMenu,
  NgbDropdown
} from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[ngbDropdown][ngbDropdownReposition]'
})
export class DropdownPositionDirective implements AfterContentInit, OnDestroy {
  @ContentChild(NgbDropdownMenu) private menu: NgbDropdownMenu;
  @ContentChild(NgbDropdownMenu, { read: ElementRef })
  private menuRef: ElementRef;

  private oldParent: HTMLElement | null;
  private menuWrapper: HTMLElement;
  private readonly onChangeSubscription: Subscription;

  constructor(
    @Inject(forwardRef(() => NgbDropdown))
    private dropdown: NgbDropdown,
    private elementRef: ElementRef
  ) {
    this.onChangeSubscription = this.dropdown.openChange.subscribe(
      (open: boolean) => {
        if (!open) {
          setTimeout(() => this.removeMenuFromBody(), 0);
        }
      }
    );
  }

  ngAfterContentInit() {
    this.oldParent = (<HTMLElement>this.menuRef.nativeElement).parentElement;
    this.createWrapper();
    this.menu.position = (triggerEl: HTMLElement, placement: string) => {
      this.setWrapperWidth();

      if (!this.isInBody()) {
        this.appendMenuToBody();
      }

      positionElements(triggerEl, this.menuWrapper, placement, true);
      this.menu.applyPlacement(
        positionElements(triggerEl, this.menuRef.nativeElement, placement)
      );
    };
  }

  ngOnDestroy() {
    this.removeMenuFromBody();
    if (this.onChangeSubscription) {
      this.onChangeSubscription.unsubscribe();
    }
  }

  private isInBody() {
    return this.menuWrapper.parentNode === document.body;
  }

  private removeMenuFromBody() {
    if (this.isInBody()) {
      if (this.oldParent) {
        this.oldParent.appendChild(this.menuWrapper);
      }
    }
  }

  private appendMenuToBody() {
    window.document.body.appendChild(this.menuWrapper);
  }

  private createWrapper() {
    this.menuWrapper = document.createElement('div');
    this.menuWrapper.style.position = 'absolute';
    this.menuWrapper.style.zIndex = '1030';

    this.menuWrapper.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        this.dropdown.closeFromOutsideEsc();
      }
    });
    this.menuWrapper.appendChild(this.menuRef.nativeElement);
  }

  private setWrapperWidth() {
    const parentEl = <HTMLElement>this.elementRef.nativeElement;
    this.menuWrapper.style.width = parentEl.clientWidth + 'px';
  }
}
