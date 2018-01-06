//生成操作面板
module.exports = class PopupNumbers {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass('hidden');

        this._$panel.on('click', 'span', e => {
            const $cell = this._targetCell;
            const $span = $(e.target);
            if($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                } else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            }else
            if($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                } else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            }else
            if($span.hasClass('empty')) {
                $cell.text(0).addClass('empty');
            }else {
                $cell.text($span.text()).removeClass('empty');
            }
            this.hide();
        })
    }

    popup($cell) {
        this._targetCell = $cell;
        const { left, top } = $cell.position();
        this._$panel.css({
            left: `${left}px`,
            top: `${top}px`
        }).show();
    }

    hide() {
        this._$panel.hide();
    }


}