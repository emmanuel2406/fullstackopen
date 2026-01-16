import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

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
    borderRadius: 4,
  },
  flexItemInfo: {
    flex: 1,
    paddingLeft: theme.padding.boundedBox,
    paddingRight: theme.padding.boundedBox,
  },
  flexItemBox: {
    alignSelf: "flex-start",
    padding: theme.padding.boundedBox,
  },
  blueBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    margin: theme.padding.boundedBox,
  },
  largeBox: {
    width: "100%",
    margin: theme.padding.boundedBox,
    padding: theme.padding.largeBox,
    alignItems: "center",
  },
  flexContainerStats: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    width: "25%",
  },
});

const processCount = (count) => {
  if (count > 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count;
};

const StatItem = ({ count, text, testID }) => {
  return (
    <View style={styles.flexContainerStats}>
      <Text fontWeight="bold" testID={testID}>
        {processCount(count)}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const GithubLink = ({ url }) => {
  return (
    <Pressable
      style={[styles.blueBox, styles.largeBox]}
      onPress={() => Linking.openURL(url)}
    >
      <Text
        color="inverted"
        fontSize="subheading"
        fontWeight="bold"
        testID="repositoryGithubLink"
      >
        Open in Github
      </Text>
    </Pressable>
  );
};

const RepositoryItem = ({ repository, privateView }) => {
  const navigate = useNavigate();
  const handlePress = () => {
    // only navigate if the repository is not already private
    if (privateView) return;
    navigate(`/repository/${repository.id}`);
  };
  return (
    <Pressable testID="repositoryItem" onPress={handlePress}>
      <View style={styles.flexContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.flexItemImage}
        />
        <View style={styles.flexItemInfo}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            testID="repositoryFullName"
          >
            {repository.fullName}
          </Text>
          <Text color="textSecondary" testID="repositoryDescription">
            {repository.description}
          </Text>
          <View style={[styles.blueBox, styles.flexItemBox]}>
            <Text color="inverted" testID="repositoryLanguage">
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <StatItem
          count={repository.stargazersCount}
          text="Stars"
          testID="repositoryStargazersCount"
        />
        <StatItem
          count={repository.forksCount}
          text="Forks"
          testID="repositoryForksCount"
        />
        <StatItem
          count={repository.reviewCount}
          text="Reviews"
          testID="repositoryReviewCount"
        />
        <StatItem
          count={repository.ratingAverage}
          text="Rating"
          testID="repositoryRatingAverage"
        />
      </View>
      {privateView && (
        <View style={styles.flexContainer}>
          <GithubLink url={repository.url} />
        </View>
      )}
    </Pressable>
  );
};

export default RepositoryItem;
