import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(private bookService: BookService) {}
  selectedBook?: Book;

  books: Book[] = [];
  title: string = ''; 
  author: string = '';
  genre: string = '';
  status: string = '';
  rating: number = 0;
  
  addBook(): void {
    const newBook: Book = { title: this.title, author: this.author, status: this.status, rating: this.rating };
    
    if(this.title && this.author){
      this.books.push(newBook);
    }
  }

  deleteBook(): void {
    const index = this.books.findIndex(book => book.title === this.title && book.author === this.author);
    
    if (index !== -1) {
        this.books.splice(index, 1);
    }
  }

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
}