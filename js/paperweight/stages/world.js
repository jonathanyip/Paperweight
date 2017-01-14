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
        this.borders = null;
    }

    World.prototype = {
        preload: function() {
            // Load background images/sprites
            game.load.image("background", "resources/background/paper.jpg");
            game.load.image("player", "resources/sprites/star.png");
        },
        create: function() {
            // Create a player
            this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
            this.background.fixedToCamera = true;
            this.player = game.add.sprite(1000, 1000, "player");

            // Set some player properties
            game.physics.arcade.enable(this.player);
            this.player.body.bounce.set(Config.PLAYER_BOUNCE);
            this.player.body.drag.set(Config.PLAYER_DRAG);
            this.player.body.maxVelocity.set(Config.PLAYER_MAX_VELOCITY);

            // Add arrow keys and WASD
            this.cursor = game.input.keyboard.addKeys({
                'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT,
                'W': Phaser.Keyboard.W, 'A': Phaser.Keyboard.A, 'S': Phaser.Keyboard.S, 'D': Phaser.Keyboard.D
            });

            // Setup the camera position
            this.cameraPos = new Phaser.Point(this.player.body.x, this.player.body.y);

            // Set up some borders
            this.borders = game.add.group();
            this.borders.enableBody = true;

            var borderTop = this.borders.create(0, 0);
            var borderLeft = this.borders.create(0, 0);
            var borderBottom = this.borders.create(0, Config.WORLD_HEIGHT);
            var borderRight = this.borders.create(Config.WORLD_WIDTH, 0);

            borderTop.body.immovable = true;
            borderLeft.body.immovable = true;
            borderBottom.body.immovable = true;
            borderRight.body.immovable = true;

            borderTop.scale.set(Config.WORLD_WIDTH, 0);
            borderLeft.scale.set(0, Config.WORLD_HEIGHT);
            borderBottom.scale.set(Config.WORLD_WIDTH, 0);
            borderRight.scale.set(0, Config.WORLD_HEIGHT);
        },
        update: function() {
            // Handle player movements
            // Initialize acceleration to zero
            this.player.body.acceleration.set(0);

            // Do this for every arrow/WASD key
            if(this.cursor.left.isDown || this.cursor.A.isDown) {
                // If the velocity is in the opposite direction (i.e. a reverse key, like up then down quickly)
                // Lerp the velocity back towards zero more quickly than if using acceleration alone.
                if(this.player.body.velocity.x > 0) {
                    this.player.body.velocity.x -= this.player.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
                    console.log("OpLeft");
                }

                // Set the acceleration in the left direction
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
            // Point it towards the mouse pointer
            this.player.rotation = game.physics.arcade.angleToPointer(this.player);

            // Handle the background movement
            this.background.tilePosition.set(-game.camera.x, -game.camera.y);

            // Handle the camera movement
            // Make the camera go towards the pointer a bit
            var angle = game.physics.arcade.angleToPointer(this.player);
            var pointerDistance = game.physics.arcade.distanceToPointer(this.player);

            // Wander is the proportional to how far the pointer is from the player.
            // In case I forget, this is basically CAMERA_WANDER_DISTANCE * (pointerDistance / (GAME_WIDTH / 2))
            // But there is some redundancy in the calculations, so I simplified it.
            var wander = Config.CAMERA_WANDER_DISTANCE * pointerDistance * 2;
            var wanderX = (Math.cos(angle) * wander) / Config.GAME_WIDTH;
            var wanderY = (Math.sin(angle) * wander) / Config.GAME_HEIGHT;

            var x = this.player.body.x + wanderX;
            var y = this.player.body.y + wanderY;

            // Camera motion uses lerp so it is smoother
            this.cameraPos.x += (x - this.cameraPos.x) * Config.CAMERA_MOTION_LERP;
            this.cameraPos.y += (y - this.cameraPos.y) * Config.CAMERA_MOTION_LERP;
            game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);

            // Handle border collisions
            game.physics.arcade.collide(this.player, this.borders);
        },
        render: function() {
            // Some debug text...
            game.debug.text("Position: x=" + this.player.body.x + "; y=" + this.player.body.y, 32, 32);
            game.debug.text("Acceleration: x=" + this.player.body.acceleration.x + "; y=" + this.player.body.acceleration.y, 32, 64);
            game.debug.text("Velocity: x=" + this.player.body.velocity.x + "; y=" + this.player.body.velocity.y, 32, 96);
            game.debug.text("Angle to pointer: " + game.physics.arcade.angleToPointer(this.player), 32, 128);
            game.debug.text("Distance to pointer: " + game.physics.arcade.distanceToPointer(this.player), 32, 160);
        }
    };

    return World;
});
