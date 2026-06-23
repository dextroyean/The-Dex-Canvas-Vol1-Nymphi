/*:
 * @target MZ
 * @plugindesc Layout adaptativo para mensajes y batalla en distintas resoluciones. v1.0.0
 * @author Dex / Jaime
 *
 * @help
 * Dex_AdaptiveLayout.js
 * 
 * Recomendación:
 * - Desactiva HDLayout.js si usas este plugin.
 * - Coloca este plugin debajo de plugins que modifiquen menú/batalla/mensajes.
 * - Si usas plugins de batalla que también mueven actores/enemigos, coloca
 *   Dex_AdaptiveLayout.js debajo de ellos.
 *
 * Este plugin ajusta:
 * - Ancho y posición de la ventana de mensajes.
 * - Posición de actores SV.
 * - Escala de actores SV.
 * - Posición y escala de enemigos.
 *
 * No incluye comandos de plugin.
 *
 * @param baseSettings
 * @text --- Base ---
 *
 * @param baseWidth
 * @text Resolución Base Ancho
 * @parent baseSettings
 * @type number
 * @default 1920
 *
 * @param baseHeight
 * @text Resolución Base Alto
 * @parent baseSettings
 * @type number
 * @default 1080
 *
 * @param scaleMode
 * @text Modo de Escalado
 * @parent baseSettings
 * @type select
 * @option separate
 * @option uniform
 * @option none
 * @default separate
 *
 * @param messageSettings
 * @text --- Mensajes ---
 *
 * @param messageWindowWidth
 * @text Ancho Ventana Mensaje
 * @parent messageSettings
 * @type number
 * @default 840
 *
 * @param messageWindowRows
 * @text Filas Ventana Mensaje
 * @parent messageSettings
 * @type number
 * @default 4
 *
 * @param messageExtraHeight
 * @text Alto Extra Mensaje
 * @parent messageSettings
 * @type number
 * @default 8
 *
 * @param messagePosition
 * @text Posición Horizontal
 * @parent messageSettings
 * @type select
 * @option center
 * @option left
 * @option right
 * @default center
 *
 * @param messageOffsetX
 * @text Offset X Mensaje
 * @parent messageSettings
 * @type number
 * @min -9999
 * @default 0
 *
 * @param dimmerFullWidth
 * @text Fondo Oscuro Ancho Pantalla
 * @parent messageSettings
 * @type boolean
 * @default true
 *
 * @param actorSettings
 * @text --- Actores ---
 *
 * @param applyActors
 * @text Aplicar a Actores
 * @parent actorSettings
 * @type boolean
 * @default true
 *
 * @param actorBaseX
 * @text Actor X Inicial
 * @parent actorSettings
 * @type number
 * @default 1400
 *
 * @param actorBaseY
 * @text Actor Y Inicial
 * @parent actorSettings
 * @type number
 * @default 500
 *
 * @param actorSpacingX
 * @text Separación X Actores
 * @parent actorSettings
 * @type number
 * @min -9999
 * @default 30
 *
 * @param actorSpacingY
 * @text Separación Y Actores
 * @parent actorSettings
 * @type number
 * @min -9999
 * @default 200
 *
 * @param actorOffsetX
 * @text Offset X Actores
 * @parent actorSettings
 * @type number
 * @min -9999
 * @default 0
 *
 * @param actorOffsetY
 * @text Offset Y Actores
 * @parent actorSettings
 * @type number
 * @min -9999
 * @default 0
 *
 * @param actorScale
 * @text Escala Actores
 * @parent actorSettings
 * @type number
 * @decimals 2
 * @default 1.25
 *
 * @param enemySettings
 * @text --- Enemigos ---
 *
 * @param applyEnemies
 * @text Aplicar a Enemigos
 * @parent enemySettings
 * @type boolean
 * @default true
 *
 * @param scaleEnemyPositions
 * @text Escalar Posiciones de Tropas
 * @parent enemySettings
 * @type boolean
 * @default true
 *
 * @param enemyOffsetX
 * @text Offset X Enemigos
 * @parent enemySettings
 * @type number
 * @min -9999
 * @default 0
 *
 * @param enemyOffsetY
 * @text Offset Y Enemigos
 * @parent enemySettings
 * @type number
 * @min -9999
 * @default 0
 *
 * @param enemyScale
 * @text Escala Enemigos
 * @parent enemySettings
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param notetagSettings
 * @text --- Notetags ---
 *
 * @param allowNotetags
 * @text Permitir Notetags
 * @parent notetagSettings
 * @type boolean
 * @default true
 *
 * @param debugSettings
 * @text --- Debug ---
 *
 * @param showLog
 * @text Mostrar Log
 * @parent debugSettings
 * @type boolean
 * @default false
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "Dex_AdaptiveLayout";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const num = (name, def = 0) => {
        const value = Number(params[name]);
        return Number.isFinite(value) ? value : def;
    };

    const bool = (name, def = false) => {
        const value = params[name];
        if (value === undefined || value === "") return def;
        return String(value) === "true";
    };

    const str = (name, def = "") => {
        const value = params[name];
        return value === undefined || value === "" ? def : String(value);
    };

    const BASE_WIDTH = num("baseWidth", 1920);
    const BASE_HEIGHT = num("baseHeight", 1080);
    const SCALE_MODE = str("scaleMode", "separate");

    const MESSAGE_WIDTH = num("messageWindowWidth", 840);
    const MESSAGE_ROWS = num("messageWindowRows", 4);
    const MESSAGE_EXTRA_HEIGHT = num("messageExtraHeight", 8);
    const MESSAGE_POSITION = str("messagePosition", "center");
    const MESSAGE_OFFSET_X = num("messageOffsetX", 0);
    const DIMMER_FULL_WIDTH = bool("dimmerFullWidth", true);

    const APPLY_ACTORS = bool("applyActors", true);
    const ACTOR_BASE_X = num("actorBaseX", 1400);
    const ACTOR_BASE_Y = num("actorBaseY", 500);
    const ACTOR_SPACING_X = num("actorSpacingX", 30);
    const ACTOR_SPACING_Y = num("actorSpacingY", 200);
    const ACTOR_OFFSET_X = num("actorOffsetX", 0);
    const ACTOR_OFFSET_Y = num("actorOffsetY", 0);
    const ACTOR_SCALE = num("actorScale", 1.25);

    const APPLY_ENEMIES = bool("applyEnemies", true);
    const SCALE_ENEMY_POSITIONS = bool("scaleEnemyPositions", true);
    const ENEMY_OFFSET_X = num("enemyOffsetX", 0);
    const ENEMY_OFFSET_Y = num("enemyOffsetY", 0);
    const ENEMY_SCALE = num("enemyScale", 1.00);

    const ALLOW_NOTETAGS = bool("allowNotetags", true);
    const SHOW_LOG = bool("showLog", false);

    const scaleX = () => {
        if (SCALE_MODE === "none") return 1;
        if (SCALE_MODE === "uniform") return Math.min(Graphics.boxWidth / BASE_WIDTH, Graphics.boxHeight / BASE_HEIGHT);
        return Graphics.boxWidth / BASE_WIDTH;
    };

    const scaleY = () => {
        if (SCALE_MODE === "none") return 1;
        if (SCALE_MODE === "uniform") return Math.min(Graphics.boxWidth / BASE_WIDTH, Graphics.boxHeight / BASE_HEIGHT);
        return Graphics.boxHeight / BASE_HEIGHT;
    };

    const log = (...args) => {
        if (SHOW_LOG) console.log("[Dex_AdaptiveLayout]", ...args);
    };

    const getNotetagNumber = (note, tagName, defaultValue) => {
        if (!ALLOW_NOTETAGS || !note) return defaultValue;
        const regex = new RegExp(`<${tagName}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*>`, "i");
        const match = note.match(regex);
        return match ? Number(match[1]) : defaultValue;
    };

    // -------------------------------------------------------------------------
    // Mensajes
    // -------------------------------------------------------------------------

    Scene_Message.prototype.messageWindowRect = function() {
        const ww = Math.min(MESSAGE_WIDTH, Graphics.boxWidth);
        const wh = this.calcWindowHeight(MESSAGE_ROWS, false) + MESSAGE_EXTRA_HEIGHT;

        let wx = 0;
        if (MESSAGE_POSITION === "center") {
            wx = Math.floor((Graphics.boxWidth - ww) / 2);
        } else if (MESSAGE_POSITION === "right") {
            wx = Graphics.boxWidth - ww;
        }

        wx += MESSAGE_OFFSET_X;
        wx = Math.max(0, Math.min(wx, Graphics.boxWidth - ww));

        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };

    const _Window_Message_createDimmerSprite = Window_Message.prototype.createDimmerSprite;
    Window_Message.prototype.createDimmerSprite = function() {
        _Window_Message_createDimmerSprite.call(this);
        if (DIMMER_FULL_WIDTH && this._dimmerSprite) {
            this._dimmerSprite.x = -this.x;
        }
    };

    const _Window_Message_refreshDimmerBitmap = Window_Message.prototype.refreshDimmerBitmap;
    Window_Message.prototype.refreshDimmerBitmap = function() {
        if (!DIMMER_FULL_WIDTH) {
            _Window_Message_refreshDimmerBitmap.call(this);
            return;
        }

        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = Graphics.boxWidth;
            const h = this.height;
            const m = this.padding;
            const c1 = ColorManager.dimColor1();
            const c2 = ColorManager.dimColor2();
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };

    // -------------------------------------------------------------------------
    // Actores SV
    // -------------------------------------------------------------------------

    if (APPLY_ACTORS) {
        Sprite_Actor.prototype.setActorHome = function(index) {
            const sx = scaleX();
            const sy = scaleY();

            const x = (ACTOR_BASE_X + index * ACTOR_SPACING_X) * sx + ACTOR_OFFSET_X;
            const y = (ACTOR_BASE_Y + index * ACTOR_SPACING_Y) * sy + ACTOR_OFFSET_Y;

            this.setHome(Math.round(x), Math.round(y));
            log("Actor home", index, Math.round(x), Math.round(y));
        };

        const _Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
        Sprite_Actor.prototype.updateBitmap = function() {
            _Sprite_Actor_updateBitmap.call(this);
            const note = this._actor ? this._actor.actor().note : "";
            const customScale = getNotetagNumber(note, "DexActorScale", ACTOR_SCALE);
            this.scale.x = customScale;
            this.scale.y = customScale;
        };
    }

    // -------------------------------------------------------------------------
    // Enemigos
    // -------------------------------------------------------------------------

    if (APPLY_ENEMIES) {
        const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
        Sprite_Enemy.prototype.setBattler = function(battler) {
            _Sprite_Enemy_setBattler.call(this, battler);
            this.dexApplyAdaptiveEnemyLayout();
        };

        Sprite_Enemy.prototype.dexApplyAdaptiveEnemyLayout = function() {
            if (!this._enemy || !this._enemy.enemy) return;

            const enemyData = this._enemy.enemy();
            const note = enemyData ? enemyData.note : "";
            const customScale = getNotetagNumber(note, "DexEnemyScale", ENEMY_SCALE);
            const customOffsetX = getNotetagNumber(note, "DexEnemyOffsetX", ENEMY_OFFSET_X);
            const customOffsetY = getNotetagNumber(note, "DexEnemyOffsetY", ENEMY_OFFSET_Y);

            this.scale.x = customScale;
            this.scale.y = customScale;

            if (SCALE_ENEMY_POSITIONS && this._homeX !== undefined && this._homeY !== undefined) {
                const sx = scaleX();
                const sy = scaleY();
                const baseX = this._homeX;
                const baseY = this._homeY;

                this._homeX = Math.round(baseX * sx + customOffsetX);
                this._homeY = Math.round(baseY * sy + customOffsetY);
                this.setHome(this._homeX, this._homeY);
            } else {
                this.x += customOffsetX;
                this.y += customOffsetY;
            }

            log("Enemy layout", enemyData ? enemyData.name : "", this._homeX, this._homeY, customScale);
        };
    }

})();
