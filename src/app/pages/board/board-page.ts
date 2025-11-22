import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '@app/models/task.model';
import { TasksService } from '@app/services/tasks';
import { ToastService } from '@app/services/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board-page',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPage {


  private readonly tasksService = inject(TasksService);
  private readonly toastService = inject(ToastService);

  private destroyRef = inject(DestroyRef)

  public pendingTask = this.tasksService.pendingTask;
  public inProgressTask = this.tasksService.inProgressTask;
  public doneTask = this.tasksService.doneTask;

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const dropTask = event.container.data[event.currentIndex];
      switch(event.container.id){
        case 'pendingListId':
          dropTask.status = 'NewTask';
        break;
        case 'inProgressListId':
          dropTask.status = 'InProgress';
        break;
        case 'doneListId':
          dropTask.status = 'Completed';
        break;
      }

      this.updateTaskStatus(dropTask);
    }
  }

  public updateTaskStatus(task: ITask) {
    this.tasksService.changeTask(task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
