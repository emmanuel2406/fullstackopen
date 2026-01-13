import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

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
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
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
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text color="inverted">Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
