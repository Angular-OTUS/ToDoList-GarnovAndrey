export type TStatus = 'success' | 'error' | 'info';

export interface ITaskNew {
  title: string;
  description?: string;
  status: StatusTask;
}

export interface ITask extends ITaskNew {
  id: number;
}

export interface ITaskState{
  tasks: ITask[];
  isLoading: boolean;
  error: string | null;
}

export interface IToast {
  id: number;
  status: TStatus;
  message: string;
}

export type StatusTask = 'NewTask' | 'InProgress' | 'Completed';
