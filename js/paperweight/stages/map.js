/**
 * Does the world map!
 * @module stages/map
 */
define(["core/game", "stages/world", "core/config"], function(game, World, Config) {
    "use strict";

    var Map = function() {
        World.call(this, Config.MAP_WIDTH, Config.MAP_HEIGHT, 250, 250);
    };

    // Extend World!
    Map.prototype = Object.create(World.prototype);
    Map.prototype.constructor = Map;

    Map.prototype.render = function() {
        World.prototype.render.call(this);
        game.debug.text("Extended!", 32, 192);
    };

    return Map;
});
