import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, Input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '@app/models/task.model';
import { TasksService } from '@app/services/tasks';
import { ToastService } from '@app/services/toast';
import { ButtonComponent } from '@app/shared';

@Component({
  selector: 'app-to-do-item-view',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss'
})
export class ToDoItemView implements OnInit {

  private readonly tasksService = inject(TasksService);
  private readonly toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef)
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  public selectedTask?: ITask | null;
  public editTaskFlag: boolean = false;
  public changingTask?: ITask;
  public changingTitle?: string;
  public changingDescription?: string;

  ngOnInit(){
    this.#route.params.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const taskId = params['id'];
      this.getSelectedTask(taskId);
    });
  }

  public getSelectedTask(idTask: number){
    this.tasksService.getTask(idTask).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.selectedTask = data;
      },
      error: (error) => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
      }
    })
  }

  public editTask(){
    if(this.selectedTask){
      this.changingTask = {...this.selectedTask} as ITask;
      this.changingTitle = this.changingTask?.title;
      this.changingDescription = this.changingTask?.description;
      this.editTaskFlag = !this.editTaskFlag
    }
  }

  public saveChangesTask(){
    if(this.changingTask && this.changingTitle){
      this.changingTask.title = this.changingTitle;
      this.changingTask.description = this.changingDescription;
      this.tasksService.changeTask(this.changingTask).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () =>{
          this.editTaskFlag = !this.editTaskFlag;
          this.selectedTask = this.changingTask;
          this.toastService.success('Задача обновлена!')
        },
        error: (error) => {
        this.toastService.error(`Ошибка ответа API: ${error.message}`);
        }
      });
    }
  }

  public delTask(idTask: number): void{
    this.tasksService.delTask(idTask).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.selectedTask = null;
        this.toastService.success('Задача удалена!');
        this.#router.navigate(['']);
      }, error: (error) => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
      }
    });
  }
}
