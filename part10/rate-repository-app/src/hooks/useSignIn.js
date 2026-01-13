import { useMutation } from "@apollo/client/react";

import useAuthStorage from "./useAuthStorage";

import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
