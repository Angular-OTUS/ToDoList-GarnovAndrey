import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./components/todo-list-page').then(c => c.ToDoListPage),
    title: 'Tasks',
    pathMatch: 'prefix',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./components/todo-item').then(c => c.ToDoItem)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
  }
];
