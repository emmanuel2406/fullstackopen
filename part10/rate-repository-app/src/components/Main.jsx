import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";
import theme from "../theme";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
