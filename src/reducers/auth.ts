import { User } from "../allTypes";

const defaultState: State = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};
type State = {
    token: string | null;
    isAuthenticated: boolean | null;
    loading: boolean;
    user: User | null;
};
type Actions =
    | {
          type: "USER_LOADED" | "REGISTER_SUCCESS" | "LOGIN_SUCCESS";
          payload: {
              user: User;
              token: string;
          };
      }
    | {
          type: "REGISTER_FAIL" | "LOGIN_FAIL" | "AUTH_ERROR" | "LOGOUT";
      };
const authReducer = (state: State = defaultState, action: Actions) => {
    switch (action.type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user,
            };
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                token: null, // this removes token from store
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
