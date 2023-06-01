import { DragDiv } from './ui/DragDiv.js';
import { DragContainer } from './ui/DragContainer.js';

export const onmount = (node, refs) => {
    // mousedown, touching and dragging the container, triggers the crosshairs.
    new DragContainer({ el: refs.dragdemo }, refs);

    // drag a div with the mouse or touch, it does not trigger events from the container thanks to stopPropagation,  see below
    new DragDiv({ el: refs.dragdemoBox }, refs);

    // stop propagation for the box to prevent triggering the crosshairs
    refs.dragdemoBox.addEventListener('touchstart', e => e.stopPropagation());
    refs.dragdemoBox.addEventListener('mousedown', e => e.stopPropagation());
};
