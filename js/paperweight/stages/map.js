/*
 * stages/map.js
 * Does the world map!
 */
define(["core/game", "stages/world", "core/utils", "core/config"], function(game, World, Utils, Config) {
    "use strict";

    // Create a new instance of Map.
    var Map = function() {
        World.call(this, Config.MAP_WIDTH, Config.MAP_HEIGHT, 250, 250);
    };

    Map.prototype = {
        render: function() {
            World.prototype.render.call(this);
            game.debug.text("Extended!", 32, 192);
        }
    };

    /*
     * Extend World!
     */
    Utils.extend(Map, World);

    return Map;
});
