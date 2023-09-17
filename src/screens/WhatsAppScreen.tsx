import { useTheme } from "@react-navigation/native";
import React from "react";
import { Dimensions, View } from "react-native";

import { io } from "socket.io-client";
import { WhatsAppHeader } from "../components";
import TopNavigatorScreen, {
  WhatsAppStackParams,
} from "../stack/TopNavigatorScreen";
import StackNavigator from "../stack/StackNavigator";
const { height, width } = Dimensions.get("window");

const socket = io("http://localhost:8000");
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getMergeDataMessage } from "../model/WhatsAppModel";
type Props = NativeStackScreenProps<WhatsAppStackParams, "WhatsAppDashboard">;

// Comunity, Chats, Status, Calls
const WhatsAppScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const onSearchMessages = async () => {
    const data = await getMergeDataMessage();
    navigation.push("SearchMessage", {
      data: data,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <WhatsAppHeader onSearchMessages={onSearchMessages} />
      <TopNavigatorScreen />
      {/* <StackNavigator /> */}
    </View>
  );
};

export default WhatsAppScreen;
