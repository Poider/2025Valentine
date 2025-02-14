import React from "react";
import { SwapProps } from "./../types/SwapProps";
import "../styles/FirstScene.css";

const FirstScene: React.FC<SwapProps> = ({ onSwap }) => {
    return (
        <div className="firstSceneContainer">
            <div className="mainText">ini de beninigin</div>
            <div className="subText">there was a tough ass couple having an argument</div>
            <button onClick={onSwap} className="startButton">
                Start
            </button>
        </div>
    );
};

export default FirstScene;
