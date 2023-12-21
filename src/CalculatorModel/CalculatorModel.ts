import  calcOperations  from "../SimpleBrain/SimpleBrain";

export class CalculatorModel {

    private memory: string="0";
    private temporaryMemory: string="0";
    private inBetween: string="0";
    private total: string="0";
    private observers: ((data: any) => void)[] = [];
    private operator:string="";
    private delete: any = 0;
    private deleteElement: any = "";
    private operatorSet:boolean = true;
    private calculationComplete:boolean = false;
    private leftOperand:string="0";
    private rightOperand:string="0"

    constructor() { }

    public setOperator(data:string){
        if(this.operator === ""){
            this.operator= data;
        }
        
        if(!this.operatorSet){
            this.operator = data;
            this.setRightOperand(this.getMemory())
            this.operatorSet=false;
            this.calculateResult();
            this.setLeftOperand(this.getTotal());
            this.operator="";
            return;
        }
        
   this.operator = data;
   this.setLeftOperand(this.getMemory())
   //this.setMemory("0")
  // this.calculateResult();
   this.operatorSet=false;

    }

    public getOperator(){
        return this.operator;
    }

    private setTotal(data:any){
        this.total = data;
        this.notifyDisplay(this.total);
    }

    private getTotal(){
        return this.total;
    }

    private setLeftOperand(data:string){
        this.leftOperand = data;
    }

    private getLeftOperand(){
        return this.leftOperand;
    }

    private setRightOperand(data:string){
        this.rightOperand = data;
    }

    private getRightOperand(){
        return this.rightOperand;
    }

    public setMemory(data: any): void {
        this.memory = data;
        this.notifyDisplay(data);
    }

    public getMemory(): string {
        return this.memory;
    }

    public setTemporaryMemory(data:any): void {
        this.temporaryMemory = data;
        this.notifyTemporaryDisplay();
    }

    public getTemporaryMemory(): string {
        return this.temporaryMemory;
    }

    public clearMemory() {
        this.memory = "0";
        this.total = "0";
        this.temporaryMemory = "0";
        this.leftOperand ="0";
        this.rightOperand="0";
        this.notifyDisplay(this.memory);
        this.notifyTemporaryDisplay();
    }

    public deleteDigit(){
            this.deleteElement = this.getMemory();
            if (this.deleteElement.length > 0) {
                this.delete = this.getMemory();
                this.deleteElement = this.delete.substring(0, this.delete.length - 1);
                this.setMemory(this.deleteElement);

                if (this.deleteElement.length === 0) {
                    this.setMemory("0");
                }
            }
        
    }

    public calculateResult(){
        let value1:number = parseInt(this.getMemory()) as number;
    
        let value2:number = parseInt(this.getTemporaryMemory()) as number;
    
        let temp = value2;
        //settemporarymemory value2
        
        let operator:string = this.getOperator();

        let total = calcOperations[operator](parseInt(this.leftOperand),parseInt(this.rightOperand));

        this.setTotal(total);
        // this.setLeftOperand(total.toString());
        //this.setTemporaryMemory(total);
        //this.operatorSet=false;

    }

    public addObserver(observer: (data: any) => void): void {
        this.observers.push(observer);
    }

    private notifyDisplay(data:any): void {
        this.observers[0](data);
    }

    private notifyTemporaryDisplay(): void {
        this.observers[1](this.temporaryMemory);
    }

}