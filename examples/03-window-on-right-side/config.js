module.exports = {
    displayName: "Window on the right",

    hook: "menu",

    /*
        List of classnames that will be attached to your
        plugin upon mounting
	*/
    className: "plugin-rhpane plugin-mobile-rhpane",

    /*
        Identifier of a pane, where your plugin will reside.
        Since we want to have only one pane on the right side,
        this string will guarantee, that all other plugins
        on the right side will be closed.
	*/
    exclusive: "rhpane",
};
