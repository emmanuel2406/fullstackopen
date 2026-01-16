import { useMutation } from "@apollo/client/react";

import useSignIn from "./useSignIn";

import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      await mutate({
        variables: { user: { username, password } },
      });

      // Sign in the user after creating the account
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return [signUp, result];
};

export default useSignUp;
