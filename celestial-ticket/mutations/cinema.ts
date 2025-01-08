import { gql } from "@apollo/client";

export const GET_NEARBY_CINEMAS = gql`
  query Cinemas($userLocation: LocationInput!, $maxDistance: Float) {
    getNearbyCinemas(userLocation: $userLocation, maxDistance: $maxDistance) {
      _id
      name
      address
      location {
        type
        coordinates
      }
      createdAt
      updatedAt
      showTimes {
        movieId
      }
    }
  }
`;
