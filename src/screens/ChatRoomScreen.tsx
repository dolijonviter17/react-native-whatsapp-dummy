import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import {
  ChatRoomHeader,
  ChattingItemView,
  InputMessageBox,
} from "../components";
import DummyChat from "../dummy/DummyChat.json";
import { addQuestionsCollection } from "../model/WhatsAppModel";
import {
  ChatLogProps,
  FriendsProps,
  WhatsAppStackParams,
} from "../stack/TopNavigatorScreen";
import { generateTimesTamp, randomIntFromInterval } from "../utils/Utilities";
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<WhatsAppStackParams, "ChatRoom">;

export type MessageSide = "left" | "right";

const ChatRoomScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;
  const { friends } = DummyChat;
  const { colors } = useTheme();
  const [messages, setMessages] = useState("");
  const [chattingLog, setChattingLog] = useState<ChatLogProps[]>([]);
  const [readMessage, setReadMessage] = useState(false);
  let scrollView: any;
  const ref = useRef<FlatList>(null);

  const filterConversations = () => {
    const filterChattingById = friends.filter((state) => state.id === data.id);
    setChattingLog(filterChattingById[0].chatlog);
  };
  const endBottomChat = () => {
    scrollView.scrollToEnd({ animated: true });
  };
  useEffect(() => {
    filterConversations();
  }, []);

  const endTopChat = () => {
    scrollView.scrollToOffset({ offset: 0, animated: true });
  };

  // useEffect(() => {
  //   endBottomChat();
  // }, []);

  const handleChats = () => {
    // ref.current?.scrollToEnd({ animated: true });
    navigation.goBack();
  };
  const renderItem = ({ item }: { item: ChatLogProps }) => (
    <ChattingItemView data={item} />
  );

  const handleSendMessage = useCallback(
    async (messages: any) => {
      if (messages !== "") {
        var newMessage: any = [];
        newMessage.push({
          text: messages,
          timestamp: generateTimesTamp(),
          side: "right",
          message_id: chattingLog.length + 1,
        });
        setChattingLog([...chattingLog, ...newMessage]);
        try {
          const addQuestion = await addQuestionsCollection(messages);
          const { choices } = addQuestion;
          var randomChoices = await randomIntFromInterval(choices);
          newMessage.push({
            text: randomChoices,
            timestamp: generateTimesTamp(),
            side: "left",
            message_id: newMessage[0].message_id + 1,
          });
          setChattingLog([...chattingLog, ...newMessage]);
          setReadMessage(true);
        } catch (error) {
          console.log("error", error);
          // Alert.alert("Disconnect");
        } finally {
          newMessage = [];
          setMessages("");
        }
      } else {
        // Alert.alert("failed");
      }
    },
    [chattingLog, ref.current?.scrollToEnd({ animated: true })]
  );

  const handleContactInfo = (data: FriendsProps) => {
    navigation.push("ContactInfo", {
      data: data,
    });
  };

  const onSearchMessages = async () => {
    navigation.push("SearchMessage", {
      data: chattingLog,
    });
  };

  const handleReadNewMessage = () => {
    setReadMessage(false);
    ref.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        backgroundColor: colors.bgChatRoom,
      }}
    >
      {/* ContactInfo */}
      <ChatRoomHeader
        onSearchMessages={onSearchMessages}
        data={data}
        onPress={handleChats}
        handleContactInfo={() => handleContactInfo(data)}
      />

      {readMessage && chattingLog.length > 8 ? (
        <TouchableOpacity
          onPress={() => handleReadNewMessage()}
          style={styles.chatNotif}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Montserrat-Regular",
              color: "#fff",
            }}
          >
            1
          </Text>
        </TouchableOpacity>
      ) : null}

      {chattingLog.length > 0 ? (
        <FlatList
          ref={ref}
          data={chattingLog}
          keyExtractor={(item: any, index) => item.id}
          renderItem={renderItem}
          // initialScrollIndex={chattingLog.length - 1}
          getItemLayout={(item, index) => {
            return { index, length: 200, offset: 200 * index };
          }}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 0.5,
                }}
              />
            );
          }}
        />
      ) : null}

      <InputMessageBox
        placeholder="Write Something"
        value={messages}
        onChangeText={(e) => setMessages(e)}
        handleSendMessage={() => handleSendMessage(messages)}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  chatNotif: {
    position: "absolute",
    bottom: height / 10,
    zIndex: 10,
    left: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#2ecc71",
    alignItems: "center",
    justifyContent: "center",
  },
});
