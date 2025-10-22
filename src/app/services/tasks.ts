import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: ITask[] = [
    {id: 1, title: 'Составить план на день / пересмотреть приоритеты', description: 'Подробно описать каждое действие', status: 'InProgress'},
    {id: 2, title: 'Прочитать 10 отложенных статей по Angular', description: '1 статья: Про хуки, 2 статья: про лучшие практики...', status: 'Completed'},
    {id: 3, title: 'Убраться на рабочем столе или в одной зоне дома', description: 'Убрать все лишнее с рабочего стола и освободить рабочую зону для комфортного время препровождения', status: 'InProgress'}
  ]

  private todoSubject = new BehaviorSubject<ITask[]>(this.tasks);
  public tasks$ = this.todoSubject.asObservable();

  public getTasks(): ITask[]{
    return [...this.tasks];
  }

  private getTasksId(): number{
    const tasksId = this.tasks.length != 0? this.tasks.map(task => task.id) : [0];
    const maxIdTask = Math.max.apply(null, tasksId) + 1;
    return maxIdTask;
  }

  public addTask(newTaskText: string, newTaskTextDescription: string): void{
    this.tasks.push({id: this.getTasksId(), title: newTaskText, description: newTaskTextDescription, status: 'InProgress'});
    this.todoSubject.next([...this.tasks]);
  }

  public changeTask(changingTask: ITask): void{
    let indexToChange = this.tasks.findIndex(task => task.id == changingTask.id);
    if(indexToChange != -1){
      this.tasks[indexToChange].title = changingTask.title;
      this.tasks[indexToChange].description = changingTask.description;
      this.todoSubject.next([...this.tasks]);
    }
  }

  public delTask(idTask: number): void{
    let indexToDel = this.tasks.findIndex(task => task.id == idTask);
    indexToDel != -1? this.tasks.splice(indexToDel, 1) : console.log('Error');
    this.todoSubject.next([...this.tasks]);
  }

  public CompletingTask(idTask: number, status: boolean ): void{
    let indexToStatus = this.tasks.findIndex(task => task.id == idTask);
    if(indexToStatus != -1){
      this.tasks[indexToStatus].status = status? 'InProgress' : 'Completed';
      this.todoSubject.next([...this.tasks]);
    }
  }
}
