import {Component, Input} from '@angular/core';
import {Episode} from '../../core/models/episode';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-episode-search-result-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './episode-search-result-card.component.html',
  styleUrl: './episode-search-result-card.component.scss'
})
export class EpisodeSearchResultCardComponent {

  @Input() episodeData!: Episode;
}
