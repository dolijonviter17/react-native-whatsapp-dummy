/**
 * Doli Jonviter Simbolon
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo, useState } from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./src/state";
// import { AppContext } from "./src/context/AppContext";
import { AppContext, ThemeContextType } from "./src/context/AppContext";
import StackNavigator from "./src/stack/StackNavigator";
import DarkTheme from "./src/theme/DarkTheme";
import DefaultTheme from "./src/theme/DefaultTheme";

// import ThemeContext from "./src/context/ThemeContext";

const RouterNavigation = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const appContext = useMemo<ThemeContextType>(() => {
    return {
      loginStatus,
      isDarkTheme,
      setLoginStatus,
      setIsDarkTheme,
    };
  }, [isDarkTheme, setIsDarkTheme, loginStatus, setLoginStatus]);

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={appContext}>
        {<StackNavigator />}
      </AppContext.Provider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RouterNavigation />
    </Provider>
  );
};

export default App;
