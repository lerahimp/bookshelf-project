import { Component } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  books: Book[] = [];
  title: string = ''; 
  author: string = '';
  genre: string = '';
  status: string = '';
  rating: number | undefined = undefined;
  
  addBook(): void {
    const newBook: Book = { title: this.title, author: this.author, genre: this.genre, status: this.status, rating: this.rating };
    
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

  selectedBook?: Book;
  select(book: Book): void {
     this.selectedBook = book;
  }

}