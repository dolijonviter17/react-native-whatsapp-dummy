import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");
import { useRoute } from "@react-navigation/native";

// Comunity, Chats, Status, Calls

interface WhatsAppHeaderProps {
  onSearchMessages: () => void;
}
const WhatsAppHeader = ({ onSearchMessages }: WhatsAppHeaderProps) => {
  const handleIcon = () => {
    console.log("hellow");
  };
  const route = useRoute();

  const { colors } = useTheme();

  const handleSearch = () => {
    if (route.name !== "Groups") {
      return (
        <TouchableOpacity onPress={onSearchMessages}>
          <Ionicons
            style={{ marginRight: 15 }}
            name="search"
            size={30}
            color={colors.background}
          />
        </TouchableOpacity>
      );
    }
    // return;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: Platform.OS == "android" ? 10 : 70,
        paddingHorizontal: 10,
        backgroundColor: colors.whatsappBg,
        minHeight: 150,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          fontFamily: "Montserrat-Bold",
        }}
      >
        WhatsApp
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleIcon}>
          <Ionicons
            style={{ marginRight: 15 }}
            name="camera-outline"
            size={30}
            color={colors.background}
          />
        </TouchableOpacity>
        {handleSearch()}
        <TouchableOpacity onPress={handleIcon}>
          <Entypo
            name="dots-three-vertical"
            size={25}
            color={colors.background}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WhatsAppHeader;
