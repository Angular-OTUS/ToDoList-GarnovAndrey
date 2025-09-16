import { ComponentRef, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { Tooltip } from '../components/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('appTooltip') tooltipTextHelp: string = '';

  private componentRef: ComponentRef<Tooltip> | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private viewContainerRef: ViewContainerRef) {

  }

  @HostBinding('style.color') color: string = '';

  @HostListener('mouseenter') onMouseEnter(){
    this.onShow();

  }

  @HostListener('mouseleave') onMouseLeave(){
    this.onHide();
  }

  private onShow(): void {
    if(!this.componentRef){
      // Создаем компонент
      this.componentRef = this.viewContainerRef.createComponent(Tooltip);
      // Передаем данные
      this.componentRef.instance.tooltipTextHelp = this.tooltipTextHelp;
      const {left, right, bottom} = this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
      this.componentRef.instance
      // Добавляем в DOM
      const tooltipElement = this.componentRef.location.nativeElement;
      this.renderer.appendChild(document.body, tooltipElement);
    }
  }

  private onHide(): void {
    if(this.componentRef){
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  ngOnDestroy(): void{
    this.onHide();
  }

}
