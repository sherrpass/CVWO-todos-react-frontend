import moment from "moment";

export const categorySelector = (todos, categoryId = null) => {
    return categoryId === null
        ? todos
        : todos.filter(
              (todo) =>
                  todo.categories.findIndex(
                      (categoryItem) => categoryItem.id === categoryId
                  ) !== -1
          );
};
export const filterSelector = (
    todos,
    { completion, importance, dueBy, search }
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
            let category;
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
// filters: {
//     completion: "all/uncompleted/completed",
//     importance: "all/important",
//     dueBy: ["overdue", "dueToday", "upcoming", "unscheduled"],
// },

export const sortSelector = (todos, sortBy) => {
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

// export default (
//     todos,
//     { sortBy, importantOnly },
//     dueByCategory = undefined
// ) => {
//     // dueByCategory = null/undefined, "overdue", "dueToday", "upcoming", "unscheduled"
//     return todos
//         .filter((todo) => {
//             //for important filter
//             return !importantOnly || todo.important;
//         })
//         .filter((todo) => {
//             // for dueByCategory filter
//             if (dueByCategory) {
//                 const now = moment();
//                 let category;
//                 if (todo.due_by == null) {
//                     category = "unscheduled";
//                 } else {
//                     const dueByMoment = moment(todo.due_by);
//                     if (dueByMoment.isBefore(now, "day")) {
//                         category = "overdue";
//                     } else if (dueByMoment.isSame(now, "day")) {
//                         category = "dueToday";
//                     } else {
//                         category = "upcoming";
//                     }
//                 }
//                 return category === dueByCategory;
//             } else {
//                 return true;
//             }
//         })
//         .sort((a, b) => {
//             //sort based on sortBy type
//             if (sortBy === "createdAt") {
//                 return a.created_at < b.created_at ? 1 : -1; //1 means b is placed in front of a
//             } else if (sortBy === "dueBy") {
//                 if (a.due_by == null) {
//                     return 1;
//                 } else if (b.due_by == null) {
//                     return -1;
//                 } else {
//                     return a.due_by < b.due_by ? 1 : -1;
//                 }
//             } else {
//                 //sort by name
//                 return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
//             }
//         });
// };
