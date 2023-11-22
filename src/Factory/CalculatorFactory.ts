import * as PIXI from 'pixi.js';
import { ClaclatorType } from '../CalculatorType/CalculatorType';
import { CalculatorEvents } from "../CalculatorEvents";
import { EventDispatcher } from "../EventDispatcher";
import { NumericButton } from "../Buttons/NumericButton";
import { OperatorButton } from "../Buttons/OperatorButton";
import { CalculatorView } from '../CalculatorView/CalculatorView';

export class CalculatorFactory extends PIXI.Container {
    private button: any;
    private buttons: any[] = [];
    private calculatorView: CalculatorView;

    constructor(calculatorView: CalculatorView) {
        super();
        this.calculatorView = calculatorView;
        EventDispatcher.getInstance().getDispatcher().on(CalculatorEvents.BASIC_CALCULATOR_BUTTON_PRESSED, this.createCalculatorButtons, this)
    }
    
    //to refactor the positioning of the buttons "Single Resposibility"
    //and to add logic for the advanced calculator
    //to refactor the types of the variables

    public createCalculatorButtons(type: string) {
        let calculatorType: any
        let index: number = 0;

        if (type === 'basic') {
            calculatorType = ClaclatorType.basic;
        }
        for (let rows = 0; rows < calculatorType.rows; rows++) {

            for (let columns = 0; columns < calculatorType.columns; columns++) {

                index = rows * calculatorType.columns + columns;

                if (typeof calculatorType.buttons[index] === 'number') {
                    this.button = new NumericButton(calculatorType.buttons[index], columns * 1.2 * 50, rows * 1.2 * 50);
                    this.buttons.push(this.button);
                }

                if (typeof calculatorType.buttons[index] === 'string') {
                    this.button = new OperatorButton(calculatorType.buttons[index], columns * 1.2 * 50, rows * 1.2 * 50);
                    this.buttons.push(this.button);
                }
            }
        }
        this.calculatorView.createButtons(this.buttons);
    }

}

