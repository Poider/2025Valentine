import React, { useState, useEffect } from "react";
import "../styles/LastScene.css";
import greenIdle from "../assets/green idle.png";
import chatboxMouad from "../assets/chatboxMouad.svg";
import { LastSceneMessagesArray, MouadMessagesArray, HoverMessagesArray } from "../services/Messages.ts";
import Character from "./Character.tsx";
import ReactDOM from "react-dom";
import { SwapProps } from "./../types/SwapProps";

const LastScene: React.FC<SwapProps> = ({ onSwap }) => {
    const [mouadMessageIndex, setMouadMessageIndex] = useState(0);
    const [isReady, setIsReady] = useState(false); // Track if the headerPart is available
    const [isMessagesDone, setIsMessagesDone] = useState(false); // Track if all messages are done
    const [hoverPosition, setHoverPosition] = useState<{ top: string; left: string }>({
        top: "50%", // Default position
        left: "50%", // Default position
    });
    const [hoverCount, setHoverCount] = useState(0); // Track how many times the hoverButton has been hovered
    const [hoverMessageIndex, setHoverMessageIndex] = useState<number | null>(null); // Start with no hover message

    const handleNextMessage = () => {
        if (mouadMessageIndex < LastSceneMessagesArray.length - 1) {
            setMouadMessageIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsMessagesDone(true); // Set isMessagesDone to true once all messages are shown
        }
    };

    const CharacterMouadProps = {
        sprite: greenIdle,
        spriteIdle: greenIdle,
        chatboxId: "chatboxLast",
        chatboxSrc: chatboxMouad,
        chatdivId: "chatdivLast",
        message: MouadMessagesArray[mouadMessageIndex],
        spriteClassWalk: "lastMouadIdle",
        spriteClassIdle: "lastMouadIdle",
    };

    // Create the "Next" button that will be rendered via portal
    const nextButton = (
        <button onClick={handleNextMessage} className="nextButton">
            Next
        </button>
    );

    // Create the new buttons after messages are done
    const swapButton = (
        <button onClick={onSwap} className="yesButton">
            Yes
        </button>
    );

    const handleHover = () => {
        // Generate random percentages for top and left positioning
        const randomTop = Math.random() * 100 + "%";
        const randomLeft = Math.random() * 100 + "%";

        // Set the hover position to the random values
        setHoverPosition({
            top: randomTop,
            left: randomLeft,
        });

        // Only increase hover count if it's less than 4
        if (hoverCount + 1 < 4) {
            setHoverCount((prevCount) => prevCount + 1);
        } else if (hoverCount + 1 === 4) {
            // When hover count reaches 4, show next hover message if not at the last one
            if (hoverMessageIndex !== HoverMessagesArray.length - 1) {
                setHoverMessageIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1)); // Move to the next message in HoverMessagesArray
            }
            setHoverCount(0); // Reset hover count for the next set of hovers
        }
    };

    const hoverButton = (
        <button
            onMouseOver={handleHover}
            className="hoverButton"
            style={{
                position: "absolute", // Make the button position absolute relative to the parent
                top: hoverPosition.top,
                left: hoverPosition.left,
                transform: "translate(-50%, -50%)", // Ensure the button is centered around the point
                transition: "top 0.2s ease-in-out, left 0.2s ease-in-out", // Smooth translation effect
            }}
        >
            No
        </button>
    );

    // Use useEffect to show the Next button after 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true); // Set isReady to true after 6 seconds
        }, 6000); // 6 seconds delay

        return () => clearTimeout(timer); // Clean up timeout when the component unmounts
    }, []); // Run this effect only once when the component mounts

    return (
        <div className="lastScene">
            <Character
                {...CharacterMouadProps}
                message={hoverMessageIndex !== null ? HoverMessagesArray[hoverMessageIndex] : LastSceneMessagesArray[mouadMessageIndex]} // Use the normal message if no hover message is set
            />

            {/* Render the Next button only if 'headerPart' is ready */}
            {isReady && !isMessagesDone && ReactDOM.createPortal(nextButton, document.getElementById("headerPart")!)}

            {/* Once messages are done, remove the Next button and render Swap and Hover buttons */}
            {isMessagesDone && ReactDOM.createPortal(
                <div>
                    {swapButton}
                    {hoverButton}
                </div>,
                document.getElementById("headerPart")!
            )}
        </div>
    );
};

export default LastScene;
