/*
 * core/game.js
 * A reference to the Game instance
 *
 * Note: We are using the global Phaser object,
 * as it doesn't seem completely compatiable with RequireJS
 */
define(["core/config", "lib/phaser"], function(Config) {
    "use strict";

    return new Phaser.Game(Config.GAME_WIDTH, Config.GAME_HEIGHT, Phaser.AUTO);
});
