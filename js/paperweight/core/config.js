/*
 * core/config.js
 * Paperweight config variables
 */
define({
    /*
     * Game Config
     */
    GAME_WIDTH: 1280, // Canvas Width
    GAME_HEIGHT: 720, // Canvas Height

    /*
     * Map settings
     */
    MAP_WIDTH: 10000,  // Map width
    MAP_HEIGHT: 10000, // Map height

    /*
     * World settings
     */
    WORLD_PADDING: 750,  // The padding that the world has. It's added on to the width/height.

    /*
     * Camera setting values
     */
    CAMERA_MOTION_LERP: 0.05,   // Lerp value for the camera motion. Lower values are smoother, but slower
    CAMERA_WANDER_DISTANCE: 50, // How far the camera can go towards the pointer

    /*
     * Player physics values
     */
    PLAYER_MAX_VELOCITY: 350,      // Max velocity that the player can move
    PLAYER_ACCELERATION: 350,      // Acceleration that the player has
    PLAYER_DRAG: 350,              // How fast the player slows down when not accelerating
    PLAYER_REVERSE_DAMP_LERP: 0.3, // Lerp value for dampening of reverse motion (i.e. pressing up then down quickly)
    PLAYER_ROTATION_LERP: 0.10,     // Lerp value for the dampening of the rotation
    PLAYER_BOUNCE: 0.5,            // How much energy in conserved when hitting a collider
    PLAYER_FIRE_RATE: 100          // Fire rate in milliseconds per bullet
});
