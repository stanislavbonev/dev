import * as PIXI from 'pixi.js';
import { GameApplication } from "../GameApplication";
import { BaseButton } from "./BaseButton";
import { EventDispatcher } from "../EventDispatcher";
import { CalculatorEvents } from "../CalculatorEvents";

export class NumericButton extends BaseButton {
    private button: PIXI.Sprite;
    private buttonText: PIXI.Text;
    private label: number;
    private xPos: number;
    private yPos: number;
    private clickCount: number = 0;

    constructor(label: number, x: number, y: number) {
        super();
        this.label = label;
        this.xPos = x;
        this.yPos = y;
        this.init();
    }

    protected init() {
        this.createButton();
        this.createLabel();
        this.onHover();
        this.button.on('mouseup', this.onClick, this)
    }
    //TODO IMPROVE INHERITANCE FROM BASE BUTTON REPEATABLE CODE FOR BUTTON APEARENCE
    protected createButton() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x000000);
        gfx.drawRoundedRect(0, 0, 50, 50, 10);
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
            fontSize: 20,
        })
        this.buttonText.anchor.set(0.5)
        this.buttonText.x = this.button.width / 2;
        this.buttonText.y = this.button.height / 2;
        this.button.addChild(this.buttonText);
    }

    protected onClick(): void {
        // console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
        // this.clickCount++;
        // let a: string = ""
        // a = this.label.toString().repeat(this.clickCount)
        // console.log(a)
        //EventDispatcher.getInstance().getDispatcher().emit(CalculatorEvents.NUMERIC_BUTTON_PRESSED, this.label);
        EventDispatcher.getInstance().getDispatcher().emit(CalculatorEvents.NUMERIC_BUTTON_PRESSED, this.label);
        
    }

    protected onHover(): void {
        this.button.on("mouseover", this.onMouseOver, this)
        this.button.on("mouseout", this.onMouseOut, this)
    }

    protected onMouseOver() {
        this.button.scale.x=0.95;
        this.button.scale.y=0.95;
        //this.button.tint = 0x000000;
    }
    protected onMouseOut() {
        this.button.scale.x=1;
        this.button.scale.y=1;
       // this.button.tint = 0x00FFFF;
    }
}