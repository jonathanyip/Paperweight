/*
 * objects/shooter.js
 * Controls the firing of bullets and contains the bullet group
 */
define(["core/game", "core/config"], function(game, Config) {
    "use strict";

    var Shooter = function() {
        // Create the bullet group
        this.bullets = game.add.group();
        
        // Enable physics on the bullets
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        // Create multiple bullets
        this.bullets.createMultiple(15, "bullet");

        // Set bullet properties
        this.bullets.setAll("anchor.x", 0.5);
        this.bullets.setAll("anchor.y", 0.5);
    };

    return Shooter;
});