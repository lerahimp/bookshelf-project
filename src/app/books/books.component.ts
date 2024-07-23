import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(private router: Router, private bookService: BookService) {}

  id: number = 0;
  title: string = ''; 
  author: string = '';
  genre: string = '';
  status: string = '';
  rating?: number;
  book_cover_url?: string = '';

  books: Book[] = [];
  selectedBook?: Book;
  isPopupOpen: boolean = false;
  deleteModeActive: boolean = false;
  searchQuery: string = '';

  ngOnInit(): void {
    this.getBooks();
  }

  onSelect(book: Book): void {
    if (!this.deleteModeActive) {
      if (book && book.id !== undefined) {
        this.selectedBook = book;
        this.router.navigate(['/books/book-detail', book.id]);
      } else {
        console.error('Book ID is undefined:', book);
      }
    } else {
      this.deleteBook(book.id, book.title);
    }
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        console.log('Books loaded:', this.books);
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  addBook(): void {
    if (this.title && this.author && this.status) {
      const newId = this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1;
      const newBook: Book = {
        id: newId, 
        title: this.title,
        author: this.author,
        genre: this.genre,
        status: this.status,
        rating: this.rating,
        book_cover_url: this.book_cover_url
      };

      console.log('Creating book:', newBook);

      this.bookService.createBook(newBook).subscribe({
        next: (book) => {
          console.log('Book created:', book);
          this.books.push(book);
          this.clearForm();
        },
        error: (err) => console.error('Error creating book:', err),
      });
    } else {
      console.error('Title, author, and status are required to add a book.');
    }
  }

  toggleDeleteMode(): void {
    this.deleteModeActive = !this.deleteModeActive;
  }

  deleteBook(id: number, title: string): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmDelete) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
        },
        error: (err) => console.error('Error deleting book:', err),
      });
    }
  }
   
  clearForm(): void {
    this.id = 0;
    this.title = '';
    this.author = '';
    this.genre = '';
    this.status = '';
    this.rating = undefined;
    this.book_cover_url = '';
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
      // If search query is empty, reload all books
      this.getBooks();
    } else {
      // Filter books based on search query
      this.books = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  
  resetSearch(): void {
    this.searchQuery = '';
    this.getBooks();
  }
}