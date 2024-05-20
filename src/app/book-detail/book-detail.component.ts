import {Component, Input} from '@angular/core';
import {Book} from '../book';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  @Input() book?: Book;
}
