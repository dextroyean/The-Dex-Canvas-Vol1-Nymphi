/*:
 * @target MZ
 * @plugindesc Muestra el número de versión del juego en la pantalla de título.
 * @author Dextroyean
 *
 * @param gameVersion
 * @text Versión del Juego
 * @desc El texto que se mostrará en la esquina (ej. v1.0.0, Alpha 0.1).
 * @type string
 * @default v0.0.1
 *
 * @param fontSize
 * @text Tamaño de Letra
 * @desc El tamaño de la fuente para el texto de la versión.
 * @type number
 * @default 20
 *
 * @param textColor
 * @text Color del Texto
 * @desc El color en formato HEX (#ffffff es blanco, #ffcc00 es dorado).
 * @type string
 * @default #ffffff
 *
 * @param offsetX
 * @text Margen Derecho (X)
 * @desc Separación desde el borde derecho de la pantalla.
 * @type number
 * @default 20
 *
 * @param offsetY
 * @text Margen Inferior (Y)
 * @desc Separación desde el borde inferior de la pantalla.
 * @type number
 * @default 20
 */

(() => {
    const pluginName = "Version";
    const params = PluginManager.parameters(pluginName);
    
    const gameVersion = String(params['gameVersion'] || 'v0.0.1');
    const fontSize = Number(params['fontSize'] || 20);
    const textColor = String(params['textColor'] || '#ffffff');
    const offsetX = Number(params['offsetX'] || 20);
    const offsetY = Number(params['offsetY'] || 20);

    // Engancharnos a la creación de la pantalla de título para dibujar la versión
    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        this.createVersionWindow();
    };

    Scene_Title.prototype.createVersionWindow = function() {
        // Creamos una ventana invisible del tamaño de la pantalla para usar su lienzo
        const rect = new Rectangle(0, 0, Graphics.width, Graphics.height);
        this._versionWindow = new Window_Base(rect);
        
        // Hacemos que la ventana sea completamente invisible
        this._versionWindow.opacity = 0;
        this._versionWindow.frameVisible = false;
        this._versionWindow.setBackgroundType(2);
        
        // Configuramos la fuente
        this._versionWindow.contents.fontSize = fontSize;
        this._versionWindow.contents.textColor = textColor;
        
        // Calcular la posición exacta abajo a la derecha según el largo del texto
        const textWidth = this._versionWindow.textWidth(gameVersion);
        const x = Graphics.width - textWidth - offsetX - this._versionWindow.padding;
        const y = Graphics.height - fontSize - offsetY - this._versionWindow.padding;
        
        // Dibujar el texto de la versión
        this._versionWindow.drawText(gameVersion, x, y, textWidth, "right");
        
        // Añadirlo a la escena
        this.addChild(this._versionWindow);
    };
})();