import { Platform } from "react-native";

const theme = {
  borderRadius: {
    small: 5,
  },
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    textInverted: "#f0f0f0",
    mainBackground: "#e1e4e8",
    error: "#d73a4a",
    danger: "#dc3545",
    greyBackground: "#e1e4e8",
    blackText: "#000000",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    appBarTab: 10,
    boundedBox: 5,
    largeBox: 10,
  },
  sizes: {
    imageWidth: 48,
    imageHeight: 48,
  },
  margin: {
    separator: 10,
  },
  textAlign: {
    left: "left",
    center: "center",
    right: "right",
  },
};

export default theme;
