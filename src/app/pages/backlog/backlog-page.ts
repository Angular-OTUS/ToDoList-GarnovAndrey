import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITaskState } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '@shared';
import { TasksService } from '../../services/tasks';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { TodoCreateItem } from '@app/pages/backlog/todo-create-item/todo-create-item'
import { ToastService } from '@app/services/toast';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToDoList } from '@app/pages/backlog/todo-list';



@Component({
  selector: 'app-backlog-page',
  imports: [CommonModule, FormsModule, ToDoList, MatButtonModule, LoadingComponent, TodoCreateItem],
  templateUrl: './backlog-page.html',
  styleUrl: './backlog-page.scss'
})


export class BacklogPage {
  private readonly toastService = inject(ToastService);
  private readonly tasksService = inject(TasksService);

  private taskState$: Observable<ITaskState> = this.tasksService.tasks$.pipe(
    map((tasks) => ({tasks: tasks, isLoading: false, error: null})),
    catchError((error) => {
      const messageError = `Ошибка ответа API: ${error.message}`;
      this.toastService.error(messageError);
      return of({tasks: [], isLoading: false, error: messageError});
    }),
    startWith({tasks: [], isLoading: true, error: null})
  );

  private readonly taskState = toSignal(this.taskState$, {
    initialValue: {tasks: [], isLoading: true, error: null} as ITaskState,
  });

  public readonly tasks = computed(() => this.taskState().tasks);
  public readonly isLoading = computed(() => this.taskState().isLoading);
}
