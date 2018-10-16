import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "./Book";

class Search extends Component {
  componentWillUnmount() {
    // Reset search
    this.props.updateSearch("");
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="600" handler="onKeyUp">
              <input
                type="text"
                placeholder="Search by title or author"
                onKeyUp={event => this.props.updateSearch(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchBooks.map(book => (
              <li key={book.id} className="contact-list-item">
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  imageLinks={book.imageLinks}
                  shelf={book.shelf}
                  onChangeShelf={shelf => {
                    this.props.changeShelf(book, shelf);
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
