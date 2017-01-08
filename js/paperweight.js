/*
 * paperweight.js
 * The game starts here! Nice!
 */

// Load the RequireJS config
requirejs.config({
    baseUrl: "js/paperweight",
    paths: {
        lib: "../lib"
    }
});

// Load the game states and what not
require(["core/game", "stages/boot", 'stages/world'], function(game, Boot, World) {
    "use strict";

    game.state.add("Boot", Boot);
    game.state.add("World", World);

    game.state.start("Boot");
});
