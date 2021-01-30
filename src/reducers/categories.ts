import { Category } from "../allTypes";

const defaultState: State = {
    categories: [],
    loading: true,
    currCategory: null,
    error: {},
};
type State = {
    categories: Category[];
    loading: boolean;
    currCategory: number | null;
    error: {
        msg?: string;
        status?: string;
    };
};
type Actions =
    | {
          type: "GET_CATEGORIES";
          payload: Category[];
      }
    | {
          type: "ADD_CATEGORY";
          payload: Category;
      }
    | {
          type: "EDIT_CATEGORY";
          payload: { id: number; category: Category };
      }
    | {
          type: "DELETE_CATEGORY" | "SET_CURR_CATEGORY";
          payload: number;
      }
    | {
          type: "CATEGORY_ERROR";
          payload: {
              msg: string;
              status: string;
          };
      }
    | {
          type: "DELETE_ALL_CATEGORIES";
      };
const categoriesReducer = (state: State = defaultState, action: Actions) => {
    switch (action.type) {
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case "EDIT_CATEGORY":
            return state.loading
                ? state
                : {
                      ...state,
                      categories: state.categories.map((category) => {
                          // console.log(typeof action.payload.id);
                          return category.id === action.payload.id
                              ? action.payload.category
                              : category;
                      }),
                  };
        case "DELETE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category.id !== action.payload
                ),
            };
        case "CATEGORY_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "SET_CURR_CATEGORY":
            return {
                ...state,
                currCategory: action.payload,
            };
        case "DELETE_ALL_CATEGORIES":
            return {
                ...state,
                categories: [],
                loading: true,
            };
        default:
            return state;
    }
};

export default categoriesReducer;
