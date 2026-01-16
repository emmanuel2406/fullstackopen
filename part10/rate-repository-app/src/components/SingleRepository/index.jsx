import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../../hooks/useRepository";

import RepositoryItem from "../RepositoryItem";
import ReviewItem from "../ReviewItem";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: theme.margin.separator,
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} type="user" />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (
        <View style={{ marginBottom: theme.margin.separator }}>
          <RepositoryItem repository={repository} privateView={true} />
        </View>
      )}
    />
  );
};

export default SingleRepository;
