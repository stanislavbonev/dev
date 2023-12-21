interface Type {
    buttons: (number | string)[],
    rows: number,
    columns: number
}

export class ClaclatorType {

    public static basic: Type = {
        buttons: ["%", "CE", "C", "<-", "1/x", "x^2", "2√x", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="],
        rows: 6,
        columns: 4
    }
}