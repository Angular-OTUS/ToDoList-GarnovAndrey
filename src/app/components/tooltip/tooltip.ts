import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  imports: []
})

export class Tooltip {

  @Input() tooltipTextHelp: string = '';
  @Input() left: number = 0;
  @Input() top: number = 0;
}
