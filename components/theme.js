import { DefaultTheme } from "react-native-paper";


export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    accent: "orange"
  },
  fonts: {
    regular: {
      fontFamily: "Body",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "Body-Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Body",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "Body",
      fontWeight: "normal"
    },
  }
}