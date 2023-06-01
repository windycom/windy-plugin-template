import { Drag } from '@windy/Drag';

export class DragContainer extends Drag {
    constructor(params, refs) {
        super(params);
        this.refs = refs;
    }

    ondrag(x, y) {
        this.refs.dragdemoX.style.left =
            x + this.startLeft - this.el.style.left.slice(0, -2) - 1.5 + 'px'; // -1 for border an -0.5 for line
        this.refs.dragdemoY.style.top =
            y + this.startTop - this.el.style.top.slice(0, -2) - 1.5 + 'px';
    }

    ondragstart(xy) {
        const clientRect = this.el.getBoundingClientRect();
        this.startLeft = xy[0] - clientRect.left - this.el.offsetLeft;
        this.startTop = xy[1] - clientRect.top - this.el.offsetTop;
        this.ondrag(this.el.offsetLeft, this.el.offsetTop);
    }

    ondragend(e) {
        console.log('Do something with event:', e);
    }
}
