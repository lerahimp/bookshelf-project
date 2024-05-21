// book.service.ts
import { Injectable } from '@angular/core';
import { Book } from './book';
import { BOOKS } from './mock-books';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() { }

  getBooks(): Observable<Book[]> {
    const books = of(BOOKS);
    return books;
  }
}
