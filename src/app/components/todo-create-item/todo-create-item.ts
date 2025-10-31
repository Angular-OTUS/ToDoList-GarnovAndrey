import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@app/directives';
import { TasksService } from '@app/services/tasks';
import { ToastService } from '@app/services/toast';
import { ButtonComponent } from '@shared'
import { Toast } from '../toast/toast';
import { ITaskNew } from '@app/models/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-create-item',
  imports: [CommonModule, FormsModule, ButtonComponent, TooltipDirective, Toast],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.scss'
})

export class TodoCreateItem {
  private readonly toastService = inject(ToastService);
  private readonly tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);
  public newTaskText?: string;
  public newTaskTextDescription?: string;
  public newTask?: ITaskNew;

  public addTask(): void{
    this.newTask = {title: String(this.newTaskText), description: String(this.newTaskTextDescription), status: 'InProgress'};
    this.tasksService.addTask(this.newTask).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=> {
      this.newTaskText = undefined;
      this.newTaskTextDescription = undefined;
      this.toastService.success('Задача добавлена!');
    }, error => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
    });
  }

}
