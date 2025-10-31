import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, LoadingComponent, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})


export class ToDoList implements OnInit {
  private readonly toastService = inject(ToastService);
  private readonly tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);
  public isLoading = true;
  public tasks: ITask[] = [];

  ngOnInit(){
    setTimeout(()=>{
      this.isLoading = !this.isLoading;
    }, 500);
    this.tasksService.tasks$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tasks => {
      this.tasks = tasks;
    }, error => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
    });
  }
}
