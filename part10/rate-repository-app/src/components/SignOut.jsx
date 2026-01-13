import { useEffect } from "react";
import useSignOut from "../hooks/useSignOut";

const SignOut = () => {
  const signOut = useSignOut();
  useEffect(() => {
    signOut();
  }, []);
  return null;
};

export default SignOut;
