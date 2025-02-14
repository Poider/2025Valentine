import { useEffect } from 'react';
import './App.css';
import BackGroundComponent from './components/BackGroundComponent';

// ✅ Import assets directly (ESM compatible)
import ariMp3 from './assets/Ari.mp3';
import greenIdle from './assets/green idle.png';
import pinkieIdle from './assets/pinkie idle.png';

// ✅ Function to preload assets
const preloadAssets = () => {
    // Preload images
    [greenIdle, pinkieIdle].forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    // Preload audio
    const audio = new Audio(ariMp3);
    audio.load();
};

function App() {
    // ✅ Preload assets on app start
    useEffect(() => {
        preloadAssets();
    }, []);

    return (
        <>
            <div id="headerPart"></div>
            <BackGroundComponent />
        </>
    );
}

export default App;
