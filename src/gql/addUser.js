import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($data:  InputRegisterRequest!) {
    register(data: $data) {
      user{
        id
      }
    }
  }
`;