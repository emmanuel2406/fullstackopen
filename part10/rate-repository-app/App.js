import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

export default function App() {
  return (
    // Note no navigation logic uses Apollo hooks
    <NativeRouter>
      <ApolloProvider client={createApolloClient()}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
}
