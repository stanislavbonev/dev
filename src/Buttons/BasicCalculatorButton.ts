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
        this.button.on('mousedown', this.onClickDown, this);
        this.button.on('mouseup', this.onClickUp, this);
    }
    //TODO IMPROVE INHERITANCE FROM BASE BUTTON REPEATABLE CODE FOR BUTTON APEARENCE
    protected createButton() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x000000);
        gfx.drawRoundedRect(0, 0, 80, 50,5);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx)
        this.button = new PIXI.Sprite(texture);
        this.button.x = this.xPos;
        this.button.y = this.yPos;
        this.button.interactive = true;
        //this.button.anchor.set(0.5);
        this.addChild(this.button);
    }

    protected createLabel() {
        this.buttonText = new PIXI.Text(this.label, {
            fill: 'white',
            fontFamily:"Digital-7",
            fontSize: 20,
        })
        this.buttonText.anchor.set(0.5)
        this.buttonText.x = this.button.width / 2;
        this.buttonText.y = this.button.height / 2;
        this.button.addChild(this.buttonText);
    }

    protected onClickDown(): void {
        this.button.scale.set(0.95);
    }
    protected onClickUp(): void {
        EventDispatcher.getInstance().getDispatcher().emit(CalculatorEvents.BASIC_CALCULATOR_BUTTON_PRESSED, "Elka101");
        this.button.scale.set(1);
    }

    protected onHover(): void {
        this.button.on("mouseover", this.onMouseOver, this)
        this.button.on("mouseout", this.onMouseOut, this)
    }

    protected onMouseOver() {
       // this.button.tint = 0x000000;
    }

    protected onMouseOut() {
       // this.button.tint = 0x00FFFF;
    }

}