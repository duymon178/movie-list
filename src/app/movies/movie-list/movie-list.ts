import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { MovieModel } from '../movies-model';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-movie-list',
  imports: [Movie],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  movies = input.required<MovieModel[]>();

  moviesList = linkedSignal(() => this.movies());

  onToggleFavorite(movieId: string): void {
    this.moviesList.update((list) =>
      list.map((mv: MovieModel) => {
        if (mv.id === movieId) {
          mv.favorite = !mv.favorite;
        }

        return { ...mv };
      }),
    );

    // this.moviesList.update((list) =>
    //   list
    //     .map((mv: MovieModel) => {
    //       if (mv.id === movieId) {
    //         mv.favorite = !mv.favorite;s
    //       }

    //       return mv;
    //     })
    //     .sort((a, b) => a.name.localeCompare(b.name)),
    // );
  }

  clearFavs(): void {
    this.moviesList.update((list) =>
      list.map((mv: MovieModel) => {
        mv.favorite = false;

        return { ...mv };
        //return mv;
      }),
    );
  }
}
