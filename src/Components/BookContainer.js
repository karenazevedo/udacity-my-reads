import React from "react";
import BookBox from "./BookBox";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

class BookContainer extends React.Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    this.initBooks();
  };

  initBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };

  getShelves(books) {
    return books
      .map(book => book.shelf)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.initBooks();
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <BookBox books={books} onChangeShelf={this.changeShelf} />

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookContainer;
