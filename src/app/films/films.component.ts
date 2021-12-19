import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Film } from '../shared/film.model';
import { FilmService } from '../shared/film.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit, OnDestroy {
  films!: Film[];
  filmsChangeSubscription!: Subscription;
  filmsFetchingSubscription!: Subscription;
  isFetching: boolean = false;

  constructor(private filmService: FilmService, private http: HttpClient) {}

  ngOnInit() {
    this.films = this.filmService.getFilms();
    this.filmsChangeSubscription = this.filmService.filmsChange.subscribe((films: Film[]) => {
      this.films = films;
    });

    this.filmsFetchingSubscription = this.filmService.filmsFetching.subscribe((isFetching: boolean) => {
      this.isFetching = isFetching;
    });
    this.filmService.fetchFilms();
  }


  onDelete(index: string) {
    this.filmService.deleteFilm(index);
    this.films = this.filmService.getFilms();
  }


  ngOnDestroy() {
    this.filmsChangeSubscription.unsubscribe();
    this.filmsFetchingSubscription.unsubscribe();
  }
}
