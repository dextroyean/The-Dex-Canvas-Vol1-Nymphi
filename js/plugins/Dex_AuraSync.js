//=============================================================================
// Dex_AuraSync.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.9.3] Aura Sync 
 * @author The Dex Canvas Team
 *
 * @param perfectSE
 * @text Sonido de Perfecto
 * @desc El efecto de sonido que se escuchará al lograr un parry perfecto.
 * @default Up4
 *
 * @param mitigatedLastVar
 * @text Variable: Último Daño Mitigado
 * @desc ID de la Variable donde se guardará el daño mitigado en el ÚLTIMO golpe.
 * @type variable
 * @default 1
 *
 * @param mitigatedTotalVar
 * @text Variable: Daño Mitigado Total
 * @desc ID de la Variable que acumulará todo el daño mitigado del juego.
 * @type variable
 * @default 2
 *
 * @param enemyIdVar
 * @text Variable: ID del Enemigo
 * @desc ID de la Variable donde se guardará el ID del enemigo que ataca.
 * @type variable
 * @default 3
 *
 * @param defaultMinRings
 * @text Por Defecto: Mínimo Círculos
 * @desc Círculos mínimos si el enemigo o skill no tiene etiqueta.
 * @type number
 * @default 1
 *
 * @param defaultMaxRings
 * @text Por Defecto: Máximo Círculos
 * @desc Círculos máximos si el enemigo o skill no tiene etiqueta.
 * @type number
 * @default 2
 *
 * @param defaultSpeed
 * @text Por Defecto: Velocidad
 * @desc Velocidad base del círculo. Menor número = más fácil/lento.
 * @type text
 * @default 0.053
 *
 * @param defaultColor
 * @text Por Defecto: Color Mágico
 * @desc Color en formato HEX del círculo mágico.
 * @type text
 * @default #a855f7
 *
 * @param defaultParryWindow
 * @text Por Defecto: Ventana Good
 * @desc Ventana total en frames para GOOD. 0 usa la zona clásica por escala.
 * @type number
 * @min 0
 * @default 0
 *
 * @param defaultPerfectWindow
 * @text Por Defecto: Ventana Perfect
 * @desc Ventana total en frames para PERFECT. 0 usa la zona clásica por escala.
 * @type number
 * @min 0
 * @default 0
 *
 * @param defaultSlowMoRate
 * @text Por Defecto: Cámara Lenta Rate
 * @desc Multiplicador de velocidad para cámara lenta. 0.35 = 35% de velocidad.
 * @type text
 * @default 0.35
 *
 * @param defaultSlowMoFrames
 * @text Por Defecto: Frames Cámara Lenta
 * @desc Duración de cámara lenta cuando se activa por notetag.
 * @type number
 * @min 1
 * @default 45
 *
 * @help
 * ============================================================================
 * THE DEX CANVAS - AURA SYNC v1.9.3
 * ============================================================================
 *
 * Esta versión agrega:
 * - Compatibilidad con Dex_DifficultyModes para endurecer parry por dificultad.
 * - Configuración por enemigo jefe.
 * - Configuración por skill.
 * - Prioridad: Skill > Enemigo > Parámetros del plugin.
 * - Cámara lenta opcional.
 * - Texto de tutorial/aviso durante la ventana de parry.
 * - Skills no parryables.
 * - Velocidad variable por círculo.
 *
 * NOTETAGS PARA ENEMIGOS:
 * <AuraSyncRings: 2,3>
 * <AuraSyncSpeed: 0.045>
 * <AuraSyncColor: #ff4444>
 *
 * Velocidad variable:
 * <AuraSyncSpeed: 0.040,0.065>
 *
 * Con dos valores, cada círculo elegirá una velocidad aleatoria entre mínimo
 * y máximo.
 *
 * También puedes usar:
 * <ParryRings: 2,3>
 * <ParrySpeed: 0.045>
 * <ParrySpeed: 0.040,0.065>
 * <ParryColor: #ff4444>
 *
 * NOTETAGS DE DIFICULTAD:
 * <ParryWindow: 18>
 * Ventana total en frames para obtener GOOD. Mayor número = más fácil.
 *
 * <ParryPerfectWindow: 6>
 * Ventana total en frames para obtener PERFECT. Mayor número = más fácil.
 *
 * NOTETAGS PARA SKILLS:
 * <Parryable: true>
 * <ParryWindow: 14>
 * <ParryPerfectWindow: 5>
 * <ParrySlowMo: true>
 * <ParrySlowMoRate: 0.30>
 * <ParrySlowMoFrames: 50>
 * <ParryCueText: ¡Ahora!>
 *
 * Skill sin parry:
 * <Parryable: false>
 *
 * TUTORIAL EN BATALLA:
 * <ParryTutorial: true>
 * <ParryTutorialText: Presiona Z cuando el círculo toque la zona dorada>
 * <ParryTutorialOnce: true>
 * <ParrySlowMo: true>
 * <ParrySlowMoRate: 0.25>
 * <ParrySlowMoFrames: 70>
 *
 * BLOQUEAR PARRY POR ENEMIGO Y SKILL:
 *
 * Para que una skill específica NO tenga parry cuando la usa un enemigo
 * específico, puedes usar cualquiera de estas dos formas:
 *
 * Forma A, en las Notas del enemigo:
 * <NoParrySkills: 12,15>
 *
 * Ese enemigo no permitirá parry cuando use las skills con ID 12 o 15.
 *
 * Forma B, en las Notas de la skill:
 * <NoParryEnemies: 3,7>
 *
 * Esa skill no tendrá parry cuando la usen los enemigos con ID 3 o 7.
 *
 * También acepta:
 * <ParryDisabledSkills: 12,15>
 * <AuraSyncNoParrySkills: 12,15>
 * <ParryDisabledEnemies: 3,7>
 * <AuraSyncNoParryEnemies: 3,7>
 *
 * NOTA:
 * La cámara lenta no cambia toda la velocidad del motor. Hace más lento el
 * círculo de parry justo antes de la zona importante para evitar romper turnos.
 */

