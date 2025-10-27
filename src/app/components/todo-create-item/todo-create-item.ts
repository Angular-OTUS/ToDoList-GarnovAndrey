import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@app/directives';
import { TasksService } from '@app/services/tasks';
import { ToastService } from '@app/services/toast';
import { ButtonComponent } from '@shared'
import { Toast } from '../toast/toast';
import { ITask, ITaskNew } from '@app/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-create-item',
  imports: [CommonModule, FormsModule, ButtonComponent, TooltipDirective, Toast],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.scss'
})

export class TodoCreateItem {
  constructor(private toastService : ToastService){}
  private readonly tasksService = inject(TasksService)
  public newTaskText?: string;
  public newTaskTextDescription?: string;
  private tasksSubscription?: Subscription;
  public newTask?: ITaskNew;

  public addTask(): void{
    this.newTask = {title: String(this.newTaskText), description: String(this.newTaskTextDescription), status: 'InProgress'};
    this.tasksSubscription = this.tasksService.addTask(this.newTask).subscribe(()=> {
      this.newTaskText = undefined;
      this.newTaskTextDescription = undefined;
      this.toastService.success('Задача добавлена!');
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
