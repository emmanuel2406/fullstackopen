import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.appBarTab,
  },
});

const AppBarTab = ({ name, to }) => {
  return (
    <Link to={to} style={styles.container}>
      <Text color="inverted" fontSize="subheading" fontWeight="bold">
        {name}
      </Text>
    </Link>
  );
};

export default AppBarTab;
