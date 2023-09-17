import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ChatsProps, FriendsProps } from "../stack/TopNavigatorScreen";

const { height, width } = Dimensions.get("window");

interface ChatRoomProps {
  onPress: () => void;
  data: FriendsProps;
  handleContactInfo: () => void;
  onSearchMessages: () => void;
}
const ChatRoomHeader: React.FC<ChatRoomProps> = ({
  data,
  onPress,
  handleContactInfo,
  onSearchMessages,
}) => {
  const handleIcon = () => {
    console.log("hellow");
  };
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: Platform.OS == "android" ? 10 : 70,
        paddingHorizontal: 10,
        backgroundColor: colors.whatsappBg,
        height: 150,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={onPress}
        >
          <AntDesign name="arrowleft" size={25} color={colors.background} />
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
            source={{ uri: data.picture }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleContactInfo}>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              paddingLeft: 10,
              fontFamily: "Montserrat-Bold",
              //   width: "70%",
            }}
          >
            {data.name}
          </Text>
        </TouchableOpacity>
      </View>

      {/* break */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={handleIcon}>
          <FontAwesome5 name="video" size={25} color={colors.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIcon}>
          <Ionicons name="camera-outline" size={25} color={colors.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearchMessages}>
          <Ionicons name="search" size={25} color={colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomHeader;
