/**
 * Created by Administrator on 2018/1/2.
 */
const matrixTollkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        return Array.from({length: 9}, () => this.makeRow(v));
    },

    /**
     * fisher-yates 洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    }
}

module.exports = matrixTollkit;