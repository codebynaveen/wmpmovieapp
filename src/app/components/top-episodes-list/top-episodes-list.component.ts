import {NgFor} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Episode} from '../../core/models/episode';
import {RouterLink} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-top-episodes-list',
  standalone: true,
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './top-episodes-list.component.html',
  styleUrl: './top-episodes-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(10px)'}),
          stagger(100, [
            animate('600ms ease-out',
              style({opacity: 1, transform: 'translateY(0)'})
            )
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class TopEpisodesListComponent {

  @Input() episodesList: Episode[] = [];

  constructor() {

  }

}
