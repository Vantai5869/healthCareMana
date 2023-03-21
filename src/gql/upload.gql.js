import { gql, useMutation } from "@apollo/client";

export const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadSingleFiles(file: $file, folder:"test") {
      url
    }
  }
`;