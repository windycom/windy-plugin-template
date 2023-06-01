export default {
    displayName: 'Window on the left',

    hook: 'menu',

    /*
        List of class names that will be attached to your
        plugin upon mounting
    */
    className: 'plugin-lhpane',

    /*
        Identifier of a pane, where your plugin will reside.
        Since we want to have only one pane on left side,
        this string will guarantee, that all other plugins
        on the left side will be closed.
    */
    pane: 'lhpane',
};
