
export class Die {
    readonly name: string
    readonly numbers: number[]

    constructor(name: string, numbers: number[]) {
        this.name = name
        this.numbers = numbers
    }

    public roll(): number {
        return this.numbers[(Math.random() * this.numbers.length) | 0]
    }
}

export const standardDie = new Die('Standard-Würfel', [1, 2, 3, 4, 5, 6])
export const intransitiveDice =    [new Die('Würfel 2-4-9', [2, 2, 4, 4, 9, 9]),
                                    new Die('Würfel 1-6-8', [1, 1, 6, 6, 8, 8]),
                                    new Die('Würfel 3-5-7', [3, 3, 5, 5, 7, 7])]
export const efronsDice =  [new Die('Würfel 4-0', [4, 4, 4, 4, 0, 0]),
                            new Die('Würfel 3', [3, 3, 3, 3, 3, 3]),
                            new Die('Würfel 6-2', [6, 6, 2, 2, 2, 2]),
                            new Die('Würfel 5-1', [5, 5, 5, 1, 1, 1])]