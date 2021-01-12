import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
    editTodo,
    deleteTodo,
    toggleCompleteTodo,
    toggleImportanceTodo,
    toggleCartTodo,
} from "../../actions/todos";
import Modal from "react-modal";
import TodoForm from "./forms/TodoForm";
function mapStateToProps(state) {
    return {};
}

class TodoItem extends Component {
    state = {
        showTodoModal: false,
    };
    closeTodoModal = () => {
        this.setState((prevState) => ({
            showTodoModal: false,
        }));
    };
    openTodoModal = () => {
        this.setState(() => ({
            showTodoModal: true,
        }));
    };
    capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    render() {
        return (
            <>
                <div className="todo__item">
                    <div
                        className={
                            "todo__side-color" +
                            (this.props.todo.important ? " important" : "")
                        }
                    ></div>
                    <div className="todo__title" onClick={this.openTodoModal}>
                        {this.capitalise(this.props.todo.title)}
                    </div>
                    <div className="todo__others">
                        <button
                            className={
                                "todo__right todo__complete" +
                                (this.props.todo.completed ? " true" : " false")
                            }
                            onClick={() => {
                                this.props.toggleCompleteTodo(
                                    this.props.todo.id
                                );
                            }}
                        >
                            <span>Done</span>
                        </button>
                        <div className="todo__right todo__date">
                            {this.props.todo.due_by ? (
                                <span className="description">
                                    {moment(this.props.todo.due_by).format(
                                        "DD MMM YY"
                                    )}
                                </span>
                            ) : (
                                <span className="description">-</span>
                            )}
                        </div>
                        <div className="appear-on-hover">
                            <span
                                className={
                                    "todo__right todo__btn important" +
                                    (this.props.todo.important
                                        ? " true"
                                        : " false")
                                }
                            >
                                <i
                                    className="todo__icon fas fa-exclamation-circle"
                                    onClick={() => {
                                        this.props.toggleImportanceTodo(
                                            this.props.todo.id
                                        );
                                    }}
                                ></i>
                            </span>
                            <span
                                className={
                                    //to add the action here!!!
                                    "todo__right todo__btn cart" +
                                    (this.props.todo.cart ? " true" : " false")
                                }
                            >
                                <i
                                    className="todo__icon fas fa-cart-plus"
                                    onClick={() => {
                                        this.props.toggleCartTodo(
                                            this.props.todo.id
                                        );
                                    }}
                                ></i>
                            </span>
                            <span className="todo__right todo__btn delete">
                                <i
                                    className="todo__icon fas fa-trash"
                                    onClick={() => {
                                        this.props.deleteTodo(
                                            this.props.todo.id
                                        );
                                    }}
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showTodoModal}
                    className="my-modal todo-modal"
                    onRequestClose={this.closeTodoModal}
                    ariaHideApp={false}
                >
                    <TodoForm
                        isEdit={true}
                        todo={this.props.todo}
                        onSubmit={(todo) => {
                            this.closeTodoModal();
                            this.props.editTodo(this.props.todo.id, todo);
                        }}
                    />
                </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps, {
    editTodo,
    deleteTodo,
    toggleCompleteTodo,
    toggleImportanceTodo,
    toggleCartTodo,
})(TodoItem);
