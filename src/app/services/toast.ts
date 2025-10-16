import { Injectable } from '@angular/core';
import { IToast, TStatus } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private toasts: IToast[] = [];
  private toastsSubject = new BehaviorSubject<IToast[]>([]);
  private nextId: number = 0;

  private show(toast: IToast):void{
    if(this.toasts){
      this.toasts.push(toast);
      this.toastsSubject.next([...this.toasts]);
    }
    setTimeout(()=>{
      this.remove(toast.id)
    }, 5000)
  }

  private remove(toastId: number){
    if(this.toasts){
      this.toasts = this.toasts?.filter(toast => toast.id !== toastId);
      this.toastsSubject.next([...this.toasts]);
    }
  }

  public getToasts(): Observable<IToast[]> {
    return this.toastsSubject.asObservable();
  }


  public success(message: string): void{
    this.show({id: this.nextId++, status: 'success', message: message });
  }

  public error(message: string): void{
    this.show({id: this.nextId++, status: 'error', message: message })
  }

  public info(message: string): void{
    this.show({id: this.nextId++, status: 'info', message: message })
  }

}
