import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MovieModel } from '../movies-model';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movie {
  movie = input.required<MovieModel>();
}
