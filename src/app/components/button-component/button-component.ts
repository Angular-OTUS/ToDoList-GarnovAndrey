import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button-component',
  imports: [MatButtonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {

  @Input({required: false}) public title: string = 'Кнопка';
  // @Input() public type: 'primary' | 'secondary' | 'danger';
  @Input() public disabledState: boolean = false;
  @Output() public onClick = new EventEmitter<void>;

  onClickBtn() {
    if(!this.disabledState){
      this.onClick.emit();
    }
  }

}
