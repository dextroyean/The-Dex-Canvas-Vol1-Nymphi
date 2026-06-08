//=============================================================================
// Dex_TextSpeed.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.1) Controla la velocidad con la que aparece el texto en Mostrar Texto.
 * @author Dextroyean
 *
 * @param --- Configuracion General ---
 * @default
 *
 * @param Frames por Letra
 * @parent --- Configuracion General ---
 * @type number
 * @min 1
 * @desc 1 = velocidad normal. 2 o mas = texto mas lento.
 * @default 3
 *
 * @param Maximo Frames por Letra
 * @parent --- Configuracion General ---
 * @type number
 * @min 1
 * @desc Limite maximo permitido para la velocidad del texto.
 * @default 30
 *
 * @param Permitir Acelerar con Boton
 * @parent --- Configuracion General ---
 * @type boolean
 * @on Si
 * @off No
 * @desc Si esta en No, mantener OK/Enter no acelerara el texto.
 * @default false
 *
 * @param Interruptor Texto Instantaneo
 * @parent --- Configuracion General ---
 * @type switch
 * @desc Si este interruptor esta ON, el texto se muestra instantaneamente. 0 = desactivado.
 * @default 0
 *
 * @command CambiarVelocidad
 * @text Cambiar velocidad del texto
 * @desc Cambia la velocidad global del texto.
 *
 * @arg frames
 * @text Frames por letra
 * @type number
 * @min 1
 * @desc 1 = normal. 2 o mas = mas lento.
 * @default 3
 *
 * @command RestaurarVelocidad
 * @text Restaurar velocidad
 * @desc Restaura la velocidad del texto al valor configurado en el plugin.
 *
 * @help
 * ============================================================================
 * Dex_TextSpeed v1.1
 * ============================================================================
 *
 * Controla la velocidad del comando:
 *
 * Mostrar Texto / Show Text
 *
 * ---------------------------------------------------------------------------
 * Parametro principal
 * ---------------------------------------------------------------------------
 *
 * Frames por Letra:
 *
 * 1 = velocidad normal de RPG Maker
 * 2 = un poco mas lento
 * 3 = lento visible
 * 4 = bastante lento
 * 5 o mas = dramatico
 *
 * Para probar que funciona, usa:
 *
 * Frames por Letra: 5
 * Permitir Acelerar con Boton: false
 *
 * ---------------------------------------------------------------------------
 * Codigos dentro del texto
 * ---------------------------------------------------------------------------
 *
 * Puedes cambiar la velocidad dentro de un mensaje:
 *
 * \TS[1] velocidad normal
 * \TS[3] texto lento
 * \TS[5] texto muy lento
 *
 * Para volver a la velocidad configurada del plugin:
 *
 * \TSR
 *
 * Ejemplo:
 *
 * \TS[5]El bosque... esta olvidando sus caminos.
 * \TSR
 *
 * ---------------------------------------------------------------------------
 * Codigos originales de RPG Maker
 * ---------------------------------------------------------------------------
 *
 * Este plugin respeta:
 *
 * \.  Pausa corta
 * \|  Pausa larga
 * \!  Espera input
 * \>  Mostrar rapido
 * \<  Volver a normal
 * \^  Cerrar sin esperar
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_TextSpeed = true;

var Dex = Dex || {};
Dex.TextSpeed = Dex.TextSpeed || {};

