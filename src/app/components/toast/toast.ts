import { Component, inject, Input } from '@angular/core';
import { IToast } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {

  toasts$: Observable<IToast[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.getToasts();
  }


}
