import {Component, Input} from '@angular/core';
import {Episode} from '../../core/models/episode';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss'
})
export class EpisodeCardComponent {

  @Input() episodeData!: Episode;

}
