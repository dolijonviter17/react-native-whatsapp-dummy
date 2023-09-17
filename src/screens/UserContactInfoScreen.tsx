import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { WhatsAppStackParams } from "../stack/TopNavigatorScreen";
const { height, width } = Dimensions.get("window");
import { useTheme } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
type Props = NativeStackScreenProps<WhatsAppStackParams, "ContactInfo">;

const UserContactInfoScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;
  const handleChats = () => {};
  const { colors } = useTheme();

  const handleIcon = () => {
    console.log("hellow");
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS == "android" ? 10 : 70,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 70,
                marginBottom: 25,
              }}
              source={{ uri: data.picture }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {data.name}
          </Text>

          <View
            style={{
              marginTop: 20,
              width: "70%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={handleIcon}>
              <Ionicons name="call" size={30} color={colors.whatsappBg} />
              <Text style={styles.textIcon}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIcon}>
              <FontAwesome5 name="video" size={30} color={colors.whatsappBg} />
              <Text style={styles.textIcon}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIcon}>
              <Ionicons name="search" size={30} color={colors.whatsappBg} />
              <Text style={styles.textIcon}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleIcon}>
          <Entypo name="dots-three-vertical" size={25} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserContactInfoScreen;

const styles = StyleSheet.create({
  textIcon: {
    fontSize: 12,
    paddingTop: 5,
  },
});
