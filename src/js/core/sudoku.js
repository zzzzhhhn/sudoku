//生成数独游戏
const Generator = require('./generator');

module.exports = class Sudoku {
    constructor() {
        const generate = new Generator();
        generate.generate();
        this.solutionMatrix = generate.matrix;
    }

    get puzzleMatrix() {
        return this._puzzleMatrix;
    }

    make(level = 5) {
        this._puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
            return Math.random() * 9 < level ? 0 : cell;
        }))
    }
}