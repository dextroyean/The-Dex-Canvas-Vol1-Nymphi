//=============================================================================
// TDC_BattlerLimitGauge.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v0.1.0] Muestra una barra pequeña de Resonancia/Limit encima de los actores en batalla.
 * @author Dextroyean y Jaime
 * @base Dex_LimitResonance
 * @orderAfter Dex_LimitResonance
 *
 * @param enabled
 * @text Activado
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param showOnlyInBattle
 * @text Solo en Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param showWhenEmpty
 * @text Mostrar Vacía
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está en No, la barra aparece cuando el actor tenga más de 0 Resonancia.
 * @default true
 *
 * @param hideWhenDead
 * @text Ocultar si está KO
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param --- Posición ---
 * @default
 *
 * @param offsetX
 * @parent --- Posición ---
 * @text Ajuste X
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param offsetY
 * @parent --- Posición ---
 * @text Ajuste Y
 * @type number
 * @min -999
 * @max 999
 * @desc Valor negativo = más arriba del actor.
 * @default -86
 *
 * @param mirrorForActors
 * @parent --- Posición ---
 * @text Respetar Espejo del Actor
 * @type boolean
 * @on Sí
 * @off No
 * @desc Normalmente debe estar en No para que la barra no se invierta con el sprite.
 * @default false
 *
 * @param --- Tamaño ---
 * @default
 *
 * @param gaugeWidth
 * @parent --- Tamaño ---
 * @text Ancho
 * @type number
 * @min 20
 * @max 240
 * @default 76
 *
 * @param gaugeHeight
 * @parent --- Tamaño ---
 * @text Alto
 * @type number
 * @min 3
 * @max 32
 * @default 7
 *
 * @param borderSize
 * @parent --- Tamaño ---
 * @text Grosor Borde
 * @type number
 * @min 0
 * @max 8
 * @default 1
 *
 * @param --- Animación ---
 * @default
 *
 * @param smoothSpeed
 * @parent --- Animación ---
 * @text Velocidad de Llenado Visual
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 1.00
 * @desc 0.10 = suave. 1.00 = instantáneo.
 * @default 0.12
 *
 * @param pulseWhenFull
 * @parent --- Animación ---
 * @text Pulso al Llenarse
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param --- Colores ---
 * @default
 *
 * @param backColor
 * @parent --- Colores ---
 * @text Fondo
 * @type string
 * @default rgba(0,0,0,0.62)
 *
 * @param borderColor
 * @parent --- Colores ---
 * @text Borde
 * @type string
 * @default rgba(255,255,255,0.72)
 *
 * @param fillColor1
 * @parent --- Colores ---
 * @text Color Inicial
 * @type string
 * @default #7EF7C4
 *
 * @param fillColor2
 * @parent --- Colores ---
 * @text Color Final
 * @type string
 * @default #B48CFF
 *
 * @param separatorColor
 * @parent --- Colores ---
 * @text Separadores
 * @type string
 * @default rgba(255,255,255,0.88)
 *
 * @param thresholds
 * @parent --- Colores ---
 * @text Separadores de Limit
 * @type string
 * @desc Valores separados por coma. Ejemplo: 25,50,75
 * @default 25,50,75
 *
 * @param --- Texto ---
 * @default
 *
 * @param showLabel
 * @parent --- Texto ---
 * @text Mostrar Etiqueta
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param labelText
 * @parent --- Texto ---
 * @text Etiqueta
 * @type string
 * @default RES
 *
 * @param labelFontSize
 * @parent --- Texto ---
 * @text Tamaño Texto
 * @type number
 * @min 8
 * @max 32
 * @default 12
 *
 * @param labelWidth
 * @parent --- Texto ---
 * @text Ancho Etiqueta
 * @type number
 * @min 0
 * @max 80
 * @default 26
 *
 * @help
 * ==========================================================================
 * TDC_BattlerLimitGauge v0.1.0
 * ==========================================================================
 *
 * Muestra una barrita pequeña de Resonancia encima de los actores en batalla.
 * Está pensada para volver a un HUD más limpio: no reemplaza ventanas, no toca
 * jobs, no cambia skills y no guarda objetos visuales en la partida.
 *
 * Requiere Dex_LimitResonance activo.
 *
 * Orden recomendado:
 *   Dex_LimitResonance
 *   TDC_BattlerLimitGauge
 *
 * En Dex_LimitResonance se recomienda poner:
 *   Mostrar HUD en Batalla = false
 *   Mostrar en Estado de Batalla = false
 *
 * Prueba rápida en F8:
 *   Dex.LimitResonance.setActor(1, 100)
 *   Dex.LimitResonance.setActor(2, 50)
 *
 * Parámetros clave:
 *   Ajuste Y: mueve la barra arriba/abajo del battler.
 *   Ancho/Alto: tamaño de la barrita.
 *   Velocidad de Llenado Visual: suaviza cómo se llena.
 *
 * Creado por Dextroyean y Jaime.
 * ==========================================================================
 */

var Imported = Imported || {};
Imported.TDC_BattlerLimitGauge = true;

