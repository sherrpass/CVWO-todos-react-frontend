const defaultState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            console.log("reached reducer");
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
        case "DELETE_ACCOUNT":
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