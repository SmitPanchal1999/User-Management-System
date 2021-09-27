import { Directive } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ElementRef, AfterViewInit } from '@angular/core';
@Directive({
  selector: '[appStopPropogation]'
})
export class StopPropogationDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef,) { }
  public ngAfterViewInit() {
    fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true })
      .subscribe(event => {
        event.stopPropagation();
      });
  }
}
