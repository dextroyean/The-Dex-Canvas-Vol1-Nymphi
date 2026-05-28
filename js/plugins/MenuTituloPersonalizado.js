/*:
 * @target MZ
 * @plugindesc Este script modifica la ventana de comandos del título para hacerla invisible
 * y permitir mover las opciones (Nueva partida, Continuar, Opciones) a cualquier parte.
 * @author Dextroyean
 *
 * @param posX
 * @text Posición X
 * @desc La posición horizontal del menú (0 a la izquierda).
 * @type number
 * @default 50
 *
 * @param posY
 * @text Posición Y
 * @desc La posición vertical del menú (0 arriba).
 * @type number
 * @default 420
 *
 * @param menuWidth
 * @text Ancho del Menú
 * @desc El ancho total de la ventana para que entren tus botones de madera.
 * @type number
 * @default 450
 *
 * @param itemHeight
 * @text Altura de Fila
 * @desc El espacio vertical asignado a cada botón (alto de la imagen + separación).
 * @type number
 * @default 80
 *
 * @help
 * Este script reemplaza el texto por defecto del menú de inicio por imágenes custom.
 * Coloca tus imágenes en la carpeta 'img/title_menu/' de tu proyecto con los nombres:
 * - btn_new_game.png
 * - btn_continue.png
 * - btn_options.png
 *
 * La ventana de fondo se mantiene invisible automáticamente.
 */

(() => {
    const pluginName = "MenuTituloPersonalizado";
    const params = PluginManager.parameters(pluginName);
    
    const posX = Number(params['posX'] || 50);
    const posY = Number(params['posY'] || 420);
    const menuWidth = Number(params['menuWidth'] || 450);
    const itemHeightSetting = Number(params['itemHeight'] || 80);

    // Cargar imágenes desde la carpeta personalizada img/title_menu/
    ImageManager.loadTitleMenu = function(filename) {
        return this.loadBitmap("img/title_menu/", filename);
    };

    // Pre-carga de los botones
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        ImageManager.loadTitleMenu("btn_new_game");
        ImageManager.loadTitleMenu("btn_continue");
        ImageManager.loadTitleMenu("btn_options");
    };

    // Dimensiones de la ventana
    Scene_Title.prototype.commandWindowRect = function() {
        const x = posX;
        const y = posY;
        const width = menuWidth;
        const height = itemHeightSetting * 3 + 20; 
        return new Rectangle(x, y, width, height);
    };

    // Inicializar la ventana eliminando cualquier rastro de fondos nativos
    const _Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
    Window_TitleCommand.prototype.initialize = function(rect) {
        _Window_TitleCommand_initialize.call(this, rect);
        this.opacity = 0;          // Hace invisible el fondo azul de la ventana
        this.frameVisible = false; // Quita los bordes decorativos
        this.cursorVisible = false; // Desactiva el recuadro selector azul
        this.setBackgroundType(2); // Fuerza la transparencia nativa del motor
    };

    // Anular los comandos nativos que oscurecen la pantalla o crean el dimmer gris
    Window_TitleCommand.prototype.updateBackgroundDimmer = function() {};
    Window_TitleCommand.prototype.refreshDimmerBitmap = function() {};
    Window_TitleCommand.prototype.showBackgroundDimmer = function() {};

    // Asegurarnos de que el rectángulo azul selector no intente dibujarse
    Window_TitleCommand.prototype._updateCursor = function() {
        this._cursorSprite.visible = false;
    };

    // Definir la altura de cada fila
    Window_TitleCommand.prototype.itemHeight = function() {
        return itemHeightSetting;
    };

    // Dibujar las imágenes usando el control de opacidad seguro de RPG Maker MZ
    Window_TitleCommand.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        let bitmapName = "";

        switch (symbol) {
            case "newGame":   bitmapName = "btn_new_game"; break;
            case "continue":  bitmapName = "btn_continue"; break;
            case "options":   bitmapName = "btn_options"; break;
            default:          bitmapName = ""; break;
        }

        if (bitmapName) {
            const bitmap = ImageManager.loadTitleMenu(bitmapName);
            bitmap.addLoadListener(() => {
                const dx = rect.x + (rect.width - bitmap.width) / 2;
                const dy = rect.y + (rect.height - bitmap.height) / 2;
                
                // Mantenemos la opacidad base de la ventana fija al 100% para evitar el recuadro gris
                this.contents.paintOpacity = 255;
                
                // Cambiamos SOLO la opacidad del pincel de dibujo usando la función nativa del motor
                if (this.index() === index) {
                    this.changePaintOpacity(true); // Totalmente nítido e iluminado (Equivale a opacidad máx.)
                } else {
                    // Si no está seleccionado, forzamos un valor intermedio de opacidad seguro
                    this.contents.paintOpacity = this.isCommandEnabled(index) ? 130 : 70;
                }
                
                // Dibujar el botón de manera nativa y segura en WebGL
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy);
                
                // Restauramos la opacidad del pincel al terminar
                this.changePaintOpacity(true);
            });
        } else {
            Window_Command.prototype.drawItem.call(this, index);
        }
    };

    // Refrescar de forma limpia al presionar las flechas
    const _Window_TitleCommand_select = Window_TitleCommand.prototype.select;
    Window_TitleCommand.prototype.select = function(index) {
        _Window_TitleCommand_select.call(this, index);
        this.contents.clear(); // Borra el contenido viejo de la pantalla
        this.refresh();        // Redibuja los botones aplicando los cambios de brillo estables
    };
})();