import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchString: string = ''
  reverseString: string = ''
  uniqueChar: string | null = null;

  search() {
    this.searchString.split('').reverse().forEach((char, index) => {
      this.reverseString += char;
    })

    const repatedValueMap = new Map();
    this.searchString.split('').forEach((char) => {
      if (repatedValueMap.has(char)) {
        let repeatedValue = repatedValueMap.get(char);
        console.log(char, repeatedValue);

        repatedValueMap.set(char, repeatedValue++);
      } else {
        repatedValueMap.set(char, 0);
      }
    });
  }

}
