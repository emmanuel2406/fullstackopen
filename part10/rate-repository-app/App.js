import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";

import Main from "./src/components/Main";
import AuthStorage from "./src/utils/authStorage";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <AuthStorageContext.Provider value={authStorage}>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </AuthStorageContext.Provider>
  );
};

export default App;
