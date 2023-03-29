import { gql } from '@apollo/client';

export const CREATE_SERVICE_GROUP = gql`
  mutation createBranchServiceGroup($data: CreateBranchServiceGroupInput!) {
    createBranchServiceGroup(data: $data) {
      errors {
        field
        message
      }
      branchServiceGroup {
        id
        createdAt
        updatedAt
        name
        description
        image
        showType
        branchId
      }
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranchServiceGroup($id: Float!, $data: PartialUpdateBranchServiceGroup!) {
          
    updateBranchServiceGroup(id: $id,data: $data) {
      branchServiceGroup {
        id
      }
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranchServiceGroup($id: Float!) {
    deleteBranchServiceGroup(id: $id) {
        errors {
            field
            message
        }
        count
    }

  }
`;

export const FIND_ALL_SERVICE_GROUP = gql`
  query findAllServiceGroups {
    findAllServiceGroups{
      edges {
        node {
        id
        createdAt
        updatedAt
        name
        description
        image
        showType
        branchId
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