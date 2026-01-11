import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.appBarTab,
  },
});

const AppBarTab = () => {
  return (
    <Pressable>
      <Text
        color="inverted"
        fontSize="subheading"
        fontWeight="bold"
        style={styles.text}
      >
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
