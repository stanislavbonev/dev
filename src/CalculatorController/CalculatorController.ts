import { CalculatorModel } from "../CalculatorModel/CalculatorModel";
import { CalculatorFactory } from "../Factory/CalculatorFactory";
import { CalculatorView } from "../CalculatorView/CalculatorView";
import { CalculatorEvents } from "../CalculatorEvents";
import { EventDispatcher } from "../EventDispatcher";
import * as PIXI from "pixi.js";

export class CalculatorController extends PIXI.Container {
    //TODO fix variable types
    private calaculatorFactory: CalculatorFactory;
    private calculatorView: CalculatorView;
    private calculatorModel: CalculatorModel;
    private numbers: number[] = [];
    private delete: any = 0;
    private deleteElement: any = "";
    private stringifiedNumbers: string;
    private operationFinished:boolean = false;
    constructor(model: CalculatorModel,calculatorView:CalculatorView) {
        super();
        this.calculatorModel = model;
        this.calculatorView = calculatorView;
        this.init();
    }

    private init() {
        this.setCalculatorView();
        this.setCalculatorFactory();
        this.setControllerObserver();

        EventDispatcher.getInstance().getDispatcher().on(CalculatorEvents.NUMERIC_BUTTON_PRESSED, this.readNumericButton.bind(this));
        EventDispatcher.getInstance().getDispatcher().on(CalculatorEvents.OPERATOR_BUTTON_PRESSED, this.readOperatorButton.bind(this));
    }

    public readNumericButton(data: number) {
        this.calculatorModel.setMemory(this.formatInputKeyboardData(data));
        this.operationFinished = true;
    
    }

    private formatInputKeyboardData(data: number) {
        this.numbers.push(data);
        this.stringifiedNumbers = this.numbers.join("");
        return this.stringifiedNumbers;
    }

    public readOperatorButton(data: string) {

        if (["+","-","x","/"].includes(data)) {
this.calculatorModel.setOperator(data)
            this.numbers = [];
        }

        if (data === "CE") {
            this.calculatorModel.setMemory(0);
            this.calculatorModel.setOperator("");
            this.numbers = [];
        }

        if (data === "<-") {
           this.calculatorModel.deleteDigit();                
        }

        if (data === "C") {
            this.calculatorModel.clearMemory();
            this.numbers = [];
        }

        if (data === "=") {
            // if (this.calculatorModel.getMemory() === "0" ) {
            //     return
            // }
        this.calculatorModel.calculateResult();
        this.numbers = [];
        }
    }

    private updateCalculatorDisplay(data: any) {
        this.calculatorView.updateCalculatorDisplay(data)
    }

    private updateCalculatorTemporaryDisplay(data: any) {
        this.calculatorView.updateTemporaryDisplay(data)
    }

    private setCalculatorView() {
       // this.calculatorView = new CalculatorView();
        this.addChild(this.calculatorView)
    }

    private setCalculatorFactory() {
        this.calaculatorFactory = new CalculatorFactory(this.calculatorView);
    }

    private setControllerObserver() {
        this.calculatorModel.addObserver(this.updateCalculatorDisplay.bind(this))
        this.calculatorModel.addObserver(this.updateCalculatorTemporaryDisplay.bind(this));
    }

}