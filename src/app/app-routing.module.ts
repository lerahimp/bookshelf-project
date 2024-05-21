import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksComponent } from './books/books.component';
import {HomeComponent } from './home/home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:title', component: BookDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
