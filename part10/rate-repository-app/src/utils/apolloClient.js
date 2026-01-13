import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "http://10.0.0.45:4000/graphql",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
