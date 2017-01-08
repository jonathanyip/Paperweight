/*
 * states/boot.js
 * Initialize the game during this boot stage.
 */
define(["core/game"], function(game) {
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
            game.world.setBounds(-10, -10, 4000, 4000);

            // Start off in the world map.
            game.state.start("World");
        }
    };

    return Boot;
});