var TDC = TDC || {};
TDC.BattlerLimitGauge = TDC.BattlerLimitGauge || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "TDC_BattlerLimitGauge";
    })();

    const params = PluginManager.parameters(pluginName);

    const textParam = (name, fallback) => {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") return fallback;
        return String(value);
    };

    const numParam = (name, fallback) => {
        const value = Number(textParam(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const boolParam = (name, fallback) => {
        const value = params[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const parseThresholds = value => String(value || "")
        .split(",")
        .map(item => Number(item.trim()))
        .filter(item => Number.isFinite(item) && item > 0)
        .sort((a, b) => a - b);

    const SETTINGS = {
        enabled: boolParam("enabled", true),
        showOnlyInBattle: boolParam("showOnlyInBattle", true),
        showWhenEmpty: boolParam("showWhenEmpty", true),
        hideWhenDead: boolParam("hideWhenDead", false),
        offsetX: numParam("offsetX", 0),
        offsetY: numParam("offsetY", -86),
        mirrorForActors: boolParam("mirrorForActors", false),
        gaugeWidth: Math.max(20, numParam("gaugeWidth", 76)),
        gaugeHeight: Math.max(3, numParam("gaugeHeight", 7)),
        borderSize: Math.max(0, numParam("borderSize", 1)),
        smoothSpeed: Math.max(0.01, Math.min(1, numParam("smoothSpeed", 0.12))),
        pulseWhenFull: boolParam("pulseWhenFull", true),
        backColor: textParam("backColor", "rgba(0,0,0,0.62)"),
        borderColor: textParam("borderColor", "rgba(255,255,255,0.72)"),
        fillColor1: textParam("fillColor1", "#7EF7C4"),
        fillColor2: textParam("fillColor2", "#B48CFF"),
        separatorColor: textParam("separatorColor", "rgba(255,255,255,0.88)"),
        thresholds: parseThresholds(textParam("thresholds", "25,50,75")),
        showLabel: boolParam("showLabel", false),
        labelText: textParam("labelText", "RES"),
        labelFontSize: Math.max(8, numParam("labelFontSize", 12)),
        labelWidth: Math.max(0, numParam("labelWidth", 26))
    };

    TDC.BattlerLimitGauge.settings = SETTINGS;

    const hasLimitPlugin = () => !!(Imported.Dex_LimitResonance && window.Dex && Dex.LimitResonance);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    function Sprite_TdcBattlerLimitGauge() {
        this.initialize(...arguments);
    }

    Sprite_TdcBattlerLimitGauge.prototype = Object.create(Sprite.prototype);
    Sprite_TdcBattlerLimitGauge.prototype.constructor = Sprite_TdcBattlerLimitGauge;

    Sprite_TdcBattlerLimitGauge.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._battler = null;
        this._displayRate = 0;
        this._lastSignature = "";
        this._pulseFrame = 0;
        this.anchor.x = 0;
        this.anchor.y = 0;
        this.createBitmap();
        this.redraw(true);
    };

    Sprite_TdcBattlerLimitGauge.prototype.totalWidth = function() {
        return SETTINGS.gaugeWidth + SETTINGS.borderSize * 2 + (SETTINGS.showLabel ? SETTINGS.labelWidth : 0);
    };

    Sprite_TdcBattlerLimitGauge.prototype.totalHeight = function() {
        return Math.max(SETTINGS.gaugeHeight + SETTINGS.borderSize * 2, SETTINGS.showLabel ? SETTINGS.labelFontSize + 4 : 0);
    };

    Sprite_TdcBattlerLimitGauge.prototype.createBitmap = function() {
        const width = Math.ceil(this.totalWidth());
        const height = Math.ceil(this.totalHeight());
        this.bitmap = new Bitmap(width, height);
    };

    Sprite_TdcBattlerLimitGauge.prototype.setBattler = function(battler) {
        if (this._battler === battler) return;
        this._battler = battler || null;
        this._displayRate = this.targetRate();
        this._lastSignature = "";
        this.redraw(true);
    };

    Sprite_TdcBattlerLimitGauge.prototype.currentValue = function() {
        if (this._battler && this._battler.dexLimitValue) return this._battler.dexLimitValue();
        return 0;
    };

    Sprite_TdcBattlerLimitGauge.prototype.maxValue = function() {
        if (this._battler && this._battler.dexLimitMax) return this._battler.dexLimitMax();
        if (window.Dex && Dex.LimitResonance && Dex.LimitResonance.settings) return Dex.LimitResonance.settings.maxValue || 100;
        return 100;
    };

    Sprite_TdcBattlerLimitGauge.prototype.targetRate = function() {
        const max = this.maxValue();
        if (max <= 0) return 0;
        return clamp(this.currentValue() / max, 0, 1);
    };

    Sprite_TdcBattlerLimitGauge.prototype.shouldShow = function() {
        if (!SETTINGS.enabled) return false;
        if (!hasLimitPlugin()) return false;
        if (!this._battler || !this._battler.isActor || !this._battler.isActor()) return false;
        if (SETTINGS.showOnlyInBattle && (!$gameParty || !$gameParty.inBattle || !$gameParty.inBattle())) return false;
        if (SETTINGS.hideWhenDead && this._battler.isDead && this._battler.isDead()) return false;
        if (!SETTINGS.showWhenEmpty && this.currentValue() <= 0) return false;
        return true;
    };

    Sprite_TdcBattlerLimitGauge.prototype.makeSignature = function() {
        return [
            Math.round(this._displayRate * 1000),
            this.currentValue(),
            this.maxValue(),
            this.visible ? 1 : 0,
            SETTINGS.gaugeWidth,
            SETTINGS.gaugeHeight,
            SETTINGS.borderSize,
            SETTINGS.showLabel ? 1 : 0
        ].join(":");
    };

    Sprite_TdcBattlerLimitGauge.prototype.update = function() {
        Sprite.prototype.update.call(this);

        this.visible = this.shouldShow();
        this.updatePlacement();

        if (!this.visible) return;

        const target = this.targetRate();
        const diff = target - this._displayRate;

        if (Math.abs(diff) < 0.002 || SETTINGS.smoothSpeed >= 1) {
            this._displayRate = target;
        } else {
            this._displayRate += diff * SETTINGS.smoothSpeed;
        }

        if (SETTINGS.pulseWhenFull && target >= 1) {
            this._pulseFrame += 1;
            this.opacity = 210 + Math.floor(Math.sin(this._pulseFrame / 8) * 35);
        } else {
            this._pulseFrame = 0;
            this.opacity = 255;
        }

        const signature = this.makeSignature();
        if (signature !== this._lastSignature) {
            this._lastSignature = signature;
            this.redraw(false);
        }
    };

    Sprite_TdcBattlerLimitGauge.prototype.updatePlacement = function() {
        const totalW = this.totalWidth();
        this.x = SETTINGS.offsetX - Math.floor(totalW / 2);
        this.y = SETTINGS.offsetY;
        this.scale.x = SETTINGS.mirrorForActors ? 1 : (this.parent && this.parent.scale.x < 0 ? -1 : 1);
    };

    Sprite_TdcBattlerLimitGauge.prototype.redraw = function(force) {
        if (!this.bitmap) return;

        const width = Math.ceil(this.totalWidth());
        const height = Math.ceil(this.totalHeight());
        if (force || this.bitmap.width !== width || this.bitmap.height !== height) {
            this.bitmap.resize(width, height);
        }

        this.bitmap.clear();

        const labelW = SETTINGS.showLabel ? SETTINGS.labelWidth : 0;
        const border = SETTINGS.borderSize;
        const gx = labelW;
        const gy = Math.floor((height - SETTINGS.gaugeHeight - border * 2) / 2);
        const outerW = SETTINGS.gaugeWidth + border * 2;
        const outerH = SETTINGS.gaugeHeight + border * 2;
        const innerX = gx + border;
        const innerY = gy + border;
        const fillW = Math.floor(SETTINGS.gaugeWidth * clamp(this._displayRate, 0, 1));

        if (SETTINGS.showLabel) {
            this.bitmap.fontSize = SETTINGS.labelFontSize;
            this.bitmap.outlineWidth = 3;
            this.bitmap.textColor = "#FFFFFF";
            this.bitmap.outlineColor = "rgba(0,0,0,0.75)";
            this.bitmap.drawText(SETTINGS.labelText, 0, 0, Math.max(1, labelW - 3), height, "right");
        }

        if (border > 0) {
            this.bitmap.fillRect(gx, gy, outerW, outerH, SETTINGS.borderColor);
        }
        this.bitmap.fillRect(innerX, innerY, SETTINGS.gaugeWidth, SETTINGS.gaugeHeight, SETTINGS.backColor);

        if (fillW > 0) {
            this.bitmap.gradientFillRect(innerX, innerY, fillW, SETTINGS.gaugeHeight, SETTINGS.fillColor1, SETTINGS.fillColor2);
        }

        this.drawSeparators(innerX, innerY, SETTINGS.gaugeWidth, SETTINGS.gaugeHeight);
    };

    Sprite_TdcBattlerLimitGauge.prototype.drawSeparators = function(x, y, width, height) {
        const max = this.maxValue();
        if (max <= 0) return;

        for (const threshold of SETTINGS.thresholds) {
            if (threshold <= 0 || threshold >= max) continue;
            const sx = x + Math.floor(width * (threshold / max));
            this.bitmap.fillRect(sx, y - 1, 1, height + 2, SETTINGS.separatorColor);
        }
    };

    const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
    Sprite_Actor.prototype.setBattler = function(battler) {
        _Sprite_Actor_setBattler.call(this, battler);
        this.tdcSetupLimitGaugeSprite(battler);
    };

    Sprite_Actor.prototype.tdcSetupLimitGaugeSprite = function(battler) {
        if (!this._tdcLimitGaugeSprite) {
            this._tdcLimitGaugeSprite = new Sprite_TdcBattlerLimitGauge();
            this.addChild(this._tdcLimitGaugeSprite);
        }
        this._tdcLimitGaugeSprite.setBattler(battler);
    };

})();
