import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
  text: yup.string().notRequired().max(2000),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.flexContainer}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.flexItem,
          formik.errors.ownerName && styles.errorFlexItem,
        ]}
      />
      {formik.errors.ownerName && (
        <Text color="error">{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[
          styles.flexItem,
          formik.errors.repositoryName && styles.errorFlexItem,
        ]}
      />
      {formik.errors.repositoryName && (
        <Text color="error">{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={[styles.flexItem, formik.errors.rating && styles.errorFlexItem]}
      />
      {formik.errors.rating && (
        <Text color="error">{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline={true}
        style={[styles.flexItem, formik.errors.text && styles.errorFlexItem]}
      />
      {formik.errors.text && <Text color="error">{formik.errors.text}</Text>}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text color="inverted">Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { createReview: newReview } = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      navigate(`/repository/${newReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
