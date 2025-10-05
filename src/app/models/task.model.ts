export type TStatus = 'success' | 'error' | 'info';

export interface ITask {
  id: number;
  title: string;
  description?: string;
}

export interface IToast {
  id: number;
  status: TStatus;
  message: string;
}
