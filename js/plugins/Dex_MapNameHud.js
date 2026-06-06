//=============================================================================
// Dex_MapNameHud.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.4 restaurado) HUD con nombre del mapa usando 3 imágenes, orden configurable y bloqueo por nota.
 * @author Dextroyean
 *
 * @param --- Configuración General ---
 * @default
 *
 * @param Activar Interruptor
 * @parent --- Configuración General ---
 * @type switch
 * @desc ID del interruptor que controla el HUD. Si está en 0, siempre se muestra.
 * @default 0
 *
 * @param Duracion
 * @parent --- Configuración General ---
 * @type number
 * @min 30
 * @desc Tiempo de permanencia del HUD en pantalla, en frames. 60 frames = 1 segundo.
 * @default 180
 *
 * @param Ocultar Display Default
 * @parent --- Configuración General ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Oculta la ventana default de nombre de mapa de RPG Maker.
 * @default true
 *
 * @param --- Imágenes ---
 * @default
 *
 * @param Imagen Fondo
 * @parent --- Imágenes ---
 * @type file
 * @dir img/system
 * @desc Imagen principal del HUD. No escribas .png.
 * @default MapName
 *
 * @param Imagen Circulo
 * @parent --- Imágenes ---
 * @type file
 * @dir img/system
 * @desc Imagen del sello/círculo rúnico. No escribas .png.
 * @default MapName_Circle
 *
 * @param Imagen Particulas
 * @parent --- Imágenes ---
 * @type file
 * @dir img/system
 * @desc Imagen de partículas. No escribas .png.
 * @default MapName_Particles
 *
 * @param --- Orden de Capas ---
 * @default
 *
 * @param Orden Particulas
 * @parent --- Orden de Capas ---
 * @type number
 * @desc Orden visual de las partículas. Número menor = más atrás, número mayor = más adelante.
 * @default 1
 *
 * @param Orden Circulo
 * @parent --- Orden de Capas ---
 * @type number
 * @desc Orden visual del círculo mágico. Número menor = más atrás, número mayor = más adelante.
 * @default 2
 *
 * @param Orden Fondo
 * @parent --- Orden de Capas ---
 * @type number
 * @desc Orden visual del fondo/marco principal. Número menor = más atrás, número mayor = más adelante.
 * @default 3
 *
 * @param Orden Texto
 * @parent --- Orden de Capas ---
 * @type number
 * @desc Orden visual del texto. Recomendado dejarlo alto para que siempre se vea.
 * @default 99
 *
 * @param --- Posicionamiento ---
 * @default
 *
 * @param Hud X-Axis
 * @parent --- Posicionamiento ---
 * @type number
 * @desc Posición horizontal X del HUD, tomando como referencia la esquina superior izquierda del fondo.
 * @default 250
 *
 * @param Hud Y-Axis
 * @parent --- Posicionamiento ---
 * @type number
 * @desc Posición vertical Y del HUD, tomando como referencia la esquina superior izquierda del fondo.
 * @default 60
 *
 * @param Name X-Axis
 * @parent --- Posicionamiento ---
 * @type number
 * @desc Posición X del texto dentro del fondo.
 * @default 95
 *
 * @param Name Y-Axis
 * @parent --- Posicionamiento ---
 * @type number
 * @desc Posición Y del texto dentro del fondo.
 * @default 16
 *
 * @param Name Width
 * @parent --- Posicionamiento ---
 * @type number
 * @min 40
 * @desc Ancho del área del texto.
 * @default 240
 *
 * @param Name Height
 * @parent --- Posicionamiento ---
 * @type number
 * @min 20
 * @desc Alto del área del texto.
 * @default 40
 *
 * @param --- Estilo del Texto ---
 * @default
 *
 * @param Font Face
 * @parent --- Estilo del Texto ---
 * @desc Nombre de la fuente. Vacío usa la fuente default del juego.
 * @default
 *
 * @param Font Size
 * @parent --- Estilo del Texto ---
 * @type number
 * @min 8
 * @desc Tamaño de la fuente del texto.
 * @default 20
 *
 * @param Font Italic
 * @parent --- Estilo del Texto ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activar o desactivar texto en cursiva.
 * @default false
 *
 * @param Text Color
 * @parent --- Estilo del Texto ---
 * @desc Color del texto.
 * @default #FFFFFF
 *
 * @param Outline Color
 * @parent --- Estilo del Texto ---
 * @desc Color del contorno del texto.
 * @default rgba(0, 0, 0, 0.85)
 *
 * @param Outline Width
 * @parent --- Estilo del Texto ---
 * @type number
 * @min 0
 * @desc Grosor del contorno del texto.
 * @default 4
 *
 * @param --- Animaciones ---
 * @default
 *
 * @param Slide Animation
 * @parent --- Animaciones ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activa animación de deslizamiento lateral al aparecer.
 * @default true
 *
 * @param Zoom Animation
 * @parent --- Animaciones ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activa animación de zoom en todo el HUD.
 * @default false
 *
 * @param Zoom Text Animation
 * @parent --- Animaciones ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activa animación de zoom/pulso únicamente para el texto.
 * @default true
 *
 * @param Fade Speed
 * @parent --- Animaciones ---
 * @type number
 * @min 1
 * @desc Velocidad de entrada/salida del HUD.
 * @default 12
 *
 * @param Slide Distance
 * @parent --- Animaciones ---
 * @type number
 * @min 0
 * @desc Distancia inicial del deslizamiento.
 * @default 50
 *
 * @param --- Partículas ---
 * @default
 *
 * @param Particle Animation
 * @parent --- Partículas ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activa efectos de partículas flotando sobre el HUD.
 * @default true
 *
 * @param Particles Number
 * @parent --- Partículas ---
 * @type number
 * @min 0
 * @desc Cantidad de partículas simultáneas.
 * @default 12
 *
 * @param Particle Speed X
 * @parent --- Partículas ---
 * @type number
 * @decimals 2
 * @desc Velocidad horizontal base de las partículas.
 * @default 0.70
 *
 * @param Particle Speed Y
 * @parent --- Partículas ---
 * @type number
 * @decimals 2
 * @desc Velocidad vertical base de las partículas. Negativo sube, positivo baja.
 * @default -0.20
 *
 * @param --- Elemento Rúnico ---
 * @default
 *
 * @param Circle Animation
 * @parent --- Elemento Rúnico ---
 * @type boolean
 * @on Activar
 * @off Desactivar
 * @desc Activa la animación del sello rúnico giratorio.
 * @default true
 *
 * @param Circle X-Axis
 * @parent --- Elemento Rúnico ---
 * @type number
 * @min -999
 * @desc Posición X del sello rúnico respecto al centro del HUD.
 * @default -125
 *
 * @param Circle Y-Axis
 * @parent --- Elemento Rúnico ---
 * @type number
 * @min -999
 * @desc Posición Y del sello rúnico respecto al centro del HUD.
 * @default 0
 *
 * @param Circle Rotation Speed
 * @parent --- Elemento Rúnico ---
 * @desc Velocidad y sentido de rotación. Ejemplo: 0.008 o -0.008.
 * @default 0.008
 *
 * @command MostrarNombreActual
 * @text Mostrar nombre actual
 * @desc Muestra manualmente el HUD con el nombre del mapa actual.
 *
 * @help
 * =============================================================================
 * Dex Map Name Hud v1.4 restaurado
 * =============================================================================
 *
 * Este plugin usa 3 imágenes desde:
 *
 * img/system/
 *
 * Archivos esperados:
 *
 * MapName.png
 * MapName_Circle.png
 * MapName_Particles.png
 *
 * Muestra el nombre del mapa al entrar.
 * Usa el campo Display Name / Nombre mostrado del mapa.
 * Oculta la ventana default de RPG Maker si el parámetro está activado.
 *
 * Puedes elegir el orden visual de las capas:
 *
 * Orden Particulas
 * Orden Circulo
 * Orden Fondo
 * Orden Texto
 *
 * Número menor = más atrás.
 * Número mayor = más adelante.
 *
 * Para mostrar primero partículas, luego círculo y al último fondo:
 *
 * Orden Particulas: 1
 * Orden Circulo: 2
 * Orden Fondo: 3
 * Orden Texto: 99
 *
 * -----------------------------------------------------------------------------
 * Ocultar HUD en mapas específicos
 * -----------------------------------------------------------------------------
 *
 * Para que el HUD NO aparezca en un mapa, pon esta nota en las propiedades
 * del mapa:
 *
 * <NoMapNameHud>
 *
 * Ejemplo:
 *
 * Bosque Lumaria Entrada        sin etiqueta
 * Bosque Lumaria Sección 2      <NoMapNameHud>
 * Bosque Lumaria Sección 3      <NoMapNameHud>
 *
 * Así el HUD aparece al entrar al bosque, pero no en cada sección.
 *
 * IMPORTANTE:
 * Las imágenes deben estar separadas y con transparencia real.
 * No pongas .png en los parámetros del plugin.
 * =============================================================================
 */

