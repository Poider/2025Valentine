import React, { useEffect } from "react";
import '../styles/ChatBoxSimple.css';

export type ChatBoxSimpleProps = {
    chatboxId: string;
    chatboxSrc: string;
    chatdivId: string;
    message: string;
    playSound?: boolean;
    Sound?: string;
    className?: string; // Accept className to control fade-in of the text
    boxClassName?: string; // Accept className to control fade-in of the chatbox
};

const ChatBoxSimple: React.FC<ChatBoxSimpleProps> = ({
                                                         chatboxSrc,
                                                         chatboxId,
                                                         chatdivId,
                                                         message,
                                                         playSound = false,
                                                         Sound,
                                                         className = '',
                                                         boxClassName = '',// Default to empty class
                                                     }) => {
    useEffect(() => {
        if (playSound && Sound) {
            console.log(Sound);
            const typingSound = new Audio(Sound);
            typingSound.loop = true; // Enable looping
            typingSound.play().catch(() => {}); // Handle autoplay restrictions

            return () => {
                typingSound.pause();
                typingSound.currentTime = 0; // Reset sound when unmounted
            };
        }
    }, [playSound, Sound]); // Runs when playSound or Sound changes

    return (
        <div className="chatboxContainer">
            <img id={chatboxId} src={chatboxSrc} alt="chatbox" className={`chatboxImg ${boxClassName}`} />
            <div id={chatdivId} className={`chatDiv ${className}`}>
                <p>{message}</p>
            </div>
        </div>
    );
};

ChatBoxSimple.displayName = "ChatBoxSimple";

export default React.memo(ChatBoxSimple);
