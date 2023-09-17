import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { whatsAppCreators } from "../state";
export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...whatsAppCreators,
    },
    dispatch
  );
};
