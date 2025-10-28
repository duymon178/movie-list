import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesApi } from './movies-api';
import { MovieModel } from './movies-model';

describe('MoviesApi', () => {
  let service: MoviesApi;
  let httpMock: HttpTestingController;

  const mockMovies: MovieModel[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesApi,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    
    service = TestBed.inject(MoviesApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovies', () => {
    it('should return all movies when no search term is provided', () => {
      service.getMovies('').subscribe(movies => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne('/assets/movies.json');
      expect(req.request.method).toBe('GET');
      req.flush({ movies: mockMovies });
    });

    it('should filter movies by search term', () => {
      service.getMovies('Test Movie 1').subscribe(movies => {
        expect(movies.length).toBe(1);
        expect(movies[0].name).toBe('Test Movie 1');
      });

      const req = httpMock.expectOne('/assets/movies.json');
      expect(req.request.method).toBe('GET');
      req.flush({ movies: mockMovies });
    });

    it('should be case insensitive when filtering movies', () => {
      service.getMovies('test MOVIE').subscribe(movies => {
        expect(movies.length).toBe(2);
      });

      const req = httpMock.expectOne('/assets/movies.json');
      expect(req.request.method).toBe('GET');
      req.flush({ movies: mockMovies });
    });

    it('should return empty array when no movies match search term', () => {
      service.getMovies('nonexistent movie').subscribe(movies => {
        expect(movies.length).toBe(0);
      });

      const req = httpMock.expectOne('/assets/movies.json');
      expect(req.request.method).toBe('GET');
      req.flush({ movies: mockMovies });
    });
  });
});
