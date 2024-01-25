// DEV tools without typings --> for purpose of make.ts

declare module 'preprocess';
declare module 'tiny-lr';
declare module 'less-plugin-autoprefixer';

// just shut up svelte-preprocess with its missing dependency
declare module 'sass' {
    type LegacyStringOptions<T> = unknown & T;
}

// Nothing should be imported from svelte/internal as it can break in ANY Svelte update
// TODO Remove all imports of this module before updating to Svelte 5
declare module 'svelte/internal' {
    function get_current_component(): import('svelte').SvelteComponent;
}
