/*
 * core/utils.js
 * Contains various useful functions that could be of use sometimes...?
 */
define(function() {
    var Utils = {
        /*
         * The child extends the given parents!
         * Note, the earlier it comes in the parameters list, the higher priority its properties are.
         *
         * @param {Object} obj - The Object that will inherit from stuff.
         * @param {*Object} parents - Variable arguments of parent Objects to inherit from.
         */
        extend: function(obj) {
            var parents = Array.prototype.slice.call(arguments, Utils.extend.length);

            // For each parent object provided
            for(var i = 0; i < parents.length; i++) {
                var parent = parents[i];

                // Copy over all properties from that parent's prototype
                for(var key in parent.prototype) {
                    if(!(key in obj.prototype)) {
                        obj.prototype[key] = parent.prototype[key];
                    }
                }
            }

            // Set the constructor in the prototype object
            obj.prototype.constructor = obj;
        },
        /*
         * Extends the Phaser.Sprite Object.
         *
         * @param {Object} obj - The Object that will inherit from Phaser.Sprite and others.
         * @param {*Object} parents - Variable arguments of other parent Objects to inherit from.
         */
        extendSprite: function(obj) {
            // Save the original prototype
            var prototype = obj.prototype;

            // Extend the Phaser.Sprite object
            obj.prototype = Object.create(Phaser.Sprite.prototype);
            obj.prototype.constructor = obj;

            // Copy back the original prototype properties
            for(var key in prototype) {
                obj.prototype[key] = prototype[key];
            }

            // Extend the rest of the parents
            Utils.extend.apply(null, arguments);
        }
    };

    return Utils
});
