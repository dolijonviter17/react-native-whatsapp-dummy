import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";

import { useTheme } from "@react-navigation/native";
import { SearchMessageInput } from "../components";
import { FriendsProps, WhatsAppStackParams } from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<WhatsAppStackParams, "SearchMessage">;

export type MessageSide = "left" | "right";

const SearchMessagesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;
  const { colors } = useTheme();
  const [messages, setMessages] = useState("");
  const [historyConversation, setHistoryConversation] = useState<
    FriendsProps[]
  >([...data]);
  const [cloneConversation, setCloneConversation] = useState<FriendsProps[]>([
    ...data,
  ]);
  const getHistoryMessage = () => {
    setHistoryConversation(data);
    setCloneConversation(data);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeholder: "search",
      },
    });
  }, [navigation]);

  useEffect(() => {
    getHistoryMessage();
  }, []);
  // const handleSendMessage = useCallback(
  //   (text: string) => {
  //     setMessages(text);
  //     setHistoryConversation(
  //       historyConversation.filter((chat) =>
  //         chat.lastChat.toLowerCase().includes(text.toLocaleLowerCase())
  //       )
  //     );
  //   },
  //   [messages]
  // );

  const handleSendMessage = (text: string) => {
    setMessages(text);
    const filter = historyConversation.filter((chat) => {
      var message: any = chat.lastChat ? chat.lastChat : chat.text;
      return message.toLowerCase().includes(text.toLocaleLowerCase());
    });
    setHistoryConversation(filter);
    if (text === "") {
      setHistoryConversation([...cloneConversation]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS == "android" ? 10 : 70,
        paddingHorizontal: 10,
      }}
    >
      <SearchMessageInput
        placeholder="Search Message..."
        onChangeText={(e) => handleSendMessage(e)}
        goBack={() => navigation.goBack()}
        handleCleanText={() => setMessages("")}
      />
      <ScrollView>
        {historyConversation.map((item, index) => {
          return (
            <View
              style={{
                marginBottom: 10,
                backgroundColor: "#eee",
                padding: 20,
              }}
            >
              {item.name ? (
                <Text
                  style={{
                    marginBottom: 25,
                  }}
                >
                  {item.name}
                </Text>
              ) : null}
              <Text>{item.lastChat ? item.lastChat : item.text}</Text>
            </View>
          );
        })}

        {historyConversation.length === 0 ? (
          <Text
            style={{
              alignSelf: "center",
            }}
          >
            chat empty
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SearchMessagesScreen;
