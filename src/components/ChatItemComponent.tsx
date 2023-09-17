import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ChatsProps, FriendsProps } from "../stack/TopNavigatorScreen";

const { height, width } = Dimensions.get("window");

const filterLastChat = (text: any): string => {
  var filtertext = "";
  if (text.length > 40) {
    filtertext = text.slice(0, 40) + "...";
    return filtertext;
  }
  return text;
};

const filterTimeChat = (time: any): string => {
  var filtertime = time.slice(0, 5);
  return filtertime;
};

interface ChatItemProps {
  onPress: () => void;
  data: FriendsProps;
  handleUserInfo: () => void;
}

const ChatItemComponent: React.FC<ChatItemProps> = ({
  onPress,
  data,
  handleUserInfo,
}) => {
  const { name, picture, lastChat, latest_timestamp } = data;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleUserInfo}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
            }}
            source={{ uri: picture }}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat-Bold",
              paddingBottom: 5,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Montserrat-Regular",
              paddingBottom: 5,
            }}
          >
            {filterLastChat(lastChat)}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Montserrat-Regular",
            paddingBottom: 5,
            color: "#2ecc71",
          }}
        >
          {filterTimeChat(latest_timestamp)}
        </Text>
        <View
          style={{
            padding: 5,
            backgroundColor: "#2ecc71",
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Montserrat-Regular",
              color: "#fff",
            }}
          >
            20
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItemComponent;
