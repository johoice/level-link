import {Sprite, Texture} from 'pixi.js';

const airJumpMax = 2;

export class Bunny {
    private readonly sprite: Sprite;
    private speedX: number = 0;
    private speedY: number = 0;
    private leftDown = false;
    private rightDown = false;
    private airJumps = airJumpMax;

    constructor(texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            if (e.code === 'ArrowUp') {
                if (this.airJumps > 0) {
                    this.speedY = -4;
                    this.airJumps -= 1;
                }
            } else if (e.code === 'ArrowDown') {
                this.speedY += 2;
            } else if (e.code === 'ArrowLeft') {
                this.leftDown = true;
            } else if (e.code === 'ArrowRight') {
                this.rightDown = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') {
                this.leftDown = false;
            } else if (e.code === 'ArrowRight') {
                this.rightDown = false;
            }
        });
    }

    tick(delta: number) {
        if (
            (this.leftDown && !this.rightDown) ||
            (!this.leftDown && this.rightDown)
        ) {
            this.speedX += this.leftDown ? -1 : 1;
        }

        if (this.speedX != 0) {
            this.sprite.x += this.speedX * delta;
            this.speedX *= 0.5;
        }
        this.sprite.y += this.speedY;
        if (this.speedY > 0) {
            if (this.speedY < 4) {
                this.speedY += 0.08 * delta;
            }
        } else {
            this.speedY += 0.1 * delta;
        }
    }

    getSprite() {
        return this.sprite;
    }

    resetX() {
        this.speedX = 0;
    }

    resetY() {
        if (this.speedY > 0) {
            this.speedY = -this.speedY;
        }
        this.airJumps = airJumpMax;
    }

    getSpeed() {
        return { x: this.speedX, y: this.speedY };
    }
}
