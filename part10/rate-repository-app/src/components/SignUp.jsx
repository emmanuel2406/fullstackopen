import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: "white",
    padding: theme.padding.appBarTab,
    display: "flex",
    flexDirection: "column",
  },
  flexItem: {
    marginBottom: theme.padding.boundedBox,
    marginTop: theme.padding.boundedBox,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: theme.padding.boundedBox,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.boundedBox,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.padding.boundedBox,
  },
  errorFlexItem: {
    borderColor: theme.colors.error,
  },
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.flexContainer}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[
          styles.flexItem,
          formik.errors.username && styles.errorFlexItem,
        ]}
      />
      {formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={[
          styles.flexItem,
          formik.errors.password && styles.errorFlexItem,
        ]}
      />
      {formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        style={[
          styles.flexItem,
          formik.errors.confirmPassword && styles.errorFlexItem,
        ]}
      />
      {formik.errors.confirmPassword && (
        <Text color="error">{formik.errors.confirmPassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text color="inverted">Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