(() => {
    "use strict";

    const pluginName = "Dex_AuraSync";
    const params = PluginManager.parameters(pluginName);

    const PERFECT_SE = String(params["perfectSE"] || "Up4");
    const VAR_LAST = Number(params["mitigatedLastVar"] || 1);
    const VAR_TOTAL = Number(params["mitigatedTotalVar"] || 2);
    const VAR_ENEMY_ID = Number(params["enemyIdVar"] || 3);

    const DEF_MIN = Number(params["defaultMinRings"] || 1);
    const DEF_MAX = Number(params["defaultMaxRings"] || 2);
    const DEF_SPEED = Number(params["defaultSpeed"] || 0.053);
    const DEF_COLOR = String(params["defaultColor"] || "#a855f7");
    const DEF_PARRY_WINDOW = Number(params["defaultParryWindow"] || 0);
    const DEF_PERFECT_WINDOW = Number(params["defaultPerfectWindow"] || 0);
    const DEF_SLOWMO_RATE = Number(params["defaultSlowMoRate"] || 0.35);
    const DEF_SLOWMO_FRAMES = Number(params["defaultSlowMoFrames"] || 45);

    const getMeta = function(meta, names) {
        if (!meta) return undefined;
        const list = Array.isArray(names) ? names : [names];
        for (let i = 0; i < list.length; i++) {
            if (meta[list[i]] !== undefined) return meta[list[i]];
        }
        return undefined;
    };

    const metaHas = function(meta, names) {
        return getMeta(meta, names) !== undefined;
    };

    const metaString = function(meta, names, fallback) {
        const value = getMeta(meta, names);
        if (value === undefined || value === null || value === true) return fallback;
        return String(value).trim();
    };

    const metaNumber = function(meta, names, fallback) {
        const value = getMeta(meta, names);
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    };

    const metaBoolean = function(meta, names, fallback) {
        const value = getMeta(meta, names);
        if (value === undefined || value === null) return fallback;
        if (value === true) return true;
        const text = String(value).trim().toLowerCase();
        if (["true", "yes", "si", "sí", "1", "on"].includes(text)) return true;
        if (["false", "no", "0", "off"].includes(text)) return false;
        return fallback;
    };

    const parseIdList = function(value) {
        if (value === undefined || value === null || value === true) return [];

        return String(value)
            .split(",")
            .map(n => Number(String(n).trim()))
            .filter(n => Number.isFinite(n) && n > 0)
            .map(n => Math.floor(n));
    };

    const idListContains = function(value, id) {
        const list = parseIdList(value);
        return list.includes(Number(id));
    };

    const parseRings = function(value, fallbackMin, fallbackMax) {
        if (value === undefined || value === null || value === true) {
            return { min: fallbackMin, max: fallbackMax };
        }
        const parts = String(value).split(",").map(n => Number(n.trim()));
        const min = Number.isFinite(parts[0]) ? Math.max(1, Math.floor(parts[0])) : fallbackMin;
        const max = Number.isFinite(parts[1]) ? Math.max(min, Math.floor(parts[1])) : min;
        return { min, max };
    };

    const parseSpeedRange = function(value, fallbackMin, fallbackMax) {
        if (value === undefined || value === null || value === true) {
            const minFallback = Math.max(0.005, Number(fallbackMin) || DEF_SPEED);
            const maxFallback = Math.max(minFallback, Number(fallbackMax) || minFallback);
            return { min: minFallback, max: maxFallback };
        }

        const parts = String(value).split(",").map(n => Number(n.trim()));
        let min = Number.isFinite(parts[0]) ? parts[0] : fallbackMin;
        let max = Number.isFinite(parts[1]) ? parts[1] : min;

        min = Math.max(0.005, Number(min) || DEF_SPEED);
        max = Math.max(0.005, Number(max) || min);

        if (max < min) {
            const temp = min;
            min = max;
            max = temp;
        }

        return { min, max };
    };

    const randomFloatBetween = function(min, max) {
        const a = Number(min);
        const b = Number(max);
        if (!Number.isFinite(a) || !Number.isFinite(b)) return DEF_SPEED;
        if (Math.abs(a - b) < 0.000001) return a;
        return a + Math.random() * (b - a);
    };

    const clamp = function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    const randomIntBetween = function(min, max) {
        const a = Math.floor(min);
        const b = Math.floor(max);
        return Math.floor(Math.random() * (b - a + 1)) + a;
    };

    const auraDifficultyWindowRate = function() {
        if (window.DexDifficulty && typeof DexDifficulty.parryWindowRate === "function") {
            const value = Number(DexDifficulty.parryWindowRate());
            return Number.isFinite(value) && value > 0 ? value : 1.0;
        }
        return 1.0;
    };

    const auraDifficultySpeedRate = function() {
        if (window.DexDifficulty && typeof DexDifficulty.parrySpeedRate === "function") {
            const value = Number(DexDifficulty.parrySpeedRate());
            return Number.isFinite(value) && value > 0 ? value : 1.0;
        }
        return 1.0;
    };


    BattleManager.makeAuraSyncConfig = function(subject) {
        const action = this._action;
        const item = action && action.item ? action.item() : null;
        const enemyData = subject && subject.isEnemy && subject.isEnemy() ? subject.enemy() : null;
        const enemyMeta = enemyData ? enemyData.meta || {} : {};
        const skillMeta = item ? item.meta || {} : {};

        const config = {
            parryable: true,
            minRings: DEF_MIN,
            maxRings: DEF_MAX,
            speed: DEF_SPEED,
            speedMin: DEF_SPEED,
            speedMax: DEF_SPEED,
            color: DEF_COLOR,
            goodMin: 0.72,
            goodMax: 1.32,
            perfectMin: 0.92,
            perfectMax: 1.08,
            parryWindowFrames: DEF_PARRY_WINDOW,
            perfectWindowFrames: DEF_PERFECT_WINDOW,
            slowMo: false,
            slowMoRate: DEF_SLOWMO_RATE,
            slowMoFrames: DEF_SLOWMO_FRAMES,
            slowMoTriggerOffset: 0.25,
            cueText: "",
            tutorial: false,
            tutorialText: "",
            tutorialOnce: false,
            tutorialKey: "",
            sourceItemId: item ? item.id : 0,
            sourceEnemyId: enemyData ? enemyData.id : 0
        };

        this.applyAuraSyncMeta(config, enemyMeta);
        this.applyAuraSyncMeta(config, skillMeta);

        const difficultySpeedRate = auraDifficultySpeedRate();
        config.speedMin = Math.max(0.005, (Number(config.speedMin) || DEF_SPEED) * difficultySpeedRate);
        config.speedMax = Math.max(config.speedMin, (Number(config.speedMax) || config.speedMin) * difficultySpeedRate);
        config.speed = (config.speedMin + config.speedMax) / 2;

        const difficultyWindowRate = auraDifficultyWindowRate();
        if (config.parryWindowFrames > 0) {
            config.parryWindowFrames = Math.max(1, Math.round(config.parryWindowFrames * difficultyWindowRate));
        }
        if (config.perfectWindowFrames > 0) {
            config.perfectWindowFrames = Math.max(1, Math.round(config.perfectWindowFrames * difficultyWindowRate));
        }

        config.slowMoRate = clamp(Number(config.slowMoRate) || DEF_SLOWMO_RATE, 0.05, 1);
        config.slowMoFrames = Math.max(1, Math.floor(Number(config.slowMoFrames) || DEF_SLOWMO_FRAMES));
        this.applyAuraSyncWindowFrames(config);

        if (config.tutorial) {
            if (!config.tutorialText) {
                config.tutorialText = "Presiona Z cuando el círculo toque la zona dorada";
            }
            if (!config.cueText) {
                config.cueText = config.tutorialText;
            }
            config.slowMo = true;
        }

        config.tutorialKey = "enemy:" + config.sourceEnemyId + "|skill:" + config.sourceItemId;

        // Bloqueo específico por combinación enemigo + skill.
        // Enemigo: <NoParrySkills: 12,15>
        // Skill:   <NoParryEnemies: 3,7>
        const enemyNoParrySkills = getMeta(enemyMeta, [
            "NoParrySkills",
            "ParryDisabledSkills",
            "AuraSyncNoParrySkills",
            "AuraSyncDisabledSkills"
        ]);

        const skillNoParryEnemies = getMeta(skillMeta, [
            "NoParryEnemies",
            "ParryDisabledEnemies",
            "AuraSyncNoParryEnemies",
            "AuraSyncDisabledEnemies"
        ]);

        if (idListContains(enemyNoParrySkills, config.sourceItemId)) {
            config.parryable = false;
        }

        if (idListContains(skillNoParryEnemies, config.sourceEnemyId)) {
            config.parryable = false;
        }

        if (config.tutorialOnce && $gameSystem.dexAuraSyncTutorialSeen(config.tutorialKey)) {
            config.tutorial = false;
            config.tutorialText = "";
            if (metaHas(skillMeta, ["ParryTutorialText", "AuraSyncTutorialText"]) && !metaHas(skillMeta, ["ParryCueText", "AuraSyncCueText"])) {
                config.cueText = "";
            }
        }

        return config;
    };

    BattleManager.applyAuraSyncMeta = function(config, meta) {
        if (!meta) return;

        if (metaHas(meta, ["AuraSyncParryable", "Parryable"])) {
            config.parryable = metaBoolean(meta, ["AuraSyncParryable", "Parryable"], true);
        }

        const ringsValue = getMeta(meta, ["AuraSyncRings", "ParryRings"]);
        if (ringsValue !== undefined) {
            const rings = parseRings(ringsValue, config.minRings, config.maxRings);
            config.minRings = rings.min;
            config.maxRings = rings.max;
        }

        const speedValue = getMeta(meta, ["AuraSyncSpeed", "ParrySpeed", "AuraSyncSpeedRange", "ParrySpeedRange"]);
        if (speedValue !== undefined) {
            const speedRange = parseSpeedRange(speedValue, config.speedMin, config.speedMax);
            config.speedMin = speedRange.min;
            config.speedMax = speedRange.max;
            config.speed = (config.speedMin + config.speedMax) / 2;
        }

        if (metaHas(meta, ["AuraSyncSpeedMin", "ParrySpeedMin"])) {
            config.speedMin = metaNumber(meta, ["AuraSyncSpeedMin", "ParrySpeedMin"], config.speedMin);
        }

        if (metaHas(meta, ["AuraSyncSpeedMax", "ParrySpeedMax"])) {
            config.speedMax = metaNumber(meta, ["AuraSyncSpeedMax", "ParrySpeedMax"], config.speedMax);
        }

        if (config.speedMax < config.speedMin) {
            const temp = config.speedMin;
            config.speedMin = config.speedMax;
            config.speedMax = temp;
        }

        config.speed = (config.speedMin + config.speedMax) / 2;

        config.color = metaString(meta, ["AuraSyncColor", "ParryColor"], config.color);

        if (metaHas(meta, ["ParryWindow", "AuraSyncWindow"])) {
            config.parryWindowFrames = metaNumber(meta, ["ParryWindow", "AuraSyncWindow"], config.parryWindowFrames);
        }
        if (metaHas(meta, ["ParryPerfectWindow", "AuraSyncPerfectWindow"])) {
            config.perfectWindowFrames = metaNumber(meta, ["ParryPerfectWindow", "AuraSyncPerfectWindow"], config.perfectWindowFrames);
        }

        config.goodMin = metaNumber(meta, ["ParryGoodMin", "AuraSyncGoodMin"], config.goodMin);
        config.goodMax = metaNumber(meta, ["ParryGoodMax", "AuraSyncGoodMax"], config.goodMax);
        config.perfectMin = metaNumber(meta, ["ParryPerfectMin", "AuraSyncPerfectMin"], config.perfectMin);
        config.perfectMax = metaNumber(meta, ["ParryPerfectMax", "AuraSyncPerfectMax"], config.perfectMax);

        if (metaHas(meta, ["ParrySlowMo", "AuraSyncSlowMo"])) {
            config.slowMo = metaBoolean(meta, ["ParrySlowMo", "AuraSyncSlowMo"], config.slowMo);
        }
        config.slowMoRate = metaNumber(meta, ["ParrySlowMoRate", "AuraSyncSlowMoRate"], config.slowMoRate);
        config.slowMoFrames = metaNumber(meta, ["ParrySlowMoFrames", "AuraSyncSlowMoFrames"], config.slowMoFrames);
        config.slowMoTriggerOffset = metaNumber(meta, ["ParrySlowMoOffset", "AuraSyncSlowMoOffset"], config.slowMoTriggerOffset);
        config.cueText = metaString(meta, ["ParryCueText", "AuraSyncCueText"], config.cueText);

        if (metaHas(meta, ["ParryTutorial", "AuraSyncTutorial"])) {
            config.tutorial = metaBoolean(meta, ["ParryTutorial", "AuraSyncTutorial"], config.tutorial);
        }
        config.tutorialText = metaString(meta, ["ParryTutorialText", "AuraSyncTutorialText"], config.tutorialText);
        if (metaHas(meta, ["ParryTutorialOnce", "AuraSyncTutorialOnce"])) {
            config.tutorialOnce = metaBoolean(meta, ["ParryTutorialOnce", "AuraSyncTutorialOnce"], config.tutorialOnce);
        }
    };

    BattleManager.pickAuraSyncSpeed = function(config) {
        if (!config) return DEF_SPEED;
        return randomFloatBetween(config.speedMin || config.speed || DEF_SPEED, config.speedMax || config.speed || DEF_SPEED);
    };

    BattleManager.applyAuraSyncWindowFrames = function(config) {
        const speed = Math.max(0.005, config.speed);
        const difficultyWindowRate = auraDifficultyWindowRate();

        if (config.parryWindowFrames > 0) {
            const halfGood = clamp((config.parryWindowFrames * speed) / 2, 0.04, 0.95);
            config.goodMin = 1.0 - halfGood;
            config.goodMax = 1.0 + halfGood;
        } else if (difficultyWindowRate !== 1.0) {
            const center = 1.0;
            const halfGood = ((config.goodMax - config.goodMin) / 2) * difficultyWindowRate;
            config.goodMin = center - halfGood;
            config.goodMax = center + halfGood;
        }

        if (config.perfectWindowFrames > 0) {
            const halfPerfect = clamp((config.perfectWindowFrames * speed) / 2, 0.02, 0.40);
            config.perfectMin = 1.0 - halfPerfect;
            config.perfectMax = 1.0 + halfPerfect;
        } else if (difficultyWindowRate !== 1.0) {
            const center = 1.0;
            const halfPerfect = ((config.perfectMax - config.perfectMin) / 2) * difficultyWindowRate;
            config.perfectMin = center - halfPerfect;
            config.perfectMax = center + halfPerfect;
        }
        config.goodMin = clamp(config.goodMin, 0.31, 1.99);
        config.goodMax = clamp(config.goodMax, config.goodMin + 0.01, 2.60);
        config.perfectMin = clamp(config.perfectMin, config.goodMin, config.goodMax);
        config.perfectMax = clamp(config.perfectMax, config.perfectMin + 0.01, config.goodMax);
    };

    Game_System.prototype.dexAuraSyncTutorialSeen = function(key) {
        this._dexAuraSyncTutorialSeen = this._dexAuraSyncTutorialSeen || {};
        return !!this._dexAuraSyncTutorialSeen[key];
    };

    Game_System.prototype.dexAuraSyncSetTutorialSeen = function(key) {
        this._dexAuraSyncTutorialSeen = this._dexAuraSyncTutorialSeen || {};
        this._dexAuraSyncTutorialSeen[key] = true;
    };

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._auraSyncActive = false;
        this._parryHandlingDamage = false;
        this._currentMitigationMod = 1.0;
        this._parrySubject = null;
        this._parryTarget = null;
        this._parryChainIndex = 0;
        this._parryChainMax = 1;
        this._parryChainScores = [];
        this._currentMobSpeed = 0.053;
        this._currentMobColor = "#a855f7";
        this._currentAuraSyncConfig = null;
    };

    const _BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function() {
        return _BattleManager_isBusy.call(this) || this._auraSyncActive;
    };

    const _BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        if (subject.isEnemy() && target.isActor() && !this._auraSyncActive && !this._parryHandlingDamage) {
            const config = this.makeAuraSyncConfig(subject);
            if (!config.parryable) {
                _BattleManager_invokeNormalAction.call(this, subject, target);
                return;
            }
            this._auraSyncActive = true;
            this._parrySubject = subject;
            this._parryTarget = target;
            this._currentAuraSyncConfig = config;
            if (VAR_ENEMY_ID > 0) $gameVariables.setValue(VAR_ENEMY_ID, subject.enemyId());
            this._currentMobSpeed = config.speed;
            this._currentMobColor = config.color;
            this._parryChainIndex = 0;
            this._parryChainMax = randomIntBetween(config.minRings, config.maxRings);
            this._parryChainScores = [];
            if (SceneManager._scene instanceof Scene_Battle) SceneManager._scene.createAuraSyncVisuals(target);
        } else {
            _BattleManager_invokeNormalAction.call(this, subject, target);
        }
    };

    BattleManager.reportRingResult = function(score) {
        this._parryChainScores.push(score);
        this._parryChainIndex++;
        if (this._parryChainIndex < this._parryChainMax) {
            if (SceneManager._scene instanceof Scene_Battle) SceneManager._scene.spawnNextRing();
        } else {
            this.calculateFinalChainMitigation();
        }
    };

    BattleManager.calculateFinalChainMitigation = function() {
        const totalScore = this._parryChainScores.reduce((a, b) => a + b, 0);
        const performancePct = totalScore / this._parryChainMax;
        this._currentMitigationMod = 1.0 - performancePct;
        const config = this._currentAuraSyncConfig;
        if (config && config.tutorial && config.tutorialOnce) $gameSystem.dexAuraSyncSetTutorialSeen(config.tutorialKey);
        this._auraSyncActive = false;
        if (SceneManager._scene instanceof Scene_Battle) SceneManager._scene.removeParryDimmer();
        this._parryHandlingDamage = true;
        this.invokeNormalAction(this._parrySubject, this._parryTarget);
        this._parryHandlingDamage = false;
        this._currentMitigationMod = 1.0;
        this._currentAuraSyncConfig = null;
    };

    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        let value = _Game_Action_makeDamageValue.call(this, target, critical);
        if (BattleManager._parryHandlingDamage) {
            const originalDamage = value;
            value = Math.floor(value * BattleManager._currentMitigationMod);
            const damageMitigated = originalDamage - value;
            if (VAR_LAST > 0) $gameVariables.setValue(VAR_LAST, damageMitigated);
            if (damageMitigated > 0 && VAR_TOTAL > 0) {
                $gameVariables.setValue(VAR_TOTAL, $gameVariables.value(VAR_TOTAL) + damageMitigated);
            }
        }
        return value;
    };

    Scene_Battle.prototype.createAuraSyncVisuals = function(target) {
        this.removeParryDimmer();
        this._parryDimmer = new ScreenSprite();
        this._parryDimmer.setColor(0, 0, 0);
        this._parryDimmer.opacity = 130;
        this.addChild(this._parryDimmer);
        this.spawnNextRing();
    };

    Scene_Battle.prototype.spawnNextRing = function() {
        let targetX = Graphics.width / 2;
        let targetY = Graphics.height / 2;
        if (this._spriteset && this._spriteset._actorSprites) {
            const actorSprite = this._spriteset._actorSprites.find(s => s._actor === BattleManager._parryTarget);
            if (actorSprite) {
                targetX = actorSprite.x;
                targetY = actorSprite.y - 50;
            }
        }
        const baseConfig = BattleManager._currentAuraSyncConfig || {};
        const config = Object.assign({}, baseConfig);

        config.speed = BattleManager.pickAuraSyncSpeed(config);
        BattleManager._currentMobSpeed = config.speed;
        BattleManager.applyAuraSyncWindowFrames(config);

        this._parrySprite = new Sprite_ParryCircle(targetX, targetY, config.speed, BattleManager._currentMobColor, config);
        this.addChild(this._parrySprite);
    };

    Scene_Battle.prototype.createParryFeedbackText = function(x, y, score) {
        const textSprite = new Sprite_ParryText(x, y, score);
        this.addChild(textSprite);
    };

    Scene_Battle.prototype.createParryCueText = function(x, y, text) {
        this.removeParryCueText();
        if (!text) return;
        this._parryCueSprite = new Sprite_ParryCue(x, y, text);
        this.addChild(this._parryCueSprite);
    };

    Scene_Battle.prototype.removeParryCueText = function() {
        if (this._parryCueSprite) {
            this.removeChild(this._parryCueSprite);
            this._parryCueSprite = null;
        }
    };

    Scene_Battle.prototype.removeParrySprite = function(sprite) {
        if (sprite === this._parrySprite) {
            this.removeParryCueText();
            this.removeChild(this._parrySprite);
            this._parrySprite = null;
        }
    };

    Scene_Battle.prototype.removeParryDimmer = function() {
        this.removeParryCueText();
        if (this._parryDimmer) {
            this.removeChild(this._parryDimmer);
            this._parryDimmer = null;
        }
    };

    function Sprite_ParryCircle() { this.initialize(...arguments); }
    Sprite_ParryCircle.prototype = Object.create(Sprite.prototype);
    Sprite_ParryCircle.prototype.constructor = Sprite_ParryCircle;

    Sprite_ParryCircle.prototype.initialize = function(x, y, baseSpeed, color, config) {
        Sprite.prototype.initialize.call(this);
        this.x = x;
        this.y = y;
        this._hasTriggered = false;
        this._frameAge = 0;
        this._color = color;
        this._config = config || {};
        const minorVariance = (Math.random() * 0.01) - 0.005;
        this._scaleSpeed = Math.max(0.005, baseSpeed + minorVariance);
        this._normalScaleSpeed = this._scaleSpeed;
        this._rotationSpeed = (Math.random() * 0.012 + 0.012) * (Math.random() > 0.5 ? 1 : -1);
        this._slowMoStarted = false;
        this._slowMoRemaining = 0;
        this.createMagicMatrices();
    };

    Sprite_ParryCircle.prototype.goodMin = function() { return this._config.goodMin !== undefined ? this._config.goodMin : 0.72; };
    Sprite_ParryCircle.prototype.goodMax = function() { return this._config.goodMax !== undefined ? this._config.goodMax : 1.32; };
    Sprite_ParryCircle.prototype.perfectMin = function() { return this._config.perfectMin !== undefined ? this._config.perfectMin : 0.92; };
    Sprite_ParryCircle.prototype.perfectMax = function() { return this._config.perfectMax !== undefined ? this._config.perfectMax : 1.08; };

    Sprite_ParryCircle.prototype.createMagicMatrices = function() {
        const canvasSize = 360;
        const radius = 80;
        const cx = canvasSize / 2;
        const cy = canvasSize / 2;
        this._targetRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._targetRing.anchor.x = 0.5;
        this._targetRing.anchor.y = 0.5;
        let ctx = this._targetRing.bitmap.context;
        this.drawArcaneStructure(ctx, cx, cy, radius, "rgba(255, 255, 255, 0.35)", 2);
        this.addChild(this._targetRing);
        this._perfectZoneGuide = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._perfectZoneGuide.anchor.x = 0.5;
        this._perfectZoneGuide.anchor.y = 0.5;
        let ctxZone = this._perfectZoneGuide.bitmap.context;
        ctxZone.strokeStyle = "rgba(250, 204, 21, 0.20)";
        ctxZone.lineWidth = 12;
        ctxZone.beginPath();
        ctxZone.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctxZone.stroke();
        this.addChild(this._perfectZoneGuide);
        this._perfectGlowRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._perfectGlowRing.anchor.x = 0.5;
        this._perfectGlowRing.anchor.y = 0.5;
        this._perfectGlowRing.blendMode = 1;
        this._perfectGlowRing.visible = false;
        let ctxGlow = this._perfectGlowRing.bitmap.context;
        ctxGlow.strokeStyle = "#fde047";
        ctxGlow.lineWidth = 6;
        ctxGlow.shadowColor = "#eab308";
        ctxGlow.shadowBlur = 12;
        ctxGlow.beginPath();
        ctxGlow.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctxGlow.stroke();
        this.addChild(this._perfectGlowRing);
        this._actionRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._actionRing.anchor.x = 0.5;
        this._actionRing.anchor.y = 0.5;
        ctx = this._actionRing.bitmap.context;
        this.drawArcaneStructure(ctx, cx, cy, radius, this._color, 4);
        this._actionRing.scale.x = 2.6;
        this._actionRing.scale.y = 2.6;
        this.addChild(this._actionRing);
    };

    Sprite_ParryCircle.prototype.drawArcaneStructure = function(ctx, cx, cy, r, color, coreLineWidth) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 10]);
        ctx.beginPath();
        ctx.arc(cx, cy, r + 22, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineWidth = coreLineWidth;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 14, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;
        const innerR = r - 14;
        ctx.beginPath();
        ctx.moveTo(cx + innerR, cy);
        ctx.lineTo(cx, cy + innerR);
        ctx.lineTo(cx - innerR, cy);
        ctx.lineTo(cx, cy - innerR);
        ctx.closePath();
        ctx.stroke();
        const dotRadius = 3;
        const points = [{x: cx + innerR, y: cy}, {x: cx - innerR, y: cy}, {x: cx, y: cy + innerR}, {x: cx, y: cy - innerR}];
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    Sprite_ParryCircle.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._hasTriggered || !this._actionRing) return;
        this._frameAge++;
        this.updateSlowMoState();
        this._actionRing.scale.x -= this._scaleSpeed;
        this._actionRing.scale.y -= this._scaleSpeed;
        this._actionRing.rotation += this._rotationSpeed;
        const precision = this._actionRing.scale.x;
        if (precision >= this.perfectMin() && precision <= this.perfectMax()) {
            this._perfectGlowRing.visible = true;
            this._perfectGlowRing.opacity = 170 + Math.sin(this._frameAge * 0.6) * 85;
        } else {
            this._perfectGlowRing.visible = false;
        }
        if (this._frameAge > 2) {
            if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
                this._hasTriggered = true;
                this.evaluateTiming();
            }
        }
        if (precision <= 0.3) {
            this._hasTriggered = true;
            this.executeEnd(0.0);
        }
    };

    Sprite_ParryCircle.prototype.updateSlowMoState = function() {
        const config = this._config || {};
        const precision = this._actionRing.scale.x;
        if (config.slowMo && !this._slowMoStarted) {
            const triggerScale = this.goodMax() + Number(config.slowMoTriggerOffset || 0.25);
            if (precision <= triggerScale) {
                this._slowMoStarted = true;
                this._slowMoRemaining = Math.max(1, Number(config.slowMoFrames || 45));
                this._scaleSpeed = this._normalScaleSpeed * clamp(Number(config.slowMoRate || 0.35), 0.05, 1);
                if (SceneManager._scene instanceof Scene_Battle) {
                    SceneManager._scene.createParryCueText(this.x, this.y - 150, config.cueText || config.tutorialText || "");
                }
            }
        }
        if (this._slowMoRemaining > 0) {
            this._slowMoRemaining--;
            if (this._slowMoRemaining <= 0) this._scaleSpeed = this._normalScaleSpeed;
        }
    };

    Sprite_ParryCircle.prototype.evaluateTiming = function() {
        const precision = this._actionRing.scale.x;
        if (precision >= this.perfectMin() && precision <= this.perfectMax()) {
            AudioManager.playStaticSe({ name: PERFECT_SE, volume: 100, pitch: 115, pan: 0 });
            this.executeEnd(1.0);
        } else if (precision >= this.goodMin() && precision <= this.goodMax()) {
            SoundManager.playOk();
            this.executeEnd(0.5);
        } else {
            this.executeEnd(0.0);
        }
    };

    Sprite_ParryCircle.prototype.executeEnd = function(score) {
        if (SceneManager._scene instanceof Scene_Battle) {
            SceneManager._scene.createParryFeedbackText(this.x, this.y - 30, score);
            SceneManager._scene.removeParrySprite(this);
        }
        BattleManager.reportRingResult(score);
    };

})();

