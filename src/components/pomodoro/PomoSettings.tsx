import React, { useState } from "react";
import { PomoSetting } from "../../allTypes";

type Props = {
    closeModal: () => void;
    onSubmit: (setting: PomoSetting) => void;
    settings: PomoSetting;
};
const PomoSettings = ({ closeModal, onSubmit, settings }: Props) => {
    const [pomodoroTime, setPomodoroTime] = useState(settings.pomodoroTime);
    const [breakTime, setBreakTime] = useState(settings.breakTime);
    const [volume, setVolume] = useState(settings.volume);
    const [pomodoroTimeError, setPomodoroTimeError] = useState<string | null>(
        null
    );
    const [breakTimeError, setBreakTimeError] = useState<string | null>(null);
    const befSubmit = (
        settings: PomoSetting,
        submitFunc: (setting: PomoSetting) => void
    ) => {
        setPomodoroTimeError(null);
        setBreakTimeError(null);
        //validate
        let isError = false;
        if (!settings.pomodoroTime || settings.pomodoroTime === 0) {
            setPomodoroTimeError("Required.");
            isError = true;
        }
        if (settings.pomodoroTime >= 600) {
            setPomodoroTimeError("<600 is recommended");
            isError = true;
        }
        if (!settings.breakTime || settings.breakTime === 0) {
            setBreakTimeError("Required.");
            isError = true;
        }
        if (settings.breakTime >= 100) {
            setBreakTimeError("<100 is recommended");
            isError = true;
        }

        if (!isError) {
            //store settings in localStorage cache
            localStorage.setItem("pomoSettings", JSON.stringify(settings));
            return submitFunc({
                pomodoroTime: settings.pomodoroTime * 60,
                breakTime: settings.breakTime * 60,
                volume: settings.volume,
            });
        }
    };
    return (
        <>
            <div className="register__title form__title">
                <span className="heading-primary">Pomodoro Settings</span>
                <div className="close-modal category">
                    <i className="fas fa-times" onClick={closeModal}></i>
                </div>
            </div>
            <div className="register__form">
                <form
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        befSubmit(
                            { pomodoroTime, breakTime, volume },
                            onSubmit
                        );
                    }}
                >
                    <div className="row">
                        <div className="col">
                            <label className="form-label primary">Time</label>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label secondary">
                                Pomodoro
                            </label>
                            <input
                                className="form-control"
                                autoFocus
                                value={isNaN(pomodoroTime) ? "" : pomodoroTime}
                                onChange={(e) => {
                                    var reg = new RegExp("^[0-9]+$");
                                    if (
                                        e.target.value.match(reg) ||
                                        e.target.value === ""
                                    ) {
                                        setPomodoroTime(
                                            parseInt(e.target.value)
                                        );
                                    }
                                }}
                            />
                            <div className="pomodoro-settings-error">
                                {pomodoroTimeError}
                            </div>
                        </div>
                        <div className="col">
                            <label className="form-label secondary">
                                Break
                            </label>
                            <input
                                className="form-control"
                                value={isNaN(breakTime) ? "" : breakTime}
                                onChange={(e) => {
                                    var reg = new RegExp("^[0-9]+$");
                                    if (
                                        e.target.value.match(reg) ||
                                        e.target.value === ""
                                    ) {
                                        setBreakTime(parseInt(e.target.value));
                                    }
                                }}
                            />
                            <div className="pomodoro-settings-error">
                                {breakTimeError}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label mb-3">
                                    Volume
                                </label>
                                <br />
                                <input
                                    type="range"
                                    className="form-range"
                                    step="5"
                                    value={volume}
                                    onChange={(e) => {
                                        setVolume(parseInt(e.target.value));
                                    }}
                                />
                                <div className="vol">
                                    <span className="description">
                                        {volume}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="margin-top-med btn-primary"
                    >
                        Confirm Changes
                    </button>
                </form>
            </div>
        </>
    );
};

export default PomoSettings;
