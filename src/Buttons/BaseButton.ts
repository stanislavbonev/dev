import * as PIXI from 'pixi.js';


export class BaseButton extends PIXI.Container {
    constructor() {
        super();

    }

    protected createButton(): void { };
    protected createLabel(): void { };
    protected onClick(): void { };
    protected onHover(): void { };
    protected onMouseOver(): void { };
    protected onMouseOut(): void { };
}