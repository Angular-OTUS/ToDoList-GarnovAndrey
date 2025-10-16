import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { ButtonComponent, LoadingComponent } from '@shared';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';
import { Toast } from "../toast/toast";
import { ToastService } from '../../services/toast';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule, ToDoListItem, MatButtonModule, ButtonComponent, TooltipDirective, Toast, LoadingComponent],
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
    }, 500)
    this.tasksSubscription = this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  ngOnDestroy() {
    if(this.tasksSubscription){
      this.tasksSubscription.unsubscribe();
    }
  }


  public addTask(): void{
    this.tasksService.addTask(String(this.newTaskText), String(this.newTaskTextDescription));
    this.newTaskText = undefined;
    this.newTaskTextDescription = undefined;
    this.toastService.success('Задача добавлена!')
  }

}
