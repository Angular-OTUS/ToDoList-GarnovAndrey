import { inject, Injectable, signal } from '@angular/core';
import { ITask } from '../models/task.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl: string = "http://localhost:3000";
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  public toastService = inject(ToastService);

  public pendingTask = signal<ITask[]>([]);
  public inProgressTask = signal<ITask[]>([]);
  public doneTask = signal<ITask[]>([]);

  constructor(private http: HttpClient) {
    this.getTasks();
    this.groupingTask();
  }

  public getTasks(){
    this.http.get<ITask[]>(`${this.apiUrl}/tasks`).subscribe(tasks => this.tasksSubject.next(tasks.reverse()))
  }

  public getTask(idTask: number){
    return this.http.get<ITask>(`${this.apiUrl}/tasks/${idTask}`);
  }

  public addTask(newTask: Omit<ITask, 'id'>){
    return this.http.post<ITask>(`${this.apiUrl}/tasks`, newTask).pipe(
      tap(newTask => {
        this.tasksSubject.next([newTask, ...this.tasksSubject.value]);
      })
    );
  }

  public changeTask(changingTask: ITask){
    return this.http.put<ITask>(`${this.apiUrl}/tasks/${changingTask.id}`, changingTask).pipe(
      tap(changedTask => {
        const checkChangedTaskIndex = this.tasksSubject.value.findIndex(task => task.id === changedTask.id);
        if(checkChangedTaskIndex !== -1){
          const update = [...this.tasksSubject.value];
          update[checkChangedTaskIndex] = changedTask;
          this.tasksSubject.next(update);
        }
      })
    );
  }

  public delTask(idTask: number){
    return this.http.delete<void>(`${this.apiUrl}/tasks/${idTask}`).pipe(
      tap(() => {
        this.tasksSubject.next(this.tasksSubject.value.filter(task => task.id !== idTask));
      })
    );
  }

  public groupingTask() {
    this.tasks$.pipe(tap((tasks) => {
      this.pendingTask.set(tasks.filter(task => task.status === 'NewTask'));
      this.inProgressTask.set(tasks.filter(task => task.status === 'InProgress'));
      this.doneTask.set(tasks.filter(task => task.status === 'Completed'));
    })).subscribe()
  }
}
