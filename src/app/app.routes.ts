import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./components/to-do-list').then(c => c.ToDoList),
    title: 'Tasks',
    pathMatch: 'prefix',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./components/to-do-item-view').then(c => c.ToDoItemView)
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
