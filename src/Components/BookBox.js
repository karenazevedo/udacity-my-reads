import React from "react";
import Book from "./Book";
import { SHELVES, NAMES_SHELVES } from "../Utils/Constants";

class BookBox extends React.Component {
  getBooksByShelf(shelf) {
    return this.props.books.filter(book => book.shelf === shelf);
  }

  render() {
    const { onChangeShelf } = this.props;

    return (
      <div className="list-books-content">
        {SHELVES.map((shelf, key) => (
          <div key={key}>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{NAMES_SHELVES[shelf]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksByShelf(shelf).map(book => (
                    <li key={book.id}>
                      <Book
                        id={book.id}
                        title={book.title}
                        authors={book.authors}
                        imageLinks={book.imageLinks}
                        shelf={book.shelf}
                        onChangeShelf={shelf => {
                          onChangeShelf(book, shelf);
                        }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default BookBox;
