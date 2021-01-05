import React from 'react';
import Todos from "./Todos";

const DueByPage = () => {
    return (
        <div>
            <Todos title="Overdue" timeCategory="overdue"/>
            <Todos title="Due today" timeCategory="dueToday"/>
            <Todos title="Upcoming" timeCategory="upcoming"/>
            <Todos title="Unscheduled" timeCategory="unscheduled"/>  
        </div>
    );
};

export default DueByPage;