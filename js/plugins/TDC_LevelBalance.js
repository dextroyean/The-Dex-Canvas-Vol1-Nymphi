/*:
 * @target MZ
 * @plugindesc [v0.1.0] Balance suave contra overlevel: reduce EXP por zona y escala bosses por encima del nivel esperado.
 * @author Dextroyean y Jaime
 * @url 
 *
 * @help
 * TDC_LevelBalance.js
 * Creado por Dextroyean y Jaime
 *
 * ---------------------------------------------------------------------------
 * ¿Qué hace?
 * ---------------------------------------------------------------------------
 * Este plugin ayuda a que el juego no se vuelva demasiado fácil cuando el
 * jugador sobrelevelea. No castiga al jugador directamente: reduce la EXP que
 * dan los enemigos cuando el grupo está por encima del nivel esperado de la zona
 * y permite que los jefes importantes escalen suavemente.
 *
 * Pensado para RPG Maker MZ y para proyectos reutilizables de The Dex Canvas.
 *
 * ---------------------------------------------------------------------------
 * Etiquetas para enemigos normales
 * ---------------------------------------------------------------------------
 * Poner en la nota del enemigo:
 *
 *   <ExpectedLevel: 4>
 *
 * Si el promedio del grupo supera ese nivel, la EXP se reduce.
 *
 * Opcionales:
 *
 *   <ExpFalloff: 25>
 *   <MinExpRate: 10>
 *
 * ExpFalloff = cuánto porcentaje pierde por cada nivel arriba.
 * MinExpRate = mínimo porcentaje de EXP que puede dar.
 *
 * Ejemplo:
 *
 *   <ExpectedLevel: 4>
 *   <ExpFalloff: 30>
 *   <MinExpRate: 15>
 *
 * Si el grupo va 1 nivel arriba: 70% EXP.
 * Si va 2 niveles arriba: 40% EXP.
 * Si va 3+ niveles arriba: 15% EXP.
 *
 * También puedes usar prefijo TDC:
 *
 *   <TDCExpectedLevel: 4>
 *   <TDCExpFalloff: 25>
 *   <TDCMinExpRate: 10>
 *
 * Para excluir un enemigo:
 *
 *   <NoExpBalance>
 *
 * o:
 *
 *   <TDCNoExpBalance>
 *
 * ---------------------------------------------------------------------------
 * Etiquetas para bosses
 * ---------------------------------------------------------------------------
 * Poner en la nota del jefe:
 *
 *   <BossExpectedLevel: 8>
 *   <BossScaleAbove: true>
 *
 * Opcionales:
 *
 *   <BossHpPerLevel: 10>
 *   <BossParamPerLevel: 3>
 *   <BossMaxHpBonus: 30>
 *   <BossMaxParamBonus: 10>
 *
 * Ejemplo recomendado:
 *
 *   <BossExpectedLevel: 8>
 *   <BossScaleAbove: true>
 *   <BossHpPerLevel: 10>
 *   <BossParamPerLevel: 3>
 *   <BossMaxHpBonus: 30>
 *   <BossMaxParamBonus: 10>
 *
 * Si el grupo llega 2 niveles arriba:
 *   HP +20%
 *   ATK/MAT/DEF/MDF/AGI +6%
 *
 * Con topes para que no se vuelva injusto.
 *
 * También puedes usar prefijo TDC:
 *
 *   <TDCBossExpectedLevel: 8>
 *   <TDCBossScaleAbove: true>
 *
 * Para evitar escalado en un boss:
 *
 *   <NoBossScale>
 *
 * ---------------------------------------------------------------------------
 * Consola de prueba F8
 * ---------------------------------------------------------------------------
 * En batalla o mapa:
 *
 *   TDC.LevelBalance.partyLevel()
 *
 * Devuelve el nivel usado por el plugin.
 *
 * Para previsualizar un enemigo por ID:
 *
 *   TDC.LevelBalance.previewEnemy(3)
 *
 * ---------------------------------------------------------------------------
 * Notas técnicas
 * ---------------------------------------------------------------------------
 * - No modifica archivos JSON de la base de datos.
 * - No guarda sprites ni ventanas en la partida.
 * - No reduce oro ni drops por defecto.
 * - El escalado de bosses es temporal de batalla.
 * - Compatible con diseños de juego donde el grind sigue siendo útil.
 *
 * ---------------------------------------------------------------------------
 * @param PartyLevelMode
 * @text Modo de nivel del grupo
 * @type select
 * @option Promedio redondeado abajo
 * @value average_floor
 * @option Promedio redondeado normal
 * @value average_round
 * @option Nivel máximo del grupo
 * @value max
 * @option Nivel mínimo del grupo
 * @value min
 * @default average_floor
 *
 * @param DefaultExpectedLevel
 * @text Nivel esperado por defecto
 * @type number
 * @min 1
 * @default 1
 * @desc Se usa solo si el enemigo no tiene <ExpectedLevel>. Si DisableWhenNoExpectedLevel está ON, se ignora.
 *
 * @param DisableWhenNoExpectedLevel
 * @text Desactivar si no hay ExpectedLevel
 * @type boolean
 * @default true
 * @desc ON recomendado. Solo balancea enemigos etiquetados.
 *
 * @param DefaultExpFalloff
 * @text Reducción EXP por nivel (%)
 * @type number
 * @min 0
 * @max 100
 * @default 25
 *
 * @param DefaultMinExpRate
 * @text EXP mínima (%)
 * @type number
 * @min 0
 * @max 100
 * @default 10
 *
 * @param ReduceGoldToo
 * @text Reducir oro también
 * @type boolean
 * @default false
 * @desc OFF recomendado. El grind deja de dar tanta EXP, pero aún da dinero/drops.
 *
 * @param DefaultGoldFalloff
 * @text Reducción oro por nivel (%)
 * @parent ReduceGoldToo
 * @type number
 * @min 0
 * @max 100
 * @default 10
 *
 * @param DefaultMinGoldRate
 * @text Oro mínimo (%)
 * @parent ReduceGoldToo
 * @type number
 * @min 0
 * @max 100
 * @default 50
 *
 * @param DefaultBossHpPerLevel
 * @text Boss HP por nivel arriba (%)
 * @type number
 * @min 0
 * @max 999
 * @default 10
 *
 * @param DefaultBossParamPerLevel
 * @text Boss parámetros por nivel arriba (%)
 * @type number
 * @min 0
 * @max 999
 * @default 3
 * @desc Afecta ATK, DEF, MAT, MDF y AGI. No afecta LUK.
 *
 * @param DefaultBossMaxHpBonus
 * @text Boss máximo bonus HP (%)
 * @type number
 * @min 0
 * @max 999
 * @default 30
 *
 * @param DefaultBossMaxParamBonus
 * @text Boss máximo bonus parámetros (%)
 * @type number
 * @min 0
 * @max 999
 * @default 10
 *
 * @param DebugLog
 * @text Mostrar logs de balance
 * @type boolean
 * @default false
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "TDC_LevelBalance";
    window.TDC = window.TDC || {};
    TDC.LevelBalance = TDC.LevelBalance || {};

    const params = PluginManager.parameters(PLUGIN_NAME);

    const p = {
        partyLevelMode: String(params.PartyLevelMode || "average_floor"),
        defaultExpectedLevel: Number(params.DefaultExpectedLevel || 1),
        disableWhenNoExpectedLevel: String(params.DisableWhenNoExpectedLevel || "true") === "true",
        defaultExpFalloff: Number(params.DefaultExpFalloff || 25),
        defaultMinExpRate: Number(params.DefaultMinExpRate || 10),
        reduceGoldToo: String(params.ReduceGoldToo || "false") === "true",
        defaultGoldFalloff: Number(params.DefaultGoldFalloff || 10),
        defaultMinGoldRate: Number(params.DefaultMinGoldRate || 50),
        defaultBossHpPerLevel: Number(params.DefaultBossHpPerLevel || 10),
        defaultBossParamPerLevel: Number(params.DefaultBossParamPerLevel || 3),
        defaultBossMaxHpBonus: Number(params.DefaultBossMaxHpBonus || 30),
        defaultBossMaxParamBonus: Number(params.DefaultBossMaxParamBonus || 10),
        debugLog: String(params.DebugLog || "false") === "true"
    };

    const log = (...args) => {
        if (p.debugLog) console.log("[TDC_LevelBalance]", ...args);
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const metaValue = (data, names, fallback = undefined) => {
        if (!data || !data.meta) return fallback;
        for (const name of names) {
            if (data.meta[name] !== undefined) return data.meta[name];
        }
        return fallback;
    };

    const metaNumber = (data, names, fallback = 0) => {
        const value = metaValue(data, names, undefined);
        if (value === undefined || value === null || value === "") return fallback;
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    };

    const metaBool = (data, names, fallback = false) => {
        const value = metaValue(data, names, undefined);
        if (value === undefined) return fallback;
        if (value === true) return true;
        const text = String(value).trim().toLowerCase();
        if (["true", "on", "yes", "1", "si", "sí"].includes(text)) return true;
        if (["false", "off", "no", "0"].includes(text)) return false;
        // En RPG Maker, <Tag> sin valor aparece como true.
        return true;
    };

    const hasMeta = (data, names) => {
        if (!data || !data.meta) return false;
        return names.some(name => data.meta[name] !== undefined);
    };

    TDC.LevelBalance.partyLevel = function() {
        const members = $gameParty && $gameParty.battleMembers ? $gameParty.battleMembers() : [];
        const aliveOrAll = members.length > 0 ? members : ($gameParty ? $gameParty.members() : []);
        if (!aliveOrAll || aliveOrAll.length === 0) return 1;
        const levels = aliveOrAll.map(actor => actor ? actor.level : 1).filter(level => Number.isFinite(level));
        if (levels.length === 0) return 1;
        switch (p.partyLevelMode) {
            case "max": return Math.max(...levels);
            case "min": return Math.min(...levels);
            case "average_round": return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
            case "average_floor":
            default:
                return Math.floor(levels.reduce((a, b) => a + b, 0) / levels.length);
        }
    };

    TDC.LevelBalance.expectedLevelForEnemyData = function(enemyData) {
        const tagged = hasMeta(enemyData, ["ExpectedLevel", "TDCExpectedLevel"]);
        if (!tagged && p.disableWhenNoExpectedLevel) return null;
        return metaNumber(enemyData, ["ExpectedLevel", "TDCExpectedLevel"], p.defaultExpectedLevel);
    };

    TDC.LevelBalance.expRateForEnemyData = function(enemyData) {
        if (!enemyData) return 100;
        if (hasMeta(enemyData, ["NoExpBalance", "TDCNoExpBalance"])) return 100;

        const expected = this.expectedLevelForEnemyData(enemyData);
        if (expected === null) return 100;

        const partyLevel = this.partyLevel();
        const gap = Math.max(0, partyLevel - expected);
        const falloff = metaNumber(enemyData, ["ExpFalloff", "TDCExpFalloff"], p.defaultExpFalloff);
        const minRate = metaNumber(enemyData, ["MinExpRate", "TDCMinExpRate"], p.defaultMinExpRate);
        return clamp(100 - gap * falloff, minRate, 100);
    };

    TDC.LevelBalance.goldRateForEnemyData = function(enemyData) {
        if (!p.reduceGoldToo) return 100;
        if (!enemyData) return 100;
        if (hasMeta(enemyData, ["NoGoldBalance", "TDCNoGoldBalance", "NoExpBalance", "TDCNoExpBalance"])) return 100;

        const expected = this.expectedLevelForEnemyData(enemyData);
        if (expected === null) return 100;

        const partyLevel = this.partyLevel();
        const gap = Math.max(0, partyLevel - expected);
        const falloff = metaNumber(enemyData, ["GoldFalloff", "TDCGoldFalloff"], p.defaultGoldFalloff);
        const minRate = metaNumber(enemyData, ["MinGoldRate", "TDCMinGoldRate"], p.defaultMinGoldRate);
        return clamp(100 - gap * falloff, minRate, 100);
    };

    TDC.LevelBalance.bossScaleForEnemyData = function(enemyData) {
        if (!enemyData) return null;
        if (hasMeta(enemyData, ["NoBossScale", "TDCNoBossScale"])) return null;

        const bossScaleEnabled = metaBool(enemyData, ["BossScaleAbove", "TDCBossScaleAbove", "BossScale", "TDCBossScale"], false);
        const hasBossExpected = hasMeta(enemyData, ["BossExpectedLevel", "TDCBossExpectedLevel"]);
        if (!bossScaleEnabled && !hasBossExpected) return null;

        const expected = metaNumber(enemyData, ["BossExpectedLevel", "TDCBossExpectedLevel", "ExpectedLevel", "TDCExpectedLevel"], p.defaultExpectedLevel);
        const partyLevel = this.partyLevel();
        const gap = Math.max(0, partyLevel - expected);
        if (gap <= 0) {
            return {
                enabled: true,
                expected,
                partyLevel,
                gap,
                hpBonus: 0,
                paramBonus: 0
            };
        }

        const hpPerLevel = metaNumber(enemyData, ["BossHpPerLevel", "TDCBossHpPerLevel"], p.defaultBossHpPerLevel);
        const paramPerLevel = metaNumber(enemyData, ["BossParamPerLevel", "TDCBossParamPerLevel"], p.defaultBossParamPerLevel);
        const maxHpBonus = metaNumber(enemyData, ["BossMaxHpBonus", "TDCBossMaxHpBonus"], p.defaultBossMaxHpBonus);
        const maxParamBonus = metaNumber(enemyData, ["BossMaxParamBonus", "TDCBossMaxParamBonus"], p.defaultBossMaxParamBonus);

        return {
            enabled: true,
            expected,
            partyLevel,
            gap,
            hpBonus: clamp(gap * hpPerLevel, 0, maxHpBonus),
            paramBonus: clamp(gap * paramPerLevel, 0, maxParamBonus)
        };
    };

    TDC.LevelBalance.previewEnemy = function(enemyId) {
        const enemyData = $dataEnemies ? $dataEnemies[Number(enemyId)] : null;
        if (!enemyData) {
            console.warn(`[TDC_LevelBalance] Enemy ID ${enemyId} no existe.`);
            return null;
        }
        const result = {
            enemyId: Number(enemyId),
            name: enemyData.name,
            partyLevel: this.partyLevel(),
            expectedLevel: this.expectedLevelForEnemyData(enemyData),
            expRate: this.expRateForEnemyData(enemyData),
            goldRate: this.goldRateForEnemyData(enemyData),
            bossScale: this.bossScaleForEnemyData(enemyData)
        };
        console.table(result);
        console.log("[TDC_LevelBalance] Preview", result);
        return result;
    };

    // -------------------------------------------------------------------------
    // EXP y oro por enemigo
    // -------------------------------------------------------------------------
    const _Game_Enemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function() {
        const base = _Game_Enemy_exp.call(this);
        const rate = TDC.LevelBalance.expRateForEnemyData(this.enemy());
        const value = Math.max(0, Math.floor(base * rate / 100));
        log(`${this.name()} EXP`, { base, rate, value });
        return value;
    };

    const _Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function() {
        const base = _Game_Enemy_gold.call(this);
        const rate = TDC.LevelBalance.goldRateForEnemyData(this.enemy());
        const value = Math.max(0, Math.floor(base * rate / 100));
        log(`${this.name()} GOLD`, { base, rate, value });
        return value;
    };

    // -------------------------------------------------------------------------
    // Boss scaling
    // -------------------------------------------------------------------------
    const _Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        this._tdcLevelBalanceScale = null;
        _Game_Enemy_setup.call(this, enemyId, x, y);
        this._tdcLevelBalanceScale = TDC.LevelBalance.bossScaleForEnemyData(this.enemy());
        if (this._tdcLevelBalanceScale && this._tdcLevelBalanceScale.enabled) {
            // setup() ya hizo recoverAll con stats base. Reaplicamos HP/MP al máximo escalado.
            this.setHp(this.mhp);
            this.setMp(this.mmp);
            log(`${this.name()} boss scale`, this._tdcLevelBalanceScale);
        }
    };

    const _Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
    Game_Enemy.prototype.paramBase = function(paramId) {
        const base = _Game_Enemy_paramBase.call(this, paramId);
        const scale = this._tdcLevelBalanceScale;
        if (!scale || !scale.enabled) return base;

        let bonus = 0;
        if (paramId === 0) {
            bonus = scale.hpBonus || 0;
        } else if ([2, 3, 4, 5, 6].includes(paramId)) {
            bonus = scale.paramBonus || 0;
        } else {
            bonus = 0;
        }

        if (bonus <= 0) return base;
        return Math.max(1, Math.round(base * (100 + bonus) / 100));
    };

})();
