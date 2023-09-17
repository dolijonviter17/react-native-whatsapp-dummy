import axios from "axios";
import { Dispatch } from "react";
import { Action, CategoryQuestionProps, Quiz } from "../actions";
import { ActionType } from "../action-types";
import { shuffeArray, updateAnswer } from "../../utils/Utilities";

export const fetchContact = () => {
  console.log("contact");
};

// export const fetchQuestionByCategory = (item: CategoryQuestionProps) => {
//   return "()";
// };
