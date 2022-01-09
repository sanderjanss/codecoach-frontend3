import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('ratio') parallaxRatio : number = 1
  initialTop : number = 0

  constructor(private elementReference : ElementRef) {
    this.initialTop = this.elementReference.nativeElement.getBoundingClientRect().top
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event: Event){
    this.elementReference.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px'
  }
}
