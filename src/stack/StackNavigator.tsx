/**
 * Doli Jonviter Simbolon
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import "react-native-gesture-handler";
import {
  ChatRoomScreen,
  ChatsScreen,
  SearchMessagesScreen,
  UserContactInfoScreen,
} from "../screens";
import WhatsAppScreen from "../screens/WhatsAppScreen";
import { WhatsAppStackParams } from "./TopNavigatorScreen";
const Stack = createNativeStackNavigator<WhatsAppStackParams>();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WhatsAppDashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WhatsAppDashboard" component={WhatsAppScreen} />
      <Stack.Screen name="Chats" component={ChatsScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="SearchMessage" component={SearchMessagesScreen} />
      <Stack.Screen name="ContactInfo" component={UserContactInfoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
