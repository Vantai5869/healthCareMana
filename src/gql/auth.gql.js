import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($data: InputLoginRequest!) {
    login(data:$data){
      user {
      id
      createdAt
      updatedAt
      email
      fullName
      status
      role
      gender
      contact
      dobDay
      dobMonth
      dobYear
      occupation
      avatar
      merchants {
        edges {
          node {
            id
            createdAt
            updatedAt
            name
            phone
            address
            cityCode
            districtCode
            wardCode
            userId
            branches {
              edges {
                node {
                  id
                  createdAt
                  updatedAt
                  name
                  phone
                  address
                  cityCode
                  districtCode
                  wardCode
                  merchantId
                  userId
                }
                cursor
              }
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
      devices {
        edges {
          node {
            id
            createdAt
            updatedAt
            userId
            os
            deviceId
            token
          }
          cursor
        }
        pageInfo {
            startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
    accessToken
    }
  
  }
`;
