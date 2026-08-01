//=============================================================================
// Dex_LimitResonance.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.0.0] Resonancia ahora usa el TP nativo de RPG Maker MZ y lo muestra como RES en HUD, barras y costos.
 * @author Dextroyean y Jaime
 * @url
 *
 * @param --- General ---
 * @default
 *
 * @param gaugeName
 * @parent --- General ---
 * @text Nombre del Recurso
 * @type string
 * @default Resonancia
 *
 * @param gaugeLabel
 * @parent --- General ---
 * @text Etiqueta Corta en Barra
 * @type string
 * @default RES
 *
 * @param renameNativeTp
 * @parent --- General ---
 * @text Renombrar TP Nativo
 * @type boolean
 * @on Sí
 * @off No
 * @desc Cambia la etiqueta visual de la barra TP nativa por la etiqueta corta.
 * @default true
 *
 * @param recolorNativeTp
 * @parent --- General ---
 * @text Recolorear TP Nativo
 * @type boolean
 * @on Sí
 * @off No
 * @desc Cambia los colores de la barra TP nativa para que combine con Resonancia.
 * @default true
 *
 * @param --- TP ---
 * @default
 *
 * @param resetAtBattleStart
 * @parent --- TP ---
 * @text Reiniciar TP al Iniciar Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está ON, fija el TP inicial al iniciar combate. Si está OFF, respeta el comportamiento nativo de MZ.
 * @default false
 *
 * @param battleStartTp
 * @parent --- TP ---
 * @text TP Inicial en Batalla
 * @type number
 * @min 0
 * @max 100
 * @default 0
 *
 * @param resetAtBattleEnd
 * @parent --- TP ---
 * @text Reiniciar TP al Terminar Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está ON, pone el TP en 0 al terminar batalla.
 * @default false
 *
 * @param --- Visual ---
 * @default
 *
 * @param showInBattleStatus
 * @parent --- Visual ---
 * @text Mostrar RES en Estado de Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si el sistema ya muestra TP nativo, se renombra esa barra. Si no, dibuja una barra extra.
 * @default false
 *
 * @param showInMenuStatus
 * @parent --- Visual ---
 * @text Mostrar RES en Menú
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si el sistema ya muestra TP nativo, se renombra esa barra. Si no, dibuja una barra extra.
 * @default false
 *
 * @param showBattleHud
 * @parent --- Visual ---
 * @text Mostrar HUD en Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Muestra una ventana independiente con la Resonancia/TP del grupo.
 * @default true
 *
 * @param battleHudAutoPosition
 * @parent --- Visual ---
 * @text HUD Posición Automática
 * @type boolean
 * @on Sí
 * @off No
 * @desc Sí = se coloca sobre la ventana de estado. No = usa X/Y manual.
 * @default true
 *
 * @param battleHudX
 * @parent --- Visual ---
 * @text HUD X Manual
 * @type number
 * @min -9999
 * @default 0
 *
 * @param battleHudY
 * @parent --- Visual ---
 * @text HUD Y Manual
 * @type number
 * @min -9999
 * @default 0
 *
 * @param battleHudWidth
 * @parent --- Visual ---
 * @text HUD Ancho
 * @type number
 * @min 220
 * @max 900
 * @default 460
 *
 * @param battleHudLineHeight
 * @parent --- Visual ---
 * @text HUD Alto de Línea
 * @type number
 * @min 24
 * @max 60
 * @default 34
 *
 * @param battleHudActorNameWidth
 * @parent --- Visual ---
 * @text HUD Ancho Nombre
 * @type number
 * @min 0
 * @max 260
 * @default 120
 *
 * @param battleHudMarginBottom
 * @parent --- Visual ---
 * @text HUD Margen Inferior
 * @type number
 * @min 0
 * @max 160
 * @desc Distancia sobre la ventana de estado en modo automático.
 * @default 8
 *
 * @param battleHudWindowOpacity
 * @parent --- Visual ---
 * @text HUD Opacidad Ventana
 * @type number
 * @min 0
 * @max 255
 * @default 170
 *
 * @param battleGaugeLineOffset
 * @parent --- Visual ---
 * @text Línea de Barra Extra
 * @type number
 * @min -1
 * @desc -1 = automático. 0 HP, 1 MP, 2 debajo de MP, 3 debajo de TP.
 * @default -1
 *
 * @param gaugeWidth
 * @parent --- Visual ---
 * @text Ancho de Barra
 * @type number
 * @min 80
 * @max 360
 * @default 180
 *
 * @param gaugeLabelWidth
 * @parent --- Visual ---
 * @text Ancho de Etiqueta
 * @type number
 * @min 20
 * @max 140
 * @default 42
 *
 * @param showValue
 * @parent --- Visual ---
 * @text Mostrar Número
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param color1
 * @parent --- Visual ---
 * @text Color Inicial
 * @type string
 * @default #7EF7C4
 *
 * @param color2
 * @parent --- Visual ---
 * @text Color Final
 * @type string
 * @default #B48CFF
 *
 * @param separatorColor
 * @parent --- Visual ---
 * @text Color de Separadores
 * @type string
 * @default rgba(255,255,255,0.82)
 *
 * @param thresholds
 * @parent --- Visual ---
 * @text Separadores
 * @type string
 * @desc Valores separados por coma. Ejemplo: 25,50,75
 * @default 25,50,75
 *
 * @param costLabel
 * @parent --- Visual ---
 * @text Etiqueta de Costo
 * @type string
 * @default RES
 *
 * @param costColorIndex
 * @parent --- Visual ---
 * @text Color de Costo
 * @type number
 * @min 0
 * @default 29
 *
 * @command GainActor
 * @text Ganar Resonancia/TP
 * @desc Suma o resta TP a un actor. 0 = líder.
 *
 * @arg actorId
 * @text Actor
 * @type actor
 * @desc 0 = líder del grupo.
 * @default 0
 *
 * @arg amount
 * @text Cantidad
 * @type number
 * @min -999
 * @max 999
 * @default 10
 *
 * @command SetActor
 * @text Fijar Resonancia/TP
 * @desc Establece el TP exacto de un actor. 0 = líder.
 *
 * @arg actorId
 * @text Actor
 * @type actor
 * @desc 0 = líder del grupo.
 * @default 0
 *
 * @arg amount
 * @text Cantidad
 * @type number
 * @min 0
 * @max 100
 * @default 0
 *
 * @command GainParty
 * @text Ganar Resonancia/TP Grupo
 * @desc Suma o resta TP a todos los miembros activos.
 *
 * @arg amount
 * @text Cantidad
 * @type number
 * @min -999
 * @max 999
 * @default 10
 *
 * @command ResetParty
 * @text Reiniciar Resonancia/TP Grupo
 * @desc Pone el TP de todos los miembros activos en 0.
 *
 * @command FullParty
 * @text Llenar Resonancia/TP Grupo
 * @desc Llena el TP de todos los miembros activos.
 *
 * @help
 * ==========================================================================
 * Dex_LimitResonance v2.0.0
 * ==========================================================================
 *
 * Cambio importante:
 * Esta versión YA NO crea un recurso separado.
 *
 * Ahora:
 * TP nativo de RPG Maker MZ = Resonancia
 *
 * La barra visual lee:
 * actor.tp
 * actor.maxTp()
 *
 * Los costos leen:
 * skill.tpCost
 *
 * Esto significa que las habilidades que cuesten TP funcionan con el sistema
 * normal de RPG Maker MZ, pero visualmente se muestran como RES/Resonancia.
 *
 * ==========================================================================
 * FLUJO RECOMENDADO
 * ==========================================================================
 *
 * 1. Base de datos > Términos:
 *    Cambia "TP" por "RES" o "Resonancia".
 *
 * 2. Base de datos > Tipos:
 *    Asegúrate de tener un tipo de habilidad llamado "Especial".
 *
 * 3. Skills:
 *    Toda skill con Coste TP debe tener Tipo de habilidad = Especial.
 *
 * 4. Clases / Actores:
 *    Agrega el rasgo:
 *    Añadir tipo de habilidad: Especial
 *
 * ==========================================================================
 * COMPATIBILIDAD
 * ==========================================================================
 *
 * Se conservan nombres de comandos y scripts antiguos:
 *
 * Dex.LimitResonance.gainActor(actorId, amount, reason)
 * Dex.LimitResonance.setActor(actorId, amount)
 * Dex.LimitResonance.gainBattler(actor, amount, reason)
 *
 * Pero ahora esos métodos modifican TP nativo.
 *
 * También se conservan aliases en Game_Actor:
 *
 * actor.dexLimitValue() -> actor.tp
 * actor.dexLimitMax()   -> actor.maxTp()
 *
 * Los notetags <LimitCost> y <ResonanceCost> ya no son necesarios.
 * Usa el campo nativo "Coste TP" de la skill.
 * ==========================================================================
 */

