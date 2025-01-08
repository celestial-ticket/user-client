import { gql } from "@apollo/client";

export const SendEmail = gql`
  mutation SendEmail($email: String!, $order: SendEmailInput!) {
    sendEmail(email: $email, order: $order)
  }
`;
