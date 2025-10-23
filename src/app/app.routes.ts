import { Routes } from '@angular/router';
import { THEATERS_ROUTES } from './theaters/theaters.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.routes').then((m) => m.MOVIES_ROUTES),
  },
  // {
  //   path: 'theaters',
  //   children: THEATERS_ROUTES
  // }
  {
    path: 'theaters',
    loadChildren: () => import('./theaters/theaters.routes').then((m) => m.THEATERS_ROUTES),
  },
];
