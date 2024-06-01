import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query ALL_BOOKS {
    books {
      title 
      author_name
      first_publish_year
      cover_i
    }
  }
`

export const GET_TRAINERS = gql`
  query ALL_TRAINERS {
    trainers {
      _id
      username
      email
      pokemon {
        _id
        name
        image
        title
      }
    }
  }
`

export const GET_BOOK = gql`
  query GET_BOOK($title: Int!) {
    book(title: $title) {
      _id
      title 
      author_name
      first_publish_year
      cover_i
    }  
  }
`

export const GET_USER = gql`
  query GET_USER($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      book {
        _id
        title
        author_name
        first_publish_year
        cover_i
      }
    }  
  }
`