/**
 * Created by Administrator on 2018/1/2.
 */
const tolkit = require('./toolkit');

const matrix = tolkit.makeMatrix();


console.log(matrix)

const a = Array.from({ length: 9}, (v, i)  => i);
console.log(a);
const shuffle = tolkit.shuffle(a);
console.log(shuffle);