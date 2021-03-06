/*
 * objects/player.js
 * Controls player movement, rotation, and the camera follow.
 */
define(["core/game", "core/utils", "core/config", "objects/tank", "objects/shooter"], function(game, Utils, Config, Tank, Shooter) {
    "use strict";

    /*
     * Create a new Player!
     * @param {number} x - The x coordinate of the sprite.
     * @param {number} y - The y coordinate of the sprite.
     */
    var Player = function(x, y) {
        Tank.call(this, x, y);

        // Add arrow keys and WASD
        this.cursor = game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT,
            'W': Phaser.Keyboard.W, 'A': Phaser.Keyboard.A, 'S': Phaser.Keyboard.S, 'D': Phaser.Keyboard.D
        });

        // Setup the camera position
        this.cameraPos = new Phaser.Point(this.sprite.body.x, this.sprite.body.y);

        // Create the shooter object
        this.shooter = new Shooter(this.sprite);
    };

    Utils.objects.extend(Player, Tank);

    /*
     * Runs every update loop and updates the camera position.
     */
    Player.prototype.update = function() {
        var tankPoint = new Phaser.Point(0, 0);

        // Respond to the arrow/WASD keys.
        if(this.cursor.left.isDown || this.cursor.A.isDown) {
            tankPoint.add(-1, 0);
        }
        if(this.cursor.right.isDown || this.cursor.D.isDown) {
            tankPoint.add(1, 0);
        }
        if(this.cursor.up.isDown || this.cursor.W.isDown) {
            tankPoint.add(0, -1);
        }
        if(this.cursor.down.isDown || this.cursor.S.isDown) {
            tankPoint.add(0, 1);
        }

        // Move the tank towards the given vector.
        this.moveTank(tankPoint);

        // Point the turret towards the mouse pointer
        this.rotateTurret(game.physics.arcade.angleToPointer(this.sprite));

        // Handle the camera movement
        // Make the camera go towards the pointer a bit
        var angle = game.physics.arcade.angleToPointer(this.sprite);
        var pointerDistance = game.physics.arcade.distanceToPointer(this.sprite);

        // Wander is the proportional to how far the pointer is from the player.
        // In case I forget, this is basically CAMERA_WANDER_DISTANCE * (pointerDistance / (GAME_WIDTH / 2))
        // But there is some redundancy in the calculations, so I simplified it.
        var wander = Config.CAMERA_WANDER_DISTANCE * pointerDistance * 2;
        var wanderX = (Math.cos(angle) * wander) / Config.GAME_WIDTH;
        var wanderY = (Math.sin(angle) * wander) / Config.GAME_HEIGHT;

        var x = this.sprite.body.x + wanderX;
        var y = this.sprite.body.y + wanderY;
        
        // Camera motion uses lerp so it is smoother
        this.cameraPos.x += (x - this.cameraPos.x) * Config.CAMERA_MOTION_LERP;
        this.cameraPos.y += (y - this.cameraPos.y) * Config.CAMERA_MOTION_LERP;
        game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);

        // Respond to a mouse click by firing
        if(game.input.activePointer.isDown) {
            this.shooter.fire(game.physics.arcade.angleToPointer(this.sprite, game.input.activePointer));
        }
    };

    return Player;
});
