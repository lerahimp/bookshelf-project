import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  @Input() book?: Book;
  isEditPopupOpen: boolean = false;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.getBook(parseInt(bookId, 10));
    }
  }

  openPopup(): void {
    this.isEditPopupOpen = true;
  }

  closePopup(): void {
    this.isEditPopupOpen = false;
  }

  getBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (error) => {
        console.error('Error fetching book:', error);
      }
    });
  }
  
  updateBook(updatedBook: Book): void {
    const newBook: Book = { ...this.book, ...updatedBook };
    this.bookService.updateBook(newBook).subscribe({
      next: (response) => {
        this.book = newBook;
        this.closePopup();
      },
      error: (error) => {
        console.error('Error updating book:', error);
      }
    });
  }  
}
