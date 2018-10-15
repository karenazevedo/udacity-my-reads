import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import BookContainer from "./Components/BookContainer";
import SearchContainer from "./Components/SearchContainer";

class BooksApp extends React.Component {
  state = {
    searchBooks: []
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookContainer />} />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchContainer
              books={this.state.searchBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
