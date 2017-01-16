/*
 * Paperweight!
 * The game starts here! Nice!
 */

// Load the RequireJS config
requirejs.config({
    baseUrl: "js/paperweight",
    paths: {
        lib: "../lib"
    }
});

// Load the game states and what not.
require(["core/game", "stages/boot", "stages/map"], function(game, Boot, Map) {
    "use strict";

    game.state.add("Boot", Boot);
    game.state.add("Map", Map);

    game.state.start("Boot");
});
