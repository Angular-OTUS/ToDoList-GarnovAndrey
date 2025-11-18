import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'backlog',
    loadComponent: () => import('./pages/backlog').then(c => c.BacklogPage),
    title: 'Backlog',
    pathMatch: 'prefix',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./pages/backlog/todo-item').then(c => c.ToDoItem)
      }
    ]
  },
  {
    path: 'board',
    loadComponent: () => import('./pages/board').then(c => c.BoardPage),
    title: 'Board',
    pathMatch: 'prefix',
  },
  {
    path: '',
    // title: 'TasksBoard',
    redirectTo: 'tasksBoard',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: 'tasksBoard',
    pathMatch: 'prefix'
  }
];
