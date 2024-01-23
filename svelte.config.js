import sveltePreprocess from 'svelte-preprocess';

// only IDE specific settings, not used in make process
export default {
    preprocess: sveltePreprocess({
        sourceMap: true,
        less: {
            prependData: `@import 'dev/windyLessDefinitions.less';`,
            math: 'always',
        },
    }),
};
