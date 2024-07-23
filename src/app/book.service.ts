import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

export type Book = {
  id: number;
  title: string;
  author: string;
  genre?: string;
  status: string;
  rating?: number;
  book_cover_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }

  createBook(book: Book) {
    const url = `http://localhost:3000/books/`

    return this._http.post<Book>(url, book, options)
  }

  deleteBook(bookID: number) {
    const url = `http://localhost:3000/books/book-detail/${bookID}`

    return this._http.delete<number>(url, options)
  }

  getBook(bookID: number) {
    const url = `http://localhost:3000/books/book-detail/${bookID}`

    return this._http.get<Book>(url, options)
  }

  getBooks() {
    const url = `http://localhost:3000/books/`

    return this._http.get<Book[]>(url, options)
  }

  updateBook(book : Book) {
    const url = `http://localhost:3000/books/book-detail/${book.id}`

    return this._http.put<Book>(url, book, options)
  }
}
