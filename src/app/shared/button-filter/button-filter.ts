import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StatusTask } from '@app/models/task.model';

@Component({
  selector: 'app-button-filter',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-filter.html',
  styleUrl: './button-filter.scss'
})
export class ButtonFilter {

  public filterBtnSelected = input<boolean>(false);
  public filterStatus = input<StatusTask | null>(null);
  public disabledState = input<boolean>(false);
  public onClick = output<void>();

  public onClickBtn() {
    if(!this.disabledState()){
      this.onClick.emit();
    }
  }

  public filterStatusColor(filterStatus: StatusTask | null): string {
    switch(filterStatus){
      case 'InProgress':
        return '#4CBAFE';
      case 'Completed':
        return '#C5FE4C';
      default:
        return '';
    }
  }

}
