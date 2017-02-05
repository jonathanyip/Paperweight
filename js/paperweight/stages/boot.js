/*
 * stages/boot.js
 * Initialize the game during this boot stage.
 */
define(["core/game", "core/config"], function(game, Config) {
    "use strict";

    var Boot = function() {};

    Boot.prototype = {
        /*
         * Preloads the global background images/sprites
         */
        preload: function() {
            game.load.image("background", "resources/background/paper.jpg");

            game.load.image("borderHorizontal", "resources/background/borderHorizontal.png");
            game.load.image("borderVertical", "resources/background/borderVertical.png");
            game.load.image("borderCorner", "resources/background/borderCorner.png");

            game.load.image("tank", "resources/sprites/tank.png");
            game.load.image("turret", "resources/sprites/turret.png");
            game.load.image("bullet", "resources/sprites/bullet.png");
        },

        /*
         * Basically, initialize the game scaling and game physics,
         * and start the first level.
         */
        create: function() {
            // Scale the game so it fits in the window
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.refresh();

            // Setup arcade physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Start off in the world map.
            game.state.start("Map");
        }
    };

    return Boot;
});