function Sprite_ParryText() { this.initialize(...arguments); }
Sprite_ParryText.prototype = Object.create(Sprite.prototype);
Sprite_ParryText.prototype.constructor = Sprite_ParryText;

Sprite_ParryText.prototype.initialize = function(x, y, score) {
    Sprite.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._duration = 45;
    this._maxDuration = 45;
    this.createTextBox(score);
};

Sprite_ParryText.prototype.createTextBox = function(score) {
    const w = 240;
    const h = 60;
    this.bitmap = new Bitmap(w, h);
    const ctx = this.bitmap.context;
    ctx.font = "italic bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let text = "";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    if (score === 1.0) {
        text = "PERFECT";
        const rainbowGrad = ctx.createLinearGradient(40, 0, 200, 0);
        rainbowGrad.addColorStop(0.0, "#ff3333");
        rainbowGrad.addColorStop(0.2, "#ff9933");
        rainbowGrad.addColorStop(0.4, "#ffff33");
        rainbowGrad.addColorStop(0.6, "#33cc33");
        rainbowGrad.addColorStop(0.8, "#3399ff");
        rainbowGrad.addColorStop(1.0, "#b333ff");
        ctx.fillStyle = rainbowGrad;
    } else if (score === 0.5) {
        text = "GOOD";
        ctx.fillStyle = "#38bdf8";
    } else {
        text = "MISS";
        ctx.fillStyle = "#f87171";
    }
    ctx.strokeText(text, w / 2, h / 2);
    ctx.fillText(text, w / 2, h / 2);
    if (this.bitmap.baseTexture) this.bitmap.baseTexture.update();
};

