import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksFromQuery from './BooksFromQuery'

class Search extends React.Component {
  state = {
    booksFromQueryState: [],
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (event.target.value === '') {
      this.setState( { booksFromQueryState: [] } );
    }
    else {
      //console.log('handleChange: query DB with ' + event.target.value);
      this.searchForBooks(event.target.value);
    }
  };

  searchForBooks = (query) => {
    BooksAPI.search(query).then(response => {
      this.props.processResponse(this, 'booksFromQueryState', response);
    });
  }

  booksFromQuery = () => (
    this.state.booksFromQueryState
  );

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" title="Back to main page">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BooksFromQuery booksFromQuery={this.booksFromQuery} addBook={this.props.addBook} findBook={this.props.findBook} moveToShelf={this.props.moveToShelf} />
          </ol>
        </div>
      </div>
    );
  }
}

export default Search
