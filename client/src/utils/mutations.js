import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`

export const ADD_USER = gql`
  mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation ADD_BOOK(
    $title: String!, 
    $author_name: [String], 
    $first_publish_year: Int, 
    $cover_i: Int,
    $userId: ID!
  ) {
    addBook( 
      title: $title,
      author_name: $author_name,
      first_publish_year: $first_publish_year,
      cover_i: $cover_i,
      userId: $userId
    ) {
      title 
      author_name
      first_publish_year
      cover_i
    }
  }
`