import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask, StatusTask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '@shared';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';
import { Toast } from "../toast/toast";
import { ToastService } from '../../services/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule, FormsModule, MatButtonModule, ButtonComponent, TooltipDirective, Toast],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss'
})
export class ToDoListItem {
  constructor(private toastService: ToastService) {}
  @Input() public tasks:ITask[] = [];
  private readonly tasksService = inject(TasksService);

  public selectedTask?: ITask | null;
  public editTaskFlag: boolean = false;
  public changingTask?: ITask;
  public changingTitle?: string;
  public changingDescription?: string;
  public filter: StatusTask | null = null;
  private taskSubscription?: Subscription;

  public delTask(idTask: number): void{
    this.taskSubscription = this.tasksService.delTask(idTask).subscribe(() => {
      this.selectedTask = null;
      this.toastService.success('Задача удалена!');
    }, error => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
    });
  }

  public selectTask(task: ITask): void{
    this.selectedTask != task? this.selectedTask = task : this.selectedTask = null;
    this.editTaskFlag = false;
  }

  public editTask(){
    if(this.selectedTask){
      this.changingTask = {...this.selectedTask}
      this.changingTitle = this.changingTask?.title;
      this.changingDescription = this.changingTask?.description;
      this.editTaskFlag = !this.editTaskFlag
    }
  }

  public saveChangesTask(){
    if(this.changingTask && this.changingTitle){
      this.changingTask.title = this.changingTitle;
      this.changingTask.description = this.changingDescription;
      this.taskSubscription = this.tasksService.changeTask(this.changingTask).subscribe(()=>{
        this.editTaskFlag = !this.editTaskFlag;
        this.selectedTask = this.changingTask;
        this.toastService.success('Задача обновлена!')
      }, error => {
        this.toastService.error(`Ошибка ответа API: ${error.message}`);
      });
    }
  }

  public changeStatusTask(task: ITask){
    let status = task.status === 'Completed';
    task.status = status? 'InProgress' : 'Completed';
    this.taskSubscription = this.tasksService.changeTask(task).subscribe(()=>{
      this.toastService.success('Статус задачи обновлен!')
    }, error => {
      this.toastService.error(`Ошибка ответа API: ${error.message}`);
    });
  }

  public selectFilter(selectStatus: StatusTask | null): void{
    this.filter = selectStatus;
  }

  ngOnDestroy(){
    if(this.taskSubscription){
      this.taskSubscription.unsubscribe();
    }
  }

}
