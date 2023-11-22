

export class CalculatorModel {

    private memory: string;
    private temporaryMemory: string;
    private observers: ((data: any) => void)[] = [];

    constructor() { }

    public setMemory(data: any): void {
        this.memory = data;
        this.notifyDisplay();
    }

    public getMemory(): string {
        return this.memory;
    }

    public setTemporaryMemory(): void {
        this.temporaryMemory = this.memory;
        this.notifyTemporaryDisplay();
    }

    public getTemporaryMemory(): string {
        return this.temporaryMemory;
    }

    public clearMemory() {
        this.memory = "0";
        this.notifyDisplay();
        this.temporaryMemory = "";
        this.notifyTemporaryDisplay();
    }

    public addObserver(observer: (data: any) => void): void {
        this.observers.push(observer);
    }

    private notifyDisplay(): void {
        this.observers[0](this.memory);
    }

    private notifyTemporaryDisplay(): void {
        this.observers[1](this.temporaryMemory);
    }

}