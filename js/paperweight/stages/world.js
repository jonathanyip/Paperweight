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
        this.cameraPos = null;
    }

    World.prototype = {
        preload: function() {
            game.load.image("background", "resources/background/paper.jpg");
            game.load.image("player", "resources/sprites/star.png")
        },
        create: function() {
            this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
            this.background.fixedToCamera = true;
            this.player = game.add.sprite(32, 32, "player");

            // Set some player properties
            game.physics.arcade.enable(this.player);

            this.player.body.collideWorldBounds = true;
            this.player.body.bounce.set(Config.PLAYER_BOUNCE);
            this.player.body.maxVelocity.set(Config.PLAYER_MAX_VELOCITY);

            // Add arrow keys and wasd
            this.cursor = game.input.keyboard.addKeys({
                'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT,
                'W': Phaser.Keyboard.W, 'A': Phaser.Keyboard.A, 'S': Phaser.Keyboard.S, 'D': Phaser.Keyboard.D
            });

            // Setup the camera position
            this.cameraPos = new Phaser.Point(this.player.body.x, this.player.body.y);
        },
        update: function() {
            // Handle player movements
            this.player.body.acceleration.set(0);
            this.player.body.drag.set(Config.PLAYER_DRAG);

            if(this.cursor.left.isDown || this.cursor.A.isDown) {
                if(this.player.body.velocity.x > 0) {
                    this.player.body.velocity.x -= this.player.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
                    console.log("OpLeft");
                }

                this.player.body.acceleration.x -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.right.isDown || this.cursor.D.isDown) {
                if(this.player.body.velocity.x < 0) {
                    this.player.body.velocity.x -= this.player.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
                    console.log("OpRight");
                }

                this.player.body.acceleration.x += Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.up.isDown || this.cursor.W.isDown) {
                if(this.player.body.velocity.y > 0) {
                    this.player.body.velocity.y -= this.player.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
                    console.log("OpUp");
                }

                this.player.body.acceleration.y -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.down.isDown || this.cursor.S.isDown) {
                if(this.player.body.velocity.y < 0) {
                    this.player.body.velocity.y -= this.player.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
                    console.log("OpDown");
                }

                this.player.body.acceleration.y += Config.PLAYER_ACCELERATION;
            }

            // Handle player rotation
            this.player.rotation = game.physics.arcade.angleToPointer(this.player);

            // Handle the background movement
            this.background.tilePosition.set(-game.camera.x, -game.camera.y);

            // Handle the camera movement
            this.cameraPos.x += (this.player.body.x - this.cameraPos.x) * Config.CAMERA_MOTION_LERP;
            this.cameraPos.y += (this.player.body.y - this.cameraPos.y) * Config.CAMERA_MOTION_LERP;
            game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);
        },
        render: function() {
            game.debug.text("Acceleration: x=" + this.player.body.acceleration.x + "; y=" + this.player.body.acceleration.y, 32, 32);
            game.debug.text("Velocity: x=" + this.player.body.velocity.x + "; y=" + this.player.body.velocity.y, 32, 64);
            game.debug.text("Drag: x=" + this.player.body.drag.x + "; y=" + this.player.body.drag.y, 32, 96);
        }
    };

    return World;
});
