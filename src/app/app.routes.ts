import { Routes } from '@angular/router';

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
  {
    path: 'theaters',
    loadChildren: () => import('./theaters/theaters.routes').then((m) => m.THEATERS_ROUTES),
  },
];
