import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { completeTodo, deleteTodo, toggleImportanceTodo } from "../../actions/todos";
import { Link } from "react-router-dom";

const Todo = ({dispatch, id, title, due_by, created_at, important, completed, date}) => {

    const [importanceLoading,setImportanceLoading] = useState(true);
    useEffect(()=>{
        setImportanceLoading(false);
    },[important])
    const onDeleteClick = (e) =>{
        dispatch(deleteTodo(id));
        e.target.disabled = true; //to prevent multiple axios requests which would throw an error.
    }
    const onCompleteClick = (e) =>{
        dispatch(completeTodo(id));
        e.target.disabled = true; //instantanously
    }
    const onImportanceChange = () => {
        setImportanceLoading(true); //to prevent spamming the button, which causes a desync between the store and the backend.
        dispatch(toggleImportanceTodo(id));
    }
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>{title}</h3>
            </Link>
            {date === "due_by" ? <p>{due_by && moment(due_by).format("MMM D, YYYY")}</p> : <p>{moment(created_at).format("MMM D, YYYY")}</p>}
            <button onClick={onDeleteClick}>Delete</button>
            <button disabled={importanceLoading} onClick={onImportanceChange}>{important ? "Important" : "Not Important"}</button>
            <button disabled={!!completed} onClick={onCompleteClick}>Complete</button>
        </div>
    );
}

// class Todo extends React.Component {
//     state={
        
//     }
//     onDeleteClick = (e) =>{
//         this.props.dispatch(deleteTodo(this.props.id));
//         e.target.disabled = true; //to prevent multiple axios requests which would throw an error.
//     }
//     onCompleteClick = (e) =>{
//         this.props.dispatch(completeTodo(this.props.id));
//         e.target.disabled = true; //instantanously
//     }
//     onImportanceChange = () => {
//         this.props.dispatch(toggleImportanceTodo(this.props.id));
//     }
//     render(){
//         return (
//             <div>
//                 <Link to={`/edit/${this.props.id}`}>
//                     <h3>{this.props.title}</h3>
//                 </Link>
//                 <p>{this.props.due_by && moment(this.props.due_by).format("MMM D, YYYY")}</p>
//                 <button onClick={this.onDeleteClick}>Delete</button>
//                 <button onClick={this.onImportanceChange}>{this.props.important ? "Important" : "Not Important"}</button>
//                 <button disabled={!!this.props.completed} onClick={this.onCompleteClick}>Complete</button>
//             </div>
//         )
//     }
// }

export default connect()(Todo);