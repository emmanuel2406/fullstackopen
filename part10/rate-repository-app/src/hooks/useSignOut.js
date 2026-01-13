import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const signOut = async () => {
    await authStorage.removeAccessToken();
    setTimeout(() => {}, 2000);
    apolloClient.resetStore();
    navigate("/signin");
  };

  return signOut;
};

export default useSignOut;
