import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddABookButton from './AddABookButton';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
import './BestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBookForm: false,
      newBook: true,
      show: true,
      updateIdx: -1,
    }
  }

  componentDidMount = () => {
    // get the jwt and send in the headers
    this.props.auth0.getIdTokenClaims()
      .then(async res => {
        const jwt = res.__raw;

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          params: { email: this.props.auth0.user.email },
          method: 'get'
        }
        // make a call to the backend to get the the books and display them
        const booksResponse = await axios(config);

        this.setState({ books: booksResponse.data });
      })
      .catch(err => console.error(err));
  }

  handleClose = () => this.setState({ displayBookForm: false });

  addBook = (book) => {
    const books = [...this.state.books, book];
    this.setState({ books });
  }
  updateBookArray = (updatedBook) => {
    const books = this.state.books.map(currentBook => {
      if (updatedBook._id === currentBook._id) {
        return updatedBook;
      } else {
        return currentBook;
      }
    });

    this.setState({ books });
  };
  removeBook = (bookToRemove) => {
    this.props.auth0.getIdTokenClaims()
      .then(async res => {
        const jwt = res.__raw;
        const id = bookToRemove._id;
        let newBooks = this.state.books;
        newBooks = newBooks.filter((book) => bookToRemove._id !== id);
        this.setState({ books: newBooks });

        const config = {
          params: { email: this.props.auth0.user.email },
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${id}`
        }

        axios(config);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <h2>My favorite books</h2>
        <AddABookButton
          addABook={() => this.setState({ displayBookForm: true })}
        />

        {this.state.displayBookForm &&
          <BookFormModal
            close={this.handleClose}
            updateBookArray={this.updateBookArray}
            addBook={this.addBook}
            show={this.state.show}
            book={this.state.books[this.state.updateIdx]}
            newBook={this.state.newBook}
            index={this.state.updateIdx}
          />
        }

        <Carousel>
          {this.state.books.length && this.state.books.map((book, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src="/book.jpg"
                alt={book.name}
              />
              <Carousel.Caption>
                <h3>{book.name}</h3>
                <p>{book.description}</p>
                <p>{book.status}</p>
              </Carousel.Caption>
              <div className="center">
                <Button onClick={() => this.removeBook(book)}>Delete</Button>
                <Button onClick={() => this.setState({ displayBookForm: true, newBook: false, updateIdx: idx })}>Update</Button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    )
  }
}

export default withAuth0(BestBooks);
