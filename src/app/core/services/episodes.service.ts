import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Episode} from '../models/episode';
import {generateRangeString} from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private baseUrl: string = 'https://rickandmortyapi.com/api';
  private episodesList: string = `${this.baseUrl}/episode`;

  constructor(private http: HttpClient) {
  }

  getEpisodes(start: number, end: number): Observable<Episode[]> {
    if (start >= end) {
      throw new Error('The start value must be less than the end value.');
    }

    return this.http.get<Episode[]>(`${this.episodesList}/${generateRangeString(start, end)}`).pipe(
      catchError(error => {
        console.error('Error fetching latest episodes', error);
        return throwError(error);
      })
    );
  }

  getEpisodeInfo(episodeId: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.episodesList}/${episodeId}`).pipe(
      catchError(error => {
        console.error(`Error fetching selected episode. Episode: ${episodeId}`, error);
        return throwError(error);
      })
    )
  }
}
