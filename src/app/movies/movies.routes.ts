import { Movie } from './movie/movie';
import { Routes } from '@angular/router';
import { Movies } from './movies';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: Movies,
    children: [
      {
        path: ':id',
        component: Movie,
      },
    ],
  },
];
