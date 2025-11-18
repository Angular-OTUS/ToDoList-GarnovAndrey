import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'backlog',
    loadComponent: () => import('./components/todo-list-page').then(c => c.ToDoListPage),
    title: 'Backlog',
    pathMatch: 'prefix',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./components/todo-item').then(c => c.ToDoItem)
      }
    ]
  },
  {
    path: 'board',
    loadComponent: () => import('./components/todo-list-page').then(c => c.ToDoListPage),
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
