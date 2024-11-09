import {Component, Input} from '@angular/core';
import {Character} from '../../core/models/character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {

  @Input() characterData!: Character;
}
