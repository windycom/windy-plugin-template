import { WindowPlugin } from '@windy/WindowPlugin';
import type { WindowPluginInitParams } from '@windy/WindowPlugin';
import type { BottomTagPlugins } from '@windy/plugins.d';
export type BottomTagPluginInitParams<P extends keyof BottomTagPlugins> = Omit<WindowPluginInitParams<P>, 'ident'> & Pick<BottomTagPlugin<P>, 'ident'>;
export declare class BottomTagPlugin<P extends keyof BottomTagPlugins> extends WindowPlugin<P> {
    ident: P;
    constructor(params: BottomTagPluginInitParams<P>);
}
