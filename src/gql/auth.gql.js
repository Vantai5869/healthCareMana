import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($data: InputLoginRequest!) {
    login(data:$data){
      user{
        id
        fullName
        email
      }
      # profile{
      #   fullName
      #   phone
      #   address
      #   dateOfBirth
      #   monthOfBirth
      #   yearOfBirth
      # }
      accessToken
    }
  
  }
`;
