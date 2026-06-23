/*:
 * @target MZ
 * @plugindesc Sistema de dificultad con menú visual por imagen. v1.1.5
 * @author Dex / Jaime
 *
 * @help
 * Dex_DifficultyModes.js
 *
 * Modos:
 * 0 = Normal
 * 1 = Hard
 * 2 = Permadeath
 *
 * Esta versión usa una imagen completa como menú de dificultad.
 * La selección se hace oscureciendo las otras dos opciones.
 *
 * Imagen recomendada:
 * img/title_menu/difficulty_menu.png
 *
 * Controles:
 * - Izquierda / Derecha: cambiar dificultad.
 * - OK / Enter / Z: confirmar.
 * - Cancelar / Esc / X: volver al título.
 *
 * v1.1.4:
 * - El cuadro seleccionador ya no cubre la franja inferior.
 * - El marco lateral ahora puede llegar al borde del panel.
 *
 * Compatible con:
 * - Dex_AuraSync v1.9.3+
 *
 * Funciones útiles:
 * DexDifficulty.mode()
 * DexDifficulty.modeName()
 * DexDifficulty.setMode(0)
 * DexDifficulty.setMode(1)
 * DexDifficulty.setMode(2)
 * DexDifficulty.parryWindowRate()
 * DexDifficulty.parrySpeedRate()
 *
 * Notetags en habilidades:
 * <IgnoreDifficulty>
 * <DifficultyDamageRate: 1.5>
 *
 * @command SetDifficulty
 * @text Cambiar dificultad
 * @desc Cambia la dificultad actual.
 *
 * @arg difficulty
 * @text Dificultad
 * @type select
 * @option Normal
 * @value 0
 * @option Hard
 * @value 1
 * @option Permadeath
 * @value 2
 * @default 0
 *
 * @param difficultyVariableId
 * @text Variable de dificultad
 * @desc Variable que guarda la dificultad. 0 Normal, 1 Hard, 2 Permadeath.
 * @type variable
 * @default 90
 *
 * @param defaultDifficulty
 * @text Dificultad por defecto
 * @type select
 * @option Normal
 * @value 0
 * @option Hard
 * @value 1
 * @option Permadeath
 * @value 2
 * @default 0
 *
 * @param showSelectorOnNewGame
 * @text Mostrar selector al iniciar
 * @desc Si está ON, al elegir Nueva Partida aparece la pantalla de dificultad.
 * @type boolean
 * @default true
 *
 * @param visualSettings
 * @text --- Visual ---
 *
 * @param backgroundFolder
 * @text Carpeta de imagen
 * @desc Carpeta dentro de img/. Recomendado: title_menu
 * @parent visualSettings
 * @type text
 * @default title_menu
 *
 * @param fullMenuImage
 * @text Imagen menú dificultad
 * @desc Imagen completa del menú, sin extensión.
 * @parent visualSettings
 * @type file
 * @dir img/title_menu
 * @default difficulty_menu
 *
 * @param dimOpacity
 * @text Oscurecer opciones no seleccionadas
 * @desc Opacidad del oscurecimiento. 0 transparente, 255 negro.
 * @parent visualSettings
 * @type number
 * @min 0
 * @max 255
 * @default 150
 *
 * @param selectedGlowOpacity
 * @text Brillo opción seleccionada
 * @desc Brillo sutil sobre la opción seleccionada.
 * @parent visualSettings
 * @type number
 * @min 0
 * @max 255
 * @default 35
 *
 * @param selectorLineOpacity
 * @text Marco opción seleccionada
 * @desc Opacidad del marco sobre la opción seleccionada.
 * @parent visualSettings
 * @type number
 * @min 0
 * @max 255
 * @default 190
 *
 * @param selectorTop
 * @text Selector margen superior
 * @desc Desde dónde empieza el cuadro selector.
 * @parent visualSettings
 * @type number
 * @min 0
 * @default 34
 *
 * @param selectorBottomMargin
 * @text Selector margen inferior
 * @desc Espacio inferior que NO será cubierto por el cuadro selector.
 * @parent visualSettings
 * @type number
 * @min 0
 * @default 170
 *
 * @param selectorSideMargin
 * @text Selector margen lateral
 * @desc Espacio lateral interno del marco selector. 0 = llega al borde del panel.
 * @parent visualSettings
 * @type number
 * @min 0
 * @default 0
 *
 * @param normalColor
 * @text Color Normal
 * @desc Color HEX del brillo/marco.
 * @parent visualSettings
 * @type text
 * @default #38bdf8
 *
 * @param hardColor
 * @text Color Hard
 * @desc Color HEX del brillo/marco.
 * @parent visualSettings
 * @type text
 * @default #ef4444
 *
 * @param permadeathColor
 * @text Color Permadeath
 * @desc Color HEX del brillo/marco.
 * @parent visualSettings
 * @type text
 * @default #be185d
 *
 * @param bottomHint
 * @text Mostrar ayuda inferior
 * @desc Muestra texto inferior de controles.
 * @parent visualSettings
 * @type boolean
 * @default true
 *
 * @param bottomHintText
 * @text Texto ayuda inferior
 * @parent visualSettings
 * @type text
 * @default ← → Cambiar   Z/Enter Confirmar   Esc Volver
 *
 * @param normalActorDamageRate
 * @text Normal: Daño jugador
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param normalEnemyDamageRate
 * @text Normal: Daño enemigo
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param normalExpRate
 * @text Normal: EXP
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param normalGoldRate
 * @text Normal: Oro
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param normalParryWindowRate
 * @text Normal: Parry ventana
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param normalParrySpeedRate
 * @text Normal: Parry velocidad
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param hardActorDamageRate
 * @text Hard: Daño jugador
 * @type number
 * @decimals 2
 * @default 0.90
 *
 * @param hardEnemyDamageRate
 * @text Hard: Daño enemigo
 * @type number
 * @decimals 2
 * @default 1.25
 *
 * @param hardExpRate
 * @text Hard: EXP
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param hardGoldRate
 * @text Hard: Oro
 * @type number
 * @decimals 2
 * @default 0.85
 *
 * @param hardParryWindowRate
 * @text Hard: Parry ventana
 * @type number
 * @decimals 2
 * @default 0.75
 *
 * @param hardParrySpeedRate
 * @text Hard: Parry velocidad
 * @type number
 * @decimals 2
 * @default 1.25
 *
 * @param permadeathActorDamageRate
 * @text Permadeath: Daño jugador
 * @type number
 * @decimals 2
 * @default 0.85
 *
 * @param permadeathEnemyDamageRate
 * @text Permadeath: Daño enemigo
 * @type number
 * @decimals 2
 * @default 1.35
 *
 * @param permadeathExpRate
 * @text Permadeath: EXP
 * @type number
 * @decimals 2
 * @default 1.00
 *
 * @param permadeathGoldRate
 * @text Permadeath: Oro
 * @type number
 * @decimals 2
 * @default 0.75
 *
 * @param permadeathParryWindowRate
 * @text Permadeath: Parry ventana
 * @type number
 * @decimals 2
 * @default 0.60
 *
 * @param permadeathParrySpeedRate
 * @text Permadeath: Parry velocidad
 * @type number
 * @decimals 2
 * @default 1.40
 *
 * @param permadeathMainActorId
 * @text Actor principal para Permadeath
 * @desc Si este actor cae en batalla durante Permadeath, se ejecuta Game Over.
 * @type actor
 * @default 1
 *
 * @param permadeathOnlyMainActor
 * @text Solo actor principal
 * @desc ON: si Nymphi cae, Game Over. OFF: usa comportamiento normal.
 * @type boolean
 * @default true
 *
 * @param debugLog
 * @text Mostrar logs
 * @type boolean
 * @default false
 */

