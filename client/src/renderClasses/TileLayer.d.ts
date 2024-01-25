import { Renderer } from '@windy/Renderer';
import type { FullRenderParameters } from '@windy/Layer.d';
import type { RendererInitParams } from '@windy/Renderer';
import type { Renderers } from '@windy/Renderer.d';
export declare class TileLayer extends Renderer {
    constructor(params: RendererInitParams);
    onopen(params?: FullRenderParameters): void;
    close(rqrdRenderers: Renderers[]): void;
}
