/*
 * objects/tank.js
 * Controls the tank and turret sprites.
 */
define(["core/game", "core/Config"], function(game, Config) {
    "use strict";

    /*
     * Create a new Tank!
     * @param {number} x - The x coordinate of the sprite.
     * @param {number} y - The y coordinate of the sprite.
     */
    var Tank = function(x, y) {
        this.sprite = game.add.sprite(x, y);
        this.sprite.anchor.set(0.5, 0.5);

        // Set some tank properties
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.bounce.set(Config.PLAYER_BOUNCE);
        this.sprite.body.drag.set(Config.PLAYER_DRAG);
        this.sprite.body.maxVelocity.set(Config.PLAYER_MAX_VELOCITY);

        // Create the tank
        this.tank = game.make.sprite(0, 0, "tank");
        this.tank.anchor.set(0.5, 0.5);
        this.sprite.addChild(this.tank);

        // Create the turret
        this.turret = game.make.sprite(0, 0, "turret");
        this.turret.anchor.set(0.5, 0.5);
        this.sprite.addChild(this.turret);
    };

    /*
     * Point turret to the specified angle.
     * @param {number} angle - The angle to rotate the turret to, in radians.
     */
    Tank.prototype.rotateTurret = function(angle) {
        this.turret.rotation = angle;
    };

    /*
     * Smoothly points the tank in the direction of velocity.
     */
    Tank.prototype.rotateTank = function() {
        // Stop rotating if we aren't moving
        if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) return;

        var tankRotation = Math.atan2(-1 * this.sprite.body.velocity.y, -1 * this.sprite.body.velocity.x);

        // Get the shortest difference in angles between our current angle and the new angle
        var diff = tankRotation - this.tank.rotation;
        diff = (diff > Math.PI) ? diff - (2 * Math.PI) : diff;
        diff = (diff < -1 * Math.PI) ? diff + (2 * Math.PI) : diff;

        // Lerp to the new angle
        this.tank.rotation = game.math.wrapAngle(this.tank.rotation + (diff * Config.PLAYER_ROTATION_LERP), true);
    }

    /*
     * Moves the tank.
     * @param {Phaser.Point} point - A normal vector in the direction of movement.
     */
    Tank.prototype.moveTank = function(point) {
        var x = point.x * Config.PLAYER_ACCELERATION;
        var y = point.y * Config.PLAYER_ACCELERATION;

        // If there is no acceleration, set acceleration to zero.
        if(x == 0 && y == 0) {
            this.sprite.body.acceleration.set(0);
        }

        this.sprite.body.acceleration.x = x;
        this.sprite.body.acceleration.y = y;

        // If the velocity is in the opposite direction (i.e. go left, then right quickly)
        // lerp the velocity back towards zero more quickly than if using acceleration alone.
        if((x < 0 && this.sprite.body.velocity.x > 0) || (x > 0 && this.sprite.body.velocity.x < 0)) {
            this.sprite.body.velocity.x -= this.sprite.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
        }

        if((y < 0 && this.sprite.body.velocity.y > 0) || (y > 0 && this.sprite.body.velocity.y < 0)) {
            this.sprite.body.velocity.y -= this.sprite.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
        }

        // While we're at it, rotate the tank towards where we're moving.
        this.rotateTank();
    }

    return Tank;
});
