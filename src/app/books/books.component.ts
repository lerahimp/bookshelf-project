import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(private bookService: BookService) {}
  title: string = ''; 
  author: string = '';
  genre: string = '';
  status: string = '';
  rating: number | undefined = undefined;

  books: Book[] = [];
  selectedBook?: Book;

  isPopupOpen: boolean = false;

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  getBooks(): void {
    this.bookService.getBooks()
        .subscribe(books => this.books = books);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }
}