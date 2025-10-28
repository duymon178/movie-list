import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Movies } from './movies';
import { MovieModel } from './movies-model';

describe('Movies', () => {
  let component: Movies;
  let fixture: ComponentFixture<Movies>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Movies);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure there are no outstanding requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
