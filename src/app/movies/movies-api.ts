import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieModel } from './movies-model';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  httpClient = inject(HttpClient);

  getMovies(term: string): Observable<MovieModel[]> {
    return this.httpClient
      .get<{
        movies: MovieModel[];
      }>('/assets/movies.json')
      .pipe(
        map((mv) => {
          if (term.trim().length === 0) return mv.movies;
          return mv.movies.filter((m) => m.name.toLowerCase().includes(term.toLowerCase()));
        }),
      );
  }
}
