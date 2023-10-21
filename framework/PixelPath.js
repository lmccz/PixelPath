import { Game, GameEvents } from "./core/game.js";
import { Keys } from "./input/input.js";
import { Scene, SceneEvents } from "./scene/scene.js";
import { Color } from "./utils/display/color.js";
import { EventEmitter } from "./utils/event-emitter.js";
import { Vector3 } from "./utils/math/vector3.js";


const PixelPath = {
    Game,
    GameEvents,
    Scene,
    SceneEvents,
    Math: { Vector3 },
    Input: { Keys },
    Version: 0,
    Author: 'lmccz',
}

export default PixelPath;
