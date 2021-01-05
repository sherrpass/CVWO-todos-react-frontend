import React from 'react';
import TodoForm from "./TodoForm";
import { addTodo } from "../../actions/todos";
import { connect } from "react-redux";

class AddTodoPage extends React.Component {
    onSubmit = (todo) => {
        this.props.addTodo(todo);
        this.props.history.push("/dashboard");
    }
    render(){
        return (
            <div>
                Add todo
                <TodoForm isEdit={false} onSubmit={this.onSubmit} />
            </div>
        );
    }
}
const mapStateToProps = () =>({

});
export default connect(mapStateToProps,{addTodo})(AddTodoPage);