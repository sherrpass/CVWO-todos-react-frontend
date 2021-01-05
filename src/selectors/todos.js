import moment from "moment";

export default (todos, {sortBy, importantOnly}, dueByCategory = undefined) => { // dueByCategory = null/undefined, "overdue", "dueToday", "upcoming", "unscheduled"
    return todos.filter((todo)=>{ //for important filter
        return !importantOnly || todo.important
    }).filter((todo) => {  // for dueByCategory filter
        if(dueByCategory){
            const now = moment();
            let category;
            if(todo.due_by == null){
                category = "unscheduled";
            }else{
                const dueByMoment = moment(todo.due_by);
                if (dueByMoment.isBefore(now,"day")){
                    category = "overdue";
                }else if(dueByMoment.isSame(now,"day")){
                    category = "dueToday";
                }else{
                    category = "upcoming";
                }
            }
            return category === dueByCategory;
        }else{
            return true;
        }
    }).sort((a, b) => { //sort based on sortBy type
        if (sortBy === "createdAt") {
            return a.created_at < b.created_at ? 1 : -1; //1 means b is placed in front of a
        } else if (sortBy === "dueBy") {
            if (a.due_by == null){
                return 1;
            } else if (b.due_by == null){
                return -1;
            } else {
                return a.due_by < b.due_by ? 1 : -1;
            }
        } else { //sort by name
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        }   
    })
}