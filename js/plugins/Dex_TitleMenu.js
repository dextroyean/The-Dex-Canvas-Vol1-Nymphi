//=============================================================================
// Dex_TitleMenu.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.2] Title Menu
 * @author Dextroyean
 *
 * @param --- Fondo ---
 * @default
 *
 * @param Usar Fondo Custom
 * @parent --- Fondo ---
 * @text Usar Fondo Custom
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está activo, usa una imagen desde img/title_menu como fondo del título.
 * @default true
 *
 * @param Imagen Fondo
 * @parent --- Fondo ---
 * @text Imagen Fondo
 * @type file
 * @dir img/title_menu
 * @desc Imagen de fondo del título. Debe estar en img/title_menu.
 * @default title_background
 *
 * @param Modo Fondo
 * @parent --- Fondo ---
 * @text Modo Fondo
 * @type select
 * @option Cubrir pantalla
 * @value cover
 * @option Estirar
 * @value stretch
 * @option Contener completa
 * @value contain
 * @option Tamaño original centrado
 * @value original
 * @desc Cómo se ajusta la imagen de fondo a la pantalla.
 * @default cover
 *
 * @param Opacidad Fondo
 * @parent --- Fondo ---
 * @text Opacidad Fondo
 * @type number
 * @min 0
 * @max 255
 * @desc Opacidad de la imagen de fondo.
 * @default 255
 *
 * @param --- Entrada ---
 * @default
 *
 * @param Esperar Tecla
 * @parent --- Entrada ---
 * @text Esperar Tecla
 * @type boolean
 * @on Sí
 * @off No
 * @desc Oculta el menú hasta que el jugador presione OK, Z, Enter, clic o toque.
 * @default true
 *
 * @param startText
 * @parent --- Entrada ---
 * @text Texto Inicio
 * @desc Texto que aparece antes de mostrar el menú.
 * @default Presiona Z para Entrar al Bosque
 *
 * @param startFontSize
 * @parent --- Entrada ---
 * @text Tamaño Texto Inicio
 * @type number
 * @min 8
 * @max 96
 * @desc Tamaño del texto de inicio.
 * @default 28
 *
 * @param startTextColor
 * @parent --- Entrada ---
 * @text Color Texto Inicio
 * @desc Color hexadecimal del texto de inicio.
 * @default #fcd757
 *
 * @param startTextY
 * @parent --- Entrada ---
 * @text Posición Y Texto Inicio
 * @type number
 * @min 0
 * @desc Posición vertical del texto. 0 = arriba. Entre más alto el número, más abajo aparece.
 * @default 562
 *
 * @param Usar Pulso
 * @parent --- Entrada ---
 * @text Usar Pulso
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está activo, el texto respira suavemente.
 * @default true
 *
 * @param --- Menu ---
 * @default
 *
 * @param posX
 * @parent --- Menu ---
 * @text Posición X
 * @desc Posición horizontal del menú. 0 = izquierda. Entre más alto, más a la derecha.
 * @type number
 * @default 50
 *
 * @param posY
 * @parent --- Menu ---
 * @text Posición Y
 * @desc Posición vertical del menú. 0 = arriba. Entre más alto, más abajo.
 * @type number
 * @default 420
 *
 * @param menuWidth
 * @parent --- Menu ---
 * @text Ancho del Menú
 * @desc Ancho total del menú. Si los botones se cortan, aumenta este valor.
 * @type number
 * @default 500
 *
 * @param itemHeight
 * @parent --- Menu ---
 * @text Altura de Fila
 * @desc Alto de cada fila del menú. 0 está arriba y aumenta hacia abajo.
 * @type number
 * @default 95
 *
 * @param buttonDrawWidth
 * @parent --- Menu ---
 * @text Ancho Dibujo Botón
 * @desc Ancho visual de cada botón. Usa 0 para respetar el ancho original del PNG.
 * @type number
 * @min 0
 * @default 400
 *
 * @param buttonDrawHeight
 * @parent --- Menu ---
 * @text Alto Dibujo Botón
 * @desc Alto visual de cada botón. Usa 0 para respetar el alto original del PNG.
 * @type number
 * @min 0
 * @default 85
 *
 * @param buttonScale
 * @parent --- Menu ---
 * @text Escala Botones %
 * @desc Escala adicional si Ancho/Alto Dibujo están en 0. 100 = tamaño original.
 * @type number
 * @min 10
 * @max 300
 * @default 100
 *
 * @param fitButtonsToMenu
 * @parent --- Menu ---
 * @text Ajustar Botones al Menú
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está activo, reduce los botones para que no salgan del área del menú.
 * @default false
 *
 * @param Boton Nueva Partida
 * @parent --- Menu ---
 * @text Botón Nueva Partida
 * @type file
 * @dir img/title_menu
 * @desc Imagen para Nueva Partida.
 * @default btn_new_game
 *
 * @param Boton Continuar
 * @parent --- Menu ---
 * @text Botón Continuar
 * @type file
 * @dir img/title_menu
 * @desc Imagen para Continuar.
 * @default btn_continue
 *
 * @param Boton Opciones
 * @parent --- Menu ---
 * @text Botón Opciones
 * @type file
 * @dir img/title_menu
 * @desc Imagen para Opciones.
 * @default btn_options
 *
 * @param Opacidad Seleccionado
 * @parent --- Menu ---
 * @text Opacidad Seleccionado
 * @type number
 * @min 0
 * @max 255
 * @desc Opacidad del botón seleccionado.
 * @default 255
 *
 * @param Opacidad No Seleccionado
 * @parent --- Menu ---
 * @text Opacidad No Seleccionado
 * @type number
 * @min 0
 * @max 255
 * @desc Opacidad de botones no seleccionados.
 * @default 135
 *
 * @param Opacidad Deshabilitado
 * @parent --- Menu ---
 * @text Opacidad Deshabilitado
 * @type number
 * @min 0
 * @max 255
 * @desc Opacidad de botones deshabilitados, por ejemplo Continuar sin partida guardada.
 * @default 70
 *
 * @help
 * ============================================================================
 * Dex_TitleMenuUnified v1.0.2.2
 * ============================================================================
 *
 * Este plugin une dos funciones:
 *
 * 1. Fondo de título custom desde:
 *    img/title_menu/
 *
 * 2. Botones personalizados del menú:
 *    btn_new_game.png
 *    btn_continue.png
 *    btn_options.png
 *
 * 3. Pantalla inicial de "presiona una tecla" antes de mostrar el menú.
 *
 * ============================================================================
 * INSTALACIÓN
 * ============================================================================
 *
 * Carpeta de imágenes:
 * img/title_menu/
 *
 * Recomendado:
 *
 * img/title_menu/title_background.png
 * img/title_menu/btn_new_game.png
 * img/title_menu/btn_continue.png
 * img/title_menu/btn_options.png
 *
 * Coordenadas:
 * - En posición X, 0 = izquierda. Números mayores mueven a la derecha.
 * - En posición Y, 0 = arriba. Números mayores mueven hacia abajo.
 *
 * Tamaño de botones:
 * - Ancho Dibujo Botón y Alto Dibujo Botón controlan el tamaño visual.
 * - Usa 0 en esos campos para respetar el tamaño real del PNG.
 */

