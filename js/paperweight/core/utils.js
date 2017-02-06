/*
 * core/utils.js
 * Contains various useful functions that could be of use sometimes...?
 */
define(function() {
    var Utils = {
        objects: {
            /*
             * The child extends the given parents!
             * Note, the earlier it comes in the parameters list, the higher priority its properties are.
             *
             * @param {Object} obj - The Object that will inherit from stuff.
             * @param {*Object} parents - Variable arguments of parent Objects to inherit from.
             */
            extend: function(obj) {
                var parents = Array.prototype.slice.call(arguments, Utils.objects.extend.length);

                // If there are no things to extend, then just return.
                if(parents <= 0) return;

                // Extend the first object's prototype
                // We use Object.create() for the first parent's prototype,
                // for the Phaser objects, since they don't like the copy method.
                obj.prototype = Object.create(parents[0].prototype);

                // For every other object provided.
                for(var i = 1; i < parents.length; i++) {
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
            }
        }
    };

    return Utils
});
