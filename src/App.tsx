import './App.css'
import {Assets, Texture} from 'pixi.js';
import MainView from "./components/stage/MainView.tsx";
import {useEffect, useState} from "react";
import {Bunny} from "./components/player/Bunny.ts";

function App() {
    const bunnyUrl = "https://pixijs.com/assets/bunny.png";
    const [textures, setTextures] = useState<{ bunny: Texture }>()

    useEffect(() => {
        Assets.load(bunnyUrl).then(texture => setTextures({bunny: texture}));
    }, []);

    return (
        <>
            {
                textures ?
                    <MainView textures={textures} bunny={new Bunny(textures.bunny)}/>
                    :
                    <>Loading</>
            }
        </>
    )
}

export default App
