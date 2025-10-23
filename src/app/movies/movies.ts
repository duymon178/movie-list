import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, EMPTY, Observable, Subscription, switchMap, tap } from 'rxjs';
import { MoviesSkeleton } from '../ui/skeleton/movies-skeleton/movies-skeleton';
import { Movie } from './movie/movie';
import { MoviesApi } from './movies-api';
import { MovieModel } from './movies-model';

@Component({
  selector: 'app-movies',
  imports: [Movie, MoviesSkeleton, FormsModule, ReactiveFormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movies implements OnInit, OnDestroy {
  moviesApi = inject(MoviesApi);

  isLoading = signal(false);
  movies = signal<MovieModel[]>([]);

  moviesResult$!: Observable<MovieModel[]>;
  sub?: Subscription;

  searchTerm = new FormControl('', { nonNullable: true });
  searchTerm$ = this.searchTerm.valueChanges.pipe(
    debounceTime(400),
    tap(() => this.isLoading.set(true)),
  );

  ngOnInit(): void {
    this.declareMovieResult();
    this.subscriptions();
  }

  declareMovieResult(): void {
    this.moviesResult$ = this.searchTerm$.pipe(
      debounceTime(2000),
      switchMap((term: string) => {
        return this.moviesApi.getMovies(term).pipe(
          catchError(() => {
            this.isLoading.set(false);
            return EMPTY;
          }),
        );
      }),
    );
  }

  subscriptions(): void {
    this.sub = this.moviesResult$.subscribe((movies: MovieModel[]) => {
      this.movies.set(movies);
      this.isLoading.set(false);
      console.log(movies);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
