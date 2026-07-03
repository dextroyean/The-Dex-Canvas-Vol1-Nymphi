//=============================================================================
// Dex_LimitResonance.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.1] Barra tipo Limit/Resonancia por actor con HUD de batalla, separadores, costos por notetag y ganancias configurables.
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
 * @param maxValue
 * @parent --- General ---
 * @text Máximo Predeterminado
 * @type number
 * @min 1
 * @default 100
 *
 * @param initialValue
 * @parent --- General ---
 * @text Valor Inicial
 * @type number
 * @min 0
 * @default 0
 *
 * @param resetAtBattleStart
 * @parent --- General ---
 * @text Reiniciar al Iniciar Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param resetAtBattleEnd
 * @parent --- General ---
 * @text Reiniciar al Terminar Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param --- Ganancias ---
 * @default
 *
 * @param gainOnDealtDamage
 * @parent --- Ganancias ---
 * @text Ganancia al Dañar
 * @type number
 * @min 0
 * @default 3
 *
 * @param gainOnReceivedDamage
 * @parent --- Ganancias ---
 * @text Ganancia al Recibir Daño
 * @type number
 * @min 0
 * @default 7
 *
 * @param gainOnHealing
 * @parent --- Ganancias ---
 * @text Ganancia al Curar
 * @type number
 * @min 0
 * @default 5
 *
 * @param damageDivisor
 * @parent --- Ganancias ---
 * @text Daño por Punto Extra
 * @type number
 * @min 0
 * @desc 250 = cada 250 de daño añade +1. 0 = desactivado.
 * @default 250
 *
 * @param allowOutOfBattleGain
 * @parent --- Ganancias ---
 * @text Ganar Fuera de Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param --- Visual ---
 * @default
 *
 * @param showInBattleStatus
 * @parent --- Visual ---
 * @text Mostrar en Estado de Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param showInMenuStatus
 * @parent --- Visual ---
 * @text Mostrar en Menú
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param showBattleHud
 * @parent --- Visual ---
 * @text Mostrar HUD en Batalla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Muestra una ventana independiente con Resonancia. Ideal si tu HUD personalizado no usa las barras base de MZ.
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
 * @text Línea de Barra en Batalla
 * @type number
 * @min -1
 * @desc -1 = automático. 0 HP, 1 MP, 2 TP, 3 debajo de TP.
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
 * @text Ganar Resonancia
 * @desc Suma o resta Resonancia a un actor.
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
 * @text Fijar Resonancia
 * @desc Establece la Resonancia exacta de un actor.
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
 * @max 999
 * @default 0
 *
 * @command GainParty
 * @text Ganar Resonancia Grupo
 * @desc Suma o resta Resonancia a todos los miembros activos del grupo.
 *
 * @arg amount
 * @text Cantidad
 * @type number
 * @min -999
 * @max 999
 * @default 10
 *
 * @command ResetParty
 * @text Reiniciar Resonancia Grupo
 * @desc Pone la Resonancia de todos los miembros activos en 0.
 *
 * @command FullParty
 * @text Llenar Resonancia Grupo
 * @desc Llena la Resonancia de todos los miembros activos.
 *
 * @help
 * ==========================================================================
 * Dex_LimitResonance v1.0.1
 * ==========================================================================
 *
 * Crea una barra tipo Limit llamada Resonancia para cada actor.
 * No reemplaza el TP y no cambia tus jobs ni skills automáticamente.
 * Incluye un HUD independiente de batalla para layouts personalizados.
 * Sirve como base para separar futuros especiales en un tipo de habilidad
 * llamado, por ejemplo, Especiales.
 *
 * ==========================================================================
 * NOTETAGS DE SKILLS
 * ==========================================================================
 *
 * <LimitCost: 25>
 * <ResonanceCost: 25>
 *   La skill cuesta esa cantidad de Resonancia.
 *
 * <LimitGainUser: 10>
 * <ResonanceGainUser: 10>
 *   El usuario gana esa cantidad cada vez que la skill aplica su efecto.
 *
 * <LimitGainTarget: 10>
 * <ResonanceGainTarget: 10>
 *   El objetivo gana esa cantidad cada vez que la skill aplica su efecto.
 *
 * ==========================================================================
 * NOTETAGS DE ACTORES O CLASES
 * ==========================================================================
 *
 * <LimitMax: 100>
 * <ResonanceMax: 100>
 *   Cambia el máximo de Resonancia para ese actor o clase.
 *
 * <LimitInitial: 0>
 * <ResonanceInitial: 0>
 *   Valor inicial al crear el actor.
 *
 * <LimitGainRate: 1.25>
 * <ResonanceGainRate: 1.25>
 *   Multiplica las ganancias automáticas de Resonancia.
 *
 * ==========================================================================
 * GANANCIAS AUTOMÁTICAS
 * ==========================================================================
 *
 * Por defecto los actores ganan Resonancia al:
 * - Hacer daño.
 * - Recibir daño.
 * - Curar HP a aliados.
 *
 * El parry se conectará después desde Dex_AuraSync. Este plugin ya expone:
 *
 * Dex.LimitResonance.gainActor(actorId, amount, reason)
 * Dex.LimitResonance.setActor(actorId, amount)
 * Dex.LimitResonance.gainBattler(actor, amount, reason)
 *
 * Ejemplo en script:
 * Dex.LimitResonance.gainActor(1, 12, "parryPerfect")
 *
 * ==========================================================================
 * COMPATIBILIDAD DE GUARDADO
 * ==========================================================================
 *
 * El plugin sólo guarda números en Game_Actor. No guarda sprites, bitmaps,
 * ventanas ni objetos gráficos dentro de eventos.
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
        maxValue: Math.max(1, numberParam("maxValue", 100)),
        initialValue: Math.max(0, numberParam("initialValue", 0)),
        resetAtBattleStart: boolParam("resetAtBattleStart", false),
        resetAtBattleEnd: boolParam("resetAtBattleEnd", false),

        gainOnDealtDamage: Math.max(0, numberParam("gainOnDealtDamage", 3)),
        gainOnReceivedDamage: Math.max(0, numberParam("gainOnReceivedDamage", 7)),
        gainOnHealing: Math.max(0, numberParam("gainOnHealing", 5)),
        damageDivisor: Math.max(0, numberParam("damageDivisor", 250)),
        allowOutOfBattleGain: boolParam("allowOutOfBattleGain", true),

        showInBattleStatus: boolParam("showInBattleStatus", true),
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
    Manager.version = "1.0.1";
    Manager.settings = SETTINGS;

    Manager.clamp = function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    Manager.metaNumber = function(data, names, fallback) {
        if (!data || !data.meta) return fallback;

        for (let i = 0; i < names.length; i++) {
            const name = names[i];

            if (Object.prototype.hasOwnProperty.call(data.meta, name)) {
                const value = Number(data.meta[name]);
                return Number.isFinite(value) ? value : fallback;
            }
        }

        return fallback;
    };

    Manager.skillLimitCost = function(skill) {
        return Math.max(0, this.metaNumber(skill, [
            "LimitCost",
            "ResonanceCost",
            "ResonanciaCost",
            "CostoResonancia"
        ], 0));
    };

    Manager.skillGainUser = function(skill) {
        return this.metaNumber(skill, [
            "LimitGainUser",
            "ResonanceGainUser",
            "ResonanciaGainUser",
            "GananciaResonanciaUsuario"
        ], 0);
    };

    Manager.skillGainTarget = function(skill) {
        return this.metaNumber(skill, [
            "LimitGainTarget",
            "ResonanceGainTarget",
            "ResonanciaGainTarget",
            "GananciaResonanciaObjetivo"
        ], 0);
    };

    Manager.actorClassData = function(actor) {
        return actor && actor.currentClass ? actor.currentClass() : null;
    };

    Manager.actorData = function(actor) {
        return actor && actor.actor ? actor.actor() : null;
    };

    Manager.actorLimitMax = function(actor) {
        const classData = this.actorClassData(actor);
        const actorData = this.actorData(actor);
        let value = this.metaNumber(classData, ["LimitMax", "ResonanceMax", "ResonanciaMax"], null);

        if (!Number.isFinite(value)) {
            value = this.metaNumber(actorData, ["LimitMax", "ResonanceMax", "ResonanciaMax"], SETTINGS.maxValue);
        }

        return Math.max(1, Math.floor(value));
    };

    Manager.actorInitialLimit = function(actor) {
        const classData = this.actorClassData(actor);
        const actorData = this.actorData(actor);
        let value = this.metaNumber(classData, ["LimitInitial", "ResonanceInitial", "ResonanciaInitial"], null);

        if (!Number.isFinite(value)) {
            value = this.metaNumber(actorData, ["LimitInitial", "ResonanceInitial", "ResonanciaInitial"], SETTINGS.initialValue);
        }

        return this.clamp(Math.floor(value), 0, this.actorLimitMax(actor));
    };

    Manager.actorGainRate = function(actor) {
        const classData = this.actorClassData(actor);
        const actorData = this.actorData(actor);
        let value = this.metaNumber(classData, ["LimitGainRate", "ResonanceGainRate", "ResonanciaGainRate"], null);

        if (!Number.isFinite(value)) {
            value = this.metaNumber(actorData, ["LimitGainRate", "ResonanceGainRate", "ResonanciaGainRate"], 1);
        }

        return Number.isFinite(value) ? Math.max(0, value) : 1;
    };

    Manager.actorFromId = function(actorId) {
        const id = Number(actorId || 0);

        if (id > 0) {
            return $gameActors ? $gameActors.actor(id) : null;
        }

        return $gameParty ? $gameParty.leader() : null;
    };

    Manager.canGainNow = function() {
        if (SETTINGS.allowOutOfBattleGain) return true;
        return !!($gameParty && $gameParty.inBattle && $gameParty.inBattle());
    };

    Manager.gainBattler = function(battler, amount, reason) {
        if (!battler || !battler.isActor || !battler.isActor()) return 0;
        if (!this.canGainNow()) return 0;

        const value = Number(amount || 0);
        if (!Number.isFinite(value) || value === 0) return 0;

        const finalAmount = Math.round(value * this.actorGainRate(battler));
        battler.gainDexLimitResonance(finalAmount);
        battler._dexLimitLastReason = String(reason || "");
        return finalAmount;
    };

    Manager.gainActor = function(actorId, amount, reason) {
        return this.gainBattler(this.actorFromId(actorId), amount, reason);
    };

    Manager.setActor = function(actorId, amount) {
        const actor = this.actorFromId(actorId);
        if (!actor || !actor.setDexLimitResonance) return;
        actor.setDexLimitResonance(Number(amount || 0));
    };

    Manager.extraFromDamage = function(value) {
        if (SETTINGS.damageDivisor <= 0) return 0;
        return Math.floor(Math.max(0, Math.abs(Number(value || 0))) / SETTINGS.damageDivisor);
    };

    Manager.processHpDamage = function(subject, target, value) {
        const amount = Number(value || 0);
        if (!Number.isFinite(amount) || amount === 0) return;

        if (amount > 0) {
            if (subject && subject.isActor && subject.isActor() && target && target.isEnemy && target.isEnemy()) {
                this.gainBattler(subject, SETTINGS.gainOnDealtDamage + this.extraFromDamage(amount), "dealtDamage");
            }

            if (target && target.isActor && target.isActor()) {
                this.gainBattler(target, SETTINGS.gainOnReceivedDamage + this.extraFromDamage(amount), "receivedDamage");
            }
        } else if (amount < 0) {
            if (subject && subject.isActor && subject.isActor() && target && target.isActor && target.isActor()) {
                this.gainBattler(subject, SETTINGS.gainOnHealing + this.extraFromDamage(amount), "healing");
            }
        }
    };

    Manager.gainParty = function(amount) {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => this.gainBattler(actor, amount, "commandParty"));
    };

    Manager.resetParty = function() {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => actor.setDexLimitResonance(0));
    };

    Manager.fullParty = function() {
        if (!$gameParty) return;
        $gameParty.battleMembers().forEach(actor => actor.setDexLimitResonance(actor.dexLimitMax()));
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
    // Game_Actor
    //-------------------------------------------------------------------------

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        this.initDexLimitResonance();
    };

    Game_Actor.prototype.initDexLimitResonance = function() {
        this._dexLimitResonance = Manager.actorInitialLimit(this);
    };

    Game_Actor.prototype.dexLimitMax = function() {
        return Manager.actorLimitMax(this);
    };

    Game_Actor.prototype.dexLimitValue = function() {
        if (!Number.isFinite(this._dexLimitResonance)) {
            this._dexLimitResonance = Manager.actorInitialLimit(this);
        }

        this._dexLimitResonance = Manager.clamp(
            Math.floor(this._dexLimitResonance),
            0,
            this.dexLimitMax()
        );

        return this._dexLimitResonance;
    };

    Game_Actor.prototype.setDexLimitResonance = function(value) {
        const amount = Number(value || 0);
        this._dexLimitResonance = Manager.clamp(
            Math.floor(Number.isFinite(amount) ? amount : 0),
            0,
            this.dexLimitMax()
        );
    };

    Game_Actor.prototype.gainDexLimitResonance = function(amount) {
        this.setDexLimitResonance(this.dexLimitValue() + Number(amount || 0));
    };

    Game_Actor.prototype.canPayDexLimitCost = function(skill) {
        return this.dexLimitValue() >= Manager.skillLimitCost(skill);
    };

    Game_Actor.prototype.payDexLimitCost = function(skill) {
        const cost = Manager.skillLimitCost(skill);
        if (cost > 0) {
            this.gainDexLimitResonance(-cost);
        }
    };

    const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) {
        _Game_Actor_changeClass.call(this, classId, keepExp);
        this.setDexLimitResonance(this.dexLimitValue());
    };

    //-------------------------------------------------------------------------
    // Skill costs
    //-------------------------------------------------------------------------

    const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        const base = _Game_BattlerBase_canPaySkillCost.call(this, skill);

        if (!base) return false;
        if (!this.isActor || !this.isActor()) return true;
        if (!this.canPayDexLimitCost) return true;

        return this.canPayDexLimitCost(skill);
    };

    const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        _Game_BattlerBase_paySkillCost.call(this, skill);

        if (this.isActor && this.isActor() && this.payDexLimitCost) {
            this.payDexLimitCost(skill);
        }
    };

    //-------------------------------------------------------------------------
    // Action gain handling
    //-------------------------------------------------------------------------

    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);
        Manager.processHpDamage(this.subject(), target, value);
    };

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);

        const subject = this.subject();
        const item = this.item();
        const userGain = Manager.skillGainUser(item);
        const targetGain = Manager.skillGainTarget(item);

        if (userGain !== 0) {
            Manager.gainBattler(subject, userGain, "skillUserGain");
        }

        if (targetGain !== 0) {
            Manager.gainBattler(target, targetGain, "skillTargetGain");
        }
    };

    //-------------------------------------------------------------------------
    // BattleManager reset options
    //-------------------------------------------------------------------------

    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);

        if (SETTINGS.resetAtBattleStart && $gameParty) {
            $gameParty.battleMembers().forEach(actor => {
                actor.setDexLimitResonance(SETTINGS.initialValue);
            });
        }
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);

        if (SETTINGS.resetAtBattleEnd && $gameParty) {
            $gameParty.battleMembers().forEach(actor => actor.setDexLimitResonance(0));
        }
    };

    //-------------------------------------------------------------------------
    // Sprite_DexLimitGauge
    //-------------------------------------------------------------------------

    function Sprite_DexLimitGauge() {
        this.initialize(...arguments);
    }

    Sprite_DexLimitGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_DexLimitGauge.prototype.constructor = Sprite_DexLimitGauge;

    Sprite_DexLimitGauge.prototype.bitmapWidth = function() {
        return SETTINGS.gaugeWidth;
    };

    Sprite_DexLimitGauge.prototype.gaugeX = function() {
        return SETTINGS.gaugeLabelWidth;
    };

    Sprite_DexLimitGauge.prototype.currentValue = function() {
        if (this._battler && this._battler.dexLimitValue) {
            return this._battler.dexLimitValue();
        }

        return 0;
    };

    Sprite_DexLimitGauge.prototype.currentMaxValue = function() {
        if (this._battler && this._battler.dexLimitMax) {
            return this._battler.dexLimitMax();
        }

        return SETTINGS.maxValue;
    };

    Sprite_DexLimitGauge.prototype.label = function() {
        return SETTINGS.gaugeLabel;
    };

    Sprite_DexLimitGauge.prototype.gaugeColor1 = function() {
        return SETTINGS.color1;
    };

    Sprite_DexLimitGauge.prototype.gaugeColor2 = function() {
        return SETTINGS.color2;
    };

    Sprite_DexLimitGauge.prototype.valueColor = function() {
        return ColorManager.normalColor();
    };

    Sprite_DexLimitGauge.prototype.drawGauge = function() {
        const gaugeX = this.gaugeX();
        const gaugeY = this.textHeight() - this.gaugeHeight();
        const gaugeWidth = this.bitmapWidth() - gaugeX;
        const gaugeHeight = this.gaugeHeight();
        const rate = this.gaugeRate();
        const fillW = Math.floor(gaugeWidth * rate);

        this.bitmap.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight, ColorManager.gaugeBackColor());
        this.bitmap.gradientFillRect(gaugeX, gaugeY, fillW, gaugeHeight, this.gaugeColor1(), this.gaugeColor2());
        this.drawDexLimitSeparators(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
    };

    Sprite_DexLimitGauge.prototype.drawDexLimitSeparators = function(gaugeX, gaugeY, gaugeWidth, gaugeHeight) {
        const max = this.currentMaxValue();
        if (max <= 0) return;

        for (let i = 0; i < SETTINGS.thresholds.length; i++) {
            const threshold = SETTINGS.thresholds[i];

            if (threshold <= 0 || threshold >= max) continue;

            const x = gaugeX + Math.floor(gaugeWidth * (threshold / max));
            this.bitmap.fillRect(x, gaugeY - 1, 2, gaugeHeight + 2, SETTINGS.separatorColor);
        }
    };

    Sprite_DexLimitGauge.prototype.drawValue = function() {
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

    Window_StatusBase.prototype.placeDexLimitGauge = function(actor, x, y) {
        const key = "actor" + actor.actorId() + "-dexLimitResonance";
        const sprite = this.createInnerSprite(key, Sprite_DexLimitGauge);
        sprite.setup(actor, "dexLimitResonance");
        sprite.move(x, y);
        sprite.show();
    };

    const _Window_StatusBase_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
    Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
        _Window_StatusBase_placeBasicGauges.call(this, actor, x, y);

        const inBattle = !!($gameParty && $gameParty.inBattle && $gameParty.inBattle());
        const shouldShow = inBattle ? SETTINGS.showInBattleStatus : SETTINGS.showInMenuStatus;

        if (!shouldShow || !actor || !actor.dexLimitValue) return;

        const automaticOffset = $dataSystem && $dataSystem.optDisplayTp ? 3 : 2;
        const lineOffset = SETTINGS.battleGaugeLineOffset >= 0
            ? SETTINGS.battleGaugeLineOffset
            : automaticOffset;

        this.placeDexLimitGauge(actor, x, y + this.lineHeight() * lineOffset);
    };


    //-------------------------------------------------------------------------
    // Battle HUD window
    //-------------------------------------------------------------------------

    function Window_DexLimitResonanceHud() {
        this.initialize(...arguments);
    }

    Window_DexLimitResonanceHud.prototype = Object.create(Window_StatusBase.prototype);
    Window_DexLimitResonanceHud.prototype.constructor = Window_DexLimitResonanceHud;

    Window_DexLimitResonanceHud.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._dexReferenceStatusWindow = null;
        this._dexLastSignature = "";
        this.opacity = SETTINGS.battleHudWindowOpacity;
        this.backOpacity = Math.min(192, SETTINGS.battleHudWindowOpacity);
        this.refresh();
    };

    Window_DexLimitResonanceHud.prototype.setReferenceStatusWindow = function(window) {
        this._dexReferenceStatusWindow = window || null;
        this.updatePlacement(true);
    };

    Window_DexLimitResonanceHud.prototype.lineHeight = function() {
        return SETTINGS.battleHudLineHeight;
    };

    Window_DexLimitResonanceHud.prototype.activeMembers = function() {
        if (!$gameParty || !$gameParty.battleMembers) return [];
        return $gameParty.battleMembers().filter(actor => actor && actor.dexLimitValue);
    };

    Window_DexLimitResonanceHud.prototype.desiredWidth = function() {
        return Math.min(SETTINGS.battleHudWidth, Math.max(220, Graphics.boxWidth - 24));
    };

    Window_DexLimitResonanceHud.prototype.desiredHeight = function() {
        const rows = Math.max(1, this.activeMembers().length);
        return this.padding * 2 + rows * this.lineHeight();
    };

    Window_DexLimitResonanceHud.prototype.updatePlacement = function(force) {
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

    Window_DexLimitResonanceHud.prototype.update = function() {
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

    Window_DexLimitResonanceHud.prototype.makeSignature = function() {
        return this.activeMembers().map(actor => {
            return [
                actor.actorId(),
                actor.name(),
                actor.dexLimitValue(),
                actor.dexLimitMax()
            ].join(":");
        }).join("|") + "|" + Graphics.boxWidth + "x" + Graphics.boxHeight;
    };

    Window_DexLimitResonanceHud.prototype.refresh = function() {
        if (!this.contents) return;
        this.contents.clear();

        const members = this.activeMembers();
        const rowHeight = this.lineHeight();
        const contentWidth = this.innerWidth;

        for (let i = 0; i < members.length; i++) {
            this.drawActorDexLimitLine(members[i], 0, i * rowHeight, contentWidth, rowHeight);
        }
    };

    Window_DexLimitResonanceHud.prototype.drawActorDexLimitLine = function(actor, x, y, width, height) {
        const nameWidth = Math.min(SETTINGS.battleHudActorNameWidth, Math.floor(width * 0.42));
        const labelWidth = SETTINGS.gaugeLabelWidth;
        const gaugeX = x + nameWidth + labelWidth;
        const gaugeWidth = Math.max(80, width - nameWidth - labelWidth);
        const gaugeHeight = 12;
        const gaugeY = y + Math.floor((height - gaugeHeight) / 2) + 3;
        const current = actor.dexLimitValue();
        const max = actor.dexLimitMax();
        const rate = max > 0 ? Manager.clamp(current / max, 0, 1) : 0;
        const fillWidth = Math.floor(gaugeWidth * rate);

        this.changeTextColor(ColorManager.normalColor());
        this.drawText(actor.name(), x, y, nameWidth - 6, height, "left");

        this.changeTextColor(ColorManager.systemColor());
        this.drawText(SETTINGS.gaugeLabel, x + nameWidth, y, labelWidth - 4, height, "left");

        this.contents.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight, ColorManager.gaugeBackColor());
        this.contents.gradientFillRect(gaugeX, gaugeY, fillWidth, gaugeHeight, SETTINGS.color1, SETTINGS.color2);
        this.drawDexLimitHudSeparators(gaugeX, gaugeY, gaugeWidth, gaugeHeight, max);

        if (SETTINGS.showValue) {
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(String(current), gaugeX, y, gaugeWidth - 4, height, "right");
        }

        this.resetTextColor();
    };

    Window_DexLimitResonanceHud.prototype.drawDexLimitHudSeparators = function(gaugeX, gaugeY, gaugeWidth, gaugeHeight, max) {
        if (max <= 0) return;

        for (let i = 0; i < SETTINGS.thresholds.length; i++) {
            const threshold = SETTINGS.thresholds[i];
            if (threshold <= 0 || threshold >= max) continue;

            const x = gaugeX + Math.floor(gaugeWidth * (threshold / max));
            this.contents.fillRect(x, gaugeY - 2, 2, gaugeHeight + 4, SETTINGS.separatorColor);
        }
    };

    const _Scene_Battle_createAllWindows_DexLimit = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows_DexLimit.call(this);

        if (SETTINGS.showBattleHud) {
            this.createDexLimitResonanceHudWindow();
        }
    };

    Scene_Battle.prototype.createDexLimitResonanceHudWindow = function() {
        const rect = new Rectangle(0, 0, SETTINGS.battleHudWidth, 80);
        this._dexLimitHudWindow = new Window_DexLimitResonanceHud(rect);
        this._dexLimitHudWindow.setReferenceStatusWindow(this._statusWindow);
        this.addWindow(this._dexLimitHudWindow);
    };

    //-------------------------------------------------------------------------
    // Skill cost drawing
    //-------------------------------------------------------------------------

    const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        const cost = Manager.skillLimitCost(skill);

        if (cost > 0) {
            this.changeTextColor(ColorManager.textColor(SETTINGS.costColorIndex));
            this.drawText(cost + " " + SETTINGS.costLabel, x, y, width, "right");
            this.resetTextColor();
        } else {
            _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
        }
    };

})();
