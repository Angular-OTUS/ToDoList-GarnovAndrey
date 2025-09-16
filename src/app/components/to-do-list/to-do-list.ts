import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ButtonComponent } from '../button-component/button-component';
import { TooltipDirective } from '../../directives';


@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, ButtonComponent, TooltipDirective],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})


export class ToDoList {

  public newTaskText?: string;
  public newTaskTextDescription?: string;
  public isLoading: boolean = true;

  tasks: ITask[] = [
    {id: 1, text: 'Составить план на день / пересмотреть приоритеты', description: 'Подробно описать каждое действие'},
    {id: 2, text: 'Прочитать 10 отложенных статей по Angular', description: '1 статья: Про хуки, 2 статья: про лучшие практики...'},
    {id: 3, text: 'Убраться на рабочем столе или в одной зоне дома', description: 'Убрать все лишнее с рабочего стола и освободить рабочую зону для комфортного время препровождения'}
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
    this.tasks.push({id: this.getTasksId(), text: String(this.newTaskText), description: String(this.newTaskTextDescription)});
    this.newTaskText = undefined;
  }

}
