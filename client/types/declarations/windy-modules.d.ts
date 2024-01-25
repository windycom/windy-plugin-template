// until we finish rewriting all modules into TS, we need to persude TS somehow it is safe to use JS modules
// once any module is rewritten to TS, it MUST be removed from here!!!

declare module 'virtual:langEn' {
    const lang: import('../lang-files').MainLangFile;
    export default lang;
}
