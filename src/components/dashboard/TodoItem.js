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
        largeWidth: window.matchMedia("(min-width: 1060px)").matches,
    };
    mm = window.matchMedia("(min-width: 1060px)");
    handler = (e) => this.setState(() => ({ largeWidth: e.matches }));
    componentDidMount() {
        this.mm.addListener(this.handler);
    }
    componentWillUnmount() {
        this.mm.removeListener(this.handler);
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.todo.completed !== this.props.todo.completed &&
            this.props.todo.completed &&
            this.completedDiv
        ) {
            this.completedDiv.classList.add("animate");
            setTimeout(() => {
                this.completedDiv.classList.remove("animate");
            }, 2500);
        }
    }
    closeTodoModal = () => {
        this.setState(() => ({
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
                                (this.props.todo.completed
                                    ? " true"
                                    : " false") +
                                (this.state.largeWidth ? " large" : " small")
                            }
                            ref={(e) => {
                                this.completedDiv = e;
                            }}
                            onClick={() => {
                                this.props.toggleCompleteTodo(
                                    this.props.todo.id
                                );
                            }}
                        >
                            {this.state.largeWidth ? (
                                <span>Done</span>
                            ) : (
                                <i className="fas fa-check"></i>
                            )}
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
                        <div
                            className={
                                "appear-on-hover" +
                                (this.state.largeWidth ? " large" : " small")
                            }
                        >
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
                                    "todo__right todo__btn cart" +
                                    (this.props.todo.cart ? " true" : " false")
                                }
                            >
                                <i
                                    className="todo__icon fas fa-stopwatch"
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
                        closeModal={this.closeTodoModal}
                        todo={this.props.todo}
                        onSubmit={(todo) => {
                            this.closeTodoModal();
                            this.props.editTodo(this.props.todo.id, todo);
                        }}
                        onDelete={() => {
                            this.closeTodoModal();
                            this.props.deleteTodo(this.props.todo.id);
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
