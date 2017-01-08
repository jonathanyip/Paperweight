/*
 * states/world.js
 * Does the world map!
 */
define(["core/game", "core/config"], function(game, Config) {
    "use strict";

    var World = function() {
        this.background = null;
        this.player = null;
        this.cursor = null;
    }

    World.prototype = {
        preload: function() {
            game.load.image("background", "resources/background/paper.jpg");
            game.load.image("player", "resources/sprites/star.png")
        },
        create: function() {
            this.background = game.add.tileSprite(0, 0, Config.gameWidth, Config.gameHeight, "background");
            this.player = game.add.sprite(0, 0, "player");

            game.physics.arcade.enable(this.player);
            game.camera.follow(this.player);

            this.player.body.collideWorldBounds = true;

            this.cursor = game.input.keyboard.createCursorKeys();
        },
        update: function() {
            var accl = 300;

            if(this.cursor.left.isDown) {
                var dir = -1 * Math.sign(this.player.body.acceleration.x * this.player.body.velocity.x);
                if(dir == 1) {
                    this.player.body.velocity.x = 0;
                }

                this.player.body.acceleration.x = -accl;
            } else if(this.cursor.right.isDown) {
                var dir = -1 * Math.sign(this.player.body.acceleration.x * this.player.body.velocity.x);
                if(dir == 1) {
                    this.player.body.velocity.x = 0;
                }
                this.player.body.acceleration.x = accl;
            } else {
                // Get the opposite sign
                var sign = -1 * Math.sign(this.player.body.velocity.x);
                this.player.body.acceleration.x = sign * accl;
            }

            if(this.cursor.up.isDown) {
                // If opposite direction, set velocity to 0
                var dir = -1 * Math.sign(this.player.body.acceleration.y * this.player.body.velocity.y);
                if(dir == 1) {
                    this.player.body.velocity.y = 0;
                }

                this.player.body.acceleration.y = -accl;
            } else if(this.cursor.down.isDown) {
                // If opposite direction, set velocity to 0
                var dir = -1 * Math.sign(this.player.body.acceleration.y * this.player.body.velocity.y);
                if(dir == 1) {
                    this.player.body.velocity.y = 0;
                }

                this.player.body.acceleration.y = accl;
            } else {
                // Get the opposite sign
                var sign = -1 * Math.sign(this.player.body.velocity.y);
                this.player.body.acceleration.y = sign * accl;
            }
        }
    };

    return World;
});
