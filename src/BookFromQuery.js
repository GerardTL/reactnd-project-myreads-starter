import React from 'react'
import * as BooksAPI from './BooksAPI'

class BookFromQuery extends React.Component {
  state = {
    shelf: 'none',
  };

  componentDidMount = () => {
    const shelvedBook = this.props.findBook(this.props.book.id);
    if (shelvedBook !== undefined) {
      this.setState( 
        { 
          shelf: shelvedBook.shelf, 
        } 
      );
    }
  }

  shelveNewBook = (event) => {
    if (this.state.shelf === "none") {
      const bookNew = {...this.props.book};
      bookNew.shelf = event.target.value;
      //console.log('BookFromQuery: adding ' + bookNew.title + ' to ' + bookNew.shelf + ', typeof bookNew = ' + typeof bookNew);
      this.props.addBook(bookNew);
    }
    else {
      //console.log('BookFromQuery: moving ' + this.props.book.title + ' to ' + event.target.value);
      this.props.moveToShelf(this.props.book.id, event.target.value);
    }

    this.setState( {shelf: event.target.value} );
    BooksAPI.update({ id: this.props.book.id }, event.target.value);
  };

  render() {
    const props = this.props;
    return (
      <div className="book">
        <div className="book-top">

          <div className="book-cover"
            style={ { width: props.book.imageWidth, height: props.book.imageHeight, backgroundImage: 'url("' + props.book.imageUrl + '")' } }>
          </div>

          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={this.shelveNewBook}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>

        </div>

        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    );
  }
}

export default BookFromQuery