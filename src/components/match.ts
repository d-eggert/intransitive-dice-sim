import type { Die } from "./dice";

export class Result {
    rounds: number
    wins: number[]
    draws: number = 0

    constructor(rounds: number, numDice: number){
        this.rounds = rounds
        this.wins = new Array(numDice).fill(0)
    }

    public getPercentage(diceIdx: number): number {
        return Math.round(100 * this.wins[diceIdx]/this.rounds)
    }
}

export class Match {
    constructor(private dice: Die[]) {}

    public run(rounds: number): Result {
        const res = new Result(rounds, this.dice.length)
        for (let i = 0; i<rounds; ++i) {
            // roll all dice
            const rolls = this.dice.map((die) => die.roll())
            // find max value index
            const indexOfMaxValue = rolls.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
            
            // check for duplicates which means we have a draw
            if (indexOfMaxValue < rolls.lastIndexOf(rolls[indexOfMaxValue])) {
                // there was a draw
                res.draws++
            } else {
                res.wins[indexOfMaxValue]++
            }

        }

        return res
    }
}