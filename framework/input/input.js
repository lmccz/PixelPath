export class Input 
{
    keysDown = {}

    constructor()
    {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    onKeyDown(event)
    {
        this.keysDown[event.code] = true;
    }

    onKeyUp(event)
    {
        this.keysDown[event.code] = false;
    }

    isKeyDown(key)
    {
        return this.keysDown[key];
    }
}


export class Keys
{
    static A = "KeyA";
    static B = "KeyB";
    static C = "KeyC";
    static D = "KeyD";
    static E = "KeyE";
    static F = "KeyF";
    static G = "KeyG";
    static H = "KeyH";
    static I = "KeyI";
    static J = "KeyJ";
    static K = "KeyK";
    static L = "KeyL";
    static M = "KeyM";
    static N = "KeyN";
    static O = "KeyO";
    static P = "KeyP";
    static Q = "KeyQ";
    static R = "KeyR";
    static S = "KeyS";
    static T = "KeyT";
    static U = "KeyU";
    static V = "KeyV";
    static W = "KeyW";
    static X = "KeyX";
    static Y = "KeyY";
    static Z = "KeyZ";

    static Digit1 = "Digit1";
    static Digit2 = "Digit2";
    static Digit3 = "Digit3";
    static Digit4 = "Digit4";
    static Digit5 = "Digit5";
    static Digit6 = "Digit6";
    static Digit7 = "Digit7";
    static Digit8 = "Digit8";
    static Digit9 = "Digit9";
    static Digit0 = "Digit0";

    static Numpad1 = "Numpad1";
    static Numpad2 = "Numpad2";
    static Numpad3 = "Numpad3";
    static Numpad4 = "Numpad4";
    static Numpad5 = "Numpad5";
    static Numpad6 = "Numpad6";
    static Numpad7 = "Numpad7";
    static Numpad8 = "Numpad8";
    static Numpad9 = "Numpad9";
    static Numpad0 = "Numpad0";

    static F1 = "F1";
    static F2 = "F2";
    static F3 = "F3";
    static F4 = "F4";
    static F5 = "F5";
    static F6 = "F6";
    static F7 = "F7";
    static F8 = "F8";
    static F9 = "F9";
    static F10 = "F10";
    static F11 = "F11";
    static F12 = "F12";

    static Esc = "Escape";
    static Backquote = "Backquote";
    static Minus = "Minus";
    static Equal = "Equal";
    static Enter = "Enter";
    static Space = "Space";
    static Period = "Period";
    static Comma = "Comma";
    static Slash = "Slash";
    static Backslash = "Backslash";
    static Semicolor = "Semicolon";
    static Quote = "Quote";
    static LeftBracket = "BracketLeft";
    static RightBracket = "BracketRight";
    static Tab = "Tab";

    static ArrowLeft = "ArrowLeft";
    static ArrowUp = "ArrowUp";
    static ArrowDown = "ArrowDown";
    static ArrowRight = "ArrowRight";


    static LeftShift = "ShiftLeft";
    static LeftControl = "ControlLeft";
    static LeftAlt = "AltLeft";
    static RightShift = "ShiftRight";
    static RightControl = "ControlRight";
    static RightAlt = "AltRight";
}


export class MouseButtons
{
    static Left = 0;
    static Middle = 1;
    static Right = 2;
}