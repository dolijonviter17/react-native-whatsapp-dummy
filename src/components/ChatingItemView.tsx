import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ChatLogProps, WhatsAppStackParams } from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");

export type MessageSide = "left" | "right";
interface MessageChatProps {
  data: ChatLogProps;
  // side: MessageSide;
}

const ReactionItems = [
  {
    id: 0,
    emoji: "😇",
    title: "like",
  },
  {
    id: 1,
    emoji: "🥰",
    title: "love",
  },
  {
    id: 2,
    emoji: "🤗",
    title: "care",
  },
  {
    id: 3,
    emoji: "😘",
    title: "kiss",
  },
  {
    id: 4,
    emoji: "😂",
    title: "laugh",
  },
  {
    id: 5,
    emoji: "😎",
    title: "cool",
  },
];
const HistoryChatByDateView = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "rgba(72,454,505,0.1)",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Montserrat-Bold",
        }}
      >
        Yesterday
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  messageBoxRight: {
    // width: "75%",
    minHeight: 50,
    // minWidth: 200,
    maxWidth: "85%",
    backgroundColor: "#DCF8C6",
    paddingHorizontal: 20,
    paddingVertical: 15,
    // left
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    // left
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },

  // Left

  messageLeftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 20,
  },

  messageBoxLeft: {
    minHeight: 50,
    maxWidth: "85%",
    marginLeft: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },

  textContainerMaxLength: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  textContainerMaxLengthMinLengh: {
    // flexDirection: "row",
    // position: "absolute",
    // right: 10,
  },

  // Input

  inputMsgContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "90%",
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    position: "absolute",
    bottom: 15,
  },
});

const ChattingItemView = ({ data }: MessageChatProps) => {
  const { side, text, timestamp } = data;
  const boxHeight = useSharedValue(0);
  const [maxLines, setMaxLines] = useState<boolean>(false);
  const [onPressStatus, setOnPressStatus] = useState(false);
  const [dataReaction, setDataReaction] = useState([...ReactionItems]);

  useEffect(() => {
    setDataReaction(ReactionItems);
  }, []);
  const containerMsg = () => {
    if (side === "left") return styles.messageLeftContainer;
    if (side === "right") return styles.messageRightContainer;
  };
  const boxMsg = () => {
    if (side === "left") return styles.messageBoxLeft;
    if (side === "right") return styles.messageBoxRight;
  };

  const msgStylesLength = (text: string) => {
    if (text.length > 30) {
      return styles.textContainerMaxLength;
    }
    return styles.textContainerMaxLengthMinLengh;
  };

  const truncatedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, { duration: 1000 }),
      position: "absolute",
      bottom: 15,
      zIndex: 20,
      backgroundColor: "#eee",
      width: "85%",
      alignSelf: "center",
      borderRadius: 20,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    };
  }, []);

  const handleReaction = useCallback(
    (max: boolean) => {
      setTimeout(() => {
        setMaxLines(max);
      }, 400);
      max ? (boxHeight.value = 70) : (boxHeight.value = 0);
    },
    [maxLines]
  );

  const logPress = (press: boolean) => {
    setOnPressStatus(press);
    // boxHeight.value = 0;

    console.log(press);
  };

  const MessageItemPosition = (text: string) => {
    if (text.length > 30) {
      return (
        <>
          <Text
            style={{
              paddingBottom: 10,
              paddingRight: 10,
            }}
          >
            {text}
          </Text>
          <View style={msgStylesLength(text)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  paddingRight: 5,
                }}
              >
                {timestamp}
              </Text>
              <FontAwesome5 name="check-double" color="#2ecc71" size={15} />
            </View>
          </View>
        </>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>{text}</Text>
        <Text
          style={{
            paddingLeft: 12,
            paddingRight: 7,
          }}
        >
          {timestamp}
        </Text>
        <FontAwesome5 name="check-double" color="#2ecc71" size={15} />
      </View>
    );
  };

  return (
    <>
      {/* Kiri */}
      <Pressable
        style={[
          containerMsg(),
          {
            opacity: onPressStatus ? 0.5 : 1,
          },
        ]}
        onPress={() => logPress(!onPressStatus)}
        onPressIn={() => logPress(!onPressStatus)}
        onPressOut={() => logPress(!onPressStatus)}
        onLongPress={() => handleReaction(!maxLines)}
      >
        <View style={boxMsg()}>{MessageItemPosition(text ? text : "")}</View>
      </Pressable>
      <Animated.View style={truncatedAnimation}>
        {dataReaction.map((item, key) => {
          return (
            <TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      {/* Break */}
    </>
  );
};

export default ChattingItemView;
