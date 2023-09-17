import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, View } from "react-native";

import { ChatItemComponent, UserInfoModal } from "../components";
import DummyChat from "../dummy/DummyChat.json";
import { questionsCollection } from "../model/WhatsAppModel";
import { FriendsProps, WhatsAppStackParams } from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");
type Props = NativeStackScreenProps<WhatsAppStackParams, "Chats">;

const ChatsScreen: React.FC<Props> = ({ navigation }) => {
  const { profile } = DummyChat;
  const { friends } = profile;
  const [conversations, setConversations] = useState<FriendsProps[]>([
    ...friends,
  ]);
  const [modal, setModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});

  useEffect(() => {
    setConversations(friends);
    // getDataContact();
  }, [conversations]);

  const getDataContact = async () => {
    try {
      const contact = await questionsCollection();
      console.log("contactcontactcontact", contact);
    } catch (error) {
      Alert.alert("Disconnect");
    }
  };

  const handleChatRoom = (item: FriendsProps) => {
    navigation.push("ChatRoom", {
      data: item,
    });
  };

  // Props when rendered item with typescript
  // renderItem: ListRenderItem<Emoticon> = ({ item }) => (
  //   <ListItem title={item.name} checkmark={item.checked} />
  // );
  const handleUserInfo = (data: FriendsProps) => {
    setModal(true);
    setSelectedUserInfo(data);
  };

  const renderItem = ({ item }: { item: FriendsProps }) => (
    <ChatItemComponent
      data={item}
      onPress={() => handleChatRoom(item)}
      handleUserInfo={() => handleUserInfo(item)}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 15,
      }}
    >
      <FlatList
        data={conversations}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
      />

      <UserInfoModal
        data={selectedUserInfo}
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      />
    </View>
  );
};

export default ChatsScreen;
