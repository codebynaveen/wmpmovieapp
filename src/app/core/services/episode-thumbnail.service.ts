import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Thumbnail} from '../models/thumbnail';

@Injectable({
  providedIn: 'root'
})
export class EpisodeThumbnailService {

  private thumbnailBaseUrl: string = environment.thumbnailBaseUrl;
  private apiKey: string = environment.thumbnailAPIKey;

  constructor(private http: HttpClient) {
  }

  loadEpisodeThumbnailData(seasonNumber: number, episodeNumber: number): Observable<Thumbnail> {

    if (!seasonNumber || !episodeNumber) {
      throw new Error('Both season number and episode number must be provided.');
    }

    let thumbnailAPI: string = `${this.thumbnailBaseUrl}/season/${seasonNumber}/episode/${episodeNumber}/images?api_key=${this.apiKey}`;

    return this.http.get<Thumbnail>(thumbnailAPI).pipe(
      catchError(error => {
        console.error('Error fetching episode thumbnail data', error);
        return throwError(error);
      })
    );
  }
}
