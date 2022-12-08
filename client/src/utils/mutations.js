import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($userId: ID!, $bookData: BookData!) {
    saveBook(userId: $userId, bookData: $bookData) {
      username
      email
      savedBooks {
        title
        description
        authors
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Deletebook($userId: ID!, $bookId: ID!) {
    deleteBook(userId: $userId, bookId: $bookId) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        savedBooks {
          title
        }
      }
    }
  }
`;
