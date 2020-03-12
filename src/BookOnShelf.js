import React from 'react'
import * as BooksAPI from './BooksAPI'

class BookOnShelf extends React.Component {
  changeShelf = (event) => {
    this.props.moveToShelf(this.props.book.id, event.target.value);
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
            <select value={props.book.shelf} onChange={this.changeShelf}>
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

export default BookOnShelf
