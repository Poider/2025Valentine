import  { useState } from "react";
import "../styles/BackGroundComponent.css";
import CountryMap from "./CountryMap";
import { CountryMapProps } from "./CountryMap";
import FirstScene from "./FirstScene.tsx";
import MainScene from "./MainScene.tsx";
import { MoroccoMapMessage, NetherlandsMapMessage } from "../services/Messages";
import ma from "../assets/ma.svg";
import nl from "../assets/nl.svg";
import chatbox from "../assets/chatbox.svg";
import chatbox2 from "../assets/chatbox2.svg";
import discordCalling from "../assets/discord-calling.mp3";
import DiscordAcceptButton from "./DiscordAcceptButton.tsx";
import LastScene from "./LastScene.tsx";
import GiftScene from "./GiftScene.tsx";

const BackGroundComponent = () => {
    const [currentScene, setCurrentScene] = useState(1); // Keep track of the current scene

    const MoroccoMapProps: CountryMapProps = {
        mapImage: ma,
        id: "morocco-map",
        chatboxId: "chatboxMa",
        chatboxSrc: chatbox,
        containerId: "morocco-container",
        chatdivId: "chatdivMa",
        message: MoroccoMapMessage,
        playSound: true,
        Sound: discordCalling,
    };

    const NetherlandsMapProps: CountryMapProps = {
        mapImage: nl,
        id: "netherlands-map",
        chatboxId: "chatboxNl",
        chatboxSrc: chatbox2,
        containerId: "netherlands-container",
        chatdivId: "chatdivNl",
        message: NetherlandsMapMessage,
        playSound: false,
    };
    const ScenesNumber = 5;  // Define the number of scenes

    const handleSwap = () => {
        setCurrentScene((prevScene) => {
            if (prevScene < ScenesNumber) {
                return prevScene + 1;
            }
            return prevScene;
        });
    };
    return (
        <div className="backgroundWrapper">
            {/* Conditionally render scenes based on currentScene */}
            {currentScene === 1 && (
                <div className="background" id="FirstScene">
                    <FirstScene onSwap={handleSwap} />
                </div>
            )}

            {currentScene === 2 && (
                <div className="background" id="SecondScene">
                    <CountryMap {...MoroccoMapProps} />
                    <CountryMap {...NetherlandsMapProps} />
                    <DiscordAcceptButton onSwap={handleSwap} />
                </div>
            )}

            {currentScene === 3 && (
                <div className="background" id="ThirdScene">
                    <MainScene onSwap={handleSwap}  />
                </div>
            )}

            {currentScene === 4 && (
                <div className="background" id="FourthScene">
                    <LastScene onSwap={handleSwap}/>
                </div>
            )}

            {currentScene === 5 && (
                <div className="background" id="FifthScene">
                    <GiftScene />
                </div>
            )}

        </div>
    );
};

export default BackGroundComponent;
