import flowers from "../assets/flowers.png";
import giftAudio from "../assets/Ari.mp3";
import "../styles/GiftScene.css";
import { useEffect } from "react";

const GiftScene = () => {
    useEffect(() => {
        const audio = new Audio(giftAudio);
        audio.play().catch(error => console.error("Audio playback failed:", error));
    }, []);
    return (
        <div className="giftSceneContainer">
            <div className="giftContent">
                <div className="giftContainer">
                    <img
                        src="https://asset.swarovski.com/images/$size_1450/t_swa103/b_rgb:ffffff,c_scale,dpr_2.0,f_auto,w_675/5720860_png/ariana-grande-x-swarovski-tennis-bracelet--mixed-cuts--heart--white--rhodium-plated-swarovski-5720860.png"
                        alt="Ariana Grande x Swarovski Tennis bracelet"
                        className="giftImg"
                    />
                    <h3 className="giftName">Ariana Grande x Swarovski Tennis Bracelet</h3>
                    <textarea
                        className="giftDescription"
                        readOnly
                    >
                        you have no idea how complicated this was. I’m pretty sure I almost died in the process. Donate some brain cells, mine are totally fried
                    </textarea>
                    <a href="https://gls-group.eu/EU/en/parcel-tracking?match=905510365276" className="trackingButton" target="_blank" rel="noopener noreferrer">
                        Track Your Gift
                    </a>
                </div>

                <div className="valentineContainer">
                    <img
                        src={flowers}
                        alt="Flower"
                        className="flowerImg"
                    />
                    <div className="messageText">Happy Valentine Baby Naaima</div>
                </div>
            </div>
        </div>
    );
}

export default GiftScene;