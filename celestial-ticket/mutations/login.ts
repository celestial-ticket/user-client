import { gql } from "graphql-tag";

export const loginMutation = gql`
 mutation Login($input: LoginForm!) {
  login(input: $input) {
    accessToken
    user {
      _id
      name
      email
      phoneNumber
      address
      gender
    }
  }
}
`;