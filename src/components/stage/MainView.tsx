import { Application, Texture } from 'pixi.js';
import { Bunny } from '../player/Bunny.ts';
import { useEffect } from 'react';
import { Platform } from '../obstacles/Platform.ts';

function checkCollisions(bunny: Bunny, platforms: Platform[]) {
    const py = bunny.getSprite().y + bunny.getSprite().height / 2 + 0.01;
    const px = bunny.getSprite().x;
    for (const platform of platforms) {
        const rx = platform.getSprite().x;
        const ry = platform.getSprite().y;
        const rw = platform.getSprite().width;
        const rh = platform.getSprite().height;
        if (
            px >= rx && // right of the left edge AND
            px <= rx + rw && // left of the right edge AND
            py >= ry && // below the top AND
            py <= ry + rh
        ) {
            // above the bottom
            return true;
        }
    }
    return false;
}

function MainView(props: { textures: { bunny: Texture }; bunny: Bunny }) {
    const app = new Application();

    useEffect(() => {
        // @ts-expect-error whatever
        document.getElementById('main-view')?.appendChild(app.view);
    }, []);

    const mainView = document.getElementById('main-view');
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
    const platform = new Platform(200, 400, 300, 20, props.textures.bunny);
    const platform2 = new Platform(100, 500, 300, 20, props.textures.bunny);
    app.stage.addChild(platform.getSprite());
    app.stage.addChild(platform2.getSprite());
    const platforms = [platform, platform2];

    // Listen for frame updates
    app.ticker.add(() => {
        if (checkCollisions(props.bunny, platforms)) {
            props.bunny.resetY();
        }
        props.bunny.tick();
    });

    return <div id="main-view"></div>;
}

export default MainView;
