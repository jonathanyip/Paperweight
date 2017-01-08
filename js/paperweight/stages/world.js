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
            this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
            this.player = game.add.sprite(32, 32, "player");

            // Set some player properties
            game.physics.arcade.enable(this.player);
            game.camera.follow(this.player);

            this.player.body.collideWorldBounds = true;
            this.player.body.bounce.set(Config.PLAYER_BOUNCE);
            this.player.body.maxVelocity.set(Config.PLAYER_MAX_VELOCITY);

            this.cursor = game.input.keyboard.createCursorKeys();
        },
        update: function() {
            this.player.body.acceleration.set(0);
            this.player.body.drag.set(Config.PLAYER_DRAG);

            if(this.cursor.left.isDown) {
                if(this.player.body.velocity.x > 0) {
                    this.player.body.velocity.x *= Config.PLAYER_REVERSE_DAMP_FACTOR;
                    console.log("OpLeft");
                }

                this.player.body.acceleration.x -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.right.isDown) {
                if(this.player.body.velocity.x < 0) {
                    this.player.body.velocity.x *= Config.PLAYER_REVERSE_DAMP_FACTOR;
                    console.log("OpRight");
                }

                this.player.body.acceleration.x += Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.up.isDown) {
                if(this.player.body.velocity.y > 0) {
                    this.player.body.velocity.y *= Config.PLAYER_REVERSE_DAMP_FACTOR;
                    console.log("OpUp");
                }

                this.player.body.acceleration.y -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.down.isDown) {
                if(this.player.body.velocity.y < 0) {
                    this.player.body.velocity.y *= Config.PLAYER_REVERSE_DAMP_FACTOR;
                    console.log("OpDown");
                }

                this.player.body.acceleration.y += Config.PLAYER_ACCELERATION;
            }
        },
        render: function() {
            game.debug.text("Acceleration: x=" + this.player.body.acceleration.x + "; y=" + this.player.body.acceleration.y, 32, 32);
            game.debug.text("Velocity: x=" + this.player.body.velocity.x + "; y=" + this.player.body.velocity.y, 32, 64);
            game.debug.text("Drag: x=" + this.player.body.drag.x + "; y=" + this.player.body.drag.y, 32, 96);
        }
    };

    return World;
});
