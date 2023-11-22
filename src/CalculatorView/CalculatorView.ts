import * as PIXI from 'pixi.js';
import { BasicCalculatorButton } from "../Buttons/BasicCalculatorButton";
import { GameApplication } from "../GameApplication";

export class CalculatorView extends PIXI.Container {

    private container: PIXI.Container;
    private calculatorDisplay: PIXI.Sprite;
    private displayNumerics: PIXI.Text;
    private displayTemporary: PIXI.Text;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.createContainer();
        this.createCalculatorButtons();
        this.createCalculatorDisplayBackground();
        this.createCalculatorDisplayNumericals();
        this.createCalculatorTemporaryDisplay();
    }

    //TODO ADD DESTROY LOGIC
    public createButtons(buttonArray: any) {
        buttonArray.forEach((element: any) => {
            this.container.addChild(element);
        })
        this.addChild(this.container)
    }

    public updateCalculatorDisplay(data: any) {
        this.displayNumerics.text = data;
    }

    public updateTemporaryDisplay(data: any) {
        this.displayTemporary.text = data;
    }

    private createCalculatorDisplayBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x18191A);
        gfx.drawRect(0, 0, 230, 50);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.calculatorDisplay = new PIXI.Sprite(texture);
        this.calculatorDisplay.y = (this.calculatorDisplay.height * 0.8) - this.container.y;
        this.container.addChild(this.calculatorDisplay);
    }

    private createCalculatorDisplayNumericals() {
        this.displayNumerics = new PIXI.Text("0", {
            fill: 'white',
            fontSize: this.calculatorDisplay.height / 1.6,
        })
        this.displayNumerics.anchor.set(1, 1);
        this.displayNumerics.x = this.calculatorDisplay.width;
        this.displayNumerics.y = this.calculatorDisplay.height;
        this.calculatorDisplay.addChild(this.displayNumerics);
    }

    private createCalculatorTemporaryDisplay() {
        this.displayTemporary = new PIXI.Text("", {
            fill: 'white',
            fontSize: this.calculatorDisplay.height / 1.6,
        })
        this.displayTemporary.anchor.set(1, 0.5);
        this.displayTemporary.x = this.calculatorDisplay.width * 0.8;
        this.displayTemporary.y = this.calculatorDisplay.height - this.displayNumerics.height * 1.2;
        this.displayTemporary.scale.set(0.5, 0.5);
        this.calculatorDisplay.addChild(this.displayTemporary);
    }

    private createCalculatorButtons() {
        const btn: BasicCalculatorButton = new BasicCalculatorButton("Basic", 50, 50)
        this.addChild(btn);
    }

    private createContainer() {
        this.container = new PIXI.Container();
        this.container.x = 200;
        this.container.y = 100;
        //this.addChild(this.container)
    }
}

