import ToolKit from './toolkit';
//检查数独解决方案
function checkArray(array: number[]): boolean[] {
    const markArr: boolean[] = ToolKit.matrix.makeRow(true);
    const length: number = array.length;
    for (let i = 0; i< length - 1; i++) {
        const value: number = array[i];
        if(!markArr[i]) {
            continue;
        }
        //为零无效
        if(array[i] === 0) {
            markArr[i] = false;
            continue;
        }
        //重复无效
        for (let j = i + 1; j < length; j++) {
            if(array[j] === value) {
                markArr[i] = false;
                markArr[j] = false;
            }
        }
    }
    return markArr;
}

export class  Checker {
    
    private _matrix: number[][];

    private _matrixMarks: boolean[][];

    private _success: boolean = false;

    constructor(matrix: number[][]) {
        this._matrix = matrix;
        this._matrixMarks = ToolKit.matrix.makeMatrix(true);
    }
    get matrixMarks(): boolean[][] {
        return this._matrixMarks;
    }
    get isSuccess(): boolean {
        return this._success;
    }
    check(): boolean {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        this._success = this._matrixMarks.every(row => row.every(mark => mark));
        return this._success;
    }

    private checkRows(): void {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkCols(): void {
        for (let colIndex = 0; colIndex < 9 ; colIndex++) {
            const cols = [];
            for(let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);

            for(let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if(!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkBoxes(): void {
        for(let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = ToolKit.box.getBoxCells(this._matrix,boxIndex);
            const marks = checkArray(boxes);
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if(!marks[cellIndex]) {
                    const { rowIndex, colIndex } = ToolKit.box.convertFromBoxIndex(boxIndex,cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

}

export default Checker;