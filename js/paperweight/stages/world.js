/*
 * stages/world.js
 * Does everything necessary for ordinary game functions.
 * (i.e. Manages player movement, cameras, collisions, borders, etc...)
 */
define(["core/game", "core/config", "objects/player"], function(game, Config, Player) {
    "use strict";

    /*
     * Create a new instance of World (though, should be an abstract class)
     * @param {number} width - Width of the world.
     * @param {number} height - Height of the world.
     * @param {number} x - Starting x position of the player
     * @param {number} y - Starting y position of the player
     */
    var World = function(width, height, x, y) {
        this.worldWidth = width;
        this.worldHeight = height;

        this.initialX = x;
        this.initialY = y;

        this.background = null;
    };

    World.prototype.preload = function() {
        game.load.tilemap("tilemap", "resources/tilemaps/default.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tileset", "resources/sprites/tileset.png");
    };

    World.prototype.create = function() {
        // Setup the background
        this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
        this.background.fixedToCamera = true;

        // Create a player
        this.player = new Player(this.initialX, this.initialY);

        // Setup map
        this.map = game.add.tilemap("tilemap");
        this.map.addTilesetImage("tileset", "tileset");
        this.map.setCollision([1, 2]);

        // Handle bullet collision with the wall
        /*this.map.setTileIndexCallback([1, 2], function(sprite, tile) {
            sprite.collide();
        });*/

        // Setup layer
        this.layer = this.map.createLayer("default");

        // Set up the world size
        game.world.setBounds(-Config.WORLD_PADDING, -Config.WORLD_PADDING, this.map.widthInPixels + (2 * Config.WORLD_PADDING), this.map.heightInPixels + (2 * Config.WORLD_PADDING));
    };

    World.prototype.update = function() {
        // Handle the background movement
        this.background.tilePosition.set(-game.camera.x, -game.camera.y);

        // Handle player collision
        game.physics.arcade.collide(this.player.sprite, this.layer);

        // Handle bullet collision
        game.physics.arcade.collide(this.player.shooter.bullets, this.layer, function(bullets) {
            bullets.collide();
        });

        // Update Player
        this.player.update();
    };

    World.prototype.render = function() {
        // Some debug text...
        game.debug.text("Position: x=" + this.player.sprite.body.x + "; y=" + this.player.sprite.body.y, 32, 32);
        game.debug.text("Acceleration: x=" + this.player.sprite.body.acceleration.x + "; y=" + this.player.sprite.body.acceleration.y, 32, 64);
        game.debug.text("Velocity: x=" + this.player.sprite.body.velocity.x + "; y=" + this.player.sprite.body.velocity.y, 32, 96);
        game.debug.text("Tank Angle: " + this.player.tank.angle, 32, 128);
        game.debug.text("Distance to pointer: " + game.physics.arcade.distanceToPointer(this.player.sprite), 32, 160);
    };

    return World;
});
