import { Filters } from "../allTypes";

const defaultState: State = {
    sortBy: "dueBy", //createdAt, dueBy or name
    filters: {
        completion: "all", //completed, uncompleted or all
        importance: "all", //important or all
        dueBy: ["overdue", "dueToday", "upcoming", "unscheduled"], //"overdue", "dueToday", "upcoming", "unscheduled"
        search: "",
    },
};
type State = {
    sortBy: "dueBy" | "createdAt" | "name";
    filters: {
        completion: "completed" | "uncompleted" | "all";
        importance: "important" | "all";
        dueBy: Array<"overdue" | "dueToday" | "upcoming" | "unscheduled">;
        search: string;
    };
};
type Actions =
    | {
          type: "SORT_BY";
          payload: "dueBy" | "createdAt" | "name";
      }
    | {
          type: "EDIT_FILTERS";
          payload: Filters;
      };
const filtersReducer = (state: State = defaultState, action: Actions) => {
    const { type, payload } = action;
    switch (type) {
        case "SORT_BY":
            return {
                ...state,
                sortBy: payload as "dueBy" | "createdAt" | "name",
            };
        case "EDIT_FILTERS":
            return {
                ...state,
                filters: { ...state.filters, ...(payload as object) },
            };
        default:
            return state;
    }
};

export default filtersReducer;
