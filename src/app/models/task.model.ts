export interface ITask {
  id: number;
  title: string;
  description?: string;
}

export interface IToast {
  id: number;
  status: 'success' | 'error' | 'info';
  message: string;
}
