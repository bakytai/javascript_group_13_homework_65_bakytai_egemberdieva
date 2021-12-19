import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Film } from './film.model';

@Injectable()

export class FilmService {
  private films: Film[] = [];
  filmsChange = new Subject<Film[]>();
  filmsFetching = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  fetchFilms() {
    this.films = [];
    this.filmsFetching.next(true);
    this.http.get<{[id: string]: Film}>('https://plovo-13-default-rtdb.firebaseio.com/films.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const film = result[id];

          return  new Film(id, film.name);
        });
      }))
      .subscribe(films => {
        this.films = films;
        this.filmsChange.next(this.films.slice());
        this.filmsFetching.next(false);
      },error => {
        this.filmsFetching.next(false);
      });
  }

  deleteFilm(index: string) {
    this.http.delete(`https://plovo-13-default-rtdb.firebaseio.com/films/${index}.json`).subscribe();
    this.fetchFilms();
  }

  getFilms() {
    return this.films.slice();
  }
}
