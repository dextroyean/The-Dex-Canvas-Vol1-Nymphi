//=============================================================================
// Dex_BattleResults.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.9.1] Pantalla personalizada de resultados y level up después de batalla.
 * @author Dextroyean
 *
 * @param --- General ---
 * @default
 *
 * @param resultTitle
 * @parent --- General ---
 * @text Título Resultados
 * @type text
 * @desc Texto opcional de la pantalla de resultados.
 * @default Resultados de Batalla
 *
 * @param confirmText
 * @parent --- General ---
 * @text Texto Continuar
 * @type text
 * @desc Texto pequeño para indicar que se puede continuar.
 * @default Presiona Z para continuar
 *
 * @param windowOpacity
 * @parent --- General ---
 * @text Opacidad Ventanas
 * @type number
 * @min 0
 * @max 255
 * @desc Opacidad del fondo de las ventanas.
 * @default 190
 *
 * @param accentColor
 * @parent --- General ---
 * @text Color Acento
 * @type text
 * @desc Color principal de acento.
 * @default #facc15
 *
 * @param levelColor
 * @parent --- General ---
 * @text Color Level Up
 * @type text
 * @desc Color para textos de subida de nivel.
 * @default #22c55e
 *
 * @param expGaugeColor1
 * @parent --- General ---
 * @text Color Barra Exp 0%
 * @type text
 * @desc Color inicial del relleno de la barra de experiencia.
 * @default #111111
 *
 * @param expGaugeColor2
 * @parent --- General ---
 * @text Color Barra Exp 100%
 * @type text
 * @desc Color final del relleno de la barra de experiencia.
 * @default #8b5cf6
 *
 * @param expGaugeFillFrames
 * @parent --- General ---
 * @text Frames Llenado EXP
 * @type number
 * @min 1
 * @desc Duración de llenado de la barra. 60 = 1 segundo aprox, 120 = 2 segundos aprox.
 * @default 120
 *
 * @param --- Layout ---
 * @default
 *
 * @param forceAutoLayout
 * @parent --- Layout ---
 * @text Forzar Layout Automático FullHD
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está activo, ignora los tamaños manuales viejos y calcula el layout usando el tamaño real de pantalla.
 * @default true
 *
 * @param layoutWidth
 * @parent --- Layout ---
 * @text Ancho Layout
 * @type number
 * @min 400
 * @desc Ancho total del bloque central de resultados.
 * @default 1500
 *
 * @param layoutTopY
 * @parent --- Layout ---
 * @text Posición Y Layout
 * @type number
 * @min 0
 * @desc Posición vertical del bloque central. 0 = arriba, mayor número = abajo.
 * @default 95
 *
 * @param actorPanelWidth
 * @parent --- Layout ---
 * @text Ancho Panel Actores
 * @type number
 * @min 260
 * @desc Ancho del panel izquierdo de actores.
 * @default 960
 *
 * @param rightPanelWidth
 * @parent --- Layout ---
 * @text Ancho Panel Derecho
 * @type number
 * @min 220
 * @desc Ancho del panel derecho de Dextherium/Exp/Objetos.
 * @default 500
 *
 * @param resultPanelHeight
 * @parent --- Layout ---
 * @text Alto Panel Actores
 * @type number
 * @min 160
 * @desc Alto del panel de actores. Más alto = proporciones menos aplastadas.
 * @default 460
 *
 * @param rewardPanelHeight
 * @parent --- Layout ---
 * @text Alto Panel Recompensa
 * @type number
 * @min 90
 * @desc Alto del panel de Dextherium/Exp. Más alto = más cuadrado.
 * @default 210
 *
 * @param panelGap
 * @parent --- Layout ---
 * @text Separación Paneles
 * @type number
 * @min 0
 * @desc Separación entre panel izquierdo y derecho.
 * @default 22
 *
 * @param showTopTitle
 * @parent --- Layout ---
 * @text Mostrar Título Superior
 * @type boolean
 * @on Sí
 * @off No
 * @desc Muestra el texto "Resultados de Batalla" afuera de los cuadros principales.
 * @default true
 *
 * @param titleWindowX
 * @parent --- Layout ---
 * @text Título X
 * @type text
 * @desc X de la ventana del título. Deja vacío para centrar automáticamente.
 * @default
 *
 * @param titleWindowY
 * @parent --- Layout ---
 * @text Título Y
 * @type text
 * @desc Y de la ventana del título. Deja vacío para ponerlo encima de los paneles.
 * @default
 *
 * @param titleWindowWidth
 * @parent --- Layout ---
 * @text Título Ancho
 * @type text
 * @desc Ancho de la ventana del título. Deja vacío para usar el ancho del layout.
 * @default
 *
 * @param titleWindowHeight
 * @parent --- Layout ---
 * @text Título Alto
 * @type text
 * @desc Alto de la ventana del título.
 * @default 64
 *
 * @param titleFontSize
 * @parent --- Layout ---
 * @text Título Tamaño Fuente
 * @type number
 * @min 10
 * @max 96
 * @desc Tamaño de fuente del título de resultados.
 * @default 30
 *
 * @param --- Level Up Animación ---
 * @default
 *
 * @param levelUpAnimationId
 * @parent --- Level Up Animación ---
 * @text Animación Level Up
 * @type animation
 * @desc Animación que aparece una sola vez cuando un actor sube de nivel. 0 = desactivar.
 * @default 173
 *
 * @param levelUpAnimationScale
 * @parent --- Level Up Animación ---
 * @text Escala Animación Level Up
 * @type text
 * @desc Tamaño de la animación. 1.00 normal, 0.50 mitad, 0.35 más pequeña.
 * @default 0.45
 *
 * @param levelUpAnimationOffsetX
 * @parent --- Level Up Animación ---
 * @text Offset X Animación
 * @type text
 * @desc Ajuste horizontal desde el centro de la cara del actor.
 * @default 0
 *
 * @param levelUpAnimationOffsetY
 * @parent --- Level Up Animación ---
 * @text Offset Y Animación
 * @type text
 * @desc Ajuste vertical desde la parte superior de la cara. Negativo = más arriba.
 * @default -8
 *
 * @param --- Sello de Victoria ---
 * @default
 *
 * @param decorativeImage
 * @parent --- Sello de Victoria ---
 * @text Imagen Decorativa
 * @type file
 * @dir img/battle_results
 * @desc PNG opcional. Si Usar Sello Generado = Sí, el sello mágico tiene prioridad.
 * @default
 *
 * @param decorativeX
 * @parent --- Sello de Victoria ---
 * @text Imagen X
 * @type text
 * @desc X del centro del sello/imagen. Deja vacío para automático.
 * @default
 *
 * @param decorativeY
 * @parent --- Sello de Victoria ---
 * @text Imagen Y
 * @type text
 * @desc Y del centro del sello/imagen. Deja vacío para automático.
 * @default
 *
 * @param decorativeScale
 * @parent --- Sello de Victoria ---
 * @text Escala Imagen
 * @type text
 * @desc 1.00 = normal, 0.75 = más pequeña, 1.20 = más grande.
 * @default 1.00
 *
 * @param useGeneratedSeal
 * @parent --- Sello de Victoria ---
 * @text Usar Sello Generado
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está en Sí, usa un círculo arcano generado y lo hace girar sobre su centro.
 * @default true
 *
 * @param sealSize
 * @parent --- Sello de Victoria ---
 * @text Tamaño Sello
 * @type number
 * @min 64
 * @desc Tamaño del sello mágico generado.
 * @default 170
 *
 * @param sealRotationSpeed
 * @parent --- Sello de Victoria ---
 * @text Velocidad Giro Sello
 * @type text
 * @desc Velocidad de giro del sello. 0.010 = suave.
 * @default 0.010
 *
 * @help
 * ============================================================================
 * Dex_BattleResults v1.9.1
 * ============================================================================
 *
 * Reemplaza el resultado normal de batalla por una pantalla personalizada:
 *
 * 1. Pantalla de resultados:
 *    - Actores
 *    - EXP ganada
 *    - Barra de EXP animada con velocidad configurable
 *    - Animación de level up sobre el battler del actor y texto animado dentro del cuadro
 *    - Oro
 *    - Items obtenidos
 *
 * 2. Pantalla de level up:
 *    - Mensaje del actor que subió de nivel
 *    - Retrato
 *    - Clase
 *    - Stats antes y después
 *    - Skills aprendidas
 *
 * ============================================================================
 * INSTALACIÓN
 * ============================================================================
 *
 * Archivo:
 * js/plugins/Dex_BattleResults.js
 *
 * Si quieres usar una imagen decorativa personalizada, crea:
 * img/battle_results/
 *
 * y coloca ahí la imagen. Si no colocas imagen, puede usarse el sello mágico generado.
 *
 * ============================================================================
 * CONTROLES
 * ============================================================================
 *
 * Z / Enter / Click:
 * Avanza entre resultados, level ups y salida de batalla.
 *
 * ============================================================================
 * NOTAS
 * ============================================================================
 *
 * Este plugin intercepta la victoria de batalla.
 * No cambia derrota ni escape.
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_BattleResults = true;

var Dex = Dex || {};
Dex.BattleResults = Dex.BattleResults || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_BattleResults";
    })();

    const params = PluginManager.parameters(pluginName);

    const paramText = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") return fallback;
        return String(value).trim();
    };

    const paramNumberOrNull = function(name) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") return null;
        const number = Number(value);
        return Number.isFinite(number) ? number : null;
    };

    const paramNumber = function(name, fallback) {
        const value = Number(paramText(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const cleanFileName = function(value) {
        return String(value || "")
            .trim()
            .replace(/^.*[\\\/]/, "")
            .replace(/\.(png|jpg|jpeg|webp)$/i, "");
    };

    const RESULT_TITLE = paramText("resultTitle", "Resultados de Batalla");
    const CONFIRM_TEXT = paramText("confirmText", "Presiona Z para continuar");
    const WINDOW_OPACITY = Math.max(0, Math.min(255, paramNumber("windowOpacity", 190)));
    const ACCENT_COLOR = paramText("accentColor", "#facc15");
    const LEVEL_COLOR = paramText("levelColor", "#22c55e");
    const EXP_COLOR_1 = paramText("expGaugeColor1", "#111111");
    const EXP_COLOR_2 = paramText("expGaugeColor2", "#8b5cf6");
    const EXP_GAUGE_FILL_FRAMES = Math.max(1, paramNumber("expGaugeFillFrames", 120));

    const FORCE_AUTO_LAYOUT = String(params["forceAutoLayout"] || "true") === "true";
    const LAYOUT_WIDTH = Math.max(400, paramNumber("layoutWidth", 1500));
    const LAYOUT_TOP_Y = Math.max(0, paramNumber("layoutTopY", 95));
    const ACTOR_PANEL_WIDTH = Math.max(260, paramNumber("actorPanelWidth", 960));
    const RIGHT_PANEL_WIDTH = Math.max(220, paramNumber("rightPanelWidth", 500));
    const RESULT_PANEL_HEIGHT = Math.max(160, paramNumber("resultPanelHeight", 460));
    const REWARD_PANEL_HEIGHT = Math.max(90, paramNumber("rewardPanelHeight", 210));
    const PANEL_GAP = Math.max(0, paramNumber("panelGap", 22));
    const SHOW_TOP_TITLE = String(params["showTopTitle"] || "true") === "true";
    const TITLE_WINDOW_X = paramNumberOrNull("titleWindowX");
    const TITLE_WINDOW_Y = paramNumberOrNull("titleWindowY");
    const TITLE_WINDOW_WIDTH = paramNumberOrNull("titleWindowWidth");
    const TITLE_WINDOW_HEIGHT = Math.max(36, paramNumber("titleWindowHeight", 64));
    const TITLE_FONT_SIZE = Math.max(10, paramNumber("titleFontSize", 30));

    const LEVEL_UP_ANIMATION_ID = Math.max(0, paramNumber("levelUpAnimationId", 173));
    const LEVEL_UP_ANIMATION_SCALE = Math.max(0.05, paramNumber("levelUpAnimationScale", 0.45));
    const LEVEL_UP_ANIMATION_OFFSET_X = paramNumber("levelUpAnimationOffsetX", 0);
    const LEVEL_UP_ANIMATION_OFFSET_Y = paramNumber("levelUpAnimationOffsetY", -8);

    const DECORATIVE_IMAGE = cleanFileName(paramText("decorativeImage", ""));
    const DECORATIVE_X = paramNumberOrNull("decorativeX");
    const DECORATIVE_Y = paramNumberOrNull("decorativeY");
    const DECORATIVE_SCALE = Math.max(0.05, paramNumber("decorativeScale", 1.00));
    const USE_GENERATED_SEAL = String(params["useGeneratedSeal"] || "true") === "true";
    const SEAL_SIZE = Math.max(64, paramNumber("sealSize", 170));
    const SEAL_ROTATION_SPEED = Number(paramText("sealRotationSpeed", "0.010")) || 0.010;

    Dex.BattleResults.suppressLevelMessages = false;

    Dex.BattleResults.createVictorySealBitmap = function(size) {
        const bitmap = new Bitmap(size, size);
        const ctx = bitmap.context;
        const c = size / 2;
        const outer = size * 0.46;
        const ring2 = size * 0.38;
        const ring3 = size * 0.28;
        const ring4 = size * 0.18;

        ctx.save();
        ctx.clearRect(0, 0, size, size);
        ctx.strokeStyle = "rgba(168, 85, 247, 0.95)";
        ctx.fillStyle = "rgba(168, 85, 247, 0.08)";
        ctx.shadowColor = "rgba(216, 180, 254, 0.95)";
        ctx.shadowBlur = size * 0.05;
        ctx.lineWidth = Math.max(2, size * 0.012);

        const drawCircle = function(r) {
            ctx.beginPath();
            ctx.arc(c, c, r, 0, Math.PI * 2);
            ctx.stroke();
        };

        drawCircle(outer);
        drawCircle(ring2);
        drawCircle(ring3);
        drawCircle(ring4);

        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const a = -Math.PI / 2 + i * (Math.PI / 4);
            const x1 = c + Math.cos(a) * ring4;
            const y1 = c + Math.sin(a) * ring4;
            const x2 = c + Math.cos(a) * ring3;
            const y2 = c + Math.sin(a) * ring3;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
            const a = -Math.PI / 2 + i * (Math.PI / 4);
            const x = c + Math.cos(a) * ring2;
            const y = c + Math.sin(a) * ring2;
            const s = size * 0.035;
            ctx.beginPath();
            ctx.moveTo(x, y - s);
            ctx.lineTo(x + s, y);
            ctx.lineTo(x, y + s);
            ctx.lineTo(x - s, y);
            ctx.closePath();
            ctx.stroke();
        }

        for (let i = 0; i < 12; i++) {
            const a1 = -Math.PI / 2 + i * (Math.PI * 2 / 12) + 0.07;
            const a2 = a1 + 0.23;
            ctx.beginPath();
            ctx.arc(c, c, outer - size * 0.025, a1, a2);
            ctx.stroke();
        }

        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
            const a = -Math.PI / 2 + i * (Math.PI / 5);
            const r = i % 2 === 0 ? ring3 * 0.92 : ring4 * 0.95;
            const x = c + Math.cos(a) * r;
            const y = c + Math.sin(a) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        const grad = ctx.createRadialGradient(c, c, 2, c, c, ring4);
        grad.addColorStop(0, "rgba(250, 204, 21, 0.45)");
        grad.addColorStop(0.45, "rgba(216, 180, 254, 0.22)");
        grad.addColorStop(1, "rgba(168, 85, 247, 0.04)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c, c, ring4 * 0.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        bitmap.baseTexture.update();
        return bitmap;
    };

    function Sprite_DexRotatingSeal() {
        this.initialize(...arguments);
    }

    Sprite_DexRotatingSeal.prototype = Object.create(Sprite.prototype);
    Sprite_DexRotatingSeal.prototype.constructor = Sprite_DexRotatingSeal;

    Sprite_DexRotatingSeal.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._dexRotationSpeed = SEAL_ROTATION_SPEED;
        this.opacity = 205;
    };

    Sprite_DexRotatingSeal.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.rotation += this._dexRotationSpeed;
    };

    const sw = function() {
        return Graphics.boxWidth || Graphics.width;
    };

    const sh = function() {
        return Graphics.boxHeight || Graphics.height;
    };

    const itemKey = function(item) {
        if (!item) return "";
        if (DataManager.isWeapon(item)) return "w" + item.id;
        if (DataManager.isArmor(item)) return "a" + item.id;
        return "i" + item.id;
    };

    const aggregateItems = function(items) {
        const map = {};
        const result = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const key = itemKey(item);

            if (!map[key]) {
                map[key] = { item: item, amount: 0 };
                result.push(map[key]);
            }

            map[key].amount++;
        }

        return result;
    };

    const expRate = function(actor) {
        if (!actor || actor.isMaxLevel()) return 1.0;

        const current = actor.currentExp() - actor.currentLevelExp();
        const needed = actor.nextLevelExp() - actor.currentLevelExp();

        if (needed <= 0) return 1.0;

        return Math.max(0, Math.min(1, current / needed));
    };

    const actorSnapshot = function(actor) {
        return {
            actorId: actor.actorId(),
            name: actor.name(),
            className: actor.currentClass() ? actor.currentClass().name : "",
            faceName: actor.faceName(),
            faceIndex: actor.faceIndex(),
            level: actor.level,
            exp: actor.currentExp(),
            expRate: expRate(actor),
            nextRequiredExp: actor.isMaxLevel() ? 0 : actor.nextRequiredExp(),
            params: [
                actor.mhp,
                actor.mmp,
                actor.atk,
                actor.def,
                actor.mat,
                actor.mdf,
                actor.agi,
                actor.luk
            ],
            skills: actor.skills().map(skill => skill.id)
        };
    };

    Dex.BattleResults.makeResultData = function(rewards) {
        const actors = $gameParty.battleMembers();
        const rows = [];

        for (let i = 0; i < actors.length; i++) {
            rows.push({
                actor: actors[i],
                before: actorSnapshot(actors[i]),
                after: null,
                newSkills: []
            });
        }

        return {
            rewards: {
                gold: rewards.gold || 0,
                exp: rewards.exp || 0,
                items: aggregateItems(rewards.items || [])
            },
            actors: rows,
            levelUps: []
        };
    };

    Dex.BattleResults.finishResultData = function(data) {
        for (let i = 0; i < data.actors.length; i++) {
            const row = data.actors[i];
            row.after = actorSnapshot(row.actor);

            const beforeSkills = row.before.skills;
            const afterSkills = row.actor.skills();
            row.newSkills = afterSkills.filter(skill => !beforeSkills.includes(skill.id));

            if (row.after.level > row.before.level) {
                data.levelUps.push(row);
            }
        }
    };

    const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if (Dex.BattleResults.suppressLevelMessages) return;
        _Game_Actor_displayLevelUp.call(this, newSkills);
    };

    BattleManager.processVictory = function() {
        $gameParty.removeBattleStates();
        $gameParty.performVictory();

        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();

        const resultData = Dex.BattleResults.makeResultData(this._rewards);

        Dex.BattleResults.suppressLevelMessages = true;
        this.gainRewards();
        Dex.BattleResults.suppressLevelMessages = false;

        Dex.BattleResults.finishResultData(resultData);

        this._phase = "dexBattleResults";

        if (SceneManager._scene instanceof Scene_Battle) {
            SceneManager._scene.startDexBattleResults(resultData);
        } else {
            this.endBattle(0);
        }
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        if (this._dexBattleResultsActive) {
            this.updateDexBattleResults();
        }
    };

    Scene_Battle.prototype.startDexBattleResults = function(data) {
        this._dexBattleResultsActive = true;
        this._dexBattleResultsData = data;
        this._dexBattleResultsMode = "results";
        this._dexBattleLevelIndex = -1;
        this._dexBattleInputWait = 18;
        this._dexHiddenWindows = [];

        this.hideDexBattleNativeWindows();
        this.createDexResultScreen();
    };

    Scene_Battle.prototype.hideDexBattleNativeWindows = function() {
        const list = [
            this._statusWindow,
            this._partyCommandWindow,
            this._actorCommandWindow,
            this._logWindow,
            this._helpWindow,
            this._skillWindow,
            this._itemWindow,
            this._actorWindow,
            this._enemyWindow
        ];

        this._dexHiddenWindows = [];

        for (let i = 0; i < list.length; i++) {
            const win = list[i];

            if (win) {
                this._dexHiddenWindows.push({
                    window: win,
                    visible: win.visible
                });
                win.visible = false;
            }
        }
    };

    Scene_Battle.prototype.restoreDexBattleNativeWindows = function() {
        if (!this._dexHiddenWindows) return;

        for (let i = 0; i < this._dexHiddenWindows.length; i++) {
            const entry = this._dexHiddenWindows[i];

            if (entry.window) {
                entry.window.visible = entry.visible;
            }
        }

        this._dexHiddenWindows = [];
    };

    Scene_Battle.prototype.clearDexResultObjects = function() {
        if (this._dexResultWindows) {
            for (let i = 0; i < this._dexResultWindows.length; i++) {
                const win = this._dexResultWindows[i];
                if (win && win.parent) this.removeChild(win);
            }
        }

        this._dexResultWindows = [];

        if (this._dexSealSprite && this._dexSealSprite.parent) {
            this.removeChild(this._dexSealSprite);
        }

        this._dexSealSprite = null;
        this.clearDexLevelUpAnimations();
    };

    Scene_Battle.prototype.addDexResultWindow = function(win) {
        this._dexResultWindows = this._dexResultWindows || [];
        this._dexResultWindows.push(win);
        this.addChild(win);
    };

    Scene_Battle.prototype.clearDexLevelUpAnimations = function() {
        if (this._dexLevelUpAnimationObjects) {
            for (let i = 0; i < this._dexLevelUpAnimationObjects.length; i++) {
                const obj = this._dexLevelUpAnimationObjects[i];

                if (obj.sprite && obj.sprite.parent) {
                    obj.sprite.parent.removeChild(obj.sprite);
                }

                if (obj.tempTarget && obj.target && obj.target.parent) {
                    obj.target.parent.removeChild(obj.target);
                }
            }
        }

        this._dexLevelUpAnimationObjects = [];
    };

    Scene_Battle.prototype.createDexLevelUpAnimations = function() {
        this.clearDexLevelUpAnimations();

        if (!LEVEL_UP_ANIMATION_ID) return;
        if (!$dataAnimations || !$dataAnimations[LEVEL_UP_ANIMATION_ID]) return;
        if (!this._dexBattleResultsData || !this._dexBattleResultsData.actors) return;

        const actorSprites = this._spriteset && this._spriteset._actorSprites ? this._spriteset._actorSprites : [];

        for (let i = 0; i < this._dexBattleResultsData.actors.length; i++) {
            const row = this._dexBattleResultsData.actors[i];
            if (!row || !row.before || !row.after) continue;

            const levelUp = row.after.level > row.before.level;
            if (!levelUp) continue;

            const target = actorSprites[i];
            if (!target) continue;

            const obj = {
                target: target,
                tempTarget: false,
                sprite: null,
                animationId: LEVEL_UP_ANIMATION_ID,
                played: false
            };

            this._dexLevelUpAnimationObjects.push(obj);
            this.playDexLevelUpAnimation(obj);
        }
    };

    Scene_Battle.prototype.playDexLevelUpAnimation = function(obj) {
        if (!obj || !obj.target || obj.played) return;

        const animation = $dataAnimations[obj.animationId];
        if (!animation) return;

        let sprite = null;

        try {
            if (animation.frames && typeof Sprite_AnimationMV !== "undefined") {
                sprite = new Sprite_AnimationMV();
                sprite.setup([obj.target], animation, false, 0);
            } else if (typeof Sprite_Animation !== "undefined") {
                sprite = new Sprite_Animation();
                sprite.setup([obj.target], animation, false, 0, null);
            }
        } catch (error) {
            console.warn("Dex_BattleResults: no se pudo reproducir animación de level up.", error);
            sprite = null;
        }

        if (sprite) {
            sprite.scale.x = LEVEL_UP_ANIMATION_SCALE;
            sprite.scale.y = LEVEL_UP_ANIMATION_SCALE;
            obj.sprite = sprite;

            const parent = (this._spriteset && this._spriteset._effectsContainer)
                ? this._spriteset._effectsContainer
                : this;
            parent.addChild(sprite);
        }

        obj.played = true;
    };

    Scene_Battle.prototype.updateDexLevelUpAnimations = function() {
        if (!this._dexLevelUpAnimationObjects) return;

        for (let i = this._dexLevelUpAnimationObjects.length - 1; i >= 0; i--) {
            const obj = this._dexLevelUpAnimationObjects[i];
            if (!obj || !obj.sprite) continue;

            if (obj.sprite.isPlaying && !obj.sprite.isPlaying()) {
                if (obj.sprite.parent) obj.sprite.parent.removeChild(obj.sprite);
                obj.sprite = null;
            }
        }
    };

    Scene_Battle.prototype.createDexResultScreen = function() {
        this.clearDexResultObjects();

        const data = this._dexBattleResultsData;

        const safeMargin = Math.max(28, Math.floor(sw() * 0.025));
        const titleH = SHOW_TOP_TITLE ? TITLE_WINDOW_HEIGHT : 0;
        const titleGap = SHOW_TOP_TITLE ? 12 : 0;
        const hintH = 72;
        const hintGap = 14;
        const bottomMargin = 24;

        let gap;
        let totalUsedW;
        let leftW;
        let rightW;
        let actorH;
        let rewardH;
        let topY;

        if (FORCE_AUTO_LAYOUT) {
            // Layout automático real: usa el tamaño actual de pantalla.
            // Esto evita que RPG Maker conserve parámetros viejos como 900/560/320.
            gap = Math.max(18, Math.floor(sw() * 0.012));

            totalUsedW = Math.min(
                sw() - safeMargin * 2,
                Math.max(980, Math.floor(sw() * 0.78))
            );

            leftW = Math.floor(totalUsedW * 0.66);
            rightW = totalUsedW - leftW - gap;

            if (rightW < 320) {
                rightW = Math.min(420, Math.floor(totalUsedW * 0.34));
                leftW = totalUsedW - rightW - gap;
            }

            const desiredTop = Math.max(
                safeMargin + titleH + titleGap,
                Math.floor(sh() * 0.105)
            );

            const maxPanelH = sh() - desiredTop - hintH - hintGap - bottomMargin;
            actorH = Math.min(
                Math.max(300, Math.floor(sh() * 0.42)),
                Math.max(260, maxPanelH)
            );

            topY = Math.max(
                safeMargin + titleH + titleGap,
                Math.min(desiredTop, sh() - actorH - hintH - hintGap - bottomMargin)
            );

            rewardH = Math.min(
                Math.max(140, Math.floor(actorH * 0.45)),
                Math.max(120, actorH - 150)
            );
        } else {
            gap = PANEL_GAP;

            const maxTotal = Math.max(520, sw() - safeMargin * 2);
            const totalW = Math.min(LAYOUT_WIDTH, maxTotal);

            leftW = Math.min(ACTOR_PANEL_WIDTH, totalW - RIGHT_PANEL_WIDTH - gap);
            rightW = Math.min(RIGHT_PANEL_WIDTH, totalW - leftW - gap);

            if (leftW < 340 || rightW < 260) {
                leftW = Math.floor(totalW * 0.66);
                rightW = totalW - leftW - gap;
            }

            totalUsedW = leftW + gap + rightW;

            const desiredTopY = Math.max(safeMargin + titleH + titleGap, LAYOUT_TOP_Y);
            const availableH = sh() - desiredTopY - hintH - hintGap - bottomMargin;
            actorH = Math.min(RESULT_PANEL_HEIGHT, Math.max(260, availableH));
            topY = Math.max(
                safeMargin + titleH + titleGap,
                Math.min(desiredTopY, sh() - actorH - hintH - hintGap - bottomMargin)
            );

            rewardH = Math.min(REWARD_PANEL_HEIGHT, Math.max(130, Math.floor(actorH * 0.44)));
        }

        const startX = Math.floor((sw() - totalUsedW) / 2);

        if (SHOW_TOP_TITLE) {
            const titleW = TITLE_WINDOW_WIDTH !== null ? TITLE_WINDOW_WIDTH : totalUsedW;
            const titleX = TITLE_WINDOW_X !== null ? TITLE_WINDOW_X : Math.floor((sw() - titleW) / 2);
            const titleY = TITLE_WINDOW_Y !== null ? TITLE_WINDOW_Y : Math.max(8, topY - titleH - titleGap);

            const titleWindow = new Window_DexResultTitle(
                new Rectangle(titleX, titleY, titleW, titleH),
                data
            );
            this.addDexResultWindow(titleWindow);
        }

        const actorWindow = new Window_DexResultActors(
            new Rectangle(startX, topY, leftW, actorH),
            data
        );
        this.addDexResultWindow(actorWindow);
        this.createDexLevelUpAnimations();

        const rewardsWindow = new Window_DexResultRewards(
            new Rectangle(startX + leftW + gap, topY, rightW, rewardH),
            data
        );
        this.addDexResultWindow(rewardsWindow);

        const itemsH = Math.max(130, actorH - rewardH - gap);
        const itemsWindow = new Window_DexResultItems(
            new Rectangle(startX + leftW + gap, topY + rewardH + gap, rightW, itemsH),
            data
        );
        this.addDexResultWindow(itemsWindow);

        // El sello se crea antes para que el texto de continuar quede por encima.
        this.createDexResultSeal();

        const hintY = Math.min(topY + actorH + hintGap, sh() - hintH - 4);
        const hintWindow = new Window_DexContinueHint(
            new Rectangle(safeMargin, hintY, sw() - safeMargin * 2, hintH)
        );
        this.addDexResultWindow(hintWindow);
    };

    Scene_Battle.prototype.createDexResultSeal = function() {
        const useGenerated = USE_GENERATED_SEAL;
        const useImage = !useGenerated && !!DECORATIVE_IMAGE;

        if (!useGenerated && !useImage) return;

        let sprite;

        if (useImage) {
            sprite = new Sprite_DexRotatingSeal(ImageManager.loadBitmap("img/battle_results/", DECORATIVE_IMAGE));
            sprite.scale.x = DECORATIVE_SCALE;
            sprite.scale.y = DECORATIVE_SCALE;
        } else {
            const bitmap = Dex.BattleResults.createVictorySealBitmap(SEAL_SIZE);
            sprite = new Sprite_DexRotatingSeal(bitmap);
            sprite.scale.x = DECORATIVE_SCALE;
            sprite.scale.y = DECORATIVE_SCALE;
        }

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite._dexRotationSpeed = SEAL_ROTATION_SPEED;

        const setPosition = () => {
            const bw = (sprite.bitmap ? sprite.bitmap.width : SEAL_SIZE) * Math.abs(sprite.scale.x || 1);
            const bh = (sprite.bitmap ? sprite.bitmap.height : SEAL_SIZE) * Math.abs(sprite.scale.y || 1);
            const margin = 36;
            const cx = DECORATIVE_X !== null ? DECORATIVE_X : sw() - margin - bw / 2;
            const cy = DECORATIVE_Y !== null ? DECORATIVE_Y : sh() - margin - bh / 2;

            sprite.x = cx;
            sprite.y = cy;
        };

        if (sprite.bitmap && sprite.bitmap.addLoadListener) {
            sprite.bitmap.addLoadListener(setPosition);
        } else {
            setPosition();
        }

        this._dexSealSprite = sprite;
        this.addChild(this._dexSealSprite);
    };

    Scene_Battle.prototype.createDexLevelScreen = function(index) {
        this.clearDexResultObjects();

        const row = this._dexBattleResultsData.levelUps[index];

        const titleW = Math.min(460, Math.floor(sw() * 0.56));
        const titleH = 78;
        const titleX = Math.floor((sw() - titleW) / 2);
        const titleY = Math.max(28, Math.floor(sh() * 0.08));

        const titleWindow = new Window_DexLevelTitle(new Rectangle(titleX, titleY, titleW, titleH), row);
        this.addDexResultWindow(titleWindow);

        const panelW = Math.min(860, Math.floor(sw() * 0.74));
        const panelH = Math.min(470, Math.floor(sh() * 0.60));
        const panelX = Math.floor((sw() - panelW) / 2);
        const panelY = Math.floor((sh() - panelH) / 2) + 20;

        const levelWindow = new Window_DexLevelDetails(new Rectangle(panelX, panelY, panelW, panelH), row);
        this.addDexResultWindow(levelWindow);
    };

    Scene_Battle.prototype.updateDexBattleResults = function() {
        this.updateDexLevelUpAnimations();

        if (this._dexBattleInputWait > 0) {
            this._dexBattleInputWait--;
            return;
        }

        if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
            SoundManager.playOk();
            this.advanceDexBattleResults();
        }
    };

    Scene_Battle.prototype.advanceDexBattleResults = function() {
        const data = this._dexBattleResultsData;

        if (this._dexBattleResultsMode === "results") {
            if (data.levelUps.length > 0) {
                this._dexBattleResultsMode = "level";
                this._dexBattleLevelIndex = 0;
                this._dexBattleInputWait = 14;
                this.createDexLevelScreen(this._dexBattleLevelIndex);
            } else {
                this.finishDexBattleResults();
            }
            return;
        }

        if (this._dexBattleResultsMode === "level") {
            this._dexBattleLevelIndex++;

            if (this._dexBattleLevelIndex < data.levelUps.length) {
                this._dexBattleInputWait = 14;
                this.createDexLevelScreen(this._dexBattleLevelIndex);
            } else {
                this.finishDexBattleResults();
            }
        }
    };

    Scene_Battle.prototype.finishDexBattleResults = function() {
        this.clearDexResultObjects();
        this.restoreDexBattleNativeWindows();
        this._dexBattleResultsActive = false;
        this._dexBattleResultsData = null;
        BattleManager.endBattle(0);
    };

    function Window_DexBase() {
        this.initialize(...arguments);
    }

    Window_DexBase.prototype = Object.create(Window_Base.prototype);
    Window_DexBase.prototype.constructor = Window_DexBase;

    Window_DexBase.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = WINDOW_OPACITY;
        this.backOpacity = WINDOW_OPACITY;
    };

    Window_DexBase.prototype.drawFaceScaled = function(faceName, faceIndex, x, y, size) {
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const swFace = Math.min(pw, ph);
        const sx = (faceIndex % 4) * pw + Math.floor((pw - swFace) / 2);
        const sy = Math.floor(faceIndex / 4) * ph + Math.floor((ph - swFace) / 2);

        bitmap.addLoadListener(() => {
            this.contents.blt(bitmap, sx, sy, swFace, swFace, x, y, size, size);
        });
    };

    Window_DexBase.prototype.drawSimpleGauge = function(x, y, width, rate, color1, color2) {
        const h = 14;
        const fillW = Math.floor(width * Math.max(0, Math.min(1, rate)));

        this.contents.fillRect(x, y, width, h, "rgba(0, 0, 0, 0.75)");
        this.contents.fillRect(x + 1, y + 1, width - 2, h - 2, "rgba(35, 35, 45, 0.85)");

        if (fillW > 0) {
            this.contents.gradientFillRect(x + 1, y + 1, Math.max(0, fillW - 2), h - 2, color1, color2);
        }
    };

    Window_DexBase.prototype.drawContinueText = function(align) {
        this.contents.fontSize = 20;
        this.changeTextColor("#f5f5f5");
        this.drawText(CONFIRM_TEXT, 0, this.innerHeight - 30, this.innerWidth, align || "center");
        this.resetTextColor();
        this.resetFontSettings();
    };

    function Window_DexResultTitle() {
        this.initialize(...arguments);
    }

    Window_DexResultTitle.prototype = Object.create(Window_DexBase.prototype);
    Window_DexResultTitle.prototype.constructor = Window_DexResultTitle;

    Window_DexResultTitle.prototype.initialize = function(rect, data) {
        this._data = data;
        Window_DexBase.prototype.initialize.call(this, rect);
        this.contentsOpacity = 255;
        this.refresh();
    };

    Window_DexResultTitle.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = TITLE_FONT_SIZE;
        this.changeTextColor(ACCENT_COLOR);
        const y = Math.floor((this.innerHeight - this.lineHeight()) / 2);
        this.drawText(RESULT_TITLE, 0, y, this.innerWidth, "center");
        this.resetTextColor();
        this.resetFontSettings();
    };

    function Window_DexContinueHint() {
        this.initialize(...arguments);
    }

    Window_DexContinueHint.prototype = Object.create(Window_DexBase.prototype);
    Window_DexContinueHint.prototype.constructor = Window_DexContinueHint;

    Window_DexContinueHint.prototype.initialize = function(rect) {
        Window_DexBase.prototype.initialize.call(this, rect);
        this.opacity = 0;
        this.backOpacity = 0;
        this.contentsOpacity = 255;
        this.refresh();
    };

    Window_DexContinueHint.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = 22;
        this.changeTextColor("#f5f5f5");
        this.drawText(CONFIRM_TEXT, 0, 10, this.innerWidth, "center");
        this.resetTextColor();
        this.resetFontSettings();
    };

    function Window_DexResultActors() {
        this.initialize(...arguments);
    }

    Window_DexResultActors.prototype = Object.create(Window_DexBase.prototype);
    Window_DexResultActors.prototype.constructor = Window_DexResultActors;

    Window_DexResultActors.prototype.initialize = function(rect, data) {
        this._data = data;
        this._displayRates = [];
        this._levelUpTextFrame = 0;
        Window_DexBase.prototype.initialize.call(this, rect);

        for (let i = 0; i < this._data.actors.length; i++) {
            this._displayRates[i] = 0;
        }

        this.refresh();
    };

    Window_DexResultActors.prototype.update = function() {
        Window_DexBase.prototype.update.call(this);

        let changed = false;
        let hasLevelUp = false;
        this._levelUpTextFrame++;

        for (let i = 0; i < this._data.actors.length; i++) {
            const row = this._data.actors[i];
            const target = row.after ? row.after.expRate : 0;
            const current = this._displayRates[i] || 0;

            if (row.before && row.after && row.after.level > row.before.level) {
                hasLevelUp = true;
            }

            if (current < target) {
                const step = Math.max(0.001, target / EXP_GAUGE_FILL_FRAMES);
                this._displayRates[i] = Math.min(target, current + step);
                changed = true;
            }
        }

        if (changed || hasLevelUp) {
            this.refresh();
        }
    };

    Window_DexResultActors.prototype.refresh = function() {
        this.contents.clear();
        this._levelAnimPoints = [];

        const rows = this._data.actors;
        const headerH = SHOW_TOP_TITLE ? 0 : 34;

        if (!SHOW_TOP_TITLE) {
            this.contents.fontSize = 24;
            this.changeTextColor(ACCENT_COLOR);
            this.drawText(RESULT_TITLE, 0, 0, this.innerWidth, "center");
            this.resetTextColor();
        }

        const usableH = this.innerHeight - headerH - 8;
        const rowH = Math.max(110, Math.floor(usableH / Math.max(1, rows.length)));

        for (let i = 0; i < rows.length; i++) {
            this.drawActorRow(rows[i], i, 0, headerH + 4 + i * rowH, this.innerWidth, rowH - 8);
        }
    };

    Window_DexResultActors.prototype.drawLevelUpText = function(x, y, w, index) {
        const phase = (this._levelUpTextFrame || 0) + index * 9;
        const bob = Math.round(Math.sin(phase / 8) * 3);
        const pulse = Math.floor((Math.sin(phase / 10) + 1) * 0.5 * 65) + 190;

        this.contents.fontSize = 20;
        this.changeTextColor("#ffad8d");
        this.contents.paintOpacity = pulse;
        this.drawText("LEVEL UP", x, y + bob, w, "right");
        this.contents.paintOpacity = 255;
        this.resetTextColor();
    };

    Window_DexResultActors.prototype.drawActorRow = function(row, index, x, y, w, h) {
        const faceSize = Math.min(96, h - 18);
        const before = row.before;
        const after = row.after;
        const levelUp = after.level > before.level;
        const rate = this._displayRates[index] || 0;

        this.contents.fillRect(x, y, w, h, "rgba(0, 0, 0, 0.18)");

        const faceX = x + 10;
        const faceY = y + h - faceSize - 10;
        this.drawFaceScaled(after.faceName, after.faceIndex, faceX, faceY, faceSize);

        const tx = x + faceSize + 22;
        const gaugeY = y + h - 34;
        const gaugeW = Math.max(190, w - faceSize - 145);
        const levelY = gaugeY - 20;
        const levelX = x + w - 112;

        this.contents.fontSize = 28;
        this.drawText(after.name, tx, y + 22, Math.floor(w * 0.48), "left");

        this.contents.fontSize = 22;
        this.changeTextColor("#d8dee9");
        this.drawText("Gana Exp +" + this._data.rewards.exp, tx, y + 62, 260, "left");
        this.resetTextColor();

        if (levelUp) {
            this.drawLevelUpText(levelX - 78, levelY - 30, 170, index);
        }

        this.contents.fontSize = 22;
        this.changeTextColor(levelUp ? LEVEL_COLOR : "#e5e7eb");
        this.drawText("Nv " + after.level, levelX, levelY, 98, "right");
        this.resetTextColor();

        this.drawSimpleGauge(tx, gaugeY, gaugeW, rate, EXP_COLOR_1, EXP_COLOR_2);

        this.contents.fontSize = 18;
        this.changeTextColor("#d8dee9");
        this.drawText(Math.round(rate * 100) + "%", tx + gaugeW - 54, gaugeY - 20, 54, "right");
        this.resetTextColor();

        this.resetFontSettings();
    };

    function Window_DexResultRewards() {
        this.initialize(...arguments);
    }

    Window_DexResultRewards.prototype = Object.create(Window_DexBase.prototype);
    Window_DexResultRewards.prototype.constructor = Window_DexResultRewards;

    Window_DexResultRewards.prototype.initialize = function(rect, data) {
        this._data = data;
        Window_DexBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_DexResultRewards.prototype.refresh = function() {
        this.contents.clear();

        this.contents.fontSize = 28;
        this.changeTextColor(ACCENT_COLOR);
        this.drawText(TextManager.currencyUnit || "Oro", 0, 6, 140, "left");
        this.resetTextColor();
        this.drawText(String(this._data.rewards.gold), 140, 6, this.innerWidth - 140, "right");

        this.changeTextColor(ACCENT_COLOR);
        this.drawText("Exp", 0, 50, 140, "left");
        this.resetTextColor();
        this.drawText(String(this._data.rewards.exp), 140, 50, this.innerWidth - 140, "right");

        this.resetFontSettings();
    };

    function Window_DexResultItems() {
        this.initialize(...arguments);
    }

    Window_DexResultItems.prototype = Object.create(Window_DexBase.prototype);
    Window_DexResultItems.prototype.constructor = Window_DexResultItems;

    Window_DexResultItems.prototype.initialize = function(rect, data) {
        this._data = data;
        Window_DexBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_DexResultItems.prototype.refresh = function() {
        this.contents.clear();

        this.contents.fontSize = 26;
        this.changeTextColor(ACCENT_COLOR);
        this.drawText("Objetos", 0, 0, this.innerWidth, "left");
        this.resetTextColor();

        const items = this._data.rewards.items;

        if (items.length === 0) {
            this.contents.fontSize = 22;
            this.changeTextColor("#d8dee9");
            this.drawText("Sin objetos", 0, 44, this.innerWidth, "left");
            this.resetTextColor();
            return;
        }

        const lineH = 34;
        const max = Math.min(items.length, Math.floor((this.innerHeight - 48) / lineH));

        for (let i = 0; i < max; i++) {
            const entry = items[i];
            const y = 42 + i * lineH;

            this.drawIcon(entry.item.iconIndex, 0, y + 2);
            this.contents.fontSize = 22;
            this.drawText(entry.item.name, 36, y, this.innerWidth - 86, "left");
            this.drawText("x" + entry.amount, this.innerWidth - 52, y, 52, "right");
        }

        this.resetFontSettings();
    };

    function Window_DexLevelTitle() {
        this.initialize(...arguments);
    }

    Window_DexLevelTitle.prototype = Object.create(Window_DexBase.prototype);
    Window_DexLevelTitle.prototype.constructor = Window_DexLevelTitle;

    Window_DexLevelTitle.prototype.initialize = function(rect, row) {
        this._row = row;
        Window_DexBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_DexLevelTitle.prototype.refresh = function() {
        this.contents.clear();

        this.contents.fontSize = 30;
        this.changeTextColor(LEVEL_COLOR);
        this.drawText(this._row.after.name + " sube de nivel!", 0, 10, this.innerWidth, "center");
        this.resetTextColor();
        this.resetFontSettings();
    };

    function Window_DexLevelDetails() {
        this.initialize(...arguments);
    }

    Window_DexLevelDetails.prototype = Object.create(Window_DexBase.prototype);
    Window_DexLevelDetails.prototype.constructor = Window_DexLevelDetails;

    Window_DexLevelDetails.prototype.initialize = function(rect, row) {
        this._row = row;
        Window_DexBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_DexLevelDetails.prototype.refresh = function() {
        this.contents.clear();

        const before = this._row.before;
        const after = this._row.after;

        this.drawFaceScaled(after.faceName, after.faceIndex, 8, 8, 132);

        this.contents.fontSize = 30;
        this.drawText(after.name, 158, 10, 280, "left");

        this.contents.fontSize = 24;
        this.changeTextColor("#e5e7eb");
        this.drawText(after.className, 158, 48, 320, "left");
        this.resetTextColor();

        const stats = [
            ["Nivel", before.level, after.level],
            ["Max HP", before.params[0], after.params[0]],
            ["Max MP", before.params[1], after.params[1]],
            ["Ataque", before.params[2], after.params[2]],
            ["Defensa", before.params[3], after.params[3]],
            ["Atq. Mágico", before.params[4], after.params[4]],
            ["Def. Mágica", before.params[5], after.params[5]],
            ["Agilidad", before.params[6], after.params[6]],
            ["Suerte", before.params[7], after.params[7]]
        ];

        const startY = 160;
        const colW = Math.floor((this.innerWidth - 24) / 2);

        for (let i = 0; i < stats.length; i++) {
            const col = i < 5 ? 0 : 1;
            const row = i < 5 ? i : i - 5;
            const x = 8 + col * colW;
            const y = startY + row * 38;

            this.drawStatLine(stats[i], x, y, colW - 12);
        }

        this.drawNewSkills();
        this.drawContinueText("right");
        this.resetFontSettings();
    };

    Window_DexLevelDetails.prototype.drawStatLine = function(stat, x, y, w) {
        const name = stat[0];
        const before = stat[1];
        const after = stat[2];
        const improved = after > before;

        this.contents.fontSize = 22;
        this.changeTextColor("#e5e7eb");
        this.drawText(name, x, y, Math.floor(w * 0.42), "left");
        this.resetTextColor();

        this.drawText(String(before), x + Math.floor(w * 0.42), y, 56, "right");
        this.changeTextColor("#e5e7eb");
        this.drawText("→", x + Math.floor(w * 0.42) + 60, y, 36, "center");

        this.changeTextColor(improved ? LEVEL_COLOR : "#ffffff");
        this.drawText(String(after), x + Math.floor(w * 0.42) + 100, y, 60, "right");
        this.resetTextColor();
    };

    Window_DexLevelDetails.prototype.drawNewSkills = function() {
        const skills = this._row.newSkills;
        if (!skills || skills.length === 0) return;

        const y = this.innerHeight - 80;
        this.contents.fontSize = 20;
        this.changeTextColor(ACCENT_COLOR);
        this.drawText("Nueva habilidad:", 8, y, 170, "left");
        this.resetTextColor();

        const names = skills.map(skill => skill.name).join(", ");
        this.drawText(names, 180, y, this.innerWidth - 190, "left");
    };

})();
