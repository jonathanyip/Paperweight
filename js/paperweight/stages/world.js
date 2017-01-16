/**
 * Does everything necessary for ordinary game functions.
 * i.e. Manages player movement, cameras, collisions, borders, etc...
 *
 * @module stages/world
 *
 * @param {number} width - Width of the world.
 * @param {number} height - Height of the world.
 * @param {number} x - Starting x position of the player
 * @param {number} y - Starting y position of the player
 */
define(["core/game", "sprites/player", "core/config"], function(game, Player, Config) {
    "use strict";

    var World = function(width, height, x, y) {
        this.worldWidth = width;
        this.worldHeight = height;

        this.initialPlayerX = x;
        this.initialPlayerY = y;

        this.background = null;
        this.border = {
            sprites: null,
            map: null
        };

        this.bodies = null;
        this.bullets = null;
    };

    World.prototype = {
        preload: function() {
            // Load background images/sprites
            game.load.image("background", "resources/background/paper.jpg");

            game.load.image("borderHorizontal", "resources/background/borderHorizontal.png");
            game.load.image("borderVertical", "resources/background/borderVertical.png");
            game.load.image("borderCorner", "resources/background/borderCorner.png");

            game.load.image("player", "resources/sprites/star.png");
        },
        create: function() {
            // Create the collision groups
            this.bodies = game.add.group();
            this.bullets = game.add.group();

            // Set up the world size
            game.world.setBounds(-Config.WORLD_PADDING, -Config.WORLD_PADDING, this.worldWidth + (2 * Config.WORLD_PADDING), this.worldHeight + (2 * Config.WORLD_PADDING));

            // Setup the background
            this.background = game.add.tileSprite(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT, "background");
            this.background.fixedToCamera = true;

            // Create a player
            this.player = new Player(this.initialPlayerX, this.initialPlayerY, "player");
            game.add.existing(this.player);

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
        },
        update: function() {
            // Handle the background movement
            this.background.tilePosition.set(-game.camera.x, -game.camera.y);

            // Handle border collisions
            game.physics.arcade.collide(this.player, this.border.map);
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
