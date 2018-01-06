/**
 * Created by Administrator on 2018/1/2.
 */
const Grid = require('./ui/grid');
const Checker = require('./core/checker');
const PopupNumbers = require('./ui/popupnumbers');

const grid = new Grid($('#container'))
grid.build();
grid.layout();

const popupnumber = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupnumber);

$('#check').on('click', e => {
    if(grid.check()){
        alert('Congratulations！')
    };
});

$('#reset').on('click', e => {
    grid.reset();
});

$('#clear').on('click', e => {
    grid.clear();
});

$('#rebuild').on('click', e => {
    grid.reBuild();
});