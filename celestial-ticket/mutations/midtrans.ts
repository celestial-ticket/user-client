import { gql } from "graphql-tag";
// Define your GraphQL mutation
export const CREATE_PAYMENT_TOKEN = gql`
  mutation createPaymentToken($amount: Float!) {
    createPaymentToken(amount: $amount) {
      token
      redirect_url
    }
  }
`;
