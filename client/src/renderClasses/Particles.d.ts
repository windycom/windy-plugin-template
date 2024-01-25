import type { RGBAString, RGBA } from '@windy/Color.d';
import type { Levels } from '@windy/rootScope.d';
import type { ExtendedRenderParams } from '@windy/interfaces.d';
import type { CustomParticles } from '@windy/dataSpecifications.d';
export type ParticlesInitParams = Pick<Particles, 'multiplier' | 'velocity' | 'glMinSpeedParam' | 'glSpeedCurvePowParam' | 'glMaxSpeedParam' | 'glParticleWidth' | 'glParticleLengthEx' | 'glSpeedPx' | 'glCountMul'> & Partial<Pick<Particles, 'configurable' | 'glVelocity' | 'glOpacity' | 'glBlending' | 'getBlendingAlpha' | 'animation' | 'styles' | 'lineWidth' | 'getIntensityFun' | 'getStyles'>>;
export declare class Particles {
    /**
     * Parameters below are configurable via particlesConfig
     */
    configurable: boolean;
    /**
     * Custom user particles configuration
     */
    config: CustomParticles;
    /**
     * Type of animation
     */
    animation: 'dot' | 'wavecle';
    /**
     * Blue particles on detailed map
     */
    stylesBlue: RGBAString[];
    /**
     * Holder for alternative styles
     */
    styles?: RGBAString[];
    /**
     * width of particle based on zoom level
     */
    lineWidth: number[];
    /**
     * Speed reduction based on zoom level
     */
    zoom2speed: number[];
    /**
     * Reducing velocity of particles based on level (considering high winds up there)
     */
    level2reduce: Record<Levels, number>;
    /**
     * For particles.config.opacity values 0..1 we change only opacity
     * For vlauer 1..2 we change also color
     */
    colors: RGBA[];
    /**
     * amount and speedof patricles on screen as a function of zoom
     * value = 1 / ( constant * Math.pow(pow, (mapZoom - zoom)))
     */
    multiplier: {
        constant: number;
        pow: number;
        zoom: number;
    };
    velocity: {
        max: number;
        damper: number;
    };
    /**
     * webGL config
     */
    glSpeedCurvePowParam: number;
    glMinSpeedParam: number;
    glMaxSpeedParam: number;
    glParticleWidth: number;
    glParticleLengthEx: number;
    glSpeedPx: number;
    glVelocity: number;
    glOpacity: number;
    glBlending: number;
    glCountMul: number;
    constructor(params: ParticlesInitParams);
    /**
     * Return function that, will create intensity number
     * based on particle force and location
     */
    getIntensityFun(): (force: number) => number;
    /**
     * Returns magnitude 2 screen velocity fun
     *
     * screenSpeed = c * ( 1 - 1 / ( a * c * magnitude - 1) )
     *
     * c = velocity.max * userConfig * level2reduce
     * a = velocity.damper
     *
     * `a`, `c` jsou koeficienty. Pricemz `c` je max. obrazovkova
     * rychlost a tim `a` si doladis prubeh te funkce. Cim vyssi bude `a`,
     * tim rychleji to poroste k tomu `c` a naopak cim bude `a` blize k nule,
     * tim pomaleji to poroste.
     *
     * Both a,c coefs are multiplied by user (0.5 - 1.5) and zoom level (0.6 - 1)
     */
    getVelocityFun(params: ExtendedRenderParams): (mag: number) => number;
    getAmountMultiplier(): number;
    /**
     * Returns amount of particles for given wscreen size, based on zoom
     * and speed2pixel ratio. If speed2pixel is lower than 1, we multiply amount by
     * 1 + 1.5 * ( 1 - speed2pixel )
     */
    getAmount(params: ExtendedRenderParams): number;
    getLineWidth(params: ExtendedRenderParams): number;
    /**
     * resulting table looks like this for opacity 1
     * ['rgba(200,200,200,1)','rgba(215,215,215,1)','rgba(235,235,235,
     */
    getStyles(params?: ExtendedRenderParams): RGBAString[] | undefined;
    getMaxAge(): number;
    /**
     * Blending opacity, for 'repainting' new canvas and letting particles to
     * fade. If speed2pixel ratio is low we increase lengt of particles
     */
    getBlendingAlpha(params?: ExtendedRenderParams): string | number;
}
