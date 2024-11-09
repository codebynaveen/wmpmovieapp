import {Component, Input} from '@angular/core';
import {Episode} from '../../core/models/episode';

@Component({
  selector: 'app-episode-search-result-card',
  standalone: true,
  imports: [],
  templateUrl: './episode-search-result-card.component.html',
  styleUrl: './episode-search-result-card.component.scss'
})
export class EpisodeSearchResultCardComponent {

  @Input() episodeData!: Episode;
}
