import { BaseButton } from "./BaseButton";
import * as PIXI from 'pixi.js';
import { GameApplication } from "../GameApplication";
import { EventDispatcher } from "../EventDispatcher";
import { CalculatorEvents } from "../CalculatorEvents";

export class BasicCalculatorButton extends BaseButton {
    private button: PIXI.Sprite;
    private xPos: number;
    private yPos: number;
    private label: string;
    private buttonText: PIXI.Text;

    constructor(label: string, x: number, y: number) {
        super();
        this.xPos = x;
        this.yPos = y;
        this.label = label;
        this.init();
    }

    private init() {
        this.createButton();
        this.createLabel();
        this.onHover();
        this.button.on('click', this.onClick, this)
    }
    //TODO IMPROVE INHERITANCE FROM BASE BUTTON REPEATABLE CODE FOR BUTTON APEARENCE
    protected createButton() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x00FFFF);
        gfx.drawRect(0, 0, 80, 50);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx)
        this.button = new PIXI.Sprite(texture);
        this.button.x = this.xPos;
        this.button.y = this.yPos;
        this.button.interactive = true;
        this.addChild(this.button);
    }

    protected createLabel() {
        this.buttonText = new PIXI.Text(this.label, {
            fill: 'white',
            fontSize: 20,
        })
        this.buttonText.anchor.set(0.5)
        this.buttonText.x = this.button.width / 2;
        this.buttonText.y = this.button.height / 2;
        this.button.addChild(this.buttonText);
    }

    protected onClick(): void {
        EventDispatcher.getInstance().getDispatcher().emit(CalculatorEvents.BASIC_CALCULATOR_BUTTON_PRESSED, "basic");
    }

    protected onHover(): void {
        this.button.on("mouseover", this.onMouseOver, this)
        this.button.on("mouseout", this.onMouseOut, this)
    }

    protected onMouseOver() {
        this.button.tint = 0x000000;
    }

    protected onMouseOut() {
        this.button.tint = 0x00FFFF;
    }

}