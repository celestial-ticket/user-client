import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User {
    user {
      _id
      name
      email
      phoneNumber
      address
      gender
      orders {
        _id
        cinema {
          name
        }
        price
        seats
        showTime {
          startTime
          endTime
          date
        }
        movie {
          title
        }
      }
    }
  }
`;
