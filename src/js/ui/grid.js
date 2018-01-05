//生成九宫格
const Toolkit = require('../core/toolkit');


module.exports = class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const matrix = Toolkit.matrix.makeMatrix();
        const rowGroupClasses = ['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses = ['col_g_left','col_g_center','col_g_right'];

        const $cells = matrix.map(rowRules => rowRules.map((cellValues,cellIndexes) => {
            return $('<span>')
                .addClass(colGroupClasses[cellIndexes % 3])
                .text(cellValues);
    }));

        const $divArray = $cells.map(($spanArray,$index) => {
            return $('<div>')
                .addClass('row')
                .addClass(rowGroupClasses[$index % 3])
                .append($spanArray);
    });
        this._$container.append($divArray);
    }

    layout() {
        const width = $('span:first',this._$container).width();
        $('span',this._$container).height(width).css({'lineHeight': `${width}px`,'font-size':width < 32 ? `${width/2}` : ''});
    }
}
