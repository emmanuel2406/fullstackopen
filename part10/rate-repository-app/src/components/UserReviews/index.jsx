import { View, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@apollo/client/react";

import ReviewControl from "./ReviewControl";
import theme from "../../theme";

import { GET_CURRENT_USER } from "../../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: theme.margin.separator,
  },
});

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const reviews = data?.me?.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewControl review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default UserReviews;
