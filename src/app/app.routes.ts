import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/to-do-list').then(c => c.ToDoList),
    title: 'Tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];
