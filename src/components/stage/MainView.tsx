import {Application, Container, DisplayObject, FederatedPointerEvent, ICanvas, Texture,} from 'pixi.js';
import {Bunny} from '../player/Bunny.ts';
import {useEffect, useRef, useState} from 'react';
import {Platform} from '../obstacles/Platform.ts';

function checkCollisions(bunny: Bunny, container: Container<DisplayObject>) {
    if (!container) return;

    const platforms = container.children;
    const py = bunny.getSprite().y + bunny.getSprite().height / 2 + 0.01;
    const px = bunny.getSprite().x;
    for (const platform of platforms) {
        const rx = platform.x;
        const ry = platform.y;
        const rw = 300;
        const rh = 20;
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
    const [platforms, setPlatforms] = useState([
        new Platform(200, 400, 300, 20, props.textures.bunny),
        new Platform(100, 500, 300, 20, props.textures.bunny),
        new Platform(400, 200, 300, 20, props.textures.bunny),
        new Platform(50, 300, 300, 20, props.textures.bunny),
    ]);
    const container = useRef<Container>();
    const appRef = useRef<Application<ICanvas>>();

    useEffect(() => {
        function addPlatform(e: FederatedPointerEvent) {
            const platform = new Platform(
                e.globalX,
                e.globalY,
                300,
                20,
                props.textures.bunny
            );
            setPlatforms([...platforms, platform]);
        }

        if (!container.current) {
            container.current = new Container();
        }
        if (!appRef.current) {
            appRef.current = new Application();
        }

        const app = appRef.current;
        const cont = container.current;
        // @ts-expect-error whatever
        document.getElementById('main-view')?.appendChild(app.view);

        // This creates a texture from a 'bunny.png' image
        const bunny = props.bunny.getSprite();

        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;

        // Add the bunny to the scene we are building
        app.stage.addChild(bunny);
        platforms.forEach((platform) => {
            cont.addChild(platform.getSprite());
        });
        app.stage.addChild(container.current);

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('mousedown', (event) => addPlatform(event));

        // Listen for frame updates
        app.ticker.add((delta) => {
            if (checkCollisions(props.bunny, cont)) {
                props.bunny.resetY();
            }
            props.bunny.tick(delta);
            const platforms = cont.children;
            platforms.forEach(plat => {
                plat.x = plat.x + delta;
                if (plat.x > app.renderer.width - 20) {
                    plat.x = -20;
                    plat.y = Math.random() * app.renderer.height;
                }
            })
        });
    }, []);

    useEffect(() => {
        if (container.current) {
            const cont = container.current;
            cont.removeChildren();
            platforms.forEach((platform) =>
                cont.addChild(platform.getSprite())
            );
        }
    }, [platforms]);

    return <div id="main-view"></div>;
}

export default MainView;
