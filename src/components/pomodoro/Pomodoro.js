import React, { Component } from "react";
import Todos from "../dashboard/Todos";

class Pomodoro extends Component {
    state = {
        isRunning: false,
        timeLeft: 1500, //in seconds
        isBreak: false,
    };
    clockRuns = () => {
        setTimeout(() => {
            if (this.state.isRunning) {
                if (this.state.timeLeft === 0) {
                    this.setState((prevState) => ({
                        timeLeft: prevState.isBreak ? 1500 : 300,
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
    timeConverter = (timeInSec) => {
        let min = Math.floor(timeInSec / 60);
        let sec = timeInSec % 60;
        let minStr = min.toString();
        let secStr = sec.toString();
        if (min < 10) {
            minStr = "0" + minStr;
        }
        if (sec < 10) {
            secStr = "0" + secStr;
        }
        return minStr + ":" + secStr;
    };
    onForwardClick = () => {
        if (this.state.isBreak) {
            this.setState(() => ({
                isBreak: false,
                timeLeft: 1500,
                isRunning: false,
            }));
        } else {
            this.setState(() => ({
                isBreak: true,
                timeLeft: 300,
                isRunning: false,
            }));
        }
    };
    onPlayClick = () => {
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
            timeLeft: prevState.isBreak ? 300 : 1500,
        }));
    };
    radius = 15;
    stroke = 2;
    progressFrac = this.state.timeLeft / (this.state.isBreak ? 300 : 1500);
    normalizedRadius = this.radius - this.stroke * 2;
    circumference = this.normalizedRadius * 2 * Math.PI;
    strokeDashoffset =
        this.circumference - this.progressFrac * this.circumference;
    render() {
        return (
            <>
                <div className="dashboard">
                    <div className="pomodoro__top-section">
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
                                                    ? 300
                                                    : 1500)) *
                                                this.circumference}rem`,
                                        r: `${this.normalizedRadius}rem`,
                                        cx: `${this.radius}rem`,
                                        cy: `${this.radius}rem`,
                                    }}
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
                                    <i class="fas fa-play"></i>
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
                        <Todos isCart={true} />
                    </div>
                </div>
            </>
        );
    }
}

export default Pomodoro;
