/*
 * objects/shooter.js
 * Controls the firing of bullets and contains the bullet group
 */
define(["core/game", "core/config", "objects/bullet"], function(game, Config, Bullet) {
    "use strict";

    var Shooter = function(sprite) {
        // Save a reference to the sprite
        this.sprite = sprite;

        // Create the bullet group
        this.bullets = game.add.group();

        // Set the class type of the bullets
        this.bullets.classType = Bullet;
        
        // Enable physics on the bullets
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        // Create multiple bullets
        this.bullets.createMultiple(20, "bullet");

        // Set bullet properties
        this.bullets.setAll("anchor.x", 0.5);
        this.bullets.setAll("anchor.y", 0.5);

        // Allow the bullets to bounce with 100% elasticity
        this.bullets.setAll("body.bounce.x", 1);
        this.bullets.setAll("body.bounce.y", 1);

        // Setup bulletTime
        this.bulletTime = game.time.now;
    };

    /*
     * Fires a bullet from the shooter
     */
    Shooter.prototype.fire = function(angle) {
        if(game.time.now - this.bulletTime < Config.SHOOTER_FIRE_RATE) return;

        // Reset the bullet time
        this.bulletTime = game.time.now;

        // Get the first bullet that's not in use
        var bullet = this.bullets.getFirstDead();

        // If we don't have another bullet, we should just ignore this fire request
        if(bullet == null) return;

        bullet.reset(this.sprite.x, this.sprite.y);
        bullet.rotation = angle;

        game.physics.arcade.velocityFromRotation(angle, Config.BULLET_VELOCITY, bullet.body.velocity);
    };

    return Shooter;
});