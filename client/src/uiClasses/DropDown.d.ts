/**
 * @module DropDown
 * @example
 *
 * ```
 *    <div ref="ddMenu" class="drop-down-menu noselect">
 *        <ul class="animation">
 *            <li data-do="set,one">First item</li>
 *            <li data-do="set,two">Second item</li>
 *            <li data-do="set,three">Third item</li>
 *            <li data-do="set,four">Fourht item</li>
 *            <li data-do="set,five">Last item</li>
 *        </ul>
 *    </div>
 *
 *    new DropDown({
 *        el: refs.ddMenu,
 *        initValue: 'three'
 *    })
 * ```
 */
import { Switch } from '@windy/Switch';
import type { SwitchInitParams } from '@windy/Switch';
export type DropDownInitParams<T> = SwitchInitParams<T> & {
    fill?(): void;
};
export declare class DropDown<T> extends Switch<T> {
    private opened;
    private switch;
    protected bindedClose: () => void;
    constructor(params: DropDownInitParams<T>);
    set(value: T, noEmit?: boolean): void;
    fill(): void;
    protected toggle(): void;
    protected open(): void;
    protected close(): void;
}
