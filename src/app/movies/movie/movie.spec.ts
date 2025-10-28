import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Movie } from './movie';
import { MovieModel } from '../movies-model';

describe('Movie', () => {
  let component: Movie;
  let fixture: ComponentFixture<Movie>;
  let mockMovie: MovieModel;

  beforeEach(async () => {
    mockMovie = {
      id: '1',
      name: 'Test Movie',
      urlName: 'test-movie',
      description: 'Test Description',
      favorite: false
    };

    await TestBed.configureTestingModule({
      imports: [Movie]
    }).compileComponents();

    fixture = TestBed.createComponent(Movie);
    component = fixture.componentInstance;
    
    // Mock the input signal by defining a function that returns the mock data
    Object.defineProperty(component, 'movie', {
      value: () => mockMovie
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie name', () => {
    expect(component.movieName()).toBe('Test Movie');
  });

  it('should display movie description', () => {
    expect(component.movieDescription()).toBe('Test Description');
  });

  it('should emit when toggle favorite is called', () => {
    let emitted = false;
    component.toggleFavorite.subscribe(() => emitted = true);
    
    component.toggleFavorite.emit();
    
    expect(emitted).toBeTrue();
  });
});
