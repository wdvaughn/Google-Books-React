import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Saved() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(_ => loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book._id}>
                  <Row>
                    <Col size="md-3">
                      <img src={book.image} />
                    </Col>
                    <Col size="md-8">
                      <Link to={book.link}>

                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                    </Col>
                    <Col size="md-1">
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </Col>
                  </Row>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}


export default Saved;
