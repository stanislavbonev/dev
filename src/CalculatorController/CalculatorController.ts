import { CalculatorModel } from "../CalculatorModel/CalculatorModel";
import { CalculatorFactory } from "../Factory/CalculatorFactory";
import { CalculatorView } from "../CalculatorView/CalculatorView";
import { CalculatorEvents } from "../CalculatorEvents";
import { EventDispatcher } from "../EventDispatcher";
import  calcOperations  from "../SimpleBrain/SimpleBrain"
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

    constructor(model: CalculatorModel) {
        super();
        this.calculatorModel = model;
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
    }

    private formatInputKeyboardData(data: number) {
        this.numbers.push(data);
        this.stringifiedNumbers = this.numbers.join("");
        return this.stringifiedNumbers;
    }

    public readOperatorButton(data: string) {

        if (data === "+" || "-" || "x" || "/") {
            this.calculatorModel.setTemporaryMemory();
            this.numbers = [];
        }

        if (data === "CE") {
            this.calculatorModel.setMemory(0);
            this.numbers = [];
        }
        //TOODO refactor this code
        if (data === "<-") {
            this.deleteElement = this.calculatorModel.getMemory();
            if (this.deleteElement.length > 0) {
                this.delete = this.calculatorModel.getMemory();
                console.log(typeof this.delete)
                this.deleteElement = this.delete.substring(0, this.delete.length - 1)
                this.calculatorModel.setMemory(this.deleteElement);
                if (this.deleteElement.length === 0) {
                    this.calculatorModel.setMemory("0");
                    this.numbers = [];
                }
            }
        }

        if (data === "C") {
            this.calculatorModel.clearMemory();
            this.numbers = [];
        }

        if (data === "=") {
            
            if (this.numbers.length === 0) {
                return
            }
            const value1 = parseInt(this.calculatorModel.getMemory()) as number;
            const value2 = parseInt(this.calculatorModel.getTemporaryMemory()) as number;
           // const total = this.add.execute(value2, value1)
          //  this.calculatorModel.setMemory(total);
          calcOperations
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
        this.calculatorView = new CalculatorView();
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