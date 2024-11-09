import {NgFor} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Episode} from '../../core/models/episode';

@Component({
  selector: 'app-top-episodes-list',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './top-episodes-list.component.html',
  styleUrl: './top-episodes-list.component.scss'
})
export class TopEpisodesListComponent {

  @Input() episodesList: Episode[] = [];

  constructor() {

  }

}
