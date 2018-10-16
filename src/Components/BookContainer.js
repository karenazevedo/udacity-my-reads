import React from "react";
import BookBox from "./BookBox";
import { Link } from "react-router-dom";

class BookContainer extends React.Component {
  getShelves(books) {
    return books
      .map(book => book.shelf)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  render() {
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <BookBox books={books} onChangeShelf={this.props.changeShelf} />

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookContainer;
