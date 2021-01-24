const defaultState = {
    todos: [],
    loading: TextTrackCueList,
    error: {},
};

const todosReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: payload,
                loading: false,
            };
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, payload] };
        case "EDIT_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === payload.id ? { ...todo, ...payload } : todo
                ),
            };
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== payload),
                loading: false,
            };
        case "TOGGLE_COMPLETE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
                loading: false,
            };
        case "TOGGLE_IMPORTANCE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === payload
                        ? { ...todo, important: !todo.important }
                        : todo
                ),
                loading: false,
            };
        case "TOGGLE_CART_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === payload ? { ...todo, cart: !todo.cart } : todo
                ),
                loading: false,
            };
        case "CLEAR_ALL_COMPLETED_TODOS":
            return {
                ...state,
                todos: state.todos.filter((todo) => !todo.completed),
                loading: false,
            };
        case "TODO_ERROR":
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default todosReducer;
