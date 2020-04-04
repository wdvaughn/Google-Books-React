import axios from "axios";

export default {
  // Gets all books
  getBooks: () => {
    return axios.get("/api/books");
  },
  searchBooks: search => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
  },
  // Deletes the book with the given id
  deleteBook: id => {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: bookData => {
    return axios.post("/api/books", bookData);
  }
};
