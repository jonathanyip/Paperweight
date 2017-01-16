/**
 * Initialize the game during this boot stage.
 * @module stages/boot
 */
define(["core/game", "core/config"], function(game, Config) {
    "use strict";

    var Boot = function() {};

    Boot.prototype.create = function() {
        // Scale the game so it fits in the window
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.refresh();

        // Setup arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Start off in the world map.
        game.state.start("Map");
    };

    return Boot;
});
