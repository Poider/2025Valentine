import React, { useState, useEffect } from 'react';
import '../styles/ChatBox.css';
import retroBlip from '../assets/retro-blip.mp3';

export type ChatBoxProps = {
    chatboxId: string;
    chatboxSrc: string;
    chatdivId: string;
    message: string;
    className?: string; // Optional class name
    typingSpeed?: number; // Optional speed of typing, default 50ms
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatboxSrc, chatboxId, chatdivId, typingSpeed = 100, message, className }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [letterIndex, setLetterIndex] = useState(0);
    const [isChatboxVisible, setIsChatboxVisible] = useState(false); // Track if chatbox has faded in

    // Typing sound (you can use any sound URL or asset here)
    const typingSound = new Audio(retroBlip);

    useEffect(() => {
        const chatStartDelay = 2000;
        // Set the chatbox to visible after fade-in (with a 2-second delay)
        if (className) {
            const timer = setTimeout(() => {
                setIsChatboxVisible(true); // Chatbox faded in, start typing message
            }, chatStartDelay); // 2 seconds delay

            return () => clearTimeout(timer); // Cleanup timeout on component unmount
        }
    }, [className]);

    useEffect(() => {

        // Only start typing effect after chatbox is visible
        if (isChatboxVisible && letterIndex < message.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + message[letterIndex]);
                setLetterIndex(prev => prev + 1);

                // Play typing sound per letter
                typingSound.currentTime = 0; // Restart sound
                typingSound.volume = 0.02; // Set volume to 50%
                typingSound.play().catch(() => {}); // Handle autoplay restrictions
            }, typingSpeed);

            return () => clearTimeout(timer); // Cleanup on unmount or re-render
        }
    }, [letterIndex, typingSpeed, message, isChatboxVisible]);

    useEffect(() => {
        // Reset typing state when the message changes
        setDisplayedText(""); // Reset the displayed text
        setLetterIndex(0); // Start typing from the first letter
    }, [message]); // Run whenever `message` changes

    return (
        <div className={`chatboxPixelContainer ${className ? className : ""}`}>
            <img id={chatboxId} src={chatboxSrc} alt="chatboxPixel" className="chatboxPixelImg" />
            <div id={chatdivId} className="chatDivPixel">
                <p>{displayedText}</p>
            </div>
        </div>
    );
};

ChatBox.displayName = 'ChatBox';

export default React.memo(ChatBox);