Sprite_ParryText.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._duration > 0) {
        this._duration--;
        this.y -= 0.8;
        if (this._duration > this._maxDuration - 8) {
            this.scale.x += 0.03;
            this.scale.y += 0.03;
        }
        if (this._duration < 20) this.opacity = (this._duration / 20) * 255;
        if (this._duration === 0 && this.parent) this.parent.removeChild(this);
    }
};

function Sprite_ParryCue() { this.initialize(...arguments); }
Sprite_ParryCue.prototype = Object.create(Sprite.prototype);
Sprite_ParryCue.prototype.constructor = Sprite_ParryCue;

Sprite_ParryCue.prototype.initialize = function(x, y, text) {
    Sprite.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._timer = 0;
    this.createCueBitmap(text);
};

Sprite_ParryCue.prototype.createCueBitmap = function(text) {
    const width = Math.min(Graphics.width - 80, 760);
    const height = 96;
    this.bitmap = new Bitmap(width, height);
    this.bitmap.fontFace = $gameSystem.mainFontFace ? $gameSystem.mainFontFace() : "sans-serif";
    this.bitmap.fontSize = 24;
    this.bitmap.textColor = "#fff7c2";
    this.bitmap.outlineColor = "rgba(0, 0, 0, 0.90)";
    this.bitmap.outlineWidth = 6;
    this.bitmap.drawText(String(text || ""), 0, 0, width, height, "center");
};

Sprite_ParryCue.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._timer++;
    const wave = Math.sin(this._timer * 0.12);
    this.opacity = 210 + wave * 45;
    this.scale.x = 1 + wave * 0.025;
    this.scale.y = 1 + wave * 0.025;
};
