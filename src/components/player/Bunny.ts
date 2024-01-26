import {Sprite, Texture} from "pixi.js";

export class Bunny {

    private readonly sprite: Sprite;
    private speedX: number = 0;
    private speedY: number = 0;

    constructor(texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp") this.speedY -= 1;
            else if (e.code === "ArrowDown") this.speedY += 1;
            else if (e.code === "ArrowLeft") this.speedX -= 1;
            else if (e.code === "ArrowRight") this.speedX += 1;
        });
    }

    tick() {
        if (this.speedX != 0) {
            this.sprite.x += this.speedX;
            this.speedX *= 0.99;
        }
        if (this.speedY != 0) {
            this.sprite.y += this.speedY;
            this.speedY *= 0.99;
        }
    }

    getSprite() {
        return this.sprite;
    }
}
