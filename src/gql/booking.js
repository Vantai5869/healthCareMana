import { gql } from '@apollo/client';

export const FIND_ALL_BOOKING_BY_MERCHANT = gql`
  query findAllBookingByMerchant {
    findAllBookingByMerchant(orderBy: "id", orderDirection: "ASC"){
      items {
      id
      createdAt
      updatedAt
      status
      customerId
      branchServiceId
      duration
      startTime
      endTime
      note
    }
    page
    totalPage
    total
    limit
  
    } 
  }
`;