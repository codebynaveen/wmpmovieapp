import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Character} from '../models/character';
import {numbersArrayToString} from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl: string = 'https://rickandmortyapi.com/api';
  private characterAPI: string = `${this.baseUrl}/character`;

  constructor(private http: HttpClient) {
  }

  getCharacterDataByIds(characterIds: number[]): Observable<Character[]> {
    if (!characterIds || characterIds.length === 0) {
      throw new Error('Character IDs must be provided.');
    }

    let characterIdsStr = numbersArrayToString(characterIds);

    return this.http.get<Character[]>(`${this.characterAPI}/${characterIdsStr}`).pipe(
      catchError(error => {
        console.error('Error fetching character data', error);
        return throwError(error);
      })
    );
  }
}
