import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/CountryMap.css';
import ChatBoxSimple from "./ChatBoxSimple.tsx";

export type CountryMapProps = {
    mapImage: string; // Allows dynamic image sources
    altText?: string; // Optional alternative text
    id: string;
    containerId: string;
    chatboxSrc: string;
    chatboxId: string;
    chatdivId: string;
    message: string;
    playSound?: boolean;
    Sound?: string;
/*    children?: React.ReactNode*/
};

const CountryMap: React.FC<CountryMapProps> = ({ mapImage, altText = "Map", id, chatboxSrc, chatboxId, containerId, chatdivId , message, playSound, Sound}) => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [playTextSound, setPlayTextSound] = useState(playSound);  // Control sound play state


    useEffect(() => {
        // Fade in the map after the component mounts
        setTimeout(() => {
            setIsMapVisible(true);
        }, 0);  // Make the map appear immediately

        // Fade in the chatbox message after the map is visible
        setTimeout(() => {
            setIsTextVisible(true);
        }, 2000); // Adjust the timing to sync with the map fade-in duration

        // Play sound when text fades in
        if (playSound && Sound) {
            setPlayTextSound(false);
            setTimeout(() => {
                setPlayTextSound(true);  // Stop playing sound after starting
            }, 5000);
        }

    }, [playSound, Sound]);

    return (
        <div className={`mapContainer ${isMapVisible ? 'fade-in' : 'noOpacity'}`} id={containerId}>
            <img
                id={id}
                src={mapImage}
                alt={altText}
                className={isMapVisible ? 'fade-in-map' : 'noOpacity'}
            />
            <ChatBoxSimple
                chatboxId={chatboxId}
                chatboxSrc={chatboxSrc}
                chatdivId={chatdivId}
                message={message}
                playSound={playTextSound}
                Sound={Sound}
                className={isTextVisible ? 'fade-in-text' : 'noOpacity'}
                boxClassName={isTextVisible ? 'fade-in-chatbox' : 'noOpacity'}
            />
        </div>
    );
};

CountryMap.displayName = 'CountryMap';

export default React.memo(CountryMap);