var DexDifficulty = DexDifficulty || {};

(() => {
    "use strict";

    const PLUGIN_NAME = "Dex_DifficultyModes";
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

    const text = (name, def = "") => {
        const value = params[name];
        return value === undefined || value === "" ? def : String(value);
    };

    const DIFFICULTY_VARIABLE_ID = num("difficultyVariableId", 90);
    const DEFAULT_DIFFICULTY = num("defaultDifficulty", 0);
    const SHOW_SELECTOR_ON_NEW_GAME = bool("showSelectorOnNewGame", true);

    const BACKGROUND_FOLDER = text("backgroundFolder", "title_menu").replace(/^img\//i, "").replace(/\/$/g, "");
    const FULL_MENU_IMAGE = text("fullMenuImage", "difficulty_menu");
    const DIM_OPACITY = num("dimOpacity", 150);
    const SELECTED_GLOW_OPACITY = num("selectedGlowOpacity", 35);
    const SELECTOR_LINE_OPACITY = num("selectorLineOpacity", 190);
    const SELECTOR_TOP = num("selectorTop", 34);
    const SELECTOR_BOTTOM_MARGIN = num("selectorBottomMargin", 170);
    const SELECTOR_SIDE_MARGIN = num("selectorSideMargin", 0);
    const SHOW_BOTTOM_HINT = bool("bottomHint", true);
    const BOTTOM_HINT_TEXT = text("bottomHintText", "← → Cambiar   Z/Enter Confirmar   Esc Volver");

    const VISUALS = {
        0: { name: "Normal", color: text("normalColor", "#38bdf8") },
        1: { name: "Hard", color: text("hardColor", "#ef4444") },
        2: { name: "Permadeath", color: text("permadeathColor", "#be185d") }
    };

    const SETTINGS = {
        0: {
            name: "Normal",
            actorDamageRate: num("normalActorDamageRate", 1.00),
            enemyDamageRate: num("normalEnemyDamageRate", 1.00),
            expRate: num("normalExpRate", 1.00),
            goldRate: num("normalGoldRate", 1.00),
            parryWindowRate: num("normalParryWindowRate", 1.00),
            parrySpeedRate: num("normalParrySpeedRate", 1.00)
        },
        1: {
            name: "Hard",
            actorDamageRate: num("hardActorDamageRate", 0.90),
            enemyDamageRate: num("hardEnemyDamageRate", 1.25),
            expRate: num("hardExpRate", 1.00),
            goldRate: num("hardGoldRate", 0.85),
            parryWindowRate: num("hardParryWindowRate", 0.75),
            parrySpeedRate: num("hardParrySpeedRate", 1.25)
        },
        2: {
            name: "Permadeath",
            actorDamageRate: num("permadeathActorDamageRate", 0.85),
            enemyDamageRate: num("permadeathEnemyDamageRate", 1.35),
            expRate: num("permadeathExpRate", 1.00),
            goldRate: num("permadeathGoldRate", 0.75),
            parryWindowRate: num("permadeathParryWindowRate", 0.60),
            parrySpeedRate: num("permadeathParrySpeedRate", 1.40)
        }
    };

    const PERMADEATH_MAIN_ACTOR_ID = num("permadeathMainActorId", 1);
    const PERMADEATH_ONLY_MAIN_ACTOR = bool("permadeathOnlyMainActor", true);
    const DEBUG_LOG = bool("debugLog", false);

    const log = (...args) => {
        if (DEBUG_LOG) console.log("[Dex_DifficultyModes]", ...args);
    };

    const normalizeMode = value => {
        const mode = Number(value);
        if (mode === 1 || mode === 2) return mode;
        return 0;
    };

    const hexToRgb = hex => {
        const clean = String(hex || "#ffffff").replace("#", "").trim();
        const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
        const n = parseInt(full, 16);
        if (!Number.isFinite(n)) return [255, 255, 255];
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const loadDifficultyBitmap = filename => {
        return ImageManager.loadBitmap("img/" + BACKGROUND_FOLDER + "/", filename);
    };

    DexDifficulty.mode = function() {
        if (!$gameVariables) return DEFAULT_DIFFICULTY;
        const current = $gameVariables.value(DIFFICULTY_VARIABLE_ID);
        if (current === undefined || current === null || current === "") return DEFAULT_DIFFICULTY;
        return normalizeMode(current);
    };

    DexDifficulty.setMode = function(mode) {
        const normalized = normalizeMode(mode);
        if ($gameVariables) $gameVariables.setValue(DIFFICULTY_VARIABLE_ID, normalized);
        log("Difficulty changed:", normalized, SETTINGS[normalized].name);
    };

    DexDifficulty.settings = function() { return SETTINGS[this.mode()] || SETTINGS[0]; };
    DexDifficulty.modeName = function() { return this.settings().name; };
    DexDifficulty.isNormal = function() { return this.mode() === 0; };
    DexDifficulty.isHard = function() { return this.mode() === 1; };
    DexDifficulty.isPermadeath = function() { return this.mode() === 2; };
    DexDifficulty.actorDamageRate = function() { return this.settings().actorDamageRate; };
    DexDifficulty.enemyDamageRate = function() { return this.settings().enemyDamageRate; };
    DexDifficulty.expRate = function() { return this.settings().expRate; };
    DexDifficulty.goldRate = function() { return this.settings().goldRate; };
    DexDifficulty.parryWindowRate = function() { return this.settings().parryWindowRate; };
    DexDifficulty.parrySpeedRate = function() { return this.settings().parrySpeedRate; };
    DexDifficulty.difficultyVariableId = function() { return DIFFICULTY_VARIABLE_ID; };

    PluginManager.registerCommand(PLUGIN_NAME, "SetDifficulty", args => {
        DexDifficulty.setMode(Number(args.difficulty || 0));
    });

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        if ($gameVariables && !$gameVariables.value(DIFFICULTY_VARIABLE_ID)) {
            $gameVariables.setValue(DIFFICULTY_VARIABLE_ID, DEFAULT_DIFFICULTY);
        }
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        if (SHOW_SELECTOR_ON_NEW_GAME) {
            DataManager.setupNewGame();
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_DexDifficulty);
        } else {
            _Scene_Title_commandNewGame.call(this);
        }
    };

    function Scene_DexDifficulty() { this.initialize(...arguments); }
    Scene_DexDifficulty.prototype = Object.create(Scene_Base.prototype);
    Scene_DexDifficulty.prototype.constructor = Scene_DexDifficulty;

    Scene_DexDifficulty.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
        this._selectedMode = normalizeMode(DEFAULT_DIFFICULTY);
        this._pulse = 0;
    };

    Scene_DexDifficulty.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createDimmers();
        this.createSelectorFrame();
        this.createHint();
        this.updateSelectionVisuals();
    };

    Scene_DexDifficulty.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this.startFadeIn(this.fadeSpeed(), false);
    };

    Scene_DexDifficulty.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite(loadDifficultyBitmap(FULL_MENU_IMAGE));
        this.addChild(this._backgroundSprite);
    };

    Scene_DexDifficulty.prototype.panelRect = function(index) {
        const w = Graphics.width / 3;
        return new Rectangle(Math.round(index * w), 0, Math.ceil(w), Graphics.height);
    };

    Scene_DexDifficulty.prototype.createDimmers = function() {
        this._dimmerSprites = [];
        for (let i = 0; i < 3; i++) {
            const rect = this.panelRect(i);
            const sprite = new Sprite(new Bitmap(rect.width, rect.height));
            sprite.x = rect.x;
            sprite.y = rect.y;
            sprite.bitmap.fillAll("black");
            sprite.opacity = DIM_OPACITY;
            this._dimmerSprites.push(sprite);
            this.addChild(sprite);
        }
    };

    Scene_DexDifficulty.prototype.selectorHeight = function() {
        return Math.max(64, Graphics.height - SELECTOR_TOP - SELECTOR_BOTTOM_MARGIN);
    };

    Scene_DexDifficulty.prototype.createSelectorFrame = function() {
        this._selectorSprite = new Sprite(new Bitmap(Math.ceil(Graphics.width / 3), this.selectorHeight()));
        this.addChild(this._selectorSprite);
    };

    Scene_DexDifficulty.prototype.createHint = function() {
        this._hintSprite = new Sprite(new Bitmap(Graphics.width, 64));
        this._hintSprite.y = Graphics.height - 66;
        this.addChild(this._hintSprite);
        this.refreshHint();
    };

    Scene_DexDifficulty.prototype.refreshHint = function() {
        if (!SHOW_BOTTOM_HINT || !this._hintSprite) return;
        const bitmap = this._hintSprite.bitmap;
        bitmap.clear();
        bitmap.fontSize = 24;
        bitmap.textColor = "#f8e7c0";
        bitmap.outlineColor = "rgba(0,0,0,0.85)";
        bitmap.outlineWidth = 5;
        bitmap.drawText(BOTTOM_HINT_TEXT, 0, 0, Graphics.width, 64, "center");
    };

    Scene_DexDifficulty.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this._pulse++;
        this.updateInput();
        this.updateSelectorPulse();
    };

    Scene_DexDifficulty.prototype.updateInput = function() {
        if (Input.isTriggered("right")) {
            this.changeSelection(1);
        } else if (Input.isTriggered("left")) {
            this.changeSelection(-1);
        } else if (Input.isTriggered("ok")) {
            this.confirmSelection();
        } else if (Input.isTriggered("cancel")) {
            SoundManager.playCancel();
            SceneManager.goto(Scene_Title);
        }

        if (TouchInput.isTriggered()) {
            const mode = Math.floor(TouchInput.x / (Graphics.width / 3));
            if (mode >= 0 && mode <= 2) {
                if (mode === this._selectedMode) {
                    this.confirmSelection();
                } else {
                    this._selectedMode = mode;
                    SoundManager.playCursor();
                    this.updateSelectionVisuals();
                }
            }
        }
    };

    Scene_DexDifficulty.prototype.changeSelection = function(delta) {
        this._selectedMode = (this._selectedMode + delta + 3) % 3;
        SoundManager.playCursor();
        this.updateSelectionVisuals();
    };

    Scene_DexDifficulty.prototype.updateSelectionVisuals = function() {
        for (let i = 0; i < 3; i++) {
            this._dimmerSprites[i].opacity = i === this._selectedMode ? 0 : DIM_OPACITY;
        }
        this.refreshSelectorFrame();
    };

    Scene_DexDifficulty.prototype.refreshSelectorFrame = function() {
        const visual = VISUALS[this._selectedMode] || VISUALS[0];
        const [r, g, b] = hexToRgb(visual.color);
        const rect = this.panelRect(this._selectedMode);
        const bitmap = this._selectorSprite.bitmap;
        bitmap.clear();

        const w = bitmap.width;
        const h = bitmap.height;
        const marginX = SELECTOR_SIDE_MARGIN;
        const marginY = 0;

        bitmap.fillRect(0, 0, w, h, `rgba(${r},${g},${b},${SELECTED_GLOW_OPACITY / 255})`);
        bitmap.strokeRect(marginX, marginY, w - marginX * 2, h - marginY * 2, `rgba(${r},${g},${b},${SELECTOR_LINE_OPACITY / 255})`);
        bitmap.strokeRect(marginX + 6, marginY + 6, w - (marginX + 6) * 2, h - (marginY + 6) * 2, `rgba(255,255,255,0.22)`);

        this._selectorSprite.x = rect.x;
        this._selectorSprite.y = SELECTOR_TOP;
    };

    Scene_DexDifficulty.prototype.updateSelectorPulse = function() {
        if (!this._selectorSprite) return;
        const wave = Math.sin(this._pulse * 0.07);
        this._selectorSprite.opacity = 220 + wave * 35;
    };

    Scene_DexDifficulty.prototype.confirmSelection = function() {
        DexDifficulty.setMode(this._selectedMode);
        SoundManager.playOk();
        SceneManager.goto(Scene_Map);
    };

    window.Scene_DexDifficulty = Scene_DexDifficulty;

    // -------------------------------------------------------------------------
    // Multiplicadores de combate
    // -------------------------------------------------------------------------

    const hasNote = (item, tagName) => {
        if (!item || !item.note) return false;
        const regex = new RegExp(`<${tagName}>`, "i");
        return regex.test(item.note);
    };

    const noteNumber = (item, tagName, def) => {
        if (!item || !item.note) return def;
        const regex = new RegExp(`<${tagName}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*>`, "i");
        const match = item.note.match(regex);
        return match ? Number(match[1]) : def;
    };

    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        let value = _Game_Action_makeDamageValue.call(this, target, critical);
        const item = this.item();

        if (!hasNote(item, "IgnoreDifficulty")) {
            const subject = this.subject();
            if (subject) {
                if (subject.isActor && subject.isActor()) value *= DexDifficulty.actorDamageRate();
                else if (subject.isEnemy && subject.isEnemy()) value *= DexDifficulty.enemyDamageRate();
            }
            value *= noteNumber(item, "DifficultyDamageRate", 1.0);
        }

        return Math.round(value);
    };

    const _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
    Game_Troop.prototype.expTotal = function() {
        return Math.round(_Game_Troop_expTotal.call(this) * DexDifficulty.expRate());
    };

    const _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
    Game_Troop.prototype.goldTotal = function() {
        return Math.round(_Game_Troop_goldTotal.call(this) * DexDifficulty.goldRate());
    };

    const _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function() {
        if (DexDifficulty.isPermadeath() && PERMADEATH_ONLY_MAIN_ACTOR) {
            const actor = $gameActors ? $gameActors.actor(PERMADEATH_MAIN_ACTOR_ID) : null;
            if (actor && actor.isDead()) {
                log("Permadeath triggered by actor:", PERMADEATH_MAIN_ACTOR_ID);
                this.processDefeat();
                return true;
            }
        }
        return _BattleManager_checkBattleEnd.call(this);
    };

})();
