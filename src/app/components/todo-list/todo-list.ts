import { Component, DestroyRef, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask, StatusTask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';
import { Toast } from "../../components/toast/toast";
import { ToastService } from '../../services/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ButtonFilter } from "@app/shared/button-filter/button-filter";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, MatButtonModule, ButtonFilter, TooltipDirective, Toast, RouterOutlet, RouterLinkWithHref, RouterLinkActive, ButtonFilter],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class ToDoList {

  public tasks = input<ITask[]>([]);

  private readonly toastService = inject(ToastService);
  private readonly tasksService = inject(TasksService);

  public filter: StatusTask | null = null;
  private destroyRef = inject(DestroyRef)

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
