/*
 * objects/bullet.js
 * Represents a bullet and everything it can do.b
 */
define(["core/game", "core/utils", "core/config"], function(game, Utils, Config) {
    "use strict";

    var Bullet = function(game, x, y, key, frame) {
        Phaser.Sprite.call(this, game, x, y, key, frame);
    };

    Utils.objects.extend(Bullet, Phaser.Sprite);

    /*
     * Should be called when the bullet collides with something.
     */
    Bullet.prototype.collide = function() {
        // Bounce the bullet off the walls!
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    };

    return Bullet;
});