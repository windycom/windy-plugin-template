import { Renderer } from '@windy/Renderer';
import { TileLayer } from '@windy/TileLayer';
declare const renderers: {
    /**
     * All layers should be now supported by gl-tiles-render
     * Original tileLayer and patternator rendering ('legacy-tile-render')
     * is used as backup (or when "Compatibility mode" is active)
     */
    tileLayer: TileLayer;
    noUserControl: TileLayer;
    radar: Renderer<"radar", typeof import("../../plugins/radar/radar")>;
    satellite: Renderer<"satellite", typeof import("../../plugins/satellite/satellite")>;
    capAlerts: Renderer<"cap-alerts", typeof import("../../plugins/cap-alerts/cap-alerts")>;
    isolines: Renderer<"isolines", typeof import("../../plugins/isolines/isolines")>;
    particles: Renderer<"gl-particles", typeof import("../../plugins/gl-particles/gl-particles")> | Renderer<"particles", typeof import("../../plugins/particles/particles")>;
    /** Extreme forecast and intersucho layers */
    daySwitcher: TileLayer;
    accumulations: TileLayer;
};
export default renderers;
