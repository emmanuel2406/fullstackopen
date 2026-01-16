//? Wrapper around the ReviewItem component that allows the user to edit or delete a review
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";

import ReviewItem from "../ReviewItem";
import Text from "../Text";
import theme from "../../theme";

import { DELETE_REVIEW } from "../../graphql/mutations";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    margin: theme.padding.largeBox,
    padding: theme.padding.largeBox,
    alignItems: "center",
    borderRadius: theme.borderRadius.small,
  },
  buttonBlue: {
    backgroundColor: theme.colors.primary,
  },
  buttonRed: {
    backgroundColor: theme.colors.danger,
  },
});

const ReviewControl = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const viewPress = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = async () => {
    try {
      const { data } = await deleteReview({
        variables: { id: review.id },
      });
      if (data.deleteReview) {
        Alert.alert("Success", "Review deleted successfully");
        refetch();
      } else {
        Alert.alert("Error", "Failed to delete review");
      }
    } catch (error) {
      // Handle network errors, GraphQL errors, or other exceptions
      Alert.alert("Error", "An error occurred while deleting the review");
      console.error(error);
    }
  };

  const deletePress = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: handleDeleteReview,
        },
      ]
    );
  };
  return (
    <View style={styles.flexContainer}>
      <ReviewItem review={review} type="repository" />
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonBlue]}
          onPress={viewPress}
        >
          <Text color="inverted">View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonRed]}
          onPress={deletePress}
        >
          <Text color="inverted">Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewControl;
