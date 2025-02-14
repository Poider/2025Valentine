import React, { useEffect, useState } from "react";
import "../styles/Character.css";
import ChatBox, { ChatBoxProps } from "./ChatBox.tsx";



type CharacterProps = {
    sprite: string;
    spriteIdle: string;
    chatboxId: string;
    chatboxSrc: string;
    chatdivId: string;
    message: string;
    spriteClassWalk: string;
    spriteClassIdle: string;
};

const Character: React.FC<CharacterProps> = ({ sprite, chatdivId, chatboxSrc, chatboxId, message, spriteClassWalk , spriteIdle, spriteClassIdle }) => {
    const [moving, setMoving] = useState(true);
    const [showChatbox, setShowChatbox] = useState(false);
    const [isChatboxFadingIn, setIsChatboxFadingIn] = useState(false); // Updated name for clarity

    useEffect(() => {
        const movementTime = 4000;
        setTimeout(() => {
            setMoving(false); // Start movement
        }, movementTime);

        const chatboxShowTimer = 3000;
        // Delay chatbox appearance (e.g., 3 seconds after movement starts)
        const chatboxTimer = setTimeout(() => {
            setShowChatbox(true); // Show chatbox after X seconds
        }, chatboxShowTimer);

        const chatboxFadeIn = setTimeout(() => {
            setIsChatboxFadingIn(true); // Apply opacity after x+2 seconds
        }, chatboxShowTimer + 2000);

        return () => {
            clearTimeout(chatboxTimer);
            clearTimeout(chatboxFadeIn);
        };
    }, []);



    const chatboxProps: ChatBoxProps = {
        chatboxId,
        chatboxSrc,
        chatdivId,
        message,
        className: isChatboxFadingIn ? "chatboxFadeIn" : "", // Conditionally add class to control opacity
    };

    return (
        <div className={`${moving ? spriteClassWalk : spriteClassIdle} ${moving ? "moveRight" : ""}`} style={{ backgroundImage: `url(${moving ? sprite : spriteIdle})` }}>
            {showChatbox && <ChatBox {...chatboxProps} />}
        </div>
    );
};

export default Character;
