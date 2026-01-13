import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://10.0.0.45:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
