import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { LoadingComponent } from '@shared';
import { TasksService } from '../../services/tasks';
import { Subscription } from 'rxjs';
import { TodoCreateItem } from '../todo-create-item/todo-create-item';
import { ToastService } from '@app/services/toast';



@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, LoadingComponent, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})


export class ToDoList implements OnInit, OnDestroy {
  constructor(private toastService : ToastService) {}
  private readonly tasksService = inject(TasksService)

  public newTaskText?: string;
  public newTaskTextDescription?: string;
  public isLoading: boolean = true;

  public tasks: ITask[] = [];
  private tasksSubscription?: Subscription;

  ngOnInit(){
    setTimeout(()=>{
      this.isLoading = !this.isLoading;
    }, 500);
    this.tasksSubscription = this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    }, error => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
    });
  }

  ngOnDestroy() {
    if(this.tasksSubscription){
      this.tasksSubscription.unsubscribe();
    }
  }

}
