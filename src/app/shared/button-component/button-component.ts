import { Component, input, output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button-component',
  imports: [MatButtonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {

  public disabledState = input<boolean>(false);
  public onClick = output<void>();

  onClickBtn() {
    if(!this.disabledState()){
      this.onClick.emit();
    }
  }

}
