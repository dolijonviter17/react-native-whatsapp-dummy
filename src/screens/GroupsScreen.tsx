import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { WhatsAppStackParams } from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<WhatsAppStackParams, "Groups">;

const GroupsScreen: React.FC<Props> = ({ navigation }) => {
  const handleChats = () => {};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handleChats}>
        <MaterialIcons name="call" size={30} />
      </TouchableOpacity>
      <Text>GroupsScreen</Text>
    </View>
  );
};

export default GroupsScreen;
