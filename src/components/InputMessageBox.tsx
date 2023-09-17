import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  ChatLogProps,
  ChatsProps,
  WhatsAppStackParams,
} from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");
import { useTheme } from "@react-navigation/native";
import { ChatRoomHeader } from "../components";
import DummyChat from "../dummy/DummyChat.json";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

interface InputMessageProps {
  onChangeText?: ((text: string) => void) | undefined;
  value: string | undefined;
  placeholder?: string | undefined;
  handleSendMessage?: (() => void) | undefined;
}

const InputMessageBox = ({
  onChangeText,
  value,
  placeholder,
  handleSendMessage,
}: InputMessageProps) => {
  const { colors } = useTheme();

  var handleKeyboardStyle = 0;
  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    // Alert.alert("Keyboard is open");
    handleKeyboardStyle = 20;
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    // Alert.alert("Keyboard is closed");
  });
  return (
    <View
      // onPress={Keyboard.dismiss}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          marginBottom: 25,
          backgroundColor: "#fff",
          width: "83%",
          borderRadius: 50,
          flexDirection: "row",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity>
          <Entypo name="emoji-happy" color="#5F6368" size={25} />
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          style={{
            flex: 1,
            paddingHorizontal: 10,
            color: "black",
            fontSize: 12,
          }}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity style={{ paddingRight: 20 }}>
          <Entypo name="attachment" color="#5F6368" size={25} />
        </TouchableOpacity>
        {value === "" && (
          <TouchableOpacity>
            <FontAwesome name="camera" color="#5F6368" size={25} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSendMessage}
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: colors.whatsappBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value ? (
          <Ionicons name="send" color="#fff" size={25} />
        ) : (
          <FontAwesome name="microphone" color="#fff" size={25} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputMessageBox;
