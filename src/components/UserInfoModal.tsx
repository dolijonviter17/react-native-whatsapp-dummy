import { useTheme } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
const { height, width } = Dimensions.get("window");

interface ModalProps {
  isVisible: boolean;
  onBackdropPress: () => void | undefined;
  data: any;
}
const UserInfoModal = ({ data, isVisible, onBackdropPress }: ModalProps) => {
  const { colors } = useTheme();

  const handleIcon = () => {
    console.log("hellow");
  };
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View
        style={{
          width: "100%",
          height: 400,
          backgroundColor: colors.background,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 300,
          }}
          source={{ uri: data.picture }}
        />
        <View
          style={{
            position: "absolute",
            left: 20,
            top: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {data.name}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 25,
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <TouchableOpacity onPress={handleIcon}>
            <FontAwesome5 name="video" size={30} color={colors.whatsappBg} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIcon}>
            <Ionicons
              name="camera-outline"
              size={30}
              color={colors.whatsappBg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIcon}>
            <Ionicons name="call" size={30} color={colors.whatsappBg} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIcon}>
            <AntDesign name="infocirlce" size={30} color={colors.whatsappBg} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserInfoModal;
