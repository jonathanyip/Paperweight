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
require(["core/game", "stages/boot"], function(game, boot) {
    "use strict";
    
    game.state.add("Boot", boot);
    game.state.start("Boot");
});
