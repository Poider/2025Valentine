import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/DiscordAcceptButton.css";
import { SwapProps } from "./../types/SwapProps";

const DiscordAcceptButton : React.FC<SwapProps> = ({onSwap}) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Set a timer to show the button after 5000ms
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 7000);

        // Cleanup the timer in case the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return ReactDOM.createPortal(
        <button onClick={onSwap} id={'secondSceneButton'} className={showButton ? 'fadeInButton' : 'noOpacity'} >Accept</button>,
        document.getElementById("headerPart")!  // Make sure this ID exists in your HTML
    );
};

export default DiscordAcceptButton;