var Imported = Imported || {};
Imported.Dex_MapNameHud = true;

var Dex = Dex || {};
Dex.MapNameHud = Dex.MapNameHud || {};

(function() {
    "use strict";

    const pluginName = "Dex_MapNameHud";
    const parameters = PluginManager.parameters(pluginName);

    const numberParam = function(name, fallback) {
        const value = Number(parameters[name]);
        return Number.isFinite(value) ? value : fallback;
    };

    const stringParam = function(name, fallback) {
        const value = parameters[name];
        return value !== undefined && value !== null ? String(value) : fallback;
    };

    const boolParam = function(name, fallback) {
        const value = parameters[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const cleanFileName = function(value, fallback) {
        const str = String(value || fallback || "").trim();
        if (!str) return "";
        return str.replace(/^.*[\\\/]/, "").replace(/\.png$/i, "");
    };

    Dex.MapNameHud.switchId = numberParam("Activar Interruptor", 0);
    Dex.MapNameHud.duration = Math.max(30, numberParam("Duracion", 180));
    Dex.MapNameHud.hideDefault = boolParam("Ocultar Display Default", true);

    Dex.MapNameHud.imageLayout = cleanFileName(stringParam("Imagen Fondo", "MapName"), "MapName");
    Dex.MapNameHud.imageCircle = cleanFileName(stringParam("Imagen Circulo", "MapName_Circle"), "MapName_Circle");
    Dex.MapNameHud.imageParticles = cleanFileName(stringParam("Imagen Particulas", "MapName_Particles"), "MapName_Particles");

    Dex.MapNameHud.zParticles = numberParam("Orden Particulas", 1);
    Dex.MapNameHud.zCircle = numberParam("Orden Circulo", 2);
    Dex.MapNameHud.zLayout = numberParam("Orden Fondo", 3);
    Dex.MapNameHud.zText = numberParam("Orden Texto", 99);

    Dex.MapNameHud.posX = numberParam("Hud X-Axis", 250);
    Dex.MapNameHud.posY = numberParam("Hud Y-Axis", 60);
    Dex.MapNameHud.textX = numberParam("Name X-Axis", 95);
    Dex.MapNameHud.textY = numberParam("Name Y-Axis", 16);
    Dex.MapNameHud.textWidth = Math.max(40, numberParam("Name Width", 240));
    Dex.MapNameHud.textHeight = Math.max(20, numberParam("Name Height", 40));

    Dex.MapNameHud.fontFace = stringParam("Font Face", "");
    Dex.MapNameHud.fontSize = Math.max(8, numberParam("Font Size", 20));
    Dex.MapNameHud.fontItalic = boolParam("Font Italic", false);
    Dex.MapNameHud.textColor = stringParam("Text Color", "#FFFFFF");
    Dex.MapNameHud.outlineColor = stringParam("Outline Color", "rgba(0, 0, 0, 0.85)");
    Dex.MapNameHud.outlineWidth = Math.max(0, numberParam("Outline Width", 4));

    Dex.MapNameHud.slide = boolParam("Slide Animation", true);
    Dex.MapNameHud.zoom = boolParam("Zoom Animation", false);
    Dex.MapNameHud.textZoom = boolParam("Zoom Text Animation", true);
    Dex.MapNameHud.fadeSpeed = Math.max(1, numberParam("Fade Speed", 12));
    Dex.MapNameHud.slideDistance = Math.max(0, numberParam("Slide Distance", 50));

    Dex.MapNameHud.particles = boolParam("Particle Animation", true);
    Dex.MapNameHud.particlesNumber = Math.max(0, numberParam("Particles Number", 12));
    Dex.MapNameHud.particleSpeedX = numberParam("Particle Speed X", 0.70);
    Dex.MapNameHud.particleSpeedY = numberParam("Particle Speed Y", -0.20);

    Dex.MapNameHud.circle = boolParam("Circle Animation", true);
    Dex.MapNameHud.circleX = numberParam("Circle X-Axis", -125);
    Dex.MapNameHud.circleY = numberParam("Circle Y-Axis", 0);
    Dex.MapNameHud.circleRotationSpeed = numberParam("Circle Rotation Speed", 0.008);

    Dex.MapNameHud.isSwitchEnabled = function() {
        if (this.switchId > 0) {
            return $gameSwitches.value(this.switchId);
        }
        return true;
    };

    Dex.MapNameHud.isMapAllowed = function() {
        const note = $dataMap && $dataMap.note ? $dataMap.note : "";
        return !/<NoMapNameHud>/i.test(note);
    };

    //-------------------------------------------------------------------------
    // Game_System
    //-------------------------------------------------------------------------

    const _Dex_MNH_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Dex_MNH_Game_System_initialize.call(this);
        this.setDexMapNameHudTemp();
    };

    Game_System.prototype.setDexMapNameHudTemp = function() {
        this._dexMapNameHudData = {};
        this._dexMapNameHudData.refresh = false;
        this._dexMapNameHudData.requested = false;
        this._dexMapNameHudData.name = "";
        this._dexMapNameHudData.mapId = 0;
        this._dexMapNameHudData.cw = 0;
        this._dexMapNameHudData.ch = 0;
        this._dexMapNameHudData.cw2 = 0;
        this._dexMapNameHudData.ch2 = 0;
        this._dexMapNameHudData.opacity = 0;
        this._dexMapNameHudData.duration = 0;
        this._dexMapNameHudData.rotation = 0;
        this._dexMapNameHudData.textScale = 0;
        this._dexMapNameHudData.xo = 0;
        this._dexMapNameHudData.mode = 0;
        this._dexMapNameHudData.nParticles = Dex.MapNameHud ? Dex.MapNameHud.particlesNumber : 12;
    };

    Game_System.prototype.dexMapNameHudData = function() {
        if (!this._dexMapNameHudData) {
            this.setDexMapNameHudTemp();
        }
        return this._dexMapNameHudData;
    };

    Game_System.prototype.requestDexMapNameHud = function(name) {
        const data = this.dexMapNameHudData();
        data.name = String(name || "");
        data.refresh = true;
        data.requested = true;
        data.duration = Dex.MapNameHud.duration;
        data.opacity = 0;
        data.mode = 0;
        data.xo = Dex.MapNameHud.slide ? -Dex.MapNameHud.slideDistance : 0;
        data.textScale = 0;
    };

    Game_System.prototype.clearDexMapNameHudRequest = function() {
        const data = this.dexMapNameHudData();
        data.refresh = false;
        data.requested = false;
        data.name = "";
        data.duration = 0;
        data.opacity = 0;
        data.mode = 0;
    };

    Game_System.prototype.clearDexMapNameHudMotion = function() {
        const data = this.dexMapNameHudData();
        data.rotation = 0;
        data.xo = Dex.MapNameHud.slide ? -Dex.MapNameHud.slideDistance : 0;
        data.textScale = 0;
    };

    //-------------------------------------------------------------------------
    // Game_Map
    //-------------------------------------------------------------------------

    const _Dex_MNH_Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Dex_MNH_Game_Map_setup.call(this, mapId);
        if (!$gameSystem) return;

        const data = $gameSystem.dexMapNameHudData();
        const name = this.displayName();

        if (data.mapId !== mapId) {
            $gameSystem.clearDexMapNameHudMotion();
        }

        data.mapId = mapId;

        if (name && this.isNameDisplayEnabled() && Dex.MapNameHud.isMapAllowed()) {
            $gameSystem.requestDexMapNameHud(name);
        } else {
            $gameSystem.clearDexMapNameHudRequest();
        }
    };

    //-------------------------------------------------------------------------
    // Plugin Command
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "MostrarNombreActual", function() {
        if (
            $gameMap &&
            $gameMap.displayName() &&
            $gameMap.isNameDisplayEnabled() &&
            Dex.MapNameHud.isSwitchEnabled() &&
            Dex.MapNameHud.isMapAllowed()
        ) {
            $gameSystem.requestDexMapNameHud($gameMap.displayName());
        }
    });

    //-------------------------------------------------------------------------
    // Ocultar Display Default
    //-------------------------------------------------------------------------

    if (Dex.MapNameHud.hideDefault) {
        Window_MapName.prototype.open = function() {
            this.openness = 0;
            this.hide();
        };

        Window_MapName.prototype.refresh = function() {
            if (this.contents) this.contents.clear();
        };

        const _Dex_MNH_Window_MapName_update = Window_MapName.prototype.update;
        Window_MapName.prototype.update = function() {
            _Dex_MNH_Window_MapName_update.call(this);
            this.openness = 0;
            this.opacity = 0;
            this.contentsOpacity = 0;
            this.hide();
        };
    }

    //-------------------------------------------------------------------------
    // Scene_Base
    //-------------------------------------------------------------------------

    Scene_Base.prototype.createDexMapNameHudField = function() {
        this._dexMapNameHudField = new Sprite();
        this._dexMapNameHudField.z = 10;
        this.addChild(this._dexMapNameHudField);
    };

    Scene_Base.prototype.sortDexMapNameHudField = function() {
        if (this._dexMapNameHudField) {
            this._dexMapNameHudField.children.sort(function(a, b) {
                return (a.z || 0) - (b.z || 0);
            });
        }
    };

    const _Dex_MNH_Scene_Map_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
    Scene_Map.prototype.snapForBattleBackground = function() {
        if (this._dexMapNameHudField && SceneManager.isNextScene(Scene_Battle)) {
            this._dexMapNameHudField.visible = false;
        }
        _Dex_MNH_Scene_Map_snapForBattleBackground.call(this);
    };

    //-------------------------------------------------------------------------
    // Scene_Map
    //-------------------------------------------------------------------------

    const _Dex_MNH_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _Dex_MNH_Scene_Map_createSpriteset.call(this);
        if (!this._dexMapNameHudField) {
            this.createDexMapNameHudField();
        }
        this.createDexMapNameHud();
        this.sortDexMapNameHudField();
    };

    const _Dex_MNH_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Dex_MNH_Scene_Map_update.call(this);
        this.updateDexMapNameHudRequest();
    };

    Scene_Map.prototype.updateDexMapNameHudRequest = function() {
        if (!$gameSystem || !$gameMap) return;
        if (!this._dexMapNameHudField) return;

        const data = $gameSystem.dexMapNameHudData();
        if (!data.requested) return;

        data.requested = false;

        if (!data.name) return;
        if (!$gameMap.isNameDisplayEnabled()) return;
        if (!Dex.MapNameHud.isSwitchEnabled()) return;
        if (!Dex.MapNameHud.isMapAllowed()) return;

        this.createDexMapNameHud();
        this.sortDexMapNameHudField();
    };

    Scene_Map.prototype.createDexMapNameHud = function() {
        if (!this._dexMapNameHudField) return;
        if (!$gameSystem || !$gameMap) return;

        const data = $gameSystem.dexMapNameHudData();

        if (!data.name) return;
        if (!$gameMap.isNameDisplayEnabled()) return;
        if (!Dex.MapNameHud.isSwitchEnabled()) return;
        if (!Dex.MapNameHud.isMapAllowed()) return;

        if (this._dexMapNameHud) {
            this._dexMapNameHudField.removeChild(this._dexMapNameHud);
            this._dexMapNameHud.destroy({ children: true });
            this._dexMapNameHud = null;
        }

        this._dexMapNameHud = new Map_Name_Hud();
        this._dexMapNameHud.z = 130;
        this._dexMapNameHudField.addChild(this._dexMapNameHud);
    };

    //-------------------------------------------------------------------------
    // Map_Name_Hud
    //-------------------------------------------------------------------------

    function Map_Name_Hud() {
        this.initialize.apply(this, arguments);
    }

    Map_Name_Hud.prototype = Object.create(Sprite.prototype);
    Map_Name_Hud.prototype.constructor = Map_Name_Hud;

    Map_Name_Hud.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.loadBitmap();
        this.createSprites();
        this.refresh();
        this.updateBase();
    };

    Map_Name_Hud.prototype.data = function() {
        return $gameSystem.dexMapNameHudData();
    };

    Map_Name_Hud.prototype.loadBitmap = function() {
        this._layoutImg = ImageManager.loadSystem(Dex.MapNameHud.imageLayout);
    };

    Map_Name_Hud.prototype.getData = function() {
        if (!this._layoutImg || !this._layoutImg.width || !this._layoutImg.height) return;

        this.data().cw = this._layoutImg.width;
        this.data().ch = this._layoutImg.height;
        this.data().cw2 = Math.floor(this.data().cw / 2);
        this.data().ch2 = Math.floor(this.data().ch / 2);

        if (this._layout) {
            this._layout.bitmap = this._layoutImg;
        }

        if (this._particles) {
            for (let i = 0; i < this._particles.length; i++) {
                this.refreshParticles(this._particles[i], true);
            }
        }

        this.updateBasePosition();
    };

    Map_Name_Hud.prototype.mapName = function() {
        return this.data().name ? String(this.data().name) : "";
    };

    Map_Name_Hud.prototype.createSprites = function() {
        if (Dex.MapNameHud.particles) {
            this.createParticles();
        }

        if (Dex.MapNameHud.circle) {
            this.createCircle();
        }

        this.createLayout();
        this.createName();
        this.sortImageLayers();
    };

    Map_Name_Hud.prototype.sortImageLayers = function() {
        this.children.sort(function(a, b) {
            return (a.z || 0) - (b.z || 0);
        });
    };

    Map_Name_Hud.prototype.createLayout = function() {
        this._layout = new Sprite(this._layoutImg);
        this._layout.anchor.x = 0.5;
        this._layout.anchor.y = 0.5;
        this._layout.z = Dex.MapNameHud.zLayout;
        this.addChild(this._layout);

        if (this._layoutImg.isReady()) {
            this.getData();
        } else {
            this._layoutImg.addLoadListener(this.getData.bind(this));
        }
    };

    Map_Name_Hud.prototype.createName = function() {
        this._name = new Sprite(new Bitmap(Dex.MapNameHud.textWidth, Dex.MapNameHud.textHeight));
        this._name.anchor.x = 0.5;
        this._name.anchor.y = 0.5;
        this._name.z = Dex.MapNameHud.zText;
        this._name.cw = this._name.bitmap.width;
        this._name.ch = this._name.bitmap.height;
        this._name.org = [
            Dex.MapNameHud.textX - this._name.cw / 2,
            Dex.MapNameHud.textY - this._name.ch / 2
        ];
        this.addChild(this._name);
        this.refreshName();
    };

    Map_Name_Hud.prototype.refreshName = function() {
        if (!this._name || !this._name.bitmap) return;

        const bitmap = this._name.bitmap;
        bitmap.clear();

        if (Dex.MapNameHud.fontFace !== "") {
            bitmap.fontFace = Dex.MapNameHud.fontFace;
        }

        bitmap.fontSize = Dex.MapNameHud.fontSize;
        bitmap.fontItalic = Dex.MapNameHud.fontItalic;
        bitmap.textColor = Dex.MapNameHud.textColor;
        bitmap.outlineColor = Dex.MapNameHud.outlineColor;
        bitmap.outlineWidth = Dex.MapNameHud.outlineWidth;
        bitmap.drawText(this.mapName(), 0, 0, this._name.cw, this._name.ch, "center");
    };

    Map_Name_Hud.prototype.createCircle = function() {
        this._circle = new Sprite(ImageManager.loadSystem(Dex.MapNameHud.imageCircle));
        this._circle.anchor.x = 0.5;
        this._circle.anchor.y = 0.5;
        this._circle.z = Dex.MapNameHud.zCircle;
        this._circle.org = [Dex.MapNameHud.circleX, Dex.MapNameHud.circleY];
        this._circle.rs = Dex.MapNameHud.circleRotationSpeed;
        this._circle.rotation = this.data().rotation;
        this.addChild(this._circle);
    };

    Map_Name_Hud.prototype.updateCircle = function() {
        if (!this._circle) return;
        this.data().rotation += this._circle.rs;
        this._circle.rotation = this.data().rotation;
    };

    Map_Name_Hud.prototype.createParticles = function() {
        this._particlesField = new Sprite();
        this._particlesField.z = Dex.MapNameHud.zParticles;
        this.addChild(this._particlesField);
        this._particles = [];

        const amount = Math.max(0, Number(this.data().nParticles || Dex.MapNameHud.particlesNumber || 0));

        for (let i = 0; i < amount; i++) {
            this._particles[i] = new Sprite(ImageManager.loadSystem(Dex.MapNameHud.imageParticles));
            this._particles[i].anchor.x = 0.5;
            this._particles[i].anchor.y = 0.5;
            this._particles[i].sx = 0;
            this._particles[i].sy = 0;
            this._particles[i].so = 0;
            this._particles[i].sr = 0;
            this._particlesField.addChild(this._particles[i]);
            this.refreshParticles(this._particles[i], true);
        }
    };

    Map_Name_Hud.prototype.refreshParticles = function(sprite, start) {
        const cw2 = this.data().cw2 || 120;
        const ch2 = this.data().ch2 || 40;
        const cw = this.data().cw || 240;
        const ch = this.data().ch || 80;

        const wrange = start ? -cw2 + Math.randomInt(cw) : -cw2 + Math.randomInt(Math.max(1, Math.floor(cw / 5)));
        const hrange = -ch2 + Math.randomInt(ch);

        sprite.x = wrange;
        sprite.y = hrange;
        sprite.opacity = 0;
        sprite.sx = Dex.MapNameHud.particleSpeedX + Math.randomInt(4) * 0.15;
        sprite.sy = Dex.MapNameHud.particleSpeedY + (Math.randomInt(5) - 2) * 0.08;
        sprite.so = 0.8 + Math.randomInt(12) * 0.12;
        sprite.sr = 0.002 + Math.randomInt(10) * 0.002;
        sprite.scale.x = 0.65 + Math.randomInt(60) * 0.01;
        sprite.scale.y = sprite.scale.x;
        sprite.rotation = Math.random() * Math.PI * 2;
    };

    Map_Name_Hud.prototype.updateParticles = function() {
        if (!this._particles) return;

        for (let i = 0; i < this._particles.length; i++) {
            this.updateParticlesAnimation(this._particles[i]);
        }
    };

    Map_Name_Hud.prototype.updateParticlesAnimation = function(sprite) {
        const cw2 = this.data().cw2 || 120;
        const ch2 = this.data().ch2 || 40;

        sprite.x += sprite.sx;
        sprite.y += sprite.sy;
        sprite.rotation += sprite.sr;

        if (sprite.x < cw2 - 25) {
            sprite.opacity += sprite.so;
        } else {
            sprite.opacity -= sprite.so * 2;
        }

        if (
            sprite.opacity <= 0 ||
            sprite.x > cw2 + 30 ||
            sprite.y < -ch2 - 30 ||
            sprite.y > ch2 + 30
        ) {
            this.refreshParticles(sprite, false);
        }
    };

    Map_Name_Hud.prototype.refresh = function() {
        const data = this.data();
        data.refresh = false;
        data.duration = Dex.MapNameHud.duration;
        data.opacity = 0;
        data.mode = 0;
        data.xo = Dex.MapNameHud.slide ? -Dex.MapNameHud.slideDistance : 0;
        data.textScale = 0;

        this.opacity = 0;
        this.visible = true;
        this.scale.x = Dex.MapNameHud.zoom ? 0.75 : 1.0;
        this.scale.y = this.scale.x;

        this.refreshName();
        this.updateBasePosition();
        this.sortImageLayers();
    };

    Map_Name_Hud.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateBase();
    };

    Map_Name_Hud.prototype.updateBase = function() {
        const data = this.data();

        if (data.refresh) {
            this.refresh();
        }

        this.updateAnimation();
        this.updateSprites();
    };

    Map_Name_Hud.prototype.updateBasePosition = function() {
        const data = this.data();
        const cw2 = data.cw2 || 120;
        const ch2 = data.ch2 || 40;

        this.x = Dex.MapNameHud.posX + cw2 + (data.xo || 0);
        this.y = Dex.MapNameHud.posY + ch2;
    };

    Map_Name_Hud.prototype.updateAnimation = function() {
        const data = this.data();
        const fade = Dex.MapNameHud.fadeSpeed;

        if (data.duration > 0) {
            data.duration--;
            data.opacity = Math.min(255, data.opacity + fade);

            if (Dex.MapNameHud.slide && data.xo < 0) {
                data.xo += Math.max(1, Math.ceil(Dex.MapNameHud.slideDistance / 18));
                if (data.xo > 0) data.xo = 0;
            }

            if (Dex.MapNameHud.zoom) {
                this.scale.x += (1.0 - this.scale.x) * 0.18;
                this.scale.y = this.scale.x;
            }
        } else {
            data.opacity = Math.max(0, data.opacity - fade);

            if (Dex.MapNameHud.slide) {
                data.xo -= Math.max(1, Math.ceil(Dex.MapNameHud.slideDistance / 24));
            }

            if (data.opacity <= 0) {
                this.visible = false;
            }
        }

        this.opacity = data.opacity;
        this.updateBasePosition();
    };

    Map_Name_Hud.prototype.updateSprites = function() {
        if (this._layout) {
            this._layout.opacity = 255;
        }

        if (this._name) {
            this.updateName();
        }

        if (this._circle) {
            this.updateCircle();
            this._circle.x = this._circle.org[0];
            this._circle.y = this._circle.org[1];
        }

        if (this._particles) {
            this.updateParticles();
        }
    };

    Map_Name_Hud.prototype.updateName = function() {
        const data = this.data();

        this._name.x = this._name.org[0];
        this._name.y = this._name.org[1];

        if (Dex.MapNameHud.textZoom) {
            data.textScale += 0.05;
            const pulse = Math.sin(data.textScale) * 0.035;
            this._name.scale.x = 1.0 + pulse;
            this._name.scale.y = 1.0 + pulse;
        } else {
            this._name.scale.x = 1.0;
            this._name.scale.y = 1.0;
        }
    };
})();