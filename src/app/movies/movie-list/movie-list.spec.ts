import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieList } from './movie-list';
import { MovieModel } from '../movies-model';
import { signal } from '@angular/core';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;
  let mockMovies: MovieModel[];

  beforeEach(async () => {
    mockMovies = [
      {
        id: '1',
        name: 'Test Movie 1',
        urlName: 'test-movie-1',
        description: 'Test Description 1',
        favorite: false
      },
      {
        id: '2',
        name: 'Test Movie 2',
        urlName: 'test-movie-2',
        description: 'Test Description 2',
        favorite: false
      }
    ];

    await TestBed.configureTestingModule({
      imports: [MovieList]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
    
    // Mock the input signal by defining a function that returns the mock data
    Object.defineProperty(component, 'movies', {
      value: () => mockMovies
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onToggleFavorite', () => {
    it('should toggle favorite status of the selected movie', () => {
      // Get initial state
      const initialMovies = component.moviesList();
      expect(initialMovies[0].favorite).toBeFalse();

      // Toggle favorite for first movie
      component.onToggleFavorite('1');

      // Check if the favorite status was toggled
      const updatedMovies = component.moviesList();
      expect(updatedMovies[0].favorite).toBeTrue();
      expect(updatedMovies[1].favorite).toBeFalse(); // Other movie should remain unchanged
    });

    it('should not modify other movie properties when toggling favorite', () => {
      const initialMovie = component.moviesList()[0];
      
      // Toggle favorite
      component.onToggleFavorite('1');
      
      const updatedMovie = component.moviesList()[0];
      
      // Verify other properties remain unchanged
      expect(updatedMovie.id).toBe(initialMovie.id);
      expect(updatedMovie.name).toBe(initialMovie.name);
      expect(updatedMovie.urlName).toBe(initialMovie.urlName);
      expect(updatedMovie.description).toBe(initialMovie.description);
    });

    it('should handle toggling favorite status multiple times', () => {
      // First toggle
      component.onToggleFavorite('1');
      expect(component.moviesList()[0].favorite).toBeTrue();

      // Second toggle
      component.onToggleFavorite('1');
      expect(component.moviesList()[0].favorite).toBeFalse();

      // Third toggle
      component.onToggleFavorite('1');
      expect(component.moviesList()[0].favorite).toBeTrue();
    });

    it('should not modify any movie when invalid ID is provided', () => {
      const initialMovies = [...component.moviesList()];
      
      component.onToggleFavorite('invalid-id');
      
      const updatedMovies = component.moviesList();
      expect(updatedMovies).toEqual(initialMovies);
    });
  });

  describe('clearFavs', () => {
    it('should clear all favorites', () => {
      // Set some favorites first
      component.onToggleFavorite('1');
      component.onToggleFavorite('2');
      
      // Verify favorites are set
      expect(component.moviesList()[0].favorite).toBeTrue();
      expect(component.moviesList()[1].favorite).toBeTrue();
      
      // Clear favorites
      component.clearFavs();
      
      // Verify all favorites are cleared
      expect(component.moviesList().every(movie => !movie.favorite)).toBeTrue();
    });
  });
});
