/*
 * states/boot.js
 * Initialize the game during this boot stage.
 */
define(["core/game", "core/config"], function(game, Config) {
    "use strict";

    var Boot = function() {}
    Boot.prototype = {
        create: function() {
            // Scale the game so it fits in the window
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.refresh();

            // Setup arcade physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Set a large world bounds
            game.world.setBounds(-Config.WORLD_PADDING, -Config.WORLD_PADDING, Config.WORLD_WIDTH + (2 * Config.WORLD_PADDING), Config.WORLD_HEIGHT + (2 * Config.WORLD_PADDING));

            // Start off in the world map.
            game.state.start("World");
        }
    };

    return Boot;
});
