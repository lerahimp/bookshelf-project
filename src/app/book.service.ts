import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];

  constructor() { }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }
}
