import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      genre
      year
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      genre
      year
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $genre: String!, $year: Int!) {
    addBook(title: $title, author: $author, genre: $genre, year: $year) {
      id
      title
      author
      genre
      year
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $author: String, $genre: String, $year: Int) {
    updateBook(id: $id, title: $title, author: $author, genre: $genre, year: $year) {
      id
      title
      author
      genre
      year
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;