var Imported = Imported || {};
Imported.Dex_LimitResonance = true;

var Dex = Dex || {};
Dex.LimitResonance = Dex.LimitResonance || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_LimitResonance";
    })();

    const params = PluginManager.parameters(pluginName);

    const textParam = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") {
            return fallback;
        }
        return String(value);
    };

    const numberParam = function(name, fallback) {
        const value = Number(textParam(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const boolParam = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const parseThresholds = function(value) {
        return String(value || "")
            .split(",")
            .map(item => Number(item.trim()))
            .filter(item => Number.isFinite(item) && item > 0)
            .sort((a, b) => a - b);
    };

    const SETTINGS = {
        gaugeName: textParam("gaugeName", "Resonancia"),
        gaugeLabel: textParam("gaugeLabel", "RES"),
        renameNativeTp: boolParam("renameNativeTp", true),
        recolorNativeTp: boolParam("recolorNativeTp", true),

        resetAtBattleStart: boolParam("resetAtBattleStart", false),
        battleStartTp: Math.max(0, Math.min(100, numberParam("battleStartTp", 0))),
        resetAtBattleEnd: boolParam("resetAtBattleEnd", false),

        showInBattleStatus: boolParam("showInBattleStatus", false),
        showInMenuStatus: boolParam("showInMenuStatus", false),
        showBattleHud: boolParam("showBattleHud", true),
        battleHudAutoPosition: boolParam("battleHudAutoPosition", true),
        battleHudX: numberParam("battleHudX", 0),
        battleHudY: numberParam("battleHudY", 0),
        battleHudWidth: Math.max(220, numberParam("battleHudWidth", 460)),
        battleHudLineHeight: Math.max(24, numberParam("battleHudLineHeight", 34)),
        battleHudActorNameWidth: Math.max(0, numberParam("battleHudActorNameWidth", 120)),
        battleHudMarginBottom: Math.max(0, numberParam("battleHudMarginBottom", 8)),
        battleHudWindowOpacity: Math.max(0, Math.min(255, numberParam("battleHudWindowOpacity", 170))),
        battleGaugeLineOffset: numberParam("battleGaugeLineOffset", -1),
        gaugeWidth: Math.max(80, numberParam("gaugeWidth", 180)),
        gaugeLabelWidth: Math.max(20, numberParam("gaugeLabelWidth", 42)),
        showValue: boolParam("showValue", true),
        color1: textParam("color1", "#7EF7C4"),
        color2: textParam("color2", "#B48CFF"),
        separatorColor: textParam("separatorColor", "rgba(255,255,255,0.82)"),
        thresholds: parseThresholds(textParam("thresholds", "25,50,75")),
        costLabel: textParam("costLabel", "RES"),
        costColorIndex: Math.max(0, numberParam("costColorIndex", 29))
    };

    const Manager = Dex.LimitResonance;
    Manager.version = "2.0.0";
    Manager.settings = SETTINGS;

    Manager.clamp = function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    Manager.actorFromId = function(actorId) {
        const id = Number(actorId || 0);

        if (id > 0) {
            return $gameActors ? $gameActors.actor(id) : null;
        }

        return $gameParty ? $gameParty.leader() : null;
    };

    Manager.tpValue = function(actor) {
        return actor && Number.isFinite(actor.tp) ? Math.floor(actor.tp) : 0;
    };

    Manager.tpMax = function(actor) {
        if (actor && actor.maxTp) return Math.max(1, Math.floor(actor.maxTp()));
        return 100;
    };

    Manager.setBattlerTp = function(actor, amount) {
        if (!actor || !actor.setTp) return 0;
        const max = this.tpMax(actor);
        const value = this.clamp(Math.floor(Number(amount || 0)), 0, max);
        actor.setTp(value);
        return value;
    };

    Manager.gainBattler = function(battler, amount, reason) {
        if (!battler || !battler.isActor || !battler.isActor()) return 0;
        if (!battler.gainTp) return 0;

        const value = Number(amount || 0);
        if (!Number.isFinite(value) || value === 0) return 0;

        battler.gainTp(Math.round(value));
        battler._dexLimitLastReason = String(reason || "");
        return Math.round(value);
    };

    Manager.gainActor = function(actorId, amount, reason) {
        return this.gainBattler(this.actorFromId(actorId), amount, reason);
    };

    Manager.setActor = function(actorId, amount) {
        return this.setBattlerTp(this.actorFromId(actorId), amount);
    };

    Manager.gainParty = function(amount) {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => this.gainBattler(actor, amount, "commandParty"));
    };

    Manager.resetParty = function() {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => this.setBattlerTp(actor, 0));
    };

    Manager.fullParty = function() {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => this.setBattlerTp(actor, this.tpMax(actor)));
    };

    Manager.skillLimitCost = function(skill) {
        return skill ? Math.max(0, Number(skill.tpCost || 0)) : 0;
    };

    //-------------------------------------------------------------------------
    // Plugin Commands
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "GainActor", function(args) {
        Manager.gainActor(Number(args.actorId || 0), Number(args.amount || 0), "pluginCommand");
    });

    PluginManager.registerCommand(pluginName, "SetActor", function(args) {
        Manager.setActor(Number(args.actorId || 0), Number(args.amount || 0));
    });

    PluginManager.registerCommand(pluginName, "GainParty", function(args) {
        Manager.gainParty(Number(args.amount || 0));
    });

    PluginManager.registerCommand(pluginName, "ResetParty", function() {
        Manager.resetParty();
    });

    PluginManager.registerCommand(pluginName, "FullParty", function() {
        Manager.fullParty();
    });

    //-------------------------------------------------------------------------
    // Compatibility aliases
    //-------------------------------------------------------------------------

    Game_Actor.prototype.dexLimitMax = function() {
        return Manager.tpMax(this);
    };

    Game_Actor.prototype.dexLimitValue = function() {
        return Manager.tpValue(this);
    };

    Game_Actor.prototype.setDexLimitResonance = function(value) {
        Manager.setBattlerTp(this, value);
    };

    Game_Actor.prototype.gainDexLimitResonance = function(amount) {
        Manager.gainBattler(this, amount, "compatibility");
    };

    Game_Actor.prototype.canPayDexLimitCost = function(skill) {
        return this.tp >= Manager.skillLimitCost(skill);
    };

    Game_Actor.prototype.payDexLimitCost = function(skill) {
        const cost = Manager.skillLimitCost(skill);
        if (cost > 0) this.gainTp(-cost);
    };

    //-------------------------------------------------------------------------
    // BattleManager reset options
    //-------------------------------------------------------------------------

    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);

        if (SETTINGS.resetAtBattleStart && $gameParty) {
            $gameParty.battleMembers().forEach(actor => {
                Manager.setBattlerTp(actor, SETTINGS.battleStartTp);
            });
        }
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);

        if (SETTINGS.resetAtBattleEnd && $gameParty) {
            $gameParty.battleMembers().forEach(actor => Manager.setBattlerTp(actor, 0));
        }
    };

    //-------------------------------------------------------------------------
    // Native TP visual replacement
    //-------------------------------------------------------------------------

    const _Sprite_Gauge_label = Sprite_Gauge.prototype.label;
    Sprite_Gauge.prototype.label = function() {
        if (this._statusType === "tp" && SETTINGS.renameNativeTp) {
            return SETTINGS.gaugeLabel;
        }

        return _Sprite_Gauge_label.call(this);
    };

    const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
    Sprite_Gauge.prototype.gaugeColor1 = function() {
        if (this._statusType === "tp" && SETTINGS.recolorNativeTp) {
            return SETTINGS.color1;
        }

        return _Sprite_Gauge_gaugeColor1.call(this);
    };

    const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
    Sprite_Gauge.prototype.gaugeColor2 = function() {
        if (this._statusType === "tp" && SETTINGS.recolorNativeTp) {
            return SETTINGS.color2;
        }

        return _Sprite_Gauge_gaugeColor2.call(this);
    };

    //-------------------------------------------------------------------------
    // Sprite_DexTpResonanceGauge
    //-------------------------------------------------------------------------

    function Sprite_DexTpResonanceGauge() {
        this.initialize(...arguments);
    }

    Sprite_DexTpResonanceGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_DexTpResonanceGauge.prototype.constructor = Sprite_DexTpResonanceGauge;

    Sprite_DexTpResonanceGauge.prototype.bitmapWidth = function() {
        return SETTINGS.gaugeWidth;
    };

    Sprite_DexTpResonanceGauge.prototype.gaugeX = function() {
        return SETTINGS.gaugeLabelWidth;
    };

    Sprite_DexTpResonanceGauge.prototype.currentValue = function() {
        return Manager.tpValue(this._battler);
    };

    Sprite_DexTpResonanceGauge.prototype.currentMaxValue = function() {
        return Manager.tpMax(this._battler);
    };

    Sprite_DexTpResonanceGauge.prototype.label = function() {
        return SETTINGS.gaugeLabel;
    };

    Sprite_DexTpResonanceGauge.prototype.gaugeColor1 = function() {
        return SETTINGS.color1;
    };

    Sprite_DexTpResonanceGauge.prototype.gaugeColor2 = function() {
        return SETTINGS.color2;
    };

    Sprite_DexTpResonanceGauge.prototype.valueColor = function() {
        return ColorManager.normalColor();
    };

    Sprite_DexTpResonanceGauge.prototype.drawGauge = function() {
        const gaugeX = this.gaugeX();
        const gaugeY = this.textHeight() - this.gaugeHeight();
        const gaugeWidth = this.bitmapWidth() - gaugeX;
        const gaugeHeight = this.gaugeHeight();
        const rate = this.gaugeRate();
        const fillW = Math.floor(gaugeWidth * rate);

        this.bitmap.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight, ColorManager.gaugeBackColor());
        this.bitmap.gradientFillRect(gaugeX, gaugeY, fillW, gaugeHeight, this.gaugeColor1(), this.gaugeColor2());
        this.drawDexTpSeparators(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
    };

    Sprite_DexTpResonanceGauge.prototype.drawDexTpSeparators = function(gaugeX, gaugeY, gaugeWidth, gaugeHeight) {
        const max = this.currentMaxValue();
        if (max <= 0) return;

        for (let i = 0; i < SETTINGS.thresholds.length; i++) {
            const threshold = SETTINGS.thresholds[i];

            if (threshold <= 0 || threshold >= max) continue;

            const x = gaugeX + Math.floor(gaugeWidth * (threshold / max));
            this.bitmap.fillRect(x, gaugeY - 1, 2, gaugeHeight + 2, SETTINGS.separatorColor);
        }
    };

    Sprite_DexTpResonanceGauge.prototype.drawValue = function() {
        if (!SETTINGS.showValue) return;

        const currentValue = this.currentValue();
        const width = this.bitmapWidth();
        const height = this.textHeight();

        this.setupValueFont();
        this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
    };

    //-------------------------------------------------------------------------
    // Window integration
    //-------------------------------------------------------------------------

    Window_StatusBase.prototype.placeDexTpResonanceGauge = function(actor, x, y) {
        const key = "actor" + actor.actorId() + "-dexTpResonance";
        const sprite = this.createInnerSprite(key, Sprite_DexTpResonanceGauge);
        sprite.setup(actor, "dexTpResonance");
        sprite.move(x, y);
        sprite.show();
    };

    const _Window_StatusBase_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
    Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
        _Window_StatusBase_placeBasicGauges.call(this, actor, x, y);

        const inBattle = !!($gameParty && $gameParty.inBattle && $gameParty.inBattle());
        const shouldShow = inBattle ? SETTINGS.showInBattleStatus : SETTINGS.showInMenuStatus;
        if (!shouldShow || !actor) return;

        const nativeTpVisible = !!($dataSystem && $dataSystem.optDisplayTp);
        if (nativeTpVisible) return;

        const lineOffset = SETTINGS.battleGaugeLineOffset >= 0
            ? SETTINGS.battleGaugeLineOffset
            : 2;

        this.placeDexTpResonanceGauge(actor, x, y + this.lineHeight() * lineOffset);
    };

    //-------------------------------------------------------------------------
    // Battle HUD window
    //-------------------------------------------------------------------------

    function Window_DexTpResonanceHud() {
        this.initialize(...arguments);
    }

    Window_DexTpResonanceHud.prototype = Object.create(Window_StatusBase.prototype);
    Window_DexTpResonanceHud.prototype.constructor = Window_DexTpResonanceHud;

    Window_DexTpResonanceHud.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._dexReferenceStatusWindow = null;
        this._dexLastSignature = "";
        this.opacity = SETTINGS.battleHudWindowOpacity;
        this.backOpacity = Math.min(192, SETTINGS.battleHudWindowOpacity);
        this.refresh();
    };

    Window_DexTpResonanceHud.prototype.setReferenceStatusWindow = function(window) {
        this._dexReferenceStatusWindow = window || null;
        this.updatePlacement(true);
    };

    Window_DexTpResonanceHud.prototype.lineHeight = function() {
        return SETTINGS.battleHudLineHeight;
    };

    Window_DexTpResonanceHud.prototype.activeMembers = function() {
        if (!$gameParty || !$gameParty.battleMembers) return [];
        return $gameParty.battleMembers().filter(actor => actor);
    };

    Window_DexTpResonanceHud.prototype.desiredWidth = function() {
        return Math.min(SETTINGS.battleHudWidth, Math.max(220, Graphics.boxWidth - 24));
    };

    Window_DexTpResonanceHud.prototype.desiredHeight = function() {
        const rows = Math.max(1, this.activeMembers().length);
        return this.padding * 2 + rows * this.lineHeight();
    };

    Window_DexTpResonanceHud.prototype.updatePlacement = function(force) {
        const width = this.desiredWidth();
        const height = this.desiredHeight();
        let x = SETTINGS.battleHudX;
        let y = SETTINGS.battleHudY;

        if (SETTINGS.battleHudAutoPosition) {
            const statusWindow = this._dexReferenceStatusWindow;
            const baseX = statusWindow ? statusWindow.x : 0;
            const baseY = statusWindow ? statusWindow.y : Graphics.boxHeight;
            const baseW = statusWindow ? statusWindow.width : Graphics.boxWidth;

            x = baseX + Math.floor((baseW - width) / 2);
            y = baseY - height - SETTINGS.battleHudMarginBottom;
        }

        x = Math.max(0, Math.min(Graphics.boxWidth - width, Math.floor(x)));
        y = Math.max(0, Math.min(Graphics.boxHeight - height, Math.floor(y)));

        if (force || this.x !== x || this.y !== y || this.width !== width || this.height !== height) {
            this.move(x, y, width, height);
            this.createContents();
            this._dexLastSignature = "";
            this.refresh();
        }
    };

    Window_DexTpResonanceHud.prototype.update = function() {
        Window_StatusBase.prototype.update.call(this);
        this.updatePlacement(false);

        const visible = !!($gameParty && $gameParty.inBattle && $gameParty.inBattle());
        this.visible = visible;
        if (!visible) return;

        const signature = this.makeSignature();
        if (signature !== this._dexLastSignature) {
            this._dexLastSignature = signature;
            this.refresh();
        }
    };

    Window_DexTpResonanceHud.prototype.makeSignature = function() {
        return this.activeMembers().map(actor => {
            return [
                actor.actorId(),
                actor.name(),
                Manager.tpValue(actor),
                Manager.tpMax(actor)
            ].join(":");
        }).join("|") + "|" + Graphics.boxWidth + "x" + Graphics.boxHeight;
    };

    Window_DexTpResonanceHud.prototype.refresh = function() {
        if (!this.contents) return;
        this.contents.clear();

        const members = this.activeMembers();
        const rowHeight = this.lineHeight();
        const contentWidth = this.innerWidth;

        for (let i = 0; i < members.length; i++) {
            this.drawActorDexTpLine(members[i], 0, i * rowHeight, contentWidth, rowHeight);
        }
    };

    Window_DexTpResonanceHud.prototype.drawActorDexTpLine = function(actor, x, y, width, height) {
        const nameWidth = Math.min(SETTINGS.battleHudActorNameWidth, Math.floor(width * 0.42));
        const labelWidth = SETTINGS.gaugeLabelWidth;
        const gaugeX = x + nameWidth + labelWidth;
        const gaugeWidth = Math.max(80, width - nameWidth - labelWidth);
        const gaugeHeight = 12;
        const gaugeY = y + Math.floor((height - gaugeHeight) / 2) + 3;
        const current = Manager.tpValue(actor);
        const max = Manager.tpMax(actor);
        const rate = max > 0 ? Manager.clamp(current / max, 0, 1) : 0;
        const fillWidth = Math.floor(gaugeWidth * rate);

        this.changeTextColor(ColorManager.normalColor());
        this.drawText(actor.name(), x, y, nameWidth - 6, height, "left");

        this.changeTextColor(ColorManager.systemColor());
        this.drawText(SETTINGS.gaugeLabel, x + nameWidth, y, labelWidth - 4, height, "left");

        this.contents.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight, ColorManager.gaugeBackColor());
        this.contents.gradientFillRect(gaugeX, gaugeY, fillWidth, gaugeHeight, SETTINGS.color1, SETTINGS.color2);
        this.drawDexTpHudSeparators(gaugeX, gaugeY, gaugeWidth, gaugeHeight, max);

        if (SETTINGS.showValue) {
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(String(current), gaugeX, y, gaugeWidth - 4, height, "right");
        }

        this.resetTextColor();
    };

    Window_DexTpResonanceHud.prototype.drawDexTpHudSeparators = function(gaugeX, gaugeY, gaugeWidth, gaugeHeight, max) {
        if (max <= 0) return;

        for (let i = 0; i < SETTINGS.thresholds.length; i++) {
            const threshold = SETTINGS.thresholds[i];
            if (threshold <= 0 || threshold >= max) continue;

            const x = gaugeX + Math.floor(gaugeWidth * (threshold / max));
            this.contents.fillRect(x, gaugeY - 2, 2, gaugeHeight + 4, SETTINGS.separatorColor);
        }
    };

    const _Scene_Battle_createAllWindows_DexTp = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows_DexTp.call(this);

        if (SETTINGS.showBattleHud) {
            this.createDexTpResonanceHudWindow();
        }
    };

    Scene_Battle.prototype.createDexTpResonanceHudWindow = function() {
        const rect = new Rectangle(0, 0, SETTINGS.battleHudWidth, 80);
        this._dexTpResonanceHudWindow = new Window_DexTpResonanceHud(rect);
        this._dexTpResonanceHudWindow.setReferenceStatusWindow(this._statusWindow);
        this.addWindow(this._dexTpResonanceHudWindow);
    };

    //-------------------------------------------------------------------------
    // Skill TP cost drawing as RES
    //-------------------------------------------------------------------------

    const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        const cost = skill ? Number(skill.tpCost || 0) : 0;

        if (cost > 0) {
            this.changeTextColor(ColorManager.textColor(SETTINGS.costColorIndex));
            this.drawText(cost + " " + SETTINGS.costLabel, x, y, width, "right");
            this.resetTextColor();
        } else {
            _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
        }
    };

})();
