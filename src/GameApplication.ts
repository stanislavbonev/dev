
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import { CalculatorView } from "./CalculatorView/CalculatorView";
import { CalculatorController } from './CalculatorController/CalculatorController';
import { CalculatorModel } from './CalculatorModel/CalculatorModel';
import { CalculatorFactory } from './Factory/CalculatorFactory';

export class GameApplication extends PIXI.Application {

    public static STAGE_WIDTH: number = 800;
    public static STAGE_HEIGHT: number = 600;

    private static app: GameApplication;
    private mainContainer: PIXI.Container;
    private controller: CalculatorController;

    constructor() {
        super(GameApplication.getAppOptions());
        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {
        GameApplication.app = this;
        this.mainContainer = new PIXI.Container();
        //Assets.add('iron', '../assets/image/aluminum.jpg')
        this.loader = new PIXI.Loader();
        // this.loader.add('Digital-7', './assets/fonts/digital-7.ttf')
        // this.loader.add('iron', './assets/image/aluminum.jpg')
        // this.loader.add('key','./assets/image/keyboard-key.png');
        // this.loader.add('aluminium','./assets/image/aluminum.jpg');
        // this.loader.add('brushedmetal','./assets/image/Brushed-Metal-Texture.jpg');
        // this.loader.add('sun','./assets/image/sun-sunglasses.jpg');
        // this.loader.load();
        this.onLoadComplete();
       
        window.onload = () => {
            const gameContainer: HTMLCanvasElement = document.getElementById("gameContainer") as HTMLCanvasElement;
            gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();
            this.loadAssets();
            this.view.style.position = 'absolute';
            this.view.style.left = '50%';
            this.view.style.top = '50%';
            this.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        };
    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x808080,
            width: GameApplication.STAGE_WIDTH,
            height: GameApplication.STAGE_HEIGHT,
        }
    }

    private resizeCanvas(): void {
        const resize = () => {
            this.renderer.resize(GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
        };

        resize();

        window.addEventListener("resize", resize);
    }

    private loadAssets(){
        // PIXI.Loader.shared.add('sun','../assets/image/sun-sunglasses.jpg')
        // this.loader.load();
        
        const texture: PIXI.Texture = PIXI.Texture.from('./assets/image/Brushed-Metal-Texture.jpg');
        const metalStrip = new PIXI.Sprite(texture);
        console.log(metalStrip,"AAAAAAAAAAAAAAAAAAAAAAAAAA")
        metalStrip.y = 300
        metalStrip.x=300
      
        this.mainContainer.addChild(metalStrip);
    }

    private onLoadComplete() {
        const model: CalculatorModel = new CalculatorModel();
        const view: CalculatorView = new CalculatorView();
        const controller = new CalculatorController(model,view,);
        this.mainContainer.addChild(controller);
    }

}