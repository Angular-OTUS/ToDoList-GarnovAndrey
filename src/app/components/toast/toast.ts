import { Component, Input } from '@angular/core';
import { IToast } from '../../models/task.model';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  @Input() status?: string = 'Success';
  @Input() message?: string = 'Ваша задача успешно добавлена';
  public toasts?: IToast[];

}
