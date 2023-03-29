import { gql } from '@apollo/client';

export const CREATE_BRANCH = gql`
  mutation createBranch($data: CreateBranchInput!) {
    createBranch(data: $data) {
      branch{
        id
      }
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranch($id: Float!, $data: PartialUpdateBranch!) {
          
    updateBranch(id: $id,data: $data) {
      branch{
        id
      }
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranch($id: Float!) {
    deleteBranch(id: $id) {
        errors {
            field
            message
        }
        count
    }

  }
`;


export const FIND_ALL_BRANCHES_BY_MERCHANT = gql`
  query findAllBranchesByMerchant($merchantId: Float!) {
    findAllBranchesByMerchant(merchantId: $merchantId) {
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
`;
