import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button-component',
  imports: [MatButtonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {

  @Input({required: false}) public title: string = 'Кнопка';

}
