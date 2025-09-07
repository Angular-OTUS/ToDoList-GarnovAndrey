import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ButtonComponent } from '../button-component/button-component';


@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, ButtonComponent],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})


export class ToDoList {

  public newTaskText?: string;
  public isLoading: boolean = true;

  tasks: ITask[] = [
    {id: 1, text: 'Составить план на день / пересмотреть приоритеты'},
    {id: 2, text: 'Прочитать 10 отложенных статей по Angular'},
    {id: 3, text: 'Убраться на рабочем столе или в одной зоне дома'}
  ]

  ngOnInit(){
    setTimeout(()=>{
      this.isLoading = !this.isLoading;
    }, 500)
  }

  private getTasksId(): number{
    const tasksId = this.tasks.length != 0? this.tasks.map(task => task.id) : [0];
    const maxIdTask = Math.max.apply(null, tasksId) + 1;
    return maxIdTask;
  }

  public addTask(): void{
    this.tasks.push({id: this.getTasksId(), text: String(this.newTaskText)});
    this.newTaskText = undefined;
  }

}
