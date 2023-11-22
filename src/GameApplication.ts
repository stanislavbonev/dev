
import * as PIXI from 'pixi.js';
import { CalculatorView } from "./CalculatorView/CalculatorView";
import { CalculatorController } from './CalculatorController/CalculatorController';
import { CalculatorModel } from './CalculatorModel/CalculatorModel';
import { Command } from "./Command/Command"
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
        this.loader = new PIXI.Loader();
        this.onLoadComplete();
        window.onload = () => {
            const gameContainer: HTMLCanvasElement = document.getElementById("gameContainer") as HTMLCanvasElement;
            gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();

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

    private onLoadComplete() {
        //   const command = new Command();
        const model: CalculatorModel = new CalculatorModel()
        const controller = new CalculatorController(model);
        this.mainContainer.addChild(controller);
    }

}