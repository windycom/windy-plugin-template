import { Drag } from '@windy/Drag';

export class DragDiv extends Drag {
    constructor(params, refs) {
        super(params);
        this.refs = refs;
    }

    ondrag(x, y) {
        // x and y are based on offsetLeft and offsetTop of el (in this case #dragdemo-container)
        // so on drag start: x = node.offsetLeft  and y = node.offsetTop
        x =
            x < 0
                ? 0
                : x > this.refs.dragdemo.offsetWidth - 22
                ? this.refs.dragdemo.offsetWidth - 22
                : x;
        y =
            y < 0
                ? 0
                : y > this.refs.dragdemo.offsetHeight - 22
                ? this.refs.dragdemo.offsetHeight - 22
                : y;
        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
    }

    ondragstart(xy) {
        console.log(xy);
    }

    ondragend(e) {
        console.log('Do something with event:', e);
    }
}
