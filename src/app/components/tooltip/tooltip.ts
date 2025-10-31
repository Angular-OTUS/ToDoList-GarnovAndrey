import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  imports: []
})

export class Tooltip {
  public tooltipTextHelp = input<string>('');
  public left = input<number>(0);
  public top = input<number>(0);
}
