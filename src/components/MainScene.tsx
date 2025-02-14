import React, { useState, useEffect } from "react";
import "../styles/MainScene.css";
import pinkieWalk from "../assets/pinkie walk.png";
import greenWalk from "../assets/green walk.png";
import greenIdle from "../assets/green idle.png";
import pinkieIdle from "../assets/pinkie idle.png";
import Character from "./Character.tsx";
import chatboxMouad from "../assets/chatboxMouad.svg";
import chatBoxNima from "../assets/chatboxNima.svg";
import { MouadMessagesArray } from "../services/Messages.ts";
import { NimaMessagesArray } from "../services/Messages.ts";
import ReactDOM from "react-dom"; // Import ReactDOM for creating a portal
import { SwapProps } from "./../types/SwapProps";

const Phase = {
    DISPLAYING: 1,
    FADEOUT: 2,
    MOUAD_ONLY: 3,
    DONE: 4, // New state for when all messages are done
};

const MainScene : React.FC<SwapProps> = ({onSwap}) => {
    const [mouadMessageIndex, setMouadMessageIndex] = useState(0);
    const [nimaMessageIndex, setNimaMessageIndex] = useState(0);
    const [isMouadTurn, setIsMouadTurn] = useState(false); // Track whose turn it is
    const [isReady, setIsReady] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(Phase.DISPLAYING); // Track current phase
    const [isNimaFading, setIsNimaFading] = useState(false); // Control whether Nima fades out
    const [isDone, setIsDone] = useState(false);
    // Check if the target element is available
    useEffect(() => {
        const ButtonShowTimer = 8000;
        const timer = setTimeout(() => {
            setIsReady(true);
        }, ButtonShowTimer); // 8 seconds delay

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);


    const handleNext = () => {
        if (currentPhase === Phase.DISPLAYING) {
            // Update messages during display phase
            if (nimaMessageIndex < NimaMessagesArray.length - 1 && !isMouadTurn) {
                if(nimaMessageIndex + 1 === NimaMessagesArray.length - 1){
                    setCurrentPhase(Phase.FADEOUT);
                }
                setNimaMessageIndex((prev) => prev + 1);
            } else if (mouadMessageIndex < MouadMessagesArray.length - 1 && isMouadTurn) {
                setMouadMessageIndex((prev) => prev + 1);
            }

            // Toggle whose turn it is after each click
            setIsMouadTurn(!isMouadTurn);
        } else if (currentPhase === Phase.FADEOUT) {
            setIsNimaFading(true);
            setCurrentPhase(Phase.MOUAD_ONLY); // After fade-out, show only Mouad's messages
        } else if (currentPhase === Phase.MOUAD_ONLY) {
            // If in Mouad-only phase, only show Mouad's messages
            if (mouadMessageIndex < MouadMessagesArray.length - 1) {
                if(mouadMessageIndex + 1 === MouadMessagesArray.length - 1){
                    setCurrentPhase(Phase.DONE);
                }
                setMouadMessageIndex((prev) => prev + 1);
            }
        } else if (currentPhase === Phase.DONE) {
            setIsDone(true);
        }
    };

    const CharacterMouadProps = {
        sprite: greenWalk,
        spriteIdle: greenIdle,
        chatboxId: "chatboxMouad",
        chatboxSrc: chatboxMouad,
        chatdivId: "chatdivMouad",
        message: MouadMessagesArray[mouadMessageIndex],
        spriteClassWalk : "characterMouadWalk",
        spriteClassIdle : "characterMouadWalk"
    };

    const CharacterNimaProps = {
        sprite: pinkieWalk,
        spriteIdle: pinkieIdle,
        chatboxId: "chatboxNima",
        chatboxSrc: chatBoxNima,
        chatdivId: "chatdivNima",
        message: NimaMessagesArray[nimaMessageIndex],
        spriteClassWalk : "characterNimaWalk",
        spriteClassIdle : "characterNimaIdle"
    };

    // Use React Portal to render the Next button inside the headerPart element
    const nextButton = (
        <button
            onClick={isDone ? onSwap : handleNext}
            className="nextButton"
        >
            {isDone ? "Poor Mouad" : "Next"}
        </button>
    );


    return (
        <div className={"mainScene"}>
            <div className={"scenes"} id={"MouadScene"}>
                <Character {...CharacterMouadProps} />
            </div>

            <div
                className={`scenes ${isNimaFading ? "fadeOutNima" : ""}`}
                id={"NimaScene"}
            >
                <Character {...CharacterNimaProps} />
            </div>


            {/* Render the Next button inside the element with id="headerPart" */}
            {isReady && ReactDOM.createPortal(nextButton, document.getElementById("headerPart")!)}
        </div>
    );
};

export default MainScene;
