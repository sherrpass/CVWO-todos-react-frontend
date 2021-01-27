import { Alert } from "../allTypes";

type State = Alert[];
type Actions =
    | {
          type: "SET_ALERT";
          payload: Alert;
      }
    | {
          type: "REMOVE_ALERT";
          payload: number;
      };

const alertReducer = (state: State = [], action: Actions) => {
    const { payload, type } = action;
    switch (type) {
        case "SET_ALERT":
            return [...state, payload] as Alert[];
        case "REMOVE_ALERT":
            return state.filter((alert) => alert.id !== payload);
        default:
            return state;
    }
};

export default alertReducer;
