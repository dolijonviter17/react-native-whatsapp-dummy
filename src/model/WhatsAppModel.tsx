import axios from "axios";
import DefaultTheme from "../theme/DefaultTheme";
import DummyChat from "../dummy/DummyChat.json";
import {
  ChatsProps,
  DummyChatJsonProps,
  FriendsProps,
} from "../stack/TopNavigatorScreen";
const fetchLocalContact = async () => {
  //   const jsonData = await fsPromises.readFile(dataFilePath);
  // const objectData = JSON.parse(jsonData);
  //   const objectData = JSON.parse(jsonData);
  return "jsonData";
};

const questionsCollection = async () => {
  var result = await axios
    .get("https://polls.apiblueprint.org/questions")
    .then((res) => {
      const response = res.data;
      return response;
    });
  return result;
};

const getMergeDataMessage = (): FriendsProps[] => {
  const { profile, friends } = DummyChat;
  const mergeConversation = [...profile.friends];
  const historyByFriendId = [...friends];
  for (let i = 0; i < historyByFriendId.length; i++) {
    var element = historyByFriendId[i];
    var chatLog = element.chatlog;
    for (let j = 0; j < chatLog.length; j++) {
      var datalog = chatLog[j];
      mergeConversation.push({
        id: element.id,
        name: element.name,
        picture: element.picture,
        latest_timestamp: datalog.timestamp,
        lastChat: datalog.text,
      });
    }
  }
  return mergeConversation;
};

const addQuestionsCollection = async (messages: string) => {
  var result = await axios
    .post("https://polls.apiblueprint.org/questions", {
      question: messages,
      choices: [
        "hello I'm Jonviter, I'm a developer",
        "hello, I'm studying programming. come learn with me",
        "I enjoy being a developer",
        "Hello World, i'm developer",
      ],
    })
    .then((res) => {
      const response = res.data;
      return response;
    });
  return result;
};

export {
  fetchLocalContact,
  questionsCollection,
  addQuestionsCollection,
  getMergeDataMessage,
};
