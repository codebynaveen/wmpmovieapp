import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-main-navigation',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.scss'
})
export class MainNavigationComponent {

  constructor(public router: Router) {}

}
