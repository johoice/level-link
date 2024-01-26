import {Sprite, Texture} from "pixi.js";

export class Platform {

    private sprite: Sprite;

    constructor(x: number, y: number, width: number, height: number, texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
    }

    getSprite() {
        return this.sprite;
    }

}