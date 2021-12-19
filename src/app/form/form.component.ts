import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmService } from '../shared/film.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  constructor(public http: HttpClient, public filmService: FilmService) { }
  spinner: boolean = false;

  onSpinner() {
    this.spinner = false;
  }

  addNewFilm() {
    this.spinner = true;
    const name = this.nameInput.nativeElement.value;
    const body = {name};
    this.http.post('https://plovo-13-default-rtdb.firebaseio.com/films.json', body).subscribe();
    this.filmService.fetchFilms();
    this.spinner = false;
    this.onSpinner();
  }

}
