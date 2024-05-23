import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

const app = express()
const router = express.Router()
const port = 3000

app.use(cors({ origin: "http://localhost:4200" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

router.get('/', (request: Request, response: Response) => {
  response.json({ info: 'Bookshelf Project Node.js, Express, and Postgres API' })
})

type Book = {
  id: number;
  title: string;
  author: string;
  status: string;
  rating?: number;
}

const BOOKS: Book[] = [];
let nextBookId = 1;


router.post('/books', createBook)
router.delete('/books/book-detail/:id', deleteBook);
router.get('/books', getBooks);
router.get('/books/book-detail/:id', getBook);
router.put('/books/book-detail/:id', updateBook);

async function createBook(request: Request, response: Response, next: NextFunction) {
  const book = request.body as Book;

  book.id = nextBookId++

  BOOKS.push(book);

  response.status(201).json(book);
}

async function deleteBook(request: Request, response: Response, next: NextFunction) {
  const bookID = parseInt(request.params.id );
  const bookIndex = BOOKS.findIndex(book => book.id === bookID);

  if (bookIndex > -1) {
    BOOKS.splice(bookIndex, 1);
    response.status(200).send();
  } else {
    response.status(404).send();
  }
}

async function getBook(request: Request, response: Response, next: NextFunction) {
  const bookID = parseInt(request.params.id);
  const book: Book = BOOKS.find(book => book.id === bookID);

  if (book) {
    response.status(200).json(book);
  } else {
    response.status(404).send();
  }
}

async function updateBook(request: Request, response: Response, next: NextFunction) {
  const bookID = parseInt(request.params.id);
  const bookIndex = BOOKS.findIndex(book => book.id === bookID);

  if (bookIndex > -1) {
    BOOKS[bookIndex].title = request.body.title;
    BOOKS[bookIndex].author = request.body.author;
    BOOKS[bookIndex].status = request.body.status;
    BOOKS[bookIndex].rating = request.body.rating;

    response.status(200).json(BOOKS[bookIndex]);
  } else {
    response.status(404).send('Book not found');
  }
}

async function getBooks(request: Request, response: Response, next: NextFunction) {
  response.status(200).json(BOOKS)
}