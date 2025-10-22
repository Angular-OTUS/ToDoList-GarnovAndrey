export type TStatus = 'success' | 'error' | 'info';

export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: StatusTask;
}

export interface IToast {
  id: number;
  status: TStatus;
  message: string;
}

type StatusTask = 'InProgress' | 'Completed';
