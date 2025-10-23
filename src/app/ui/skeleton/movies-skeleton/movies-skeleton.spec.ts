import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSkeleton } from './movies-skeleton';

describe('MoviesSkeleton', () => {
  let component: MoviesSkeleton;
  let fixture: ComponentFixture<MoviesSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
