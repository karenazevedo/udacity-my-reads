import React from "react";

class Book extends React.Component {
  changeShelf = event => {
    this.props.onChangeShelf(event.target.value);
  };

  render() {
    const { title, authors, imageLinks, shelf } = this.props;

    const image = imageLinks ? imageLinks["thumbnail"] : {};

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${image})`
            }}
          />
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.changeShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;
