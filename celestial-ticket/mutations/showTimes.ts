import { gql } from "@apollo/client";

export const GET_SHOWTIME = gql`
  query GetShowTimes(
    $movieId: ID!
    $date: String!
    $userLocation: LocationInput!
  ) {
    getShowTimes(movieId: $movieId, date: $date, userLocation: $userLocation) {
      _id
      cinema {
        _id
        name
        address
        createdAt
        updatedAt
      }
      showTimes {
        _id
        startTime
        endTime
        date
        price
        seatList
        studioId
        movieId
        cinemaId
        cinema {
          _id
          name
          address
          createdAt
          updatedAt
        }
        movie {
          _id
          title
          synopsis
          genre
          duration
          thumbnail
          cast
          ageRating
          movieStatus
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query Movie($id: String!) {
    movie(_id: $id) {
      _id
      title
      synopsis
      genre
      duration
      thumbnail
      cast
      ageRating
      movieStatus
      createdAt
      updatedAt
    }
  }
`;
