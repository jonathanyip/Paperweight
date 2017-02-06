/*
 * stages/map.js
 * Does the world map!
 */
define(["core/game", "core/utils", "core/config", "stages/world"], function(game, Utils, Config, World) {
    "use strict";

    /*
     * Create a new instance of Map.
     */
    var Map = function() {
        World.call(this, Config.MAP_WIDTH, Config.MAP_HEIGHT, 250, 250);
    };

    /*
     * Extend World!
     */
    Utils.objects.extend(Map, World);

    /*
     * Render World!
     */
    Map.prototype.render = function() {
        World.prototype.render.call(this);
        game.debug.text("Extended!", 32, 192);
    };

    return Map;
});
