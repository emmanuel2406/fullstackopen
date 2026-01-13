import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
