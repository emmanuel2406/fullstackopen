import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.greyBackground,
    paddingHorizontal: theme.padding.appBarTab,
    marginTop: theme.margin.separator,
  },
  searchbar: {
    backgroundColor: "white",
    borderRadius: theme.borderRadius.small,
    marginHorizontal: theme.margin.separator,
  },
  inputStyle: {
    color: theme.colors.blackText,
  },
});

const KeywordSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by keyword"
        placeholderTextColor={theme.colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
        inputStyle={styles.inputStyle}
        iconColor={theme.colors.blackText}
      />
    </View>
  );
};

export default KeywordSearch;