(function() {
    "use strict";

    const pluginName = "Dex_TextSpeed";
    const parameters = PluginManager.parameters(pluginName);

    const numberParam = function(name, fallback) {
        const value = Number(parameters[name]);
        return Number.isFinite(value) ? value : fallback;
    };

    const boolParam = function(name, fallback) {
        const value = parameters[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    Dex.TextSpeed.defaultFrames = Math.max(1, numberParam("Frames por Letra", 3));
    Dex.TextSpeed.maxFrames = Math.max(1, numberParam("Maximo Frames por Letra", 30));
    Dex.TextSpeed.allowFastForward = boolParam("Permitir Acelerar con Boton", false);
    Dex.TextSpeed.instantSwitchId = numberParam("Interruptor Texto Instantaneo", 0);

    Dex.TextSpeed.clampFrames = function(value) {
        const frames = Number(value);

        if (!Number.isFinite(frames)) {
            return this.defaultFrames;
        }

        return Math.max(1, Math.min(this.maxFrames, Math.round(frames)));
    };

    Dex.TextSpeed.isInstantSwitchOn = function() {
        if (this.instantSwitchId > 0) {
            return $gameSwitches.value(this.instantSwitchId);
        }

        return false;
    };

    //-------------------------------------------------------------------------
    // Game_System
    //-------------------------------------------------------------------------

    const _Dex_TS_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Dex_TS_Game_System_initialize.call(this);
        this._dexTextSpeedFrames = Dex.TextSpeed.defaultFrames;
    };

    Game_System.prototype.dexTextSpeedFrames = function() {
        if (this._dexTextSpeedFrames === undefined || this._dexTextSpeedFrames === null) {
            this._dexTextSpeedFrames = Dex.TextSpeed.defaultFrames;
        }

        return Dex.TextSpeed.clampFrames(this._dexTextSpeedFrames);
    };

    Game_System.prototype.setDexTextSpeedFrames = function(frames) {
        this._dexTextSpeedFrames = Dex.TextSpeed.clampFrames(frames);
    };

    Game_System.prototype.resetDexTextSpeedFrames = function() {
        this._dexTextSpeedFrames = Dex.TextSpeed.defaultFrames;
    };

    //-------------------------------------------------------------------------
    // Plugin Commands
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "CambiarVelocidad", function(args) {
        const frames = Number(args.frames || Dex.TextSpeed.defaultFrames);
        $gameSystem.setDexTextSpeedFrames(frames);
    });

    PluginManager.registerCommand(pluginName, "RestaurarVelocidad", function() {
        $gameSystem.resetDexTextSpeedFrames();
    });

    //-------------------------------------------------------------------------
    // Window_Message
    //-------------------------------------------------------------------------

    const _Dex_TS_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this._dexTextSpeedOverride = null;
        this._dexTextSpeedForceBreak = false;
        _Dex_TS_Window_Message_startMessage.call(this);
    };

    Window_Message.prototype.dexCurrentTextSpeedFrames = function() {
        if (this._dexTextSpeedOverride !== undefined && this._dexTextSpeedOverride !== null) {
            return Dex.TextSpeed.clampFrames(this._dexTextSpeedOverride);
        }

        if ($gameSystem) {
            return $gameSystem.dexTextSpeedFrames();
        }

        return Dex.TextSpeed.defaultFrames;
    };

    Window_Message.prototype.dexShouldApplyTextDelay = function() {
        if (Dex.TextSpeed.isInstantSwitchOn()) {
            return false;
        }

        if (this._lineShowFast) {
            return false;
        }

        if (Dex.TextSpeed.allowFastForward && this._showFast) {
            return false;
        }

        return true;
    };

    Window_Message.prototype.dexApplyTextDelay = function() {
        if (!this.dexShouldApplyTextDelay()) {
            return;
        }

        const frames = this.dexCurrentTextSpeedFrames();
        const waitFrames = Math.max(0, frames - 1);

        if (waitFrames > 0) {
            this.startWait(waitFrames);
            this._dexTextSpeedForceBreak = true;
        }
    };

    const _Dex_TS_Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        _Dex_TS_Window_Message_updateShowFast.call(this);

        if (Dex.TextSpeed.isInstantSwitchOn()) {
            this._showFast = true;
            return;
        }

        if (!Dex.TextSpeed.allowFastForward && !this._lineShowFast) {
            this._showFast = false;
        }
    };

    const _Dex_TS_Window_Message_shouldBreakHere = Window_Message.prototype.shouldBreakHere;
    Window_Message.prototype.shouldBreakHere = function(textState) {
        if (this._dexTextSpeedForceBreak) {
            this._dexTextSpeedForceBreak = false;
            return true;
        }

        return _Dex_TS_Window_Message_shouldBreakHere.call(this, textState);
    };

    const _Dex_TS_Window_Message_processNormalCharacter =
        Window_Message.prototype.processNormalCharacter || Window_Base.prototype.processNormalCharacter;

    Window_Message.prototype.processNormalCharacter = function(textState) {
        _Dex_TS_Window_Message_processNormalCharacter.call(this, textState);
        this.dexApplyTextDelay();
    };

    const _Dex_TS_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        const upperCode = String(code || "").toUpperCase();

        if (upperCode === "TS") {
            const frames = this.obtainEscapeParam(textState);
            this._dexTextSpeedOverride = Dex.TextSpeed.clampFrames(frames);
            return;
        }

        if (upperCode === "TSR") {
            this._dexTextSpeedOverride = null;
            return;
        }

        _Dex_TS_Window_Message_processEscapeCharacter.call(this, code, textState);
    };

})();