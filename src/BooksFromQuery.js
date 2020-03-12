import React from 'react'
import BookFromQuery from './BookFromQuery'

class BooksFromQuery extends React.Component {
  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.props.booksFromQuery().length <= 0 ?
              (<li key="emptyquery">No search results found</li>)
            :
              this.props.booksFromQuery().map((book) => {
                return <li key={book.id}><BookFromQuery book={book} addBook={this.props.addBook} findBook={this.props.findBook} moveToShelf={this.props.moveToShelf} /></li>;
              })
          }
        </ol>
      </div>
    )
  }
}

export default BooksFromQuery