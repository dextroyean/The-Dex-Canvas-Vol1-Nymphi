//=============================================================================
// Dex_BattlePositions.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.0] Battle Layout Manager: posiciones y escala global adaptable para actores/enemigos.
 * @author Dextroyean
 *
 * @param --- Base ---
 * @default
 *
 * @param baseWidth
 * @parent --- Base ---
 * @text Resolución Base Ancho
 * @type number
 * @min 1
 * @desc Ancho base donde diseñas posiciones. X=0 izquierda, mayor número derecha.
 * @default 1280
 *
 * @param baseHeight
 * @parent --- Base ---
 * @text Resolución Base Alto
 * @type number
 * @min 1
 * @desc Alto base donde diseñas posiciones. Y=0 arriba, mayor número abajo.
 * @default 720
 *
 * @param scaleMode
 * @parent --- Base ---
 * @text Modo de Escalado
 * @type select
 * @option Separado X/Y
 * @value separate
 * @option Uniforme
 * @value uniform
 * @desc Separado escala X e Y por separado. Uniforme usa una sola escala para conservar proporciones.
 * @default separate
 *
 * @param --- Actores ---
 * @default
 *
 * @param applyActors
 * @parent --- Actores ---
 * @text Aplicar a Actores
 * @type boolean
 * @on Sí
 * @off No
 * @desc Modifica posición y escala de actores en batalla lateral.
 * @default true
 *
 * @param actorStartX
 * @parent --- Actores ---
 * @text Actor X Inicial
 * @type text
 * @desc X del primer actor en resolución base. 0 = izquierda, mayor número = derecha.
 * @default 850
 *
 * @param actorStartY
 * @parent --- Actores ---
 * @text Actor Y Inicial
 * @type text
 * @desc Y del primer actor en resolución base. 0 = arriba, mayor número = abajo.
 * @default 435
 *
 * @param actorStepX
 * @parent --- Actores ---
 * @text Separación X Actores
 * @type text
 * @desc Cuánto se mueve cada actor siguiente en X. Puede ser negativo.
 * @default 48
 *
 * @param actorStepY
 * @parent --- Actores ---
 * @text Separación Y Actores
 * @type text
 * @desc Cuánto se mueve cada actor siguiente en Y. Puede ser negativo.
 * @default 70
 *
 * @param actorOffsetX
 * @parent --- Actores ---
 * @text Offset X Actores
 * @type text
 * @desc Ajuste global extra para todos los actores. Se usa en resolución base.
 * @default 0
 *
 * @param actorOffsetY
 * @parent --- Actores ---
 * @text Offset Y Actores
 * @type text
 * @desc Ajuste global extra para todos los actores. Se usa en resolución base.
 * @default 0
 *
 * @param actorScale
 * @parent --- Actores ---
 * @text Escala Actores
 * @type text
 * @desc Tamaño visual de actores. 1.00 = normal, 1.15 = 15% más grande, 0.90 = 10% más pequeño.
 * @default 1.00
 *
 * @param --- Enemigos ---
 * @default
 *
 * @param applyEnemies
 * @parent --- Enemigos ---
 * @text Aplicar a Enemigos
 * @type boolean
 * @on Sí
 * @off No
 * @desc Modifica posición y escala de enemigos.
 * @default true
 *
 * @param scaleEnemyTroopPositions
 * @parent --- Enemigos ---
 * @text Escalar Posiciones de Tropa
 * @type boolean
 * @on Sí
 * @off No
 * @desc Escala posiciones del editor de tropa desde la resolución base hasta la resolución actual.
 * @default true
 *
 * @param enemyOffsetX
 * @parent --- Enemigos ---
 * @text Offset X Enemigos
 * @type text
 * @desc Ajuste global extra para todos los enemigos. Se usa en resolución base.
 * @default 0
 *
 * @param enemyOffsetY
 * @parent --- Enemigos ---
 * @text Offset Y Enemigos
 * @type text
 * @desc Ajuste global extra para todos los enemigos. Se usa en resolución base.
 * @default 0
 *
 * @param enemyScale
 * @parent --- Enemigos ---
 * @text Escala Enemigos
 * @type text
 * @desc Tamaño visual de enemigos. 1.00 = normal, 1.20 = 20% más grande.
 * @default 1.00
 *
 * @param --- Notetags ---
 * @default
 *
 * @param enableNotetags
 * @parent --- Notetags ---
 * @text Permitir Notetags
 * @type boolean
 * @on Sí
 * @off No
 * @desc Permite ajustes opcionales por nota sin llenar el Plugin Manager de parámetros individuales.
 * @default true
 *
 * @param --- Debug ---
 * @default
 *
 * @param debugLog
 * @parent --- Debug ---
 * @text Mostrar Log
 * @type boolean
 * @on Sí
 * @off No
 * @desc Muestra posiciones en consola para revisar layout.
 * @default false
 *
 * @command refreshLayout
 * @text Refrescar Layout
 * @desc Recalcula posiciones y escala de battlers en la batalla actual.
 *
 * @help
 * ============================================================================
 * Dex_BattlePositions v2.0
 * ============================================================================
 *
 * Battle Layout Manager para controlar posiciones y tamaño global de battlers.
 *
 * Esta versión elimina parámetros individuales por personaje/enemigo para dejar
 * el plugin más limpio.
 *
 * ============================================================================
 * COORDENADAS
 * ============================================================================
 *
 * X = 0 es izquierda.
 * Entre más alto X, más a la derecha.
 *
 * Y = 0 es arriba.
 * Entre más alto Y, más abajo.
 *
 * Los valores se escriben pensando en la resolución base.
 *
 * Ejemplo:
 * Resolución Base Ancho: 1280
 * Resolución Base Alto: 720
 *
 * Si el juego corre a 1920x1080, el plugin escala proporcionalmente.
 *
 * ============================================================================
 * ACTORES
 * ============================================================================
 *
 * Actor X Inicial:
 * Posición X del primer actor.
 *
 * Actor Y Inicial:
 * Posición Y del primer actor.
 *
 * Separación X/Y:
 * Distancia entre cada actor.
 *
 * Escala Actores:
 * 1.00 = tamaño normal.
 * 1.15 = 15% más grande.
 * 0.90 = 10% más pequeño.
 *
 * ============================================================================
 * ENEMIGOS
 * ============================================================================
 *
 * Escalar Posiciones de Tropa:
 * Si está activo, las posiciones del editor de tropa se escalan desde la
 * resolución base a la resolución actual.
 *
 * Offset X/Y Enemigos:
 * Mueve todos los enemigos juntos.
 *
 * Escala Enemigos:
 * Cambia el tamaño global de todos los enemigos.
 *
 * ============================================================================
 * NOTETAGS OPCIONALES
 * ============================================================================
 *
 * Si "Permitir Notetags" está activo, puedes usar esto en Actor o Enemigo:
 *
 * <DexBattleOffset: x,y>
 * Mueve solo ese battler usando coordenadas base.
 *
 * <DexBattleScale: 1.15>
 * Cambia solo la escala de ese battler.
 *
 * <DexBattlePos: x,y>
 * Fuerza una posición base para ese battler.
 *
 * <DexBattlePosRate: x,y>
 * Fuerza una posición por porcentaje.
 * Ejemplo: <DexBattlePosRate: 0.70,0.60>
 *
 * Estos notetags son opcionales. El plugin funciona sin ellos.
 *
 * ============================================================================
 * COMANDO
 * ============================================================================
 *
 * Refrescar Layout:
 * Recalcula posiciones en la batalla actual.
 *
 * ============================================================================
 * COMPATIBILIDAD
 * ============================================================================
 *
 * No uses al mismo tiempo otro plugin que también cambie posiciones de battlers,
 * porque podrías tener doble escalado.
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_BattlePositions = true;

var Dex = Dex || {};
Dex.BattlePositions = Dex.BattlePositions || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_BattlePositions";
    })();

    const params = PluginManager.parameters(pluginName);

    const paramText = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") return fallback;
        return String(value).trim();
    };

    const paramNumber = function(name, fallback) {
        const value = Number(paramText(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const paramBool = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const BASE_W = Math.max(1, paramNumber("baseWidth", 1280));
    const BASE_H = Math.max(1, paramNumber("baseHeight", 720));
    const SCALE_MODE = paramText("scaleMode", "separate");

    const APPLY_ACTORS = paramBool("applyActors", true);
    const ACTOR_START_X = paramNumber("actorStartX", 850);
    const ACTOR_START_Y = paramNumber("actorStartY", 435);
    const ACTOR_STEP_X = paramNumber("actorStepX", 48);
    const ACTOR_STEP_Y = paramNumber("actorStepY", 70);
    const ACTOR_OFFSET_X = paramNumber("actorOffsetX", 0);
    const ACTOR_OFFSET_Y = paramNumber("actorOffsetY", 0);
    const ACTOR_SCALE = Math.max(0.05, paramNumber("actorScale", 1.0));

    const APPLY_ENEMIES = paramBool("applyEnemies", true);
    const SCALE_ENEMY_TROOP_POSITIONS = paramBool("scaleEnemyTroopPositions", true);
    const ENEMY_OFFSET_X = paramNumber("enemyOffsetX", 0);
    const ENEMY_OFFSET_Y = paramNumber("enemyOffsetY", 0);
    const ENEMY_SCALE = Math.max(0.05, paramNumber("enemyScale", 1.0));

    const ENABLE_NOTETAGS = paramBool("enableNotetags", true);
    const DEBUG_LOG = paramBool("debugLog", false);

    const screenW = function() {
        return Graphics.boxWidth || Graphics.width || BASE_W;
    };

    const screenH = function() {
        return Graphics.boxHeight || Graphics.height || BASE_H;
    };

    const rawScaleX = function() {
        return screenW() / BASE_W;
    };

    const rawScaleY = function() {
        return screenH() / BASE_H;
    };

    const layoutScale = function() {
        if (SCALE_MODE === "uniform") {
            const s = Math.min(rawScaleX(), rawScaleY());
            return { x: s, y: s };
        }
        return { x: rawScaleX(), y: rawScaleY() };
    };

    const toBaseX = function(x) {
        return Number(x) * layoutScale().x;
    };

    const toBaseY = function(y) {
        return Number(y) * layoutScale().y;
    };

    const toRateX = function(x) {
        return Number(x) * screenW();
    };

    const toRateY = function(y) {
        return Number(y) * screenH();
    };

    const log = function() {
        if (DEBUG_LOG && console && console.log) {
            console.log.apply(console, arguments);
        }
    };

    const getMeta = function(data, names) {
        if (!ENABLE_NOTETAGS) return undefined;
        if (!data || !data.meta) return undefined;

        const list = Array.isArray(names) ? names : [names];

        for (let i = 0; i < list.length; i++) {
            const key = list[i];
            if (data.meta[key] !== undefined) return data.meta[key];
        }

        return undefined;
    };

    const parsePair = function(value) {
        if (value === undefined || value === null || value === true) return null;

        const parts = String(value).split(",").map(v => Number(String(v).trim()));

        if (!Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) return null;

        return { x: parts[0], y: parts[1] };
    };

    const parseNumber = function(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    };

    const rememberBaseScale = function(sprite) {
        if (!sprite) return;

        if (sprite._dexBattleBaseScaleX === undefined) {
            sprite._dexBattleBaseScaleX = sprite.scale.x;
            sprite._dexBattleBaseScaleY = sprite.scale.y;
        }
    };

    const applyScale = function(sprite, data, globalScale) {
        if (!sprite) return;

        rememberBaseScale(sprite);

        let finalScale = globalScale;

        const noteScale = getMeta(data, ["DexBattleScale", "BattleScale", "BattlerScale"]);
        if (noteScale !== undefined) {
            finalScale *= Math.max(0.05, parseNumber(noteScale, 1.0));
        }

        sprite.scale.x = sprite._dexBattleBaseScaleX * finalScale;
        sprite.scale.y = sprite._dexBattleBaseScaleY * finalScale;
    };

    const applyNotetagPosition = function(data, x, y) {
        let resultX = x;
        let resultY = y;

        const posRate = parsePair(getMeta(data, ["DexBattlePosRate", "BattlePosRate", "BattlerPosRate"]));
        if (posRate) {
            resultX = toRateX(posRate.x);
            resultY = toRateY(posRate.y);
        }

        const posBase = parsePair(getMeta(data, ["DexBattlePos", "BattlePos", "BattlerPos"]));
        if (posBase) {
            resultX = toBaseX(posBase.x);
            resultY = toBaseY(posBase.y);
        }

        const offset = parsePair(getMeta(data, ["DexBattleOffset", "BattleOffset", "BattlerOffset"]));
        if (offset) {
            resultX += toBaseX(offset.x);
            resultY += toBaseY(offset.y);
        }

        return { x: resultX, y: resultY };
    };

    const refreshLayout = function() {
        const scene = SceneManager._scene;
        if (!(scene instanceof Scene_Battle)) return;
        if (!scene._spriteset) return;

        const actorSprites = scene._spriteset._actorSprites || [];
        for (let i = 0; i < actorSprites.length; i++) {
            const sprite = actorSprites[i];
            if (sprite && sprite._actor) {
                sprite.setActorHome(i);
                sprite.x = sprite._homeX;
                sprite.y = sprite._homeY;
                if (sprite.startMove) sprite.startMove(0, 0, 0);
            }
        }

        const enemySprites = scene._spriteset._enemySprites || [];
        for (let i = 0; i < enemySprites.length; i++) {
            const sprite = enemySprites[i];
            if (sprite && sprite._enemy) {
                sprite.setHome(sprite._enemy.screenX(), sprite._enemy.screenY());
                sprite.x = sprite._homeX;
                sprite.y = sprite._homeY;
                if (sprite.startMove) sprite.startMove(0, 0, 0);
            }
        }
    };

    PluginManager.registerCommand(pluginName, "refreshLayout", function() {
        refreshLayout();
    });

    const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        if (!APPLY_ACTORS) {
            _Sprite_Actor_setActorHome.call(this, index);
            return;
        }

        let x = ACTOR_START_X + ACTOR_OFFSET_X + index * ACTOR_STEP_X;
        let y = ACTOR_START_Y + ACTOR_OFFSET_Y + index * ACTOR_STEP_Y;

        x = toBaseX(x);
        y = toBaseY(y);

        const actorData = this._actor && this._actor.actor ? this._actor.actor() : null;
        const notePos = applyNotetagPosition(actorData, x, y);

        this.setHome(Math.floor(notePos.x), Math.floor(notePos.y));
        applyScale(this, actorData, ACTOR_SCALE);

        log("Dex_BattlePositions Actor", index + 1, this._homeX, this._homeY, "scale", this.scale.x, this.scale.y);
    };

    const _Sprite_Enemy_setHome = Sprite_Enemy.prototype.setHome;
    Sprite_Enemy.prototype.setHome = function(x, y) {
        if (!APPLY_ENEMIES) {
            _Sprite_Enemy_setHome.call(this, x, y);
            return;
        }

        let finalX = Number(x);
        let finalY = Number(y);

        if (SCALE_ENEMY_TROOP_POSITIONS) {
            finalX = toBaseX(finalX);
            finalY = toBaseY(finalY);
        }

        finalX += toBaseX(ENEMY_OFFSET_X);
        finalY += toBaseY(ENEMY_OFFSET_Y);

        const enemyData = this._enemy && this._enemy.enemy ? this._enemy.enemy() : null;
        const notePos = applyNotetagPosition(enemyData, finalX, finalY);

        _Sprite_Enemy_setHome.call(this, Math.floor(notePos.x), Math.floor(notePos.y));
        applyScale(this, enemyData, ENEMY_SCALE);

        const enemyIndex = this._enemy && this._enemy.index ? this._enemy.index() + 1 : 0;
        log("Dex_BattlePositions Enemy", enemyIndex, this._homeX, this._homeY, "scale", this.scale.x, this.scale.y);
    };

})();
