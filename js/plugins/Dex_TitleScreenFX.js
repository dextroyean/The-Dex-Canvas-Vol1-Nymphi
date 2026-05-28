/*:
 * @target MZ
 * @plugindesc [v1.0] Pantalla de inicio personalizada para Tales of Dex. Controla la entrada del menú con efectos visuales modernos.
 * @author Tales of Dex Team
 *
 * @param startText
 * @text Texto de Inicio
 * @desc La frase original que verá el jugador.
 * @default — Presiona Z para Entrar al Bosque —
 *
 * @param fontSize
 * @text Tamaño de Letra
 * @desc Tamaño de la fuente para el texto de inicio.
 * @type number
 * @default 28
 *
 * @param textColor
 * @text Color del Texto
 * @desc Color principal de la fuente (Formato Hexadecimal).
 * @default #fcd757
 *
 * @param usePulse
 * @text ¿Activar Efecto Respiración?
 * @desc Si está activo, el texto se expandirá y encogerá suavemente en lugar de solo parpadear.
 * @type boolean
 * @default true
 *
 * @help
 * ============================================================================
 *                 DEX TITLE SCREEN FX - Creado por Tales of Dex Team
 * ============================================================================
 * Plugin original diseñado a medida para la pantalla de inicio del proyecto.
 * 
 * Bloquea la ventana de comandos por defecto y despliega un texto animado
 * esperando una confirmación (Teclado, Mouse o Touch). Al presionar el botón,
 * reproduce el efecto de sonido de decisión del sistema y activa el menú.
 */

(() => {
    const pluginName = "Dex_TitleScreenFX";
    const params = PluginManager.parameters(pluginName);

    const START_TEXT = String(params['startText'] || '— PRESIONA START —');
    const FONT_SIZE = Number(params['fontSize'] || 40);
    const TEXT_COLOR = String(params['textColor'] || '#fcd757');
    const USE_PULSE = (params['usePulse'] === 'true');

    // --- EXTENSIÓN DE SCENE_TITLE ---

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this._dexWaitingForInput = true;
        this._dexPulseTimer = 0;
    };

    const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_createForeground.call(this);
        this.createDexStartSprite();
        if (this._commandWindow) {
            this._commandWindow.deactivate();
            this._commandWindow.visible = false;
        }
    };

    // Creación de nuestro Sprite original
    Scene_Title.prototype.createDexStartSprite = function() {
        const width = Graphics.width;
        const height = 100;

        this._dexStartSprite = new Sprite(new Bitmap(width, height));
        this._dexStartSprite.anchor.x = 0.5;
        this._dexStartSprite.anchor.y = 0.5;
        this._dexStartSprite.x = width / 2;
        this._dexStartSprite.y = Graphics.height * 0.78;

        const bitmap = this._dexStartSprite.bitmap;
        bitmap.fontFace = "rmmz-mainfont";
        bitmap.fontSize = FONT_SIZE;
        bitmap.textColor = TEXT_COLOR;
        bitmap.outlineColor = "rgba(0, 0, 0, 0.75)";
        bitmap.outlineWidth = 6;
        bitmap.drawText(START_TEXT, 0, 0, width, height, "center");

        this.addChild(this._dexStartSprite);
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);
        if (this._dexWaitingForInput) {
            this.updateDexTitleAnimation();
            this.checkDexTitleInput();
        }
    };

    Scene_Title.prototype.updateDexTitleAnimation = function() {
        if (!this._dexStartSprite) return;

        this._dexPulseTimer += 0.05;
        if (USE_PULSE) {
            const scale = 1 + Math.sin(this._dexPulseTimer) * 0.06;
            this._dexStartSprite.scale.x = scale;
            this._dexStartSprite.scale.y = scale;
            this._dexStartSprite.opacity = 180 + Math.sin(this._dexPulseTimer) * 60;
        } else {
            this._dexStartSprite.opacity = 96 + Math.floor((Math.sin(this._dexPulseTimer * 2) + 1) * 64);
        }
    };

    Scene_Title.prototype.checkDexTitleInput = function() {
        if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
            this._dexWaitingForInput = false;
            if (this._dexStartSprite) {
                this._dexStartSprite.visible = false;
            }
            SoundManager.playOk();

            if (this._commandWindow) {
                this._commandWindow.visible = true;
                this._commandWindow.open();
                this._commandWindow.activate();
            }
        }
    };

    const _Scene_Title_isBusy = Scene_Title.prototype.isBusy;
    Scene_Title.prototype.isBusy = function() {
        return _Scene_Title_isBusy.call(this) || this._dexWaitingForInput;
    };

})();