import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import Todos from "../dashboard/Todos";
import Loading from "../layout/Loading";
import { getTodos, addTodo } from "../../actions/todos";
import TodoForm from "../dashboard/forms/TodoForm";
import Modal from "react-modal";
//@ts-ignore
import dingMP3 from "../../sounds/pomodoro_finished.mp3";
//@ts-ignore
import clickMP3 from "../../sounds/pomodoro_click.mp3";
import PomoSettings from "./PomoSettings";
import { Todo, TodoRequest, PomoSetting } from "../../allTypes";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
type Props = PropsFromRedux & {
    todo: Todo;
    deleteTodo: (
        id: number
    ) => ThunkAction<void, RootState, unknown, Action<string>>;
};
type State = {
    isRunning: boolean;
    timeLeft: number; //in seconds
    isBreak: boolean;
    settings: PomoSetting;
    modals: {
        showTodoModal: boolean;
        showPomoModal: boolean;
    };
};
class Pomodoro extends Component<Props, State> {
    pomodoroCircle: SVGCircleElement | null = null;
    Ding = new Audio(dingMP3);
    Click = new Audio(clickMP3);
    radius = 15;
    stroke = 2;
    normalizedRadius = this.radius - this.stroke * 2;
    circumference = this.normalizedRadius * 2 * Math.PI;
    state: State = {
        isRunning: false,
        timeLeft: 1500, //in seconds
        isBreak: false,
        settings: {
            pomodoroTime: 1500,
            breakTime: 300,
            volume: 50,
        },
        modals: {
            showTodoModal: false,
            showPomoModal: false,
        },
    };
    componentDidMount() {
        this.props.getTodos();
        let settings = localStorage.getItem("pomoSettings");
        if (settings) {
            let parsedSettings = JSON.parse(settings);
            const { pomodoroTime, breakTime, volume } = parsedSettings;
            this.setState(
                (prevState) => ({
                    ...prevState,
                    settings: {
                        pomodoroTime,
                        breakTime,
                        volume: parseInt(volume),
                    },
                }),
                () => {
                    //update timeLeft
                    this.onRedoClick();
                }
            );
        }
    }
    onSettingsChange = ({ pomodoroTime, breakTime, volume }: PomoSetting) => {
        //update state
        this.setState(
            (prevState) => ({
                ...prevState,
                settings: { pomodoroTime, breakTime, volume },
            }),
            () => {
                this.onRedoClick();
                this.closePomoModal();
            }
        );
        //update localstorage
        localStorage.setItem(
            "pomoSettings",
            JSON.stringify({ pomodoroTime, breakTime, volume })
        );
    };

    closeTodoModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showTodoModal: false },
        }));
    };
    openTodoModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showTodoModal: true },
        }));
    };
    closePomoModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            modals: { ...prevState.modals, showPomoModal: false },
        }));
    };
    openPomoModal = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                modals: { ...prevState.modals, showPomoModal: true },
            }),
            () => {
                this.onRedoClick();
            }
        );
    };

    clockRuns = () => {
        setTimeout(() => {
            if (this.state.isRunning) {
                if (this.state.timeLeft === 0) {
                    this.Ding.volume = this.state.settings.volume / 100;
                    this.Ding.play();
                    //finished
                    this.setState((prevState) => ({
                        timeLeft: prevState.isBreak
                            ? prevState.settings.pomodoroTime
                            : prevState.settings.breakTime,
                        isRunning: false,
                        isBreak: !prevState.isBreak,
                    }));
                } else {
                    this.setState(
                        (prevState) => ({
                            ...prevState,
                            timeLeft: prevState.timeLeft - 1,
                        }),
                        () => {
                            this.clockRuns();
                        }
                    );
                }
            }
        }, 1000);
    };
    timeConverter = (timeInSec: number) => {
        let hour = 0;
        if (timeInSec >= 3600) {
            hour = Math.floor(timeInSec / 3600);
        }
        let min = Math.floor((timeInSec - hour * 3600) / 60);
        let sec = timeInSec % 60;
        let hourStr = hour.toString();
        let minStr = min.toString();
        let secStr = sec.toString();
        if (min < 10) {
            minStr = "0" + minStr;
        }
        if (sec < 10) {
            secStr = "0" + secStr;
        }
        return (hour !== 0 ? hourStr + ":" : "") + minStr + ":" + secStr;
    };
    onForwardClick = () => {
        if (this.state.isBreak) {
            this.setState((prevState) => ({
                isBreak: false,
                timeLeft: prevState.settings.pomodoroTime,
                isRunning: false,
            }));
        } else {
            this.setState((prevState) => ({
                isBreak: true,
                timeLeft: prevState.settings.breakTime,
                isRunning: false,
            }));
        }
    };
    onPlayClick = () => {
        this.Click.volume = this.state.settings.volume / 100;
        this.Click.play();
        if (this.state.isRunning) {
            this.setState((prevState) => ({
                ...prevState,
                isRunning: false,
            }));
        } else {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    isRunning: true,
                }),
                () => {
                    this.clockRuns();
                }
            );
        }
    };
    onRedoClick = () => {
        this.setState((prevState) => ({
            ...prevState,
            isRunning: false,
            timeLeft: prevState.isBreak
                ? prevState.settings.breakTime
                : prevState.settings.pomodoroTime,
        }));
    };

    render() {
        return this.props.loading ? (
            <Loading />
        ) : (
            <>
                <div className="dashboard">
                    <div className="pomodoro__top-section">
                        <div className="pomodoro__settings">
                            <i
                                className="fas fa-cog fa-lg"
                                onClick={this.openPomoModal}
                            ></i>
                        </div>

                        <div
                            className="pomodoro__timer"
                            style={{
                                width: `${this.radius * 2}rem`,
                                height: `${this.radius * 2}rem`,
                            }}
                        >
                            <svg
                                height={`${this.radius * 2}rem`}
                                width={`${this.radius * 2}rem`}
                                className="pomodoro__timer-svg"
                            >
                                <circle
                                    style={{
                                        strokeWidth: `${this.stroke}rem`,
                                        strokeDasharray: `${this.circumference}rem ${this.circumference}rem`,
                                        strokeDashoffset: `${this
                                            .circumference -
                                            (this.state.timeLeft /
                                                (this.state.isBreak
                                                    ? this.state.settings
                                                          .breakTime
                                                    : this.state.settings
                                                          .pomodoroTime)) *
                                                this.circumference}rem`,
                                    }}
                                    r={`${this.normalizedRadius}rem`}
                                    cx={`${this.radius}rem`}
                                    cy={`${this.radius}rem`}
                                    ref={(e) => {
                                        this.pomodoroCircle = e;
                                    }}
                                    className="pomodoro__timer-circle"
                                />
                            </svg>
                            <div className="pomodoro__timer--time">
                                <span className="pomodoro-time">
                                    {this.timeConverter(this.state.timeLeft)}
                                </span>
                                <br />
                                <span className="description pomodoro-time-description">
                                    {this.state.isBreak ? "Break" : "Focus"}
                                </span>
                            </div>
                        </div>
                        <div className="pomodoro__control-btns">
                            <button
                                className="pomodoro__control-btn"
                                onClick={this.onForwardClick}
                            >
                                <i className="fas fa-forward"></i>
                            </button>
                            <button
                                className="pomodoro__control-btn primary"
                                onClick={this.onPlayClick}
                            >
                                {this.state.isRunning ? (
                                    <i className="fas fa-pause"></i>
                                ) : (
                                    <i className="fas fa-play"></i>
                                )}
                            </button>
                            <button
                                className="pomodoro__control-btn"
                                disabled={!this.state.isRunning}
                                onClick={this.onRedoClick}
                            >
                                <i className="fas fa-redo"></i>
                            </button>
                        </div>
                    </div>
                    <div className="pomodoro__main-section">
                        <div className="pomodoro__todos-container">
                            <div className="pomodoro__todos-title">
                                <span className="heading-secondary">Tasks</span>
                                <button
                                    className="btn-secondary pomodoro__add-task-btn"
                                    onClick={this.openTodoModal}
                                >
                                    <span className="description">
                                        + New Task
                                    </span>
                                </button>
                            </div>
                            <Todos isCart={true} />
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.modals.showTodoModal}
                    className="my-modal todo-modal"
                    onRequestClose={this.closeTodoModal}
                    ariaHideApp={false}
                >
                    <TodoForm
                        isEdit={false}
                        closeModal={this.closeTodoModal}
                        onSubmit={(todo: TodoRequest) => {
                            this.closeTodoModal();
                            this.props.addTodo(todo);
                        }}
                        onDelete={() => {
                            this.closeTodoModal();
                            this.props.deleteTodo(this.props.todo.id);
                        }}
                        isPomo={true}
                    />
                </Modal>
                <Modal
                    isOpen={this.state.modals.showPomoModal}
                    className="my-modal pomo-modal"
                    onRequestClose={this.closePomoModal}
                    ariaHideApp={false}
                >
                    <PomoSettings
                        onSubmit={(settings: PomoSetting) => {
                            this.onSettingsChange(settings);
                        }}
                        settings={{
                            pomodoroTime: this.state.settings.pomodoroTime / 60,
                            breakTime: this.state.settings.breakTime / 60,
                            volume: this.state.settings.volume,
                        }}
                        closeModal={this.closePomoModal}
                    />
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.todo.loading,
});
const connector = connect(mapStateToProps, { getTodos, addTodo });
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Pomodoro);
