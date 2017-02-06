/*
 * sprites/tank.js
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
        this.tank = game.add.sprite(x, y);
        this.tank.anchor.set(0.5, 0.5);

        // Set some tank properties
        game.physics.arcade.enable(this.tank);
        this.tank.body.bounce.set(Config.TANK_BOUNCE);
        this.tank.body.drag.set(Config.TANK_DRAG);
        this.tank.body.maxVelocity.set(Config.TANK_MAX_VELOCITY);

        // Create the tank
        this.tankBody = game.make.sprite(0, 0, "tank");
        this.tankBody.anchor.set(0.5, 0.5);
        this.tank.addChild(this.tankBody);

        // Create the turret
        this.turret = game.make.sprite(0, 0, "turret");
        this.turret.anchor.set(0.5, 0.5);
        this.tank.addChild(this.turret);
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
        if(this.tank.body.velocity.x == 0 && this.tank.body.velocity.y == 0) return;

        var tankRotation = Math.atan2(-1 * this.tank.body.velocity.y, -1 * this.tank.body.velocity.x);

        // Get the shortest difference in angles between our current angle and the new angle
        var diff = tankRotation - this.tankBody.rotation;
        diff = (diff > Math.PI) ? diff - (2 * Math.PI) : diff;
        diff = (diff < -1 * Math.PI) ? diff + (2 * Math.PI) : diff;

        // Lerp to the new angle
        this.tankBody.rotation += diff * Config.TANK_ROTATION_LERP;
    }

    /*
     * Moves the tank.
     * @param {Phaser.Point} point - A normal vector in the direction of movement.
     */
    Tank.prototype.moveTank = function(point) {
        var x = point.x * Config.TANK_ACCELERATION;
        var y = point.y * Config.TANK_ACCELERATION;

        // If there is no acceleration, set acceleration to zero.
        if(x == 0 && y == 0) {
            this.tank.body.acceleration.set(0);
        }

        this.tank.body.acceleration.x = x;
        this.tank.body.acceleration.y = y;

        // If the velocity is in the opposite direction (i.e. go left, then right quickly)
        // lerp the velocity back towards zero more quickly than if using acceleration alone.
        if((x < 0 && this.tank.body.velocity.x > 0) || (x > 0 && this.tank.body.velocity.x < 0)) {
            this.tank.body.velocity.x -= this.tank.body.velocity.x * Config.PLAYER_REVERSE_DAMP_LERP;
        }

        if((y < 0 && this.tank.body.velocity.y > 0) || (y > 0 && this.tank.body.velocity.y < 0)) {
            this.tank.body.velocity.y -= this.tank.body.velocity.y * Config.PLAYER_REVERSE_DAMP_LERP;
        }

        // While we're at it, rotate the tank towards where we're moving.
        this.rotateTank();
    }

    return Tank;
});
