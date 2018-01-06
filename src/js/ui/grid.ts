//生成九宫格
import Toolkit from '../core/toolkit';
import Sudoku from '../core/sudoku';
import Checker from '../core/checker';
import PopupNumbers from './popupnumbers';

export class Grid {
    
    private _$container: JQuery;

    constructor(container: JQuery) {
        this._$container = container;
    }

    build() {
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        const rowGroupClasses = ['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses = ['col_g_left','col_g_center','col_g_right'];

        const $cells = matrix.map(rowRules => rowRules.map((cellValues,cellIndexes) => {
            return $('<span>')
                .addClass(colGroupClasses[cellIndexes % 3])
                .addClass(cellValues === 0 ? 'empty' : 'fixed' )
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

    reBuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }

    /**
     * 检查用户输入
     */
    check() {
        const data = this._$container.children()
        .toArray()
        .map(div => {
            return $(div).children()
            .toArray()
            .map(span => parseInt($(span).text(),10) || 0);
        });

        const checker = new Checker(data);

        checker.check();

        if(checker.isSuccess) {
            return true;
        }else {
            const marks = checker.matrixMarks;
            this._$container.children().each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    if($(span).is('.fixed') || marks[rowIndex][colIndex]){
                        $(span).removeClass('error');
                    }else {
                        $(span).addClass('error');
                    }
                })
            });
            return false;
        }
    }

    /**
     * 重置当前迷盘
     */
    reset() {
        this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0);
    }

    /**
     * 清理标记
     */
    clear() {
        this._$container.find('span.error').removeClass('error');
    }

    layout() {
        const width: any = $('span:first',this._$container).width();
        $('span',this._$container).height(width).css({'lineHeight': `${width}px`,'font-size':width < 32 ? `${width/2}` : ''});
    }

    bindPopup(popupnumber: PopupNumbers) {
        this._$container.on('click','span',e => {
            const $cell = $(e.target);
            if($cell.is('.fixed')) {
                return false;
            }
            popupnumber.popup($cell);
        })
    }
}
export default Grid;