import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmService } from '../shared/film.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  filmsFetchingSubscription!: Subscription;
  constructor(public http: HttpClient, public filmService: FilmService) { }
  spinner: boolean = false;


  addNewFilm() {
    this.spinner = true;
    const name = this.nameInput.nativeElement.value;
    const body = {name};
    this.http.post('https://plovo-13-default-rtdb.firebaseio.com/films.json', body).subscribe();
    this.filmService.fetchFilms();
    this.filmsFetchingSubscription = this.filmService.filmsFetching.subscribe((isFetching: boolean) => {
      this.spinner = isFetching;
    });
  }
}
