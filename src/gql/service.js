import { gql } from '@apollo/client';

export const CREATE_SERVICE_GROUP = gql`
  mutation createBranchService($data: CreateBranchServiceInput!) {
    createBranchService(data: $data) {
      errors {
        field
        message
      }
      branchService {
      id
      }
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranchService($id: Float!, $data: PartialUpdateBranchService!) {
          
    updateBranchService(id: $id,data: $data) {
      branchService {
      id
      }
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranchService($id: Float!) {
    deleteBranchService(id: $id) {
        errors {
            field
            message
        }
        count
    }

  }
`;

export const FIND_ALL_SERVICE_GROUP = gql`
  query findAllBranchServices {
    findAllBranchServices{
      edges {
        node {
          id
          # createdAt
          # updatedAt
          # serviceGroupId
          price
          # durationHour
          # durationMinute
          name
          code
          description
          image
          # showType
          # status
          # canPrintHouseInInvoice
          # canEditPriceInPay
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