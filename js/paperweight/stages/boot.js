/*
 * states/boot.js
 * The initial boot state
 */
define(["core/game"], function(game) {
    "use strict";
    
    var Boot = function() {}

    Boot.prototype = {
        create: function() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.refresh();
        }
    };

    return Boot;
});
