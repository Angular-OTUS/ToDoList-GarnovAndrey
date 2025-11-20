import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { filterStatusColorDecor } from '@app/models/filter.model';
import { StatusTask } from '@app/models/task.model';

@Component({
  selector: 'app-button-filter',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button-filter.html',
  styleUrl: './button-filter.scss'
})
export class ButtonFilter {

  public filterBtnSelected = input(false);
  public filterStatus = input<StatusTask | null>(null);
  public disabledState = input(false);
  public onClick = output<void>();

  public onClickBtn() {
    if(!this.disabledState()){
      this.onClick.emit();
    }
  }

  public filterStatusColor(filterStatus: StatusTask | null): string {
    switch(filterStatus){
      case 'InProgress':
        return filterStatusColorDecor.InProgress;
      case 'Completed':
        return filterStatusColorDecor.Completed;
      default:
        return '';
    }
  }

}
