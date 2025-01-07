import { gql } from "graphql-tag";

export const registerMutation = gql`
  mutation Register($body: RegisterForm!) {
  register(body: $body)
}
`;