import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    padding: theme.padding.appBarTab,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
  flexItemImage: {
    flexGrow: 0,
    width: theme.sizes.imageWidth,
    height: theme.sizes.imageHeight,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.sizes.imageWidth / 2,
    marginRight: theme.padding.boundedBox,
    justifyContent: "center",
    alignItems: "center",
  },
  flexItemText: {
    paddingTop: theme.padding.boundedBox,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const ReviewItem = ({ review, type }) => {
  const formattedDate = format(review.createdAt, "MM.dd.yyyy");
  const reviewHeading =
    type == "user" ? review.user.username : review.repository.fullName;
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemImage}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.heading, styles.flexItemText]}>
          {reviewHeading}
        </Text>
        <Text color="textSecondary" style={styles.flexItemText}>
          {formattedDate}
        </Text>
        <Text style={styles.flexItemText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
