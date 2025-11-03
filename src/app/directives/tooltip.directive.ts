import { ComponentRef, Directive, ElementRef, HostBinding, HostListener, inject, input, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { Tooltip } from '../components/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  public tooltipTextHelp = input<string>('', {alias: 'appTooltip'});

  private componentRef: ComponentRef<Tooltip> | null = null;
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);

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
      this.componentRef.setInput('tooltipTextHelp', this.tooltipTextHelp());
      const {left, right, bottom} = this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.setInput('left', (right - left) / 2 + left);
      this.componentRef.setInput('top', bottom);

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
