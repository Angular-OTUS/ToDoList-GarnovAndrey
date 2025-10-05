import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ButtonComponent } from '../button-component/button-component';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';
import { Toast } from "../toast/toast";
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, ButtonComponent, TooltipDirective, Toast],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})


export class ToDoList {
  constructor(private toastService : ToastService) {}
  private readonly tasksService = inject(TasksService)

  public newTaskText?: string;
  public newTaskTextDescription?: string;
  public isLoading: boolean = true;

  public tasks: ITask[] = [];

  ngOnInit(){
    setTimeout(()=>{
      this.isLoading = !this.isLoading;
    }, 500)
    this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  public addTask(): void{
    this.tasksService.addTask(String(this.newTaskText), String(this.newTaskTextDescription));
    this.newTaskText = undefined;
    this.newTaskTextDescription = undefined;
    this.toastService.success('Задача добавлена!')
  }

}
