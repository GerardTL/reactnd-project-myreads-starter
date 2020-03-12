import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksOnShelf from './BooksOnShelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    booksOnShelvesState: [],
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(response => {
      this.processResponse(this, 'booksOnShelvesState', response);
    });
  }

  /* Process response from database call:
     - convert response to array of book objects
     - load array into state object
  */
  processResponse = (thisSave, keyName, response) => {
    let
      booksWork = [],
      emptyQuery = false, 
      key,
      objWork = {},
      thumbnail;
    let title, authors, imageLinks, id, shelf;  
    const blankImage = "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api";

    for (key in response) {
      if (typeof response[key] === "string") emptyQuery = true;
      break;
    }

    if (emptyQuery) {
      objWork[keyName] = booksWork;
      thisSave.setState( objWork );
    }

    else {
      for (key in response) {
        ({ id, title, authors, imageLinks, shelf } = response[key]);

        try {
          thumbnail = (imageLinks.thumbnail !== undefined) ? imageLinks.thumbnail : blankImage;
        }
        catch(err) {
          thumbnail = blankImage;
        }
        shelf = (shelf === undefined) ? 'none' : shelf;
        booksWork.push({
          id: id,
          title: title,
          authors: authors,
          imageUrl: thumbnail,
          imageWidth: 0,
          imageHeight: 0,
          shelf: shelf
        });
      }

      let nLoaded = 0;

      booksWork.forEach(book => {
        let img = new Image();
        img.onload = function () {
          book.imageWidth = this.width;
          book.imageHeight = this.height;
          if (++nLoaded === booksWork.length) {
            objWork[keyName] = booksWork;
            thisSave.setState( objWork );
          }
        };
        img.src = book.imageUrl;
      });
    }
  }

  moveToShelf = (bookId, shelf) => {
    this.setState(oldState => {
      const books = oldState.booksOnShelvesState.map(book => {
        if (book.id === bookId) {
          book.shelf = shelf;
          //console.log('moveToShelf: moving ' + book.title + ' to ' + shelf);
        }
        return book;
      })

      return { booksOnShelvesState: books };
    } )
  };

  addBook = book => {
    this.setState(oldState => {
      //console.log('addBook: adding ' + book.title);
      const books = [...oldState.booksOnShelvesState, book];
      return { booksOnShelvesState: books };
    })
  };

  findBook = bookId => (
    this.state.booksOnShelvesState.find(book => book.id === bookId)
  );

  booksOnShelf = (shelf) => (
    this.state.booksOnShelvesState.filter((book) => book.shelf === shelf)
  );
  
  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <BooksOnShelf bookShelfTitle="Currently Reading" booksOnShelf={this.booksOnShelf("currentlyReading")} moveToShelf={this.moveToShelf} />
                <BooksOnShelf bookShelfTitle="Want to Read" booksOnShelf={this.booksOnShelf("wantToRead")} moveToShelf={this.moveToShelf} />
                <BooksOnShelf bookShelfTitle="Read" booksOnShelf={this.booksOnShelf("read")} moveToShelf={this.moveToShelf} />
              </div>
            </div>

            <div className="open-search">
              <Link to="/search" title="Search for books">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <Search processResponse={this.processResponse} findBook={this.findBook} addBook={this.addBook} moveToShelf={this.moveToShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
