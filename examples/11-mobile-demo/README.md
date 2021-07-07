## Drag and Mobile example

-   This plugin is a boilerplate for building plugins for the mobile browser. (Plugins are not available in the mobile app.)
-   It also demonstration how to use the bottomSlider mechanism to close the plugin pane on mobile.
-   In this plugin top border of plugin pane can be dragged down, to reveal the top part of the map and the picker. The bottomSlider class is added and then modified. (This is experimental, the code block from `////// Experimental` can be omitted if you want.)
-   The Drag class is demonstrated:
    -   You can drag the circle in the box above, or
    -   If you drag the open white area the cross hairs will move.
-   The `z-index` of the plugin is set to 10 so that it appears on top of the picker.
-   The `z-index` of the bottom element is set to 20, so that the calendar is on top of the plugin.
-   A backdrop (linear-gradient background image) is created for the calendar timecode.
-   When you scroll down the `mobile-header` class becomes visible.
