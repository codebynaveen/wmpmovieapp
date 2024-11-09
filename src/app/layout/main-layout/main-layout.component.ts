import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MainNavigationComponent} from '../../components/main-navigation/main-navigation.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MainNavigationComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
