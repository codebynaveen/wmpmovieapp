import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieNamesService {

  private URL: string = 'https://rickandmortyapi.com/api/episode';

  constructor(private  http: HttpClient) { }

  getAllEpisodes() {
    return this.http.get(this.URL);
  }
}
