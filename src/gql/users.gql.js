import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetDogs {
    getUsers{
    pageInfo{
      hasNextPage
    }
    edges{
      node{
        id
        fullName
     		email
        role
        contact
        avatar
        gender
        createdAt
        status
      }
    }
  }
  }
`;