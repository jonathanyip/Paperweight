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
        this.border = {
            sprites: null,
            map: null
        };

        this.enemies = null;
    };

    World.prototype = {
        create: function() {
            // Set up the world size
            game.world.setBounds(-Config.WORLD_PADDING, -Config.WORLD_PADDING, this.worldWidth + (2 * Config.WORLD_PADDING), this.worldHeight + (2 * Config.WORLD_PADDING));

            // Setup the background
            this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
            this.background.fixedToCamera = true;

            // Create a player
            this.player = new Player(this.initialX, this.initialY);

            // Setup the borders
            this.createBorders();

            // Create a group to hold the enemies!
            this.enemies = game.add.group();
        },
        update: function() {
            // Handle the background movement
            this.background.tilePosition.set(-game.camera.x, -game.camera.y);

            // Update Player
            this.player.update();

            // Handle border collisions
            //game.physics.arcade.collide(this.player, this.border.map);
        },
        render: function() {
            // Some debug text...
            game.debug.text("Position: x=" + this.player.tank.body.x + "; y=" + this.player.tank.body.y, 32, 32);
            game.debug.text("Acceleration: x=" + this.player.tank.body.acceleration.x + "; y=" + this.player.tank.body.acceleration.y, 32, 64);
            game.debug.text("Velocity: x=" + this.player.tank.body.velocity.x + "; y=" + this.player.tank.body.velocity.y, 32, 96);
            game.debug.text("Tank Angle: " + this.player.tank.body.angle, 32, 128);
            game.debug.text("Distance to pointer: " + game.physics.arcade.distanceToPointer(this.player.tank), 32, 160);
        },
        /*
         * Creates the borders on the map:
         * Both the physics-based ones and the actual images.
         */
        createBorders: function() {
            // Setup the border sprites (the actual images showing up the border)
            var borderTop = game.add.tileSprite(0, -100, this.worldWidth, 100, "borderHorizontal");
            var borderLeft = game.add.tileSprite(-100, 0, 100, this.worldHeight, "borderVertical");
            var borderBottom = game.add.tileSprite(0, this.worldHeight, this.worldWidth, 100, "borderHorizontal");
            var borderRight = game.add.tileSprite(this.worldWidth, 0, 100, this.worldHeight, "borderVertical");

            var borderTopLeft = game.add.sprite(-100, -100, "borderCorner");
            var borderBottomLeft = game.add.sprite(-100, this.worldHeight, "borderCorner");
            var borderTopRight = game.add.sprite(this.worldWidth, -100, "borderCorner");
            var borderBottomRight = game.add.sprite(this.worldWidth, this.worldHeight, "borderCorner");

            this.border.sprites = game.add.group();
            this.border.sprites.add(borderTop);
            this.border.sprites.add(borderLeft);
            this.border.sprites.add(borderBottom);
            this.border.sprites.add(borderRight);
            this.border.sprites.add(borderTopLeft);
            this.border.sprites.add(borderBottomLeft);
            this.border.sprites.add(borderTopRight);
            this.border.sprites.add(borderBottomRight);

            // Set up the actual collision border (it's invisible!)
            this.border.map = game.add.group();
            this.border.map.enableBody = true;

            var borderTop = this.border.map.create(0, 0);
            var borderLeft = this.border.map.create(0, 0);
            var borderBottom = this.border.map.create(0, this.worldHeight);
            var borderRight = this.border.map.create(this.worldWidth, 0);

            borderTop.body.immovable = true;
            borderLeft.body.immovable = true;
            borderBottom.body.immovable = true;
            borderRight.body.immovable = true;

            borderTop.scale.set(this.worldWidth, 0);
            borderLeft.scale.set(0, this.worldHeight);
            borderBottom.scale.set(this.worldWidth, 0);
            borderRight.scale.set(0, this.worldHeight);
        }
    };

    return World;
});
