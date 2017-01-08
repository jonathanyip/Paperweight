/*
 * core/config.js
 * Paperweight config variables
 */
define({
    // Game setting values
    GAME_WIDTH: 1280, // Canvas Width
    GAME_HEIGHT: 720, // Canvas Height

    // Camera setting values
    CAMERA_MOTION_LERP: 0.05, // Lerp value for the camera motion. Lower values are smoother, but slower

    // Player physics values
    PLAYER_MAX_VELOCITY: 300,      // Max velocity that the player can move
    PLAYER_ACCELERATION: 300,      // Acceleration that the player has
    PLAYER_DRAG: 300,              // How fast the player slows down when not accelerating
    PLAYER_REVERSE_DAMP_LERP: 0.2, // Lerp value for dampening of reverse motion (i.e. pressing up then down quickly)
    PLAYER_BOUNCE: 0.5             // How much energy in conserved when hitting a collider
});
