import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  recentBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.recentBooks = this.getRecentBooks();
    });
  }

  getCount(): number {
    return this.books.length;
  }

  getRecentBooks(): Book[] {
    const length = this.books.length;
  
    if (length === 0) {
      return [];
    } else if (length === 1) {
      return this.books.slice(-1);
    } else if (length === 2) {
      return this.books.slice(-2);
    } else if (length === 3) {
      return this.books.slice(-3);
    } else if (length === 4) {
      return this.books.slice(-4);
    } else if (length === 5) {
      return this.books.slice(-5);
    } else {
      return this.books.slice(length - 6, length);
    }
  }  
}
