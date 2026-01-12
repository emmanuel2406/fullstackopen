import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";

import theme from "../theme";
import Text from "./Text";

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
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.flexContainer}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={styles.flexItem}
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={styles.flexItem}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text color="inverted">Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
