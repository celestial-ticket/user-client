import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query getMovies {
        nowShowing {
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
        upcoming {
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
        movies {
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
