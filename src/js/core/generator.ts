//生成数独解决方案

import Toolkit from './toolkit';

export class Generator {

    public matrix: number[][];
    
    private orders: number[][];

    //入口
    generate(): void {
        while(!this.internalGenerate()) {
            console.warn('try again');
        }
    }

    private internalGenerate(): boolean {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v,i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let i = 1; i <= 9; i++) {
           if(!this.fillNumber(i)){
                return false;
           }
        }
        return true;
    }

    private fillNumber(n: number): boolean {
        return this.fillRow(n,0);
    }

    private fillRow(n: number, rowIndex: number): boolean {
        if(rowIndex > 8) {
            return true;
        }

        const row: number[]= this.matrix[rowIndex];
        const order: number[] = this.orders[rowIndex];
        for(let i = 0; i < 9; i++) {
            const colIndex: number = order[i];
            //有值跳过
            if(row[colIndex] !== 0) {
                continue;
            }

            //不能填跳过
            if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)) {
                continue;
            }

            //填写
            row[colIndex] = n;

            //当前行填写n成功，递归调用下一行
            if(!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;

    }

}

export default Generator;