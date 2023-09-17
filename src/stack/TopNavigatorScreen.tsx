/**
 * Doli Jonviter Simbolon
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { NavigatorScreenParams } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import {
  GroupsScreen,
  ChatsScreen,
  StatusScreen,
  CallsScreen,
} from "../screens";

export interface ChatLogProps {
  text?: string;
  timestamp?: string;
  side?: string;
  message_id?: number;
}
export interface ChatsProps {
  id: number;
  name: string;
  picture: string;
  chatlog: ChatLogProps[];
}

export interface DummyChatJsonProps {
  id: number;
  name: string;
  picture: string;
  chatlog: ChatLogProps[];
}
export interface FriendsProps {
  id?: number;
  name?: string;
  picture?: string;
  latest_timestamp?: string;
  lastChat?: string;
  // chatlog: ChatLogProps[];
  text?: string;
  timestamp?: string;
  side?: string;
  message_id?: number;
}

export type WhatsAppStackParams = {
  WhatsAppDashboard: undefined;
  Groups: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
  ChatRoom: { data: FriendsProps };
  SearchMessage: { data: FriendsProps[] };
  ContactInfo: { data: FriendsProps };
};
const Top = createMaterialTopTabNavigator<WhatsAppStackParams>();

const TopNavigatorScreen = () => {
  const { colors } = useTheme();
  return (
    <Top.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: colors.whatsappBg,
        },
      }}
    >
      <Top.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Top.Screen name="Chats" component={ChatsScreen} />
      <Top.Screen name="Status" component={StatusScreen} />
      <Top.Screen name="Calls" component={CallsScreen} />
    </Top.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    display: "none",
  },
});

export default TopNavigatorScreen;
