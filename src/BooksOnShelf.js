import React from 'react'
import BookOnShelf from './BookOnShelf'

class BooksOnShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.booksOnShelf.map((book) => {
                return <li key={book.id}><BookOnShelf book={book} moveToShelf={this.props.moveToShelf} /></li>;
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksOnShelf