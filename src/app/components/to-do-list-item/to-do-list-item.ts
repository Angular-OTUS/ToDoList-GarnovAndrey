import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { ButtonComponent } from '../button-component/button-component';
import { TooltipDirective } from '../../directives';
import { TasksService } from '../../services/tasks';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule, FormsModule, MatButtonModule, ButtonComponent, TooltipDirective],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss'
})
export class ToDoListItem {
  @Input() public tasks:ITask[] = [];

  private readonly taskService = inject(TasksService);

  public selectedTask?: ITask | null;
  public editTaskFlag: boolean = false;
  public changingTask?: ITask;
  public changingTitle?: string;
  public changingDescription?: string;

  public delTask(idTask: number): void{
    this.taskService.delTask(idTask);
    this.selectedTask = null;
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
      this.taskService.changeTask(this.changingTask);
    }
  }
}
