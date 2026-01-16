import React, { useState } from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { useDebounce } from "use-debounce";

import useRepositories from "../../hooks/useRepositories";
import RepositoryItem from "../RepositoryItem";
import OrderPicker from "./OrderPicker";
import KeywordSearch from "./KeywordSearch";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: theme.margin.separator,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeaderComponent = ({
  searchQuery,
  setSearchQuery,
  order,
  setOrder,
}) => (
  <View>
    <KeywordSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <OrderPicker selectedValue={order} onValueChange={setOrder} />
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchQuery, setSearchQuery, order, setOrder } = this.props;
    return (
      <ListHeaderComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        order={order}
        setOrder={setOrder}
      />
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem repository={item} privateView={false} />
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    order,
    searchKeyword: debouncedSearchQuery,
    first: 5,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      order={order}
      setOrder={setOrder}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
