import moment from "moment";
import { Todo, Filters, Category, Override } from "../allTypes";

type dueBy = "overdue" | "dueToday" | "upcoming" | "unscheduled";
export const categorySelector = (
    todos: Todo[],
    categoryId: number | null = null
) => {
    return categoryId === null
        ? todos
        : todos.filter(
              (todo: Todo) =>
                  todo.categories.findIndex(
                      (categoryItem: Category) => categoryItem.id === categoryId
                  ) !== -1
          );
};
export const filterSelector = (
    todos: Todo[],
    {
        completion,
        importance,
        dueBy,
        search,
    }: Override<
        Filters,
        {
            search: string;
            dueBy: Array<dueBy>;
        }
    >
) => {
    return todos
        .filter((todo) => {
            //for search filter
            return (
                !search ||
                todo.title.toLowerCase().includes(search.toLowerCase())
            );
        })
        .filter((todo) => {
            //for importance filter
            return importance === "all" || todo.important;
        })
        .filter((todo) => {
            return (
                completion === "all" || //for completion filter
                (completion === "uncompleted"
                    ? !todo.completed
                    : todo.completed)
            );
        })
        .filter((todo) => {
            // for dueBy filter
            const now = moment();
            let category: dueBy;
            if (todo.due_by == null) {
                category = "unscheduled";
            } else {
                const dueByMoment = moment(todo.due_by);
                if (dueByMoment.isBefore(now, "day")) {
                    category = "overdue";
                } else if (dueByMoment.isSame(now, "day")) {
                    category = "dueToday";
                } else {
                    category = "upcoming";
                }
            }
            return dueBy.includes(category);
        });
};

export const sortSelector = (
    todos: Todo[],
    sortBy: "dueBy" | "createdAt" | "name"
) => {
    return todos.sort((a, b) => {
        //sort based on sortBy type
        if (sortBy === "createdAt") {
            return a.created_at < b.created_at ? 1 : -1; //1 means b is placed in front of a
        } else if (sortBy === "dueBy") {
            if (a.due_by == null) {
                return 1;
            } else if (b.due_by == null) {
                return -1;
            } else {
                return a.due_by < b.due_by ? 1 : -1;
            }
        } else {
            //sort by name
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
        }
    });
};

export const cartSelector = (todos: Todo[]) => {
    return todos.filter((todo) => {
        return todo.cart;
    });
};