var Imported = Imported || {};
Imported.Dex_TitleMenuUnified = true;

var Dex = Dex || {};
Dex.TitleMenuUnified = Dex.TitleMenuUnified || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_TitleMenuUnified";
    })();

    const params = PluginManager.parameters(pluginName);

    const getParamValue = function(names) {
        const list = Array.isArray(names) ? names : [names];
        for (let i = 0; i < list.length; i++) {
            const name = list[i];
            if (params[name] !== undefined && params[name] !== null && params[name] !== "") {
                return params[name];
            }
        }
        return undefined;
    };

    const numberParam = function(names, fallback) {
        const raw = getParamValue(names);
        const value = Number(raw);
        return Number.isFinite(value) ? value : fallback;
    };

    const stringParam = function(names, fallback) {
        const value = getParamValue(names);
        return value !== undefined && value !== null ? String(value) : fallback;
    };

    const boolParam = function(names, fallback) {
        const value = getParamValue(names);
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const cleanFileName = function(value) {
        return String(value || "")
            .trim()
            .replace(/^.*[\\\/]/, "")
            .replace(/\.(png|jpg|jpeg|webp)$/i, "");
    };

    const clamp = function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    const USE_CUSTOM_BACKGROUND = boolParam("Usar Fondo Custom", true);
    const BACKGROUND_IMAGE = cleanFileName(stringParam("Imagen Fondo", "title_background"));
    const BACKGROUND_MODE = stringParam("Modo Fondo", "cover");
    const BACKGROUND_OPACITY = clamp(numberParam("Opacidad Fondo", 255), 0, 255);

    const WAIT_FOR_INPUT = boolParam("Esperar Tecla", true);
    const START_TEXT = stringParam(["startText", "Texto Inicio"], "Presiona Z para Entrar al Bosque");
    const START_FONT_SIZE = numberParam(["startFontSize", "Tamano Texto Inicio"], 28);
    const START_TEXT_COLOR = stringParam(["startTextColor", "Color Texto Inicio"], "#fcd757");
    const START_TEXT_Y = numberParam(["startTextY", "PosY Texto Inicio"], 562);
    const USE_PULSE = boolParam("Usar Pulso", true);

    const MENU_X = numberParam("posX", 50);
    const MENU_Y = numberParam("posY", 420);
    const MENU_WIDTH = numberParam("menuWidth", 500);
    const ITEM_HEIGHT = numberParam("itemHeight", 95);
    const BUTTON_DRAW_WIDTH = numberParam("buttonDrawWidth", 400);
    const BUTTON_DRAW_HEIGHT = numberParam("buttonDrawHeight", 85);
    const BUTTON_SCALE = Math.max(0.10, numberParam("buttonScale", 100) / 100);
    const FIT_BUTTONS_TO_MENU = boolParam("fitButtonsToMenu", false);

    const BUTTON_NEW_GAME = cleanFileName(stringParam("Boton Nueva Partida", "btn_new_game"));
    const BUTTON_CONTINUE = cleanFileName(stringParam("Boton Continuar", "btn_continue"));
    const BUTTON_OPTIONS = cleanFileName(stringParam("Boton Opciones", "btn_options"));

    const OPACITY_SELECTED = clamp(numberParam("Opacidad Seleccionado", 255), 0, 255);
    const OPACITY_UNSELECTED = clamp(numberParam("Opacidad No Seleccionado", 135), 0, 255);
    const OPACITY_DISABLED = clamp(numberParam("Opacidad Deshabilitado", 70), 0, 255);

    //-------------------------------------------------------------------------
    // ImageManager
    //-------------------------------------------------------------------------

    ImageManager.loadTitleMenu = function(filename) {
        return this.loadBitmap("img/title_menu/", cleanFileName(filename));
    };

    //-------------------------------------------------------------------------
    // Scene_Title: Fondo personalizado
    //-------------------------------------------------------------------------

    const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        if (!USE_CUSTOM_BACKGROUND || !BACKGROUND_IMAGE) {
            _Scene_Title_createBackground.call(this);
            return;
        }

        // RPG Maker MZ y algunos plugins esperan que existan _backSprite1 y _backSprite2.
        // Si solo creamos una imagen custom, pueden lanzar:
        // Cannot read property 'bitmap' of undefined
        this._backSprite1 = new Sprite(ImageManager.loadTitleMenu(BACKGROUND_IMAGE));
        this._backSprite2 = new Sprite(new Bitmap(1, 1));

        this._backSprite1.opacity = BACKGROUND_OPACITY;

        if (this._backSprite1.bitmap) {
            this._backSprite1.bitmap.addLoadListener(this.dexTitleMenuFitBackground.bind(this));
        }

        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    Scene_Title.prototype.dexTitleMenuFitBackground = function() {
        const sprite = this._backSprite1;
        if (!sprite || !sprite.bitmap || !sprite.bitmap.isReady || !sprite.bitmap.isReady()) return;

        const bitmap = sprite.bitmap;
        const sw = Graphics.width;
        const sh = Graphics.height;
        const bw = bitmap.width;
        const bh = bitmap.height;

        if (bw <= 0 || bh <= 0) return;

        sprite.anchor.x = 0;
        sprite.anchor.y = 0;

        if (BACKGROUND_MODE === "stretch") {
            sprite.scale.x = sw / bw;
            sprite.scale.y = sh / bh;
            sprite.x = 0;
            sprite.y = 0;
        } else if (BACKGROUND_MODE === "contain") {
            const scale = Math.min(sw / bw, sh / bh);
            sprite.scale.x = scale;
            sprite.scale.y = scale;
            sprite.x = Math.floor((sw - bw * scale) / 2);
            sprite.y = Math.floor((sh - bh * scale) / 2);
        } else if (BACKGROUND_MODE === "original") {
            sprite.scale.x = 1;
            sprite.scale.y = 1;
            sprite.x = Math.floor((sw - bw) / 2);
            sprite.y = Math.floor((sh - bh) / 2);
        } else {
            const scale = Math.max(sw / bw, sh / bh);
            sprite.scale.x = scale;
            sprite.scale.y = scale;
            sprite.x = Math.floor((sw - bw * scale) / 2);
            sprite.y = Math.floor((sh - bh * scale) / 2);
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Title: Crear escena y pantalla de entrada
    //-------------------------------------------------------------------------

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.dexTitleMenuPreloadImages();
        this.dexTitleMenuSetupStartGate();
    };

    Scene_Title.prototype.dexTitleMenuPreloadImages = function() {
        if (BACKGROUND_IMAGE) ImageManager.loadTitleMenu(BACKGROUND_IMAGE);
        if (BUTTON_NEW_GAME) ImageManager.loadTitleMenu(BUTTON_NEW_GAME);
        if (BUTTON_CONTINUE) ImageManager.loadTitleMenu(BUTTON_CONTINUE);
        if (BUTTON_OPTIONS) ImageManager.loadTitleMenu(BUTTON_OPTIONS);
    };

    Scene_Title.prototype.dexTitleMenuSetupStartGate = function() {
        this._dexTitleMenuWaitingForInput = false;
        this._dexTitleMenuPulseTimer = 0;

        if (!WAIT_FOR_INPUT) {
            this.dexTitleMenuShowCommandWindow();
            return;
        }

        this._dexTitleMenuWaitingForInput = true;
        this.dexTitleMenuHideCommandWindow();
        this.dexTitleMenuCreateStartSprite();
    };

    Scene_Title.prototype.dexTitleMenuCreateStartSprite = function() {
        const width = Graphics.width;
        const height = Math.max(96, START_FONT_SIZE + 48);

        this._dexTitleMenuStartSprite = new Sprite(new Bitmap(width, height));
        this._dexTitleMenuStartSprite.anchor.x = 0.5;
        this._dexTitleMenuStartSprite.anchor.y = 0.5;
        this._dexTitleMenuStartSprite.x = Math.floor(width / 2);
        this._dexTitleMenuStartSprite.y = START_TEXT_Y;

        const bitmap = this._dexTitleMenuStartSprite.bitmap;
        bitmap.fontFace = $gameSystem.mainFontFace ? $gameSystem.mainFontFace() : "rmmz-mainfont";
        bitmap.fontSize = START_FONT_SIZE;
        bitmap.textColor = START_TEXT_COLOR;
        bitmap.outlineColor = "rgba(0, 0, 0, 0.75)";
        bitmap.outlineWidth = 6;
        bitmap.drawText(START_TEXT, 0, 0, width, height, "center");

        this.addChild(this._dexTitleMenuStartSprite);
    };

    Scene_Title.prototype.dexTitleMenuHideCommandWindow = function() {
        if (!this._commandWindow) return;
        this._commandWindow.deactivate();
        this._commandWindow.close();
        this._commandWindow.visible = false;
    };

    Scene_Title.prototype.dexTitleMenuShowCommandWindow = function() {
        if (!this._commandWindow) return;
        this._commandWindow.visible = true;
        this._commandWindow.open();
        this._commandWindow.activate();
        this._commandWindow.select(0);
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (this._dexTitleMenuWaitingForInput) {
            this.dexTitleMenuUpdateStartAnimation();
            this.dexTitleMenuCheckStartInput();
        }
    };

    Scene_Title.prototype.dexTitleMenuUpdateStartAnimation = function() {
        const sprite = this._dexTitleMenuStartSprite;
        if (!sprite) return;

        this._dexTitleMenuPulseTimer += 0.05;

        if (USE_PULSE) {
            const wave = Math.sin(this._dexTitleMenuPulseTimer);
            const scale = 1 + wave * 0.06;
            sprite.scale.x = scale;
            sprite.scale.y = scale;
            sprite.opacity = 185 + wave * 55;
        } else {
            sprite.opacity = 120 + Math.floor((Math.sin(this._dexTitleMenuPulseTimer * 2) + 1) * 55);
        }
    };

    Scene_Title.prototype.dexTitleMenuCheckStartInput = function() {
        if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
            this._dexTitleMenuWaitingForInput = false;

            if (this._dexTitleMenuStartSprite) {
                this._dexTitleMenuStartSprite.visible = false;
            }

            SoundManager.playOk();
            this.dexTitleMenuShowCommandWindow();
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Title: Rectángulo del menú
    //-------------------------------------------------------------------------

    Scene_Title.prototype.commandWindowRect = function() {
        const width = MENU_WIDTH;
        const height = ITEM_HEIGHT * 3 + 20;
        return new Rectangle(MENU_X, MENU_Y, width, height);
    };

    //-------------------------------------------------------------------------
    // Window_TitleCommand: ventana invisible y botones con imagen
    //-------------------------------------------------------------------------

    const _Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
    Window_TitleCommand.prototype.initialize = function(rect) {
        _Window_TitleCommand_initialize.call(this, rect);
        this.opacity = 0;
        this.backOpacity = 0;
        this.contentsOpacity = 255;
        this.frameVisible = false;
        this.cursorVisible = false;
        this.setBackgroundType(2);
    };

    Window_TitleCommand.prototype.updateBackgroundDimmer = function() {};
    Window_TitleCommand.prototype.refreshDimmerBitmap = function() {};
    Window_TitleCommand.prototype.showBackgroundDimmer = function() {};

    Window_TitleCommand.prototype._updateCursor = function() {
        if (this._cursorSprite) {
            this._cursorSprite.visible = false;
        }
    };

    Window_TitleCommand.prototype.itemHeight = function() {
        return ITEM_HEIGHT;
    };

    Window_TitleCommand.prototype.dexTitleMenuButtonName = function(symbol) {
        if (symbol === "newGame") return BUTTON_NEW_GAME;
        if (symbol === "continue") return BUTTON_CONTINUE;
        if (symbol === "options") return BUTTON_OPTIONS;
        return "";
    };

    Window_TitleCommand.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        const bitmapName = this.dexTitleMenuButtonName(symbol);

        if (!bitmapName) {
            Window_Command.prototype.drawItem.call(this, index);
            return;
        }

        const bitmap = ImageManager.loadTitleMenu(bitmapName);

        if (!bitmap.isReady()) {
            bitmap.addLoadListener(() => {
                if (this.contents) this.refresh();
            });
            return;
        }

        const enabled = this.isCommandEnabled(index);
        const selected = this.index() === index;

        let opacity = OPACITY_UNSELECTED;
        if (!enabled) {
            opacity = OPACITY_DISABLED;
        } else if (selected) {
            opacity = OPACITY_SELECTED;
        }

        const maxW = rect.width;
        const maxH = rect.height;

        let dw = BUTTON_DRAW_WIDTH > 0 ? BUTTON_DRAW_WIDTH : Math.floor(bitmap.width * BUTTON_SCALE);
        let dh = BUTTON_DRAW_HEIGHT > 0 ? BUTTON_DRAW_HEIGHT : Math.floor(bitmap.height * BUTTON_SCALE);

        if (FIT_BUTTONS_TO_MENU) {
            const fitScale = Math.min(1, maxW / Math.max(1, dw), maxH / Math.max(1, dh));
            dw = Math.floor(dw * fitScale);
            dh = Math.floor(dh * fitScale);
        }

        const dx = rect.x + Math.floor((rect.width - dw) / 2);
        const dy = rect.y + Math.floor((rect.height - dh) / 2);

        this.contents.paintOpacity = opacity;
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
        this.changePaintOpacity(true);
    };

    const _Window_TitleCommand_select = Window_TitleCommand.prototype.select;
    Window_TitleCommand.prototype.select = function(index) {
        _Window_TitleCommand_select.call(this, index);
        if (this.contents) {
            this.contents.clear();
            this.refresh();
        }
    };

})();
