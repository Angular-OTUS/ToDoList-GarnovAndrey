import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule, FormsModule, MatButtonModule, ButtonComponent],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss'
})
export class ToDoListItem {

  @Input() public tasks:ITask[] = [];


  public delTask(idTask: number): void{
    let indexToDel = this.tasks.findIndex(task => task.id == idTask);
    this.tasks.splice(indexToDel, 1);
  }
}
