import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Episode, EpisodeResult} from '../models/episode';
import {generateRangeString} from '../shared/utils';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private baseUrl: string = environment.baseUrl;
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

  getAllEpisodes(): Observable<EpisodeResult> {
    return this.http.get<EpisodeResult>(this.episodesList).pipe(
      catchError(error => {
        console.error('Error fetching all episodes', error);
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

  searchEpisodesByName(episodeName: string): Observable<EpisodeResult> {
    if (episodeName === null || episodeName === undefined) {
      throw new Error('Episode name cannot be empty.');
    }

    return this.http.get<EpisodeResult>(`${this.episodesList}/?name=${episodeName}`).pipe(
      catchError(error => {
        console.error('Error fetching latest episodes', error);
        return throwError(error);
      })
    );
  }
}
