import * as PIXI from 'pixi.js';
import { filters } from 'pixi.js';
import { BasicCalculatorButton } from "../Buttons/BasicCalculatorButton";
import { GameApplication } from "../GameApplication";
import { TextStyle } from 'pixi.js';
import { GlowFilter } from 'pixi-filters';
import gsap from 'gsap';
export class CalculatorView extends PIXI.Container {

    private container: PIXI.Container;
    private calculatorDisplay: PIXI.Sprite;
    private calculatorDisplayCover: PIXI.Sprite;
    private displayNumerics: PIXI.Text;
    private displayNumericsEmpty: PIXI.Text;
    private displayTemporary: PIXI.Text;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.createContainer();
        this.createCalculatorButtons();
        this.createCalculatorDisplayBackground();
        this.calcuatorDisplayEmptyDigits();
        this.createCalculatorDisplayNumericals();
        this.createClaculatorDisplayFrontCover();
        this.createCalculatorTemporaryDisplay();
        this.createMetalStrip();
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
        // if(data === "0."){
        //     this.displayNumerics.x = this.calculatorDisplay.width;
        //     return;
        // }
        // this.displayNumerics.x = this.calculatorDisplay.width*0.98;
    
    }

    public updateTemporaryDisplay(data: any) {
        this.displayTemporary.text = data;
         
    }

    private createCalculatorDisplayBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x171717);
        gfx.drawRoundedRect(0, 0, 230, 50,5);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.calculatorDisplay = new PIXI.Sprite(texture);
        this.calculatorDisplay.y = (this.calculatorDisplay.height * 0.8) - this.container.y;
        this.container.addChild(this.calculatorDisplay);
    }

    private createClaculatorDisplayFrontCover() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x750000);
        gfx.drawRoundedRect(0, 0, this.calculatorDisplay.width, this.calculatorDisplay.height,5);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.calculatorDisplayCover = new PIXI.Sprite(texture);
        this.calculatorDisplayCover.y = (this.calculatorDisplay.height * 0.8) - this.container.y;
        this.calculatorDisplayCover.alpha = 0.25;
        this.container.addChild(this.calculatorDisplayCover);
    }

    private calcuatorDisplayEmptyDigits(){
        this.displayNumericsEmpty = new PIXI.Text("000000000");
        this.displayNumericsEmpty.style = new TextStyle({
        fill: 0x000000,
        fontFamily: 'Digital-7',
        fontSize: this.calculatorDisplay.height / 1.6,
})
        this.displayNumericsEmpty.anchor.set(1, 1);
        this.displayNumericsEmpty.x = this.calculatorDisplay.width;
        this.displayNumericsEmpty.y = this.calculatorDisplay.height;
        this.displayNumericsEmpty.resolution = 10;
        this.calculatorDisplay.addChild(this.displayNumericsEmpty);
    }

    private createCalculatorDisplayNumericals() {
        this.displayNumerics = new PIXI.Text("0");
        this.displayNumerics.style = new TextStyle({
        fill: 0xFF0000,
        fontFamily: 'Digital-7',
        fontSize: this.calculatorDisplay.height / 1.6,
    
})
    const glowFilter = new GlowFilter({
        distance: 10,
        outerStrength: 2,
        color: 0x750000,
});
    this.displayNumerics.filters = [glowFilter as unknown as PIXI.Filter];
        this.displayNumerics.anchor.set(1, 1);
        this.displayNumerics.x = this.calculatorDisplay.width;
        this.displayNumerics.y = this.calculatorDisplay.height;
        this.displayNumerics.resolution = 10;
        this.displayNumerics.alpha = 0;
        gsap.to(this.displayNumerics, {alpha:1, duration:2})
        this.calculatorDisplay.addChild(this.displayNumerics);
    }

    private createCalculatorTemporaryDisplay() {
        this.displayTemporary = new PIXI.Text("0", {
            fill: 0xFF0000,
            fontSize: this.calculatorDisplay.height / 1.6,
            
        })
        const glowFilter = new GlowFilter({
            distance: 10,
            outerStrength: 2,
            color: 0x750000, // Glow color
        });
        this.displayTemporary.filters = [glowFilter as unknown as PIXI.Filter]
        this.displayTemporary.anchor.set(1, 0.5);
        this.displayTemporary.x = this.calculatorDisplay.width * 0.8;
        this.displayTemporary.y = this.calculatorDisplay.height - this.displayNumerics.height * 1.2;
        this.displayTemporary.scale.set(0.5, 0.5);
        this.calculatorDisplay.addChild(this.displayTemporary);
    }

    private createMetalStrip(){

        // const texture: PIXI.Texture = PIXI.Texture.from('../assets/image/Brushed-Metal-Texture.jpg');
        // const metalStrip = new PIXI.Sprite(texture);
        // console.log(metalStrip,"AAAAAAAAAAAAAAAAAAAAAAAAAA")
        // metalStrip.y = 300
        // metalStrip.x=300
      
        // this.container.addChild(metalStrip);
    }

    private createCalculatorButtons() {
        const btn: BasicCalculatorButton = new BasicCalculatorButton("Elka 101", 50, 50)
        this.addChild(btn);
    }

    private createContainer() {
        this.container = new PIXI.Container();
        this.container.x = 200;
        this.container.y = 100;
        //this.addChild(this.container)
    }
}

