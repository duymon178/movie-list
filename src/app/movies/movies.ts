import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, EMPTY, Observable, startWith, switchMap, tap } from 'rxjs';
import { MoviesSkeleton } from '../ui/skeleton/movies-skeleton/movies-skeleton';
import { MovieList } from './movie-list/movie-list';
import { MoviesApi } from './movies-api';
import { MovieModel } from './movies-model';

@Component({
  selector: 'app-movies',
  imports: [MovieList, MoviesSkeleton, FormsModule, ReactiveFormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movies implements OnInit {
  moviesApi = inject(MoviesApi);
  destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  movies = signal<MovieModel[]>([]);

  moviesResult$!: Observable<MovieModel[]>;

  searchTerm = new FormControl('', { nonNullable: true });
  searchTerm$ = this.searchTerm.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    tap(() => this.isLoading.set(true)),
  );

  ngOnInit(): void {
    this.declareMovieResult();
    this.subscriptions();
  }

  declareMovieResult(): void {
    this.moviesResult$ = this.searchTerm$.pipe(
      debounceTime(1000),
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
    this.moviesResult$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies: MovieModel[]) => {
        this.movies.set(movies);
        this.isLoading.set(false);
      });
  }
}
