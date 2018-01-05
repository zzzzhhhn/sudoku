/**
 * Created by Administrator on 2018/1/2.
 */
const Grid = require('./ui/grid');
const Generator = require('./core/generator');

const grid = new Grid($('#container'))
grid.build();
grid.layout();

const generator = new Generator();
generator.generate();
console.log(generator.matrix);