/*
 * sprites/player.js
 * Controls player movement, rotation, and the camera follow.
 */
define(["core/game", "core/state", "core/utils", "core/config"], function(game, State, Utils, Config) {
    "use strict";

    /*
     * Create a new Player!
     * @param {number} x - The x coordinate of the sprite.
     * @param {number} y - The y coordinate of the sprite.
     */
    var Player = function(x, y) {
        // Create the player
        Phaser.Sprite.call(this, game, x, y);

        // Set some player properties
        game.physics.arcade.enable(this);
        this.body.bounce.set(Config.PLAYER_BOUNCE);
        this.body.drag.set(Config.PLAYER_DRAG);
        this.body.maxVelocity.set(Config.PLAYER_MAX_VELOCITY);
        this.anchor.set(0.5, 0.5);

        // Create the tank
        this.tank = game.make.sprite(0, 0, "tank");
        this.tank.anchor.set(0.5, 0.5);
        this.addChild(this.tank);

        // Create the turret
        this.turret = game.make.sprite(0, 0, "turret");
        this.turret.anchor.set(0.5, 0.5);
        this.addChild(this.turret);

        // Add arrow keys and WASD
        this.cursor = game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT,
            'W': Phaser.Keyboard.W, 'A': Phaser.Keyboard.A, 'S': Phaser.Keyboard.S, 'D': Phaser.Keyboard.D
        });

        // Setup the camera position
        this.cameraPos = new Phaser.Point(this.body.x, this.body.y);

        // Setup bullet group.
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(30, "bullet");
        this.bullets.setAll("anchor.x", 0.5);
        this.bullets.setAll("anchor.y", 0.5);

        this.bulletTime = game.time.now;
    };

    Player.prototype = {
        /*
         * Runs every update loop and updates the camera position.
         */
        update: function() {
            // Initialize acceleration to zero
            this.body.acceleration.set(0);

            // Respond to the arrow/WASD keys.
            if(this.cursor.left.isDown || this.cursor.A.isDown) {
                // If the velocity is in the opposite direction (i.e. a reverse key, like up then down quickly)
                // Lerp the velocity back towards zero more quickly than if using acceleration alone.
                if(this.body.velocity.x > 0) {
                    this.body.velocity.x -= this.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
                }

                // Set the acceleration in the left direction
                this.body.acceleration.x -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.right.isDown || this.cursor.D.isDown) {
                if(this.body.velocity.x < 0) {
                    this.body.velocity.x -= this.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
                }

                this.body.acceleration.x += Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.up.isDown || this.cursor.W.isDown) {
                if(this.body.velocity.y > 0) {
                    this.body.velocity.y -= this.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
                }

                this.body.acceleration.y -= Config.PLAYER_ACCELERATION;
            }
            if(this.cursor.down.isDown || this.cursor.S.isDown) {
                if(this.body.velocity.y < 0) {
                    this.body.velocity.y -= this.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
                }

                this.body.acceleration.y += Config.PLAYER_ACCELERATION;
            }

            // Handle player rotation
            // Point it towards the direction we're moving.
            if(this.body.velocity.y != 0 || this.body.velocity.x != 0) {
                var tankRot = Math.atan2(-1 * this.body.velocity.y, -1 * this.body.velocity.x);
                this.tank.rotation += (tankRot - this.tank.rotation) * Config.CAMERA_MOTION_LERP;
            }

            // Handle turret rotation
            // Point it towards the mouse pointer
            this.turret.rotation = game.physics.arcade.angleToPointer(this);

            // Handle the camera movement
            // Make the camera go towards the pointer a bit
            var angle = game.physics.arcade.angleToPointer(this);
            var pointerDistance = game.physics.arcade.distanceToPointer(this);

            // Wander is the proportional to how far the pointer is from the player.
            // In case I forget, this is basically CAMERA_WANDER_DISTANCE * (pointerDistance / (GAME_WIDTH / 2))
            // But there is some redundancy in the calculations, so I simplified it.
            var wander = Config.CAMERA_WANDER_DISTANCE * pointerDistance * 2;
            var wanderX = (Math.cos(angle) * wander) / Config.GAME_WIDTH;
            var wanderY = (Math.sin(angle) * wander) / Config.GAME_HEIGHT;

            var x = this.body.x + wanderX;
            var y = this.body.y + wanderY;

            // Camera motion uses lerp so it is smoother
            this.cameraPos.x += (x - this.cameraPos.x) * Config.CAMERA_MOTION_LERP;
            this.cameraPos.y += (y - this.cameraPos.y) * Config.CAMERA_MOTION_LERP;
            game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);

            // Handle the bullets.
            if(game.input.activePointer.isDown) {
                this.fire();
            }
        },

        /*
         * Fires some bullets!
         */
        fire: function() {
            // If the delay is too small, don't fire a bullet.
            if(game.time.now - this.bulletTime < Config.PLAYER_FIRE_RATE) return;

            // If we have no more bullets to shoot, don't fire a bullet.
            if(this.bullets.countDead() <= 0) return;

            this.bulletTime = game.time.now;

            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.x, this.y);
            bullet.rotation = game.physics.arcade.angleToPointer(this);
            game.physics.arcade.moveToPointer(bullet, 300);
        }
    };

    /*
     * Extend Phaser.Sprite
     */
    Utils.extendSprite(Player);

    return Player;
});
