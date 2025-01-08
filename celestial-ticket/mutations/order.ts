import { gql } from "@apollo/client";

export const CreateOrder = gql`
  mutation Mutation($body: OrderInput) {
    createOrder(body: $body) {
      cinemaId
      showTimeId
      seats
      createdAt
      paymentStatus
      price
      movie {
        title
        ageRating
      }
      _id
      cinema {
        name
      }
      showTime {
        date
      }
    }
  }
`;

export const GET_ORDERS_CHAIR = gql`
  query GetOrders {
    getOrders {
      showTime {
        _id
      }
      seats
    }
  }
`;
