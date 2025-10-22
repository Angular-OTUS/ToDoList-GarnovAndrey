import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@app/directives';
import { TasksService } from '@app/services/tasks';
import { ToastService } from '@app/services/toast';
import { ButtonComponent } from '@shared'
import { Toast } from '../toast/toast';

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

  public addTask(): void{
    this.tasksService.addTask(String(this.newTaskText), String(this.newTaskTextDescription));
    this.newTaskText = undefined;
    this.newTaskTextDescription = undefined;
    this.toastService.success('Задача добавлена!')
  }

}
