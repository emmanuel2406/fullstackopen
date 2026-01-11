import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingLeft: theme.padding.appBarTab,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: Constants.statusBarHeight / 2,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab />
    </View>
  );
};

export default AppBar;
