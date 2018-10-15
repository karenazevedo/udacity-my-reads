import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { MAX_RESULTS } from "../Utils/Constantes";

class Search extends Component {
  state = {
    books: [],
    searchBooks: []
  };

  componentWillUnmount() {
    // Reset search
    this.updateSearch("");
    this.initBooks();
  }

  initBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };

  changeShelf = (book, shelf) => {
    console.log(book, shelf);
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="800" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onKeyUp={event => this.updateSearch(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map(book => (
              <li key={book.id} className="contact-list-item">
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  imageLinks={book.imageLinks}
                  onChangeShelf={shelf => {
                    this.changeShelf(book, shelf);
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
