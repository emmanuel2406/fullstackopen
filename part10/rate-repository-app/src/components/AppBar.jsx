import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import theme from "../theme";

import { ME } from "../graphql/queries";

import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: theme.padding.appBarTab,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: Constants.statusBarHeight / 2,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" to="/" />
        {data?.me ? (
          <AppBarTab name="Sign Out" to="/signout" />
        ) : (
          <AppBarTab name="Sign In" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
