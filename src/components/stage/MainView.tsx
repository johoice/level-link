import {Application, Texture} from "pixi.js";
import {Bunny} from "../player/Bunny.ts";
import {useEffect} from "react";
import {Platform} from "../obstacles/Platform.ts";

function MainView(props: { textures: { bunny: Texture }, bunny: Bunny }) {
    const app = new Application();

    useEffect(() => {
        // @ts-expect-error whatever
        document.getElementById("main-view")?.appendChild(app.view);
    }, []);

    const mainView = document.getElementById("main-view");
    if (mainView && !mainView.children) {
        mainView?.appendChild(app.view);
    }


// This creates a texture from a 'bunny.png' image
    const bunny = props.bunny.getSprite();

// Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

// Add the bunny to the scene we are building
    app.stage.addChild(bunny);
    app.stage.addChild(new Platform(200, 400, 300, 20, props.textures.bunny).getSprite())

// Listen for frame updates
    app.ticker.add(() => {
        props.bunny.tick();
    });

    return (
        <div id="main-view" style={{width: "90vw", height: "90dvh", border: "green"}}></div>
    );
}

export default MainView;