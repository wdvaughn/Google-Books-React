import React, { useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";

function Search() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  function saveBook(book, index) {
    API.saveBook(book).then(res => {
      setBooks(books.filter((_, i) => (i !== index)));
    }).catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setSearch(value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    API.searchBooks(search).then(res => {
      const bookData = res.data.items.map(book => {
        console.log(book.volumeInfo);
        const subtitle = book.volumeInfo.subtitle;
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors.join(", ");
        const description = book.volumeInfo.description;
        const image = book.volumeInfo.imageLinks;
        const link = book.volumeInfo.infoLink;
        return {
          title: subtitle ? `${title}, ${subtitle}` : (title),
          author: author,
          description: description,
          image: image ? (image.smallThumbnail) : ("https://via.placeholder.com/200"),
          link: link
        };
      });
      setBooks(bookData);
    }).catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <form>
            <Input
              onChange={handleInputChange}
              name="search"
              placeholder="Search"
            />
            <FormBtn
              disabled={!search}
              onClick={handleFormSubmit}
            >
              Search
            </FormBtn>
          </form>
        </Col>
      </Row>
      {books.length ?
        books.map((book, index) => (
          <>
            <Row key={index}>
              <Col size="md-8">
                <h1>
                  {book.title} by {book.author}
                </h1>
              </Col>
              <Col size="md-2">
                <img src={book.image} />
              </Col>
              <Col size="md-2">
                <FormBtn onClick={() => saveBook(book, index)}>Save Book</FormBtn>
              </Col>
            </Row>
            <Row>
              <Col size="md-12">
                <article>
                  <h1>Synopsis</h1>
                  <p>
                    {book.description}
                  </p>
                </article>
              </Col>
            </Row>
          </>
        )) : (
          <h3>No Results to Display</h3>
        )}
    </Container>
  );
}

export default Search;