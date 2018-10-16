import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import BookContainer from "./Components/BookContainer";
import SearchContainer from "./Components/SearchContainer";

import { MAX_RESULTS } from "./Utils/Constants";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  componentDidMount = () => {
    this.initBooks();
  };

  state = {
    searchBooks: [],
    books: []
  };

  initBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.initBooks();
    });
  };

  clearBooks = () => {
    this.setState({
      searchBooks: []
    });
  };

  updateSearch = query => {
    if (query) {
      query = query.trim();

      BooksAPI.search(query, MAX_RESULTS).then(books => {
        if (books.items && books.items.length < 1) {
          this.clearBooks();
          return;
        }

        if (books.length) {
          books.forEach((book, index) => {
            let myBook = this.state.books.find(b => b.id === book.id);
            book.shelf = myBook ? myBook.shelf : "none";
            books[index] = book;
          });

          this.setState({
            searchBooks: books
          });
        }
      });
    } else {
      this.clearBooks();
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookContainer
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchContainer
              searchBooks={this.state.searchBooks}
              initBooks={this.initBooks}
              changeShelf={this.changeShelf}
              updateSearch={this.updateSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
