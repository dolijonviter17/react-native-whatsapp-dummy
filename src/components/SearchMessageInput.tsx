import React from "react";
import {
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
const { height, width } = Dimensions.get("window");

interface SearchProps {
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  handleSearchMessage?: (() => void) | undefined;
  goBack?: (() => void) | undefined;
  handleCleanText?: (() => void) | undefined;
}

const SearchMessageInput = ({
  onChangeText,
  value,
  placeholder,
  handleSearchMessage,
  goBack,
  handleCleanText,
}: SearchProps) => {
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
      }}
    >
      <View
        style={{
          marginBottom: 25,
          backgroundColor: "#eee",
          width: "90%",
          borderRadius: 50,
          flexDirection: "row",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" color="#5F6368" size={25} />
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
        {/* <TouchableOpacity style={{ paddingRight: 20 }}>
          <Entypo name="attachment" color="#5F6368" size={25} />
        </TouchableOpacity> */}
        {value !== "" && (
          <TouchableOpacity onPress={handleCleanText}>
            <AntDesign name="close" color="#5F6368" size={25} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchMessageInput;
