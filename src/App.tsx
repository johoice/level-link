import './App.css';
import { Assets, Texture } from 'pixi.js';
import MainView from './components/stage/MainView.tsx';
import { useEffect, useState } from 'react';
import { Bunny } from './components/player/Bunny.ts';

function App() {
    const bunnyUrl = 'https://pixijs.com/assets/bunny.png';
    const [textures, setTextures] = useState<{ bunny: Texture }>();
    const [started, setStarted] = useState(false);

    useEffect(() => {
        Assets.load(bunnyUrl).then((texture) =>
            setTextures({ bunny: texture })
        );
    }, []);

    return (
        <div className="grid min-h-dvh w-full place-content-center p-8">
            {started ? (
                textures ? (
                    <MainView
                        textures={textures}
                        bunny={new Bunny(textures.bunny)}
                    />
                ) : (
                    <>Loading</>
                )
            ) : (
                <button onClick={() => setStarted(true)}>Start</button>
            )}
        </div>
    );
}

export default App;
