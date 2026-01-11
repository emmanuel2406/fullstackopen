import { View, StyleSheet, Image, Dimensions } from "react-native";
import Text from "./Text";
import theme from "../theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  flexContainer: {
    padding: theme.padding.appBarTab,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
  flexItemImage: {
    flexGrow: 0,
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  flexItemInfo: {
    flexGrow: 1,
    paddingLeft: theme.padding.boundedBox,
  },
  blueBox: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: theme.padding.boundedBox,
  },
  flexContainerStats: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 4,
  },
});

const processCount = (count) => {
  if (count > 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count;
};

const StatItem = ({ count, text }) => {
  return (
    <View style={styles.flexContainerStats}>
      <Text fontWeight="bold">{processCount(count)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <>
      <View style={styles.flexContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.flexItemImage}
        />
        <View style={styles.flexItemInfo}>
          <Text fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.blueBox}>
            <Text color="inverted">{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <StatItem count={repository.stargazersCount} text="Stars" />
        <StatItem count={repository.forksCount} text="Forks" />
        <StatItem count={repository.reviewCount} text="Reviews" />
        <StatItem count={repository.ratingAverage} text="Rating" />
      </View>
    </>
  );
};

export default RepositoryItem;
