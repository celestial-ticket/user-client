import * as SecureStore from "expo-secure-store";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://e417-139-228-111-122.ngrok-free.app",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = SecureStore.getItem("access_token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
