interface Alert {
    id: number;
    msg: string;
    alertType: string;
}
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

export default (state: State = [], action: Actions) => {
    const { payload, type } = action;
    switch (type) {
        case "SET_ALERT":
            return [...state, payload];
        case "REMOVE_ALERT":
            return state.filter((alert) => alert.id !== payload);
        default:
            return state;
    }
};
