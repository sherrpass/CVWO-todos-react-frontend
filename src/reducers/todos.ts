import { Todo } from "../allTypes";
const defaultState: State = {
    todos: [],
    loading: true,
    error: {},
};

type State = {
    todos: Todo[];
    loading: boolean;
    error: {
        msg?: string;
        status?: string;
    };
};
type Actions =
    | {
          type: "GET_TODOS";
          payload: Todo[];
      }
    | {
          type: "ADD_TODO";
          payload: Todo;
      }
    | {
          type: "EDIT_TODO";
          payload: { id: number; todo: Todo };
      }
    | {
          type:
              | "DELETE_TODO"
              | "TOGGLE_COMPLETE_TODO"
              | "TOGGLE_IMPORTANCE_TODO"
              | "TOGGLE_CART_TODO";
          payload: number;
      }
    | {
          type: "TODO_ERROR";
          payload: {
              msg?: string;
              status?: string;
          };
      }
    | {
          type: "CLEAR_ALL_COMPLETED_TODOS";
      }
    | {
          type: "DELETE_ALL_TODOS";
      };
const todosReducer = (state: State = defaultState, action: Actions) => {
    switch (action.type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: action.payload,
                loading: false,
            };
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        case "EDIT_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, ...action.payload }
                        : todo
                ),
            };
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
                loading: false,
            };
        case "TOGGLE_COMPLETE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
                loading: false,
            };
        case "TOGGLE_IMPORTANCE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, important: !todo.important }
                        : todo
                ),
                loading: false,
            };
        case "TOGGLE_CART_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, cart: !todo.cart }
                        : todo
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
                error: action.payload,
                loading: false,
            };
        case "DELETE_ALL_TODOS":
            return {
                ...state,
                todos: [],
                loading: true,
            };
        default:
            return state;
    }
};

export default todosReducer;
