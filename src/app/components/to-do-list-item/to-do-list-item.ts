import { Component, DestroyRef, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask, StatusTask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '@shared';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';
import { Toast } from "../toast/toast";
import { ToastService } from '../../services/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToDoItemView } from '../to-do-item-view';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule, FormsModule, MatButtonModule, ButtonComponent, TooltipDirective, Toast, ToDoItemView],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss'
})
export class ToDoListItem {

  public tasks = input<ITask[]>([]);

  private readonly toastService = inject(ToastService);
  private readonly tasksService = inject(TasksService);

  public selectedTask?: ITask | null;
  public editTaskFlag: boolean = false;
  public filter: StatusTask | null = null;
  private destroyRef = inject(DestroyRef)

  public selectTask(task: ITask): void{
    this.selectedTask != task? this.selectedTask = task : this.selectedTask = null;
    this.editTaskFlag = false;
  }

  public selectedTaskUpdate(updateSelectedTask: ITask | null){
    this.selectedTask = updateSelectedTask;
  }

  public changeStatusTask(task: ITask){
    let status = task.status === 'Completed';
    task.status = status? 'InProgress' : 'Completed';
    this.tasksService.changeTask(task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.success('Статус задачи обновлен!')
      },
      error: (error) => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
      }
    });
  }

  public selectFilter(selectStatus: StatusTask | null): void{
    this.filter = selectStatus;
  }
}
