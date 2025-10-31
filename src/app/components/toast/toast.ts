import { Component, DestroyRef, inject } from '@angular/core';
import { IToast } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  private destroyRef = inject(DestroyRef)
  private toastService = inject(ToastService);
  toasts$ = this.toastService.getToasts().pipe(takeUntilDestroyed(this.destroyRef));
}
