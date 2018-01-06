/**
 * Created by Administrator on 2018/1/2.
 * 工具集
 */

export interface IBoxCoord {
    boxIndex: number,
    cellIndex: number
}

export interface IRowColCoord {
    rowIndex: number,
    colIndex: number
}

/**
 * 宫坐标系工具
 */
const boxToolkit = {
    convertToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    convertFromBoxIndex(boxIndex: number, cellIndex: number): IRowColCoord {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    },
    getBoxCells (matrix: number[][], boxIndex: number): number[] {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for(let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
}

/**
 * 矩阵工具
 * @type {{makeRow: (function(*=)), makeMatrix: (function(*=)), shuffle: (function(*))}}
 */
class MatrixTollkit {
    static makeRow(): number[];
    static makeRow<T>(v: T): T[];
    static makeRow(v: any = 0): any[]{
        const array = new Array(9);
        array.fill(v);
        return array;
    }

    static makeMatrix(): number[][];
    static makeMatrix<T>(v: T): T[][];
    static makeMatrix(v: any = 0): any[][] {
        return Array.from({length: 9}, () => this.makeRow(v));
    }

    /**
     * fisher-yates 洗牌算法
     */

    static shuffle<T>(array: T[]): T[] {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    }

    /**
     * 检查是否可以填入数字
     * @returns {boolean}
     */

    static checkFillable(matrix: number[][],n: number,rowIndex: number,colIndex: number): boolean {
        const row = matrix[rowIndex];
        const col = this.makeRow().map((v,i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
        const box = boxToolkit.getBoxCells(matrix,boxIndex);
        for(let i = 0; i < 9; i++) {
            if(row[i] === n || col[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
}


export class ToolKit {

    static get matrix(): typeof MatrixTollkit {
        return MatrixTollkit;
    }

    static get box() {
        return boxToolkit;
    }
};

export default ToolKit;