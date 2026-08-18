//=============================================================================
// Dex_MinimalTitleMenuMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.3] Menú minimalista cinematográfico con partículas mágicas opcionales.
 * @author Dextroyean y Jaime
 *
 * @help
 * ============================================================================
 * Dex_MinimalTitleMenuMZ v1.0.3
 * Creado por Dextroyean y Jaime
 * ============================================================================
 *
 * Versión alternativa del menú principal para RPG Maker MZ.
 *
 * CARACTERÍSTICAS
 * ----------------------------------------------------------------------------
 * - Menú minimalista a la izquierda.
 * - Fondo Full HD adaptable.
 * - Slideshow opcional de múltiples fondos con crossfade.
 * - Gradiente oscuro lateral para mejorar legibilidad.
 * - Logo mediante imagen PNG o texto generado por el plugin.
 * - Nueva Partida / Continuar / Opciones.
 * - Opción Salir opcional.
 * - Estado "Continuar" deshabilitado si no hay guardado.
 * - Pantalla inicial "Presiona Z para Entrar al Bosque".
 * - Entrada mediante teclado, gamepad, ratón o touch.
 * - Texto de versión integrado en la misma pantalla.
 * - Interfaz escalada desde una referencia 1920x1080.
 *
 * v1.0.3
 * - Recupera partículas ambientales opcionales del estilo místico anterior.
 * - Añade parámetros de cantidad, tamaño, opacidad, velocidad y colores.
 * - Las partículas se renderizan entre el fondo y la interfaz para no estorbar.
 *
 * v1.0.2
 * - Centra las leyendas respecto a toda la fila.
 * - Calcula los guiones/líneas según el ancho real de cada leyenda.
 * - El diamante ya no desplaza visualmente el texto.
 *
 * v1.0.1
 * - Corrige "Cannot read property 'width' of undefined".
 * - _backSprite1 y _backSprite2 siempre conservan un Bitmap válido.
 * - El buffer de crossfade usa un Bitmap transparente 1x1 cuando está inactivo.
 * - Se añaden comprobaciones extra antes de leer width/height.
 *
 * IMPORTANTE
 * ----------------------------------------------------------------------------
 * Esta es una ALTERNATIVA a Dex_MysticTitleMenuMZ.
 *
 * NO uses al mismo tiempo:
 * - Dex_TitleMenu.js
 * - MysticTitleMenuMZ.js
 * - Dex_MysticTitleMenuMZ.js
 * - Dex_MinimalTitleMenuMZ.js
 *
 * Deja activo solamente UN plugin que controle Scene_Title.
 *
 * FONDOS
 * ----------------------------------------------------------------------------
 * Guarda las imágenes en:
 * img/title_menu/
 *
 * Si solo defines un fondo, se usa de forma estática.
 * Si defines varios y activas "Cambiar fondos", el plugin hará crossfade.
 *
 * LOGO
 * ----------------------------------------------------------------------------
 * Puedes:
 * A) dejar "Imagen del logo" vacía y usar el logo de texto generado.
 * B) asignar un PNG transparente desde img/title_menu/.
 *
 * ============================================================================
 *
 * @param ---General---
 * @text ═══ GENERAL ═══
 * @default
 *
 * @param ReferenceWidth
 * @parent ---General---
 * @text Ancho de referencia
 * @type number
 * @min 640
 * @default 1920
 *
 * @param ReferenceHeight
 * @parent ---General---
 * @text Alto de referencia
 * @type number
 * @min 360
 * @default 1080
 *
 * @param ImageFolder
 * @parent ---General---
 * @text Carpeta de imágenes
 * @type string
 * @default img/title_menu/
 *
 * @param ---Fondos---
 * @text ═══ FONDOS ═══
 * @default
 *
 * @param BackgroundImages
 * @parent ---Fondos---
 * @text Imágenes de fondo
 * @type file[]
 * @dir img/title_menu
 * @desc Una o varias imágenes. La primera será el fondo inicial.
 * @default ["title_background"]
 *
 * @param BackgroundMode
 * @parent ---Fondos---
 * @text Ajuste del fondo
 * @type select
 * @option Cubrir pantalla
 * @value cover
 * @option Contener completa
 * @value contain
 * @option Estirar
 * @value stretch
 * @default cover
 *
 * @param ChangeBackgrounds
 * @parent ---Fondos---
 * @text Cambiar fondos
 * @type boolean
 * @on Sí
 * @off No
 * @desc Requiere 2 o más imágenes.
 * @default true
 *
 * @param BackgroundInterval
 * @parent ---Fondos---
 * @text Segundos por fondo
 * @type number
 * @decimals 1
 * @min 2
 * @default 12
 *
 * @param BackgroundFadeFrames
 * @parent ---Fondos---
 * @text Frames del crossfade
 * @type number
 * @min 1
 * @default 90
 *
 * @param RandomBackgroundOrder
 * @parent ---Fondos---
 * @text Orden aleatorio
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param BackgroundParallax
 * @parent ---Fondos---
 * @text Paralaje suave con mouse
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ParallaxStrength
 * @parent ---Fondos---
 * @text Intensidad paralaje
 * @type number
 * @min 0
 * @max 40
 * @default 8
 *
 * @param ---Gradient---
 * @text ═══ GRADIENTE IZQUIERDO ═══
 * @default
 *
 * @param UseLeftGradient
 * @parent ---Gradient---
 * @text Usar gradiente
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param GradientWidth
 * @parent ---Gradient---
 * @text Ancho del gradiente
 * @type number
 * @min 100
 * @default 760
 *
 * @param GradientOpacity
 * @parent ---Gradient---
 * @text Oscuridad máxima
 * @type number
 * @min 0
 * @max 255
 * @default 185
 *
 * @param ---Logo---
 * @text ═══ LOGO ═══
 * @default
 *
 * @param LogoImage
 * @parent ---Logo---
 * @text Imagen del logo
 * @type file
 * @dir img/title_menu
 * @desc Déjalo vacío para usar el logo de texto generado.
 * @default
 *
 * @param LogoX
 * @parent ---Logo---
 * @text Logo X
 * @type number
 * @default 105
 *
 * @param LogoY
 * @parent ---Logo---
 * @text Logo Y
 * @type number
 * @default 105
 *
 * @param LogoWidth
 * @parent ---Logo---
 * @text Ancho logo PNG
 * @type number
 * @min 0
 * @desc 0 = tamaño original.
 * @default 0
 *
 * @param LogoHeight
 * @parent ---Logo---
 * @text Alto logo PNG
 * @type number
 * @min 0
 * @desc 0 = tamaño original.
 * @default 0
 *
 * @param StudioText
 * @parent ---Logo---
 * @text Texto superior
 * @type string
 * @default THE DEX CANVAS
 *
 * @param MainTitleLine1
 * @parent ---Logo---
 * @text Título línea 1
 * @type string
 * @default Echoes of the
 *
 * @param MainTitleLine2
 * @parent ---Logo---
 * @text Título línea 2
 * @type string
 * @default Last Nymph
 *
 * @param LogoFontFace
 * @parent ---Logo---
 * @text Fuente del logo
 * @type string
 * @desc Vacío = fuente principal del proyecto.
 * @default
 *
 * @param LogoColor
 * @parent ---Logo---
 * @text Color del logo
 * @type string
 * @default #f5efe5
 *
 * @param LogoAccentColor
 * @parent ---Logo---
 * @text Color de acento
 * @type string
 * @default #c6a866
 *
 * @param ---StartGate---
 * @text ═══ PRESIONA UNA TECLA ═══
 * @default
 *
 * @param UsePressStart
 * @parent ---StartGate---
 * @text Esperar tecla
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param PressStartText
 * @parent ---StartGate---
 * @text Texto inicial
 * @type string
 * @default Presiona Z para Entrar al Bosque
 *
 * @param PressStartX
 * @parent ---StartGate---
 * @text Texto inicial X
 * @type number
 * @default 105
 *
 * @param PressStartY
 * @parent ---StartGate---
 * @text Texto inicial Y
 * @type number
 * @default 875
 *
 * @param PressStartWidth
 * @parent ---StartGate---
 * @text Ancho del texto inicial
 * @type number
 * @default 610
 *
 * @param PressStartFontSize
 * @parent ---StartGate---
 * @text Tamaño texto inicial
 * @type number
 * @min 10
 * @default 27
 *
 * @param PressStartColor
 * @parent ---StartGate---
 * @text Color texto inicial
 * @type string
 * @default #f1eadc
 *
 * @param PressStartPulse
 * @parent ---StartGate---
 * @text Pulso suave
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param PressStartPulseSpeed
 * @parent ---StartGate---
 * @text Velocidad del pulso
 * @type number
 * @decimals 3
 * @min 0.001
 * @default 0.045
 *
 * @param ---Menu---
 * @text ═══ MENÚ MINIMALISTA ═══
 * @default
 *
 * @param MenuX
 * @parent ---Menu---
 * @text Menú X
 * @type number
 * @default 145
 *
 * @param MenuY
 * @parent ---Menu---
 * @text Primer comando Y
 * @type number
 * @default 500
 *
 * @param MenuWidth
 * @parent ---Menu---
 * @text Ancho del menú
 * @type number
 * @min 180
 * @default 430
 *
 * @param MenuItemHeight
 * @parent ---Menu---
 * @text Alto de cada comando
 * @type number
 * @min 40
 * @default 84
 *
 * @param MenuSpacing
 * @parent ---Menu---
 * @text Separación vertical
 * @type number
 * @min 0
 * @default 4
 *
 * @param MenuFontFace
 * @parent ---Menu---
 * @text Fuente del menú
 * @type string
 * @desc Vacío = fuente principal del proyecto.
 * @default
 *
 * @param MenuFontSize
 * @parent ---Menu---
 * @text Tamaño de fuente
 * @type number
 * @min 16
 * @default 36
 *
 * @param MenuTextColor
 * @parent ---Menu---
 * @text Color normal
 * @type string
 * @default #d8d0c2
 *
 * @param MenuSelectedColor
 * @parent ---Menu---
 * @text Color seleccionado
 * @type string
 * @default #fff7e7
 *
 * @param MenuDisabledColor
 * @parent ---Menu---
 * @text Color deshabilitado
 * @type string
 * @default #7e7a76
 *
 * @param MenuAccentColor
 * @parent ---Menu---
 * @text Color indicador
 * @type string
 * @default #e5cf98
 *
 * @param ShowExit
 * @parent ---Menu---
 * @text Mostrar Salir
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @param SelectedPulse
 * @parent ---Menu---
 * @text Pulso del seleccionado
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param SelectedPulseStrength
 * @parent ---Menu---
 * @text Intensidad del pulso
 * @type number
 * @decimals 3
 * @min 0
 * @max 0.1
 * @default 0.012
 *
 * @param MenuRevealFrames
 * @parent ---Menu---
 * @text Frames aparición del menú
 * @type number
 * @min 1
 * @default 18
 *
 * @param MenuStaggerFrames
 * @parent ---Menu---
 * @text Retraso entre comandos
 * @type number
 * @min 0
 * @default 4
 *

 * @param ---Particles---
 * @text ═══ PARTÍCULAS ═══
 * @default
 *
 * @param UseParticles
 * @parent ---Particles---
 * @text Mostrar partículas
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ParticleCount
 * @parent ---Particles---
 * @text Cantidad de partículas
 * @type number
 * @min 0
 * @max 200
 * @default 28
 *
 * @param ParticleMinSize
 * @parent ---Particles---
 * @text Tamaño mínimo
 * @type number
 * @min 1
 * @max 32
 * @default 2
 *
 * @param ParticleMaxSize
 * @parent ---Particles---
 * @text Tamaño máximo
 * @type number
 * @min 1
 * @max 32
 * @default 5
 *
 * @param ParticleOpacityMin
 * @parent ---Particles---
 * @text Opacidad mínima
 * @type number
 * @min 0
 * @max 255
 * @default 32
 *
 * @param ParticleOpacityMax
 * @parent ---Particles---
 * @text Opacidad máxima
 * @type number
 * @min 0
 * @max 255
 * @default 112
 *
 * @param ParticleSpeedMin
 * @parent ---Particles---
 * @text Velocidad mínima Y
 * @type number
 * @decimals 3
 * @min 0
 * @default 0.10
 *
 * @param ParticleSpeedMax
 * @parent ---Particles---
 * @text Velocidad máxima Y
 * @type number
 * @decimals 3
 * @min 0
 * @default 0.34
 *
 * @param ParticleDrift
 * @parent ---Particles---
 * @text Deriva horizontal
 * @type number
 * @decimals 3
 * @min 0
 * @default 0.18
 *
 * @param ParticleColorA
 * @parent ---Particles---
 * @text Color A
 * @type string
 * @default #d8c4ff
 *
 * @param ParticleColorB
 * @parent ---Particles---
 * @text Color B
 * @type string
 * @default #78dfff
 *
 * @param ---Version---
 * @text ═══ VERSIÓN ═══
 * @default
 *
 * @param VersionText
 * @parent ---Version---
 * @text Texto de versión
 * @type string
 * @default Alpha v0.4.2
 *
 * @param VersionX
 * @parent ---Version---
 * @text Versión X
 * @type number
 * @default 1730
 *
 * @param VersionY
 * @parent ---Version---
 * @text Versión Y
 * @type number
 * @default 1010
 *
 * @param VersionWidth
 * @parent ---Version---
 * @text Ancho versión
 * @type number
 * @default 150
 *
 * @param VersionFontSize
 * @parent ---Version---
 * @text Tamaño versión
 * @type number
 * @min 10
 * @default 20
 *
 * @param VersionColor
 * @parent ---Version---
 * @text Color versión
 * @type string
 * @default #e8e2d8
 *
 * @param VersionOpacity
 * @parent ---Version---
 * @text Opacidad versión
 * @type number
 * @min 0
 * @max 255
 * @default 185
 *
 * @param VersionAlign
 * @parent ---Version---
 * @text Alineación versión
 * @type select
 * @option Izquierda
 * @value left
 * @option Centro
 * @value center
 * @option Derecha
 * @value right
 * @default right
 */

var Imported = Imported || {};
Imported.Dex_MinimalTitleMenuMZ = true;

var Dex = Dex || {};
Dex.MinimalTitleMenuMZ = Dex.MinimalTitleMenuMZ || {};

(() => {
    "use strict";

    //-------------------------------------------------------------------------
    // Nombre robusto del plugin
    //-------------------------------------------------------------------------
    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            try {
                const file = decodeURIComponent(script.src.split("/").pop() || "");
                const name = file.replace(/\.js$/i, "");
                if (name) return name;
            } catch (e) {
                console.warn("[Dex_MinimalTitleMenuMZ] No se pudo detectar el nombre del archivo.", e);
            }
        }
        return "Dex_MinimalTitleMenuMZ";
    })();

    const params = PluginManager.parameters(pluginName);

    const pString = (name, fallback = "") => {
        const v = params[name];
        return v !== undefined && v !== null && v !== "" ? String(v) : fallback;
    };

    const pNumber = (name, fallback = 0) => {
        const v = Number(params[name]);
        return Number.isFinite(v) ? v : fallback;
    };

    const pBool = (name, fallback = false) => {
        const v = params[name];
        if (v === undefined || v === null || v === "") return fallback;
        return String(v) === "true";
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const cleanFileName = value => String(value || "")
        .trim()
        .replace(/^.*[\\\/]/, "")
        .replace(/\.(png|jpg|jpeg|webp)$/i, "");

    const parseFileArray = (value, fallback = []) => {
        try {
            const parsed = JSON.parse(value || "[]");
            if (Array.isArray(parsed)) {
                return parsed.map(cleanFileName).filter(Boolean);
            }
        } catch (_) {}
        return fallback.map(cleanFileName).filter(Boolean);
    };

    const REF_W = Math.max(640, pNumber("ReferenceWidth", 1920));
    const REF_H = Math.max(360, pNumber("ReferenceHeight", 1080));
    const IMAGE_FOLDER = pString("ImageFolder", "img/title_menu/");

    const BG_FILES = (() => {
        const arr = parseFileArray(params.BackgroundImages, ["title_background"]);
        return arr.length > 0 ? arr : ["title_background"];
    })();

    const BG_MODE = pString("BackgroundMode", "cover");
    const BG_CHANGE = pBool("ChangeBackgrounds", true);
    const BG_INTERVAL = Math.max(2, pNumber("BackgroundInterval", 12));
    const BG_FADE = Math.max(1, Math.floor(pNumber("BackgroundFadeFrames", 90)));
    const BG_RANDOM = pBool("RandomBackgroundOrder", false);
    const BG_PARALLAX = pBool("BackgroundParallax", true);
    const BG_PARALLAX_STRENGTH = Math.max(0, pNumber("ParallaxStrength", 8));

    const USE_GRADIENT = pBool("UseLeftGradient", true);
    const GRADIENT_WIDTH = Math.max(100, pNumber("GradientWidth", 760));
    const GRADIENT_OPACITY = clamp(pNumber("GradientOpacity", 185), 0, 255);

    const LOGO_IMAGE = cleanFileName(pString("LogoImage", ""));
    const LOGO_X = pNumber("LogoX", 105);
    const LOGO_Y = pNumber("LogoY", 105);
    const LOGO_W = Math.max(0, pNumber("LogoWidth", 0));
    const LOGO_H = Math.max(0, pNumber("LogoHeight", 0));
    const STUDIO_TEXT = pString("StudioText", "THE DEX CANVAS");
    const TITLE_1 = pString("MainTitleLine1", "Echoes of the");
    const TITLE_2 = pString("MainTitleLine2", "Last Nymph");
    const LOGO_FONT = pString("LogoFontFace", "");
    const LOGO_COLOR = pString("LogoColor", "#f5efe5");
    const LOGO_ACCENT = pString("LogoAccentColor", "#c6a866");

    const USE_PRESS = pBool("UsePressStart", true);
    const PRESS_TEXT = pString("PressStartText", "Presiona Z para Entrar al Bosque");
    const PRESS_X = pNumber("PressStartX", 105);
    const PRESS_Y = pNumber("PressStartY", 875);
    const PRESS_W = pNumber("PressStartWidth", 610);
    const PRESS_SIZE = pNumber("PressStartFontSize", 27);
    const PRESS_COLOR = pString("PressStartColor", "#f1eadc");
    const PRESS_PULSE = pBool("PressStartPulse", true);
    const PRESS_SPEED = pNumber("PressStartPulseSpeed", 0.045);

    const MENU_X = pNumber("MenuX", 145);
    const MENU_Y = pNumber("MenuY", 500);
    const MENU_W = Math.max(180, pNumber("MenuWidth", 430));
    const ITEM_H = Math.max(40, pNumber("MenuItemHeight", 84));
    const ITEM_GAP = Math.max(0, pNumber("MenuSpacing", 4));
    const MENU_FONT = pString("MenuFontFace", "");
    const MENU_SIZE = Math.max(16, pNumber("MenuFontSize", 36));
    const MENU_COLOR = pString("MenuTextColor", "#d8d0c2");
    const MENU_SELECTED = pString("MenuSelectedColor", "#fff7e7");
    const MENU_DISABLED = pString("MenuDisabledColor", "#7e7a76");
    const MENU_ACCENT = pString("MenuAccentColor", "#e5cf98");
    const SHOW_EXIT = pBool("ShowExit", false);
    const SELECTED_PULSE = pBool("SelectedPulse", true);
    const SELECTED_PULSE_STRENGTH = clamp(pNumber("SelectedPulseStrength", 0.012), 0, 0.1);
    const MENU_REVEAL_FRAMES = Math.max(1, Math.floor(pNumber("MenuRevealFrames", 18)));
    const MENU_STAGGER = Math.max(0, Math.floor(pNumber("MenuStaggerFrames", 4)));

    const USE_PARTICLES = pBool("UseParticles", true);
    const PARTICLE_COUNT = Math.max(0, Math.floor(pNumber("ParticleCount", 28)));
    const PARTICLE_MIN_SIZE = Math.max(1, pNumber("ParticleMinSize", 2));
    const PARTICLE_MAX_SIZE = Math.max(PARTICLE_MIN_SIZE, pNumber("ParticleMaxSize", 5));
    const PARTICLE_OPACITY_MIN = clamp(pNumber("ParticleOpacityMin", 32), 0, 255);
    const PARTICLE_OPACITY_MAX = clamp(Math.max(PARTICLE_OPACITY_MIN, pNumber("ParticleOpacityMax", 112)), 0, 255);
    const PARTICLE_SPEED_MIN = Math.max(0, pNumber("ParticleSpeedMin", 0.10));
    const PARTICLE_SPEED_MAX = Math.max(PARTICLE_SPEED_MIN, pNumber("ParticleSpeedMax", 0.34));
    const PARTICLE_DRIFT = Math.max(0, pNumber("ParticleDrift", 0.18));
    const PARTICLE_COLOR_A = pString("ParticleColorA", "#d8c4ff");
    const PARTICLE_COLOR_B = pString("ParticleColorB", "#78dfff");

    const VERSION_TEXT = pString("VersionText", "Alpha v0.4.2");
    const VERSION_X = pNumber("VersionX", 1730);
    const VERSION_Y = pNumber("VersionY", 1010);
    const VERSION_W = pNumber("VersionWidth", 150);
    const VERSION_SIZE = pNumber("VersionFontSize", 20);
    const VERSION_COLOR = pString("VersionColor", "#e8e2d8");
    const VERSION_OPACITY = clamp(pNumber("VersionOpacity", 185), 0, 255);
    const VERSION_ALIGN = pString("VersionAlign", "right");

    Dex.MinimalTitleMenuMZ.pluginName = pluginName;
    Dex.MinimalTitleMenuMZ.version = "1.0.3";

    //-------------------------------------------------------------------------
    // ImageManager
    //-------------------------------------------------------------------------
    ImageManager.loadDexMinimalTitle = function(filename) {
        return this.loadBitmap(IMAGE_FOLDER, cleanFileName(filename));
    };

    //-------------------------------------------------------------------------
    // Utilidades visuales
    //-------------------------------------------------------------------------
    function fitSpriteToScreen(sprite) {
        if (!sprite) return;

        const bitmap = sprite.bitmap;
        if (!bitmap) return;
        if (typeof bitmap.isReady === "function" && !bitmap.isReady()) return;

        const bw = Number(bitmap.width || 0);
        const bh = Number(bitmap.height || 0);
        const sw = Number(Graphics.width || 0);
        const sh = Number(Graphics.height || 0);
        if (bw <= 0 || bh <= 0 || sw <= 0 || sh <= 0) return;

        sprite.anchor.set(0.5);
        sprite.x = sw / 2;
        sprite.y = sh / 2;

        if (BG_MODE === "stretch") {
            sprite.scale.x = sw / bw;
            sprite.scale.y = sh / bh;
        } else {
            const scale = BG_MODE === "contain"
                ? Math.min(sw / bw, sh / bh)
                : Math.max(sw / bw, sh / bh);
            sprite.scale.set(scale);
        }

        sprite._dexBaseX = sprite.x;
        sprite._dexBaseY = sprite.y;
    }

    function mainFontFace() {
        if ($gameSystem && $gameSystem.mainFontFace) return $gameSystem.mainFontFace();
        return "rmmz-mainfont";
    }

    function drawGradientBitmap(width, height, opacity) {
        const bitmap = new Bitmap(width, height);
        const ctx = bitmap.context;
        const grd = ctx.createLinearGradient(0, 0, width, 0);
        const a = clamp(opacity, 0, 255) / 255;
        grd.addColorStop(0, `rgba(4,10,20,${a})`);
        grd.addColorStop(0.58, `rgba(4,10,20,${a * 0.78})`);
        grd.addColorStop(1, "rgba(4,10,20,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        if (bitmap._baseTexture) bitmap._baseTexture.update();
        return bitmap;
    }

    //-------------------------------------------------------------------------
    // Scene_Title - fondo personalizado
    //-------------------------------------------------------------------------
    Scene_Title.prototype.createBackground = function() {
        this._dexBgIndex = 0;
        this._dexBgTimer = 0;
        this._dexBgTransition = 0;
        this._dexBgChanging = false;
        const firstBitmap = ImageManager.loadDexMinimalTitle(BG_FILES[0]);
        const transparentBitmap = new Bitmap(1, 1);

        this._dexBgA = new Sprite(firstBitmap);
        this._dexBgB = new Sprite(transparentBitmap);
        this._dexBgB.opacity = 0;

        // Scene_Title y otros plugins pueden consultar width/height de ambos.
        // Por eso ambos mantienen SIEMPRE un Bitmap válido.
        this._backSprite1 = this._dexBgA;
        this._backSprite2 = this._dexBgB;

        this.addChild(this._dexBgA);
        this.addChild(this._dexBgB);

        if (this._dexBgA.bitmap && typeof this._dexBgA.bitmap.addLoadListener === "function") {
            this._dexBgA.bitmap.addLoadListener(() => fitSpriteToScreen(this._dexBgA));
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Title - command window original oculto
    //-------------------------------------------------------------------------
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        if (this._commandWindow) {
            this._commandWindow.hide();
            this._commandWindow.close();
            this._commandWindow.deactivate();
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Title - creación
    //-------------------------------------------------------------------------
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);

        this._dexUiState = USE_PRESS ? "press" : "menu";
        this._dexSelectedIndex = 0;
        this._dexMenuRevealTimer = 0;
        this._dexPressTimer = 0;

        this._createDexParticleRoot();
        this._createDexUiRoot();
        this._createDexGradient();
        this._createDexLogo();
        this._createDexMenu();
        this._createDexPressStart();
        this._createDexVersion();
        this._refreshDexMenu();

        if (this._dexUiState === "press") {
            this._dexMenuRoot.visible = false;
        } else {
            this._startDexMenuReveal();
        }
    };

    Scene_Title.prototype._createDexParticleRoot = function() {
        this._dexFxRoot = new Sprite();
        this.addChild(this._dexFxRoot);
        this._createDexParticles();
    };

    Scene_Title.prototype._createDexUiRoot = function() {
        this._dexUiRoot = new Sprite();
        this.addChild(this._dexUiRoot);
        this._updateDexUiScale();
    };

    Scene_Title.prototype._updateDexUiScale = function() {
        if (!this._dexUiRoot) return;
        const scale = Math.min(Graphics.width / REF_W, Graphics.height / REF_H);
        const usedW = REF_W * scale;
        const usedH = REF_H * scale;
        this._dexUiRoot.scale.set(scale);
        this._dexUiRoot.x = (Graphics.width - usedW) / 2;
        this._dexUiRoot.y = (Graphics.height - usedH) / 2;
    };

    Scene_Title.prototype._createDexGradient = function() {
        if (!USE_GRADIENT) return;
        this._dexGradient = new Sprite(drawGradientBitmap(GRADIENT_WIDTH, REF_H, GRADIENT_OPACITY));
        this._dexGradient.x = 0;
        this._dexGradient.y = 0;
        this._dexUiRoot.addChild(this._dexGradient);
    };

    Scene_Title.prototype._createDexLogo = function() {
        if (LOGO_IMAGE) {
            const sprite = new Sprite(ImageManager.loadDexMinimalTitle(LOGO_IMAGE));
            sprite.x = LOGO_X;
            sprite.y = LOGO_Y;
            if (sprite.bitmap && typeof sprite.bitmap.addLoadListener === "function") {
                sprite.bitmap.addLoadListener(() => {
                    const bw = Number(sprite.bitmap ? sprite.bitmap.width : 0);
                    const bh = Number(sprite.bitmap ? sprite.bitmap.height : 0);
                    if (bw <= 0 || bh <= 0) return;

                    if (LOGO_W > 0 && LOGO_H > 0) {
                        sprite.scale.x = LOGO_W / bw;
                        sprite.scale.y = LOGO_H / bh;
                    } else if (LOGO_W > 0) {
                        sprite.scale.set(LOGO_W / bw);
                    } else if (LOGO_H > 0) {
                        sprite.scale.set(LOGO_H / bh);
                    }
                });
            }
            this._dexLogo = sprite;
            this._dexUiRoot.addChild(sprite);
            return;
        }

        const bmp = new Bitmap(650, 300);
        bmp.fontFace = LOGO_FONT || mainFontFace();

        bmp.fontSize = 22;
        bmp.textColor = LOGO_ACCENT;
        bmp.outlineWidth = 3;
        bmp.outlineColor = "rgba(0,0,0,0.75)";
        bmp.drawText(STUDIO_TEXT, 0, 5, 620, 36, "center");

        bmp.fontSize = 54;
        bmp.textColor = LOGO_COLOR;
        bmp.outlineWidth = 4;
        bmp.drawText(TITLE_1, 0, 52, 620, 70, "center");

        bmp.fontSize = 74;
        bmp.drawText(TITLE_2, 0, 115, 620, 90, "center");

        bmp.fontSize = 26;
        bmp.textColor = LOGO_ACCENT;
        bmp.outlineWidth = 2;
        bmp.drawText("────────  ◆  ────────", 0, 215, 620, 40, "center");

        const sprite = new Sprite(bmp);
        sprite.x = LOGO_X;
        sprite.y = LOGO_Y;
        this._dexLogo = sprite;
        this._dexUiRoot.addChild(sprite);
    };

    Scene_Title.prototype._dexCommands = function() {
        const commands = [
            { symbol: "newGame", label: "Nueva Partida", enabled: true },
            { symbol: "continue", label: "Continuar", enabled: DataManager.isAnySavefileExists() },
            { symbol: "options", label: "Opciones", enabled: true }
        ];
        if (SHOW_EXIT) commands.push({ symbol: "exit", label: "Salir", enabled: true });
        return commands;
    };

    Scene_Title.prototype._createDexMenu = function() {
        this._dexMenuRoot = new Sprite();
        this._dexMenuRoot.x = MENU_X;
        this._dexMenuRoot.y = MENU_Y;
        this._dexUiRoot.addChild(this._dexMenuRoot);

        this._dexMenuItems = [];
        const commands = this._dexCommands();

        commands.forEach((cmd, index) => {
            const sprite = new Sprite(new Bitmap(MENU_W, ITEM_H));
            sprite.y = index * (ITEM_H + ITEM_GAP);
            sprite._dexIndex = index;
            sprite._dexSymbol = cmd.symbol;
            sprite._dexEnabled = cmd.enabled;
            sprite.opacity = 0;
            this._dexMenuRoot.addChild(sprite);
            this._dexMenuItems.push(sprite);
        });
    };

    Scene_Title.prototype._drawDexMenuItem = function(sprite, selected) {
        const bmp = sprite.bitmap;
        const index = sprite._dexIndex;
        const cmd = this._dexCommands()[index];
        if (!cmd) return;

        sprite._dexEnabled = cmd.enabled;
        bmp.clear();
        bmp.fontFace = MENU_FONT || mainFontFace();
        bmp.fontSize = MENU_SIZE;
        bmp.outlineWidth = 3;
        bmp.outlineColor = "rgba(0,0,0,0.82)";

        const enabled = cmd.enabled;
        const color = !enabled ? MENU_DISABLED : (selected ? MENU_SELECTED : MENU_COLOR);
        const accent = selected && enabled
            ? MENU_ACCENT
            : (!enabled ? MENU_DISABLED : "#817d77");

        // Centro real de toda la fila.
        bmp.fontSize = MENU_SIZE;
        const textWidth = Math.ceil(bmp.measureTextWidth(cmd.label));
        const centerX = Math.floor(MENU_W / 2);
        const textLeft = Math.floor(centerX - textWidth / 2);
        const textRight = textLeft + textWidth;
        const lineY = Math.floor(ITEM_H / 2);

        // Indicador independiente para que no empuje la leyenda.
        const diamondX = 10;
        const diamondW = 34;
        bmp.fontSize = Math.max(20, MENU_SIZE - 5);
        bmp.textColor = accent;
        bmp.drawText(selected && enabled ? "◆" : "◇", diamondX, 0, diamondW, ITEM_H, "center");

        // Líneas decorativas simétricas alrededor del texto.
        if (selected && enabled) {
            const textGap = 18;
            const outerMargin = 58; // reserva visual para el diamante a la izquierda
            const leftStart = outerMargin;
            const leftEnd = Math.max(leftStart, textLeft - textGap);

            const rightStart = Math.min(MENU_W - outerMargin, textRight + textGap);
            const rightEnd = MENU_W - outerMargin;

            const leftWidth = Math.max(0, leftEnd - leftStart);
            const rightWidth = Math.max(0, rightEnd - rightStart);

            if (leftWidth > 0) bmp.fillRect(leftStart, lineY, leftWidth, 1, MENU_ACCENT);
            if (rightWidth > 0) bmp.fillRect(rightStart, lineY, rightWidth, 1, MENU_ACCENT);
        }

        // La leyenda siempre queda exactamente centrada.
        bmp.fontSize = MENU_SIZE;
        bmp.textColor = color;
        bmp.drawText(cmd.label, 0, 0, MENU_W, ITEM_H, "center");
    };

    Scene_Title.prototype._refreshDexMenu = function() {
        if (!this._dexMenuItems) return;
        this._dexMenuItems.forEach((sprite, index) => {
            this._drawDexMenuItem(sprite, index === this._dexSelectedIndex);
        });
    };

    Scene_Title.prototype._createDexPressStart = function() {
        if (!USE_PRESS) return;
        const bmp = new Bitmap(PRESS_W, 60);
        bmp.fontFace = MENU_FONT || mainFontFace();
        bmp.fontSize = PRESS_SIZE;
        bmp.textColor = PRESS_COLOR;
        bmp.outlineWidth = 4;
        bmp.outlineColor = "rgba(0,0,0,0.8)";
        bmp.drawText(PRESS_TEXT, 0, 0, PRESS_W, 60, "left");

        this._dexPressSprite = new Sprite(bmp);
        this._dexPressSprite.x = PRESS_X;
        this._dexPressSprite.y = PRESS_Y;
        this._dexUiRoot.addChild(this._dexPressSprite);
    };

    Scene_Title.prototype._createDexVersion = function() {
        if (!VERSION_TEXT) return;
        const bmp = new Bitmap(VERSION_W, 42);
        bmp.fontFace = MENU_FONT || mainFontFace();
        bmp.fontSize = VERSION_SIZE;
        bmp.textColor = VERSION_COLOR;
        bmp.outlineWidth = 3;
        bmp.outlineColor = "rgba(0,0,0,0.75)";
        bmp.drawText(VERSION_TEXT, 0, 0, VERSION_W, 42, VERSION_ALIGN);

        this._dexVersionSprite = new Sprite(bmp);
        this._dexVersionSprite.x = VERSION_X;
        this._dexVersionSprite.y = VERSION_Y;
        this._dexVersionSprite.opacity = VERSION_OPACITY;
        this._dexUiRoot.addChild(this._dexVersionSprite);
    };

    Scene_Title.prototype._createDexParticles = function() {
        this._dexParticles = [];
        if (!USE_PARTICLES || !this._dexFxRoot || PARTICLE_COUNT <= 0) return;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const size = Math.floor(PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE + 1));
            const bitmap = new Bitmap(size * 4, size * 4);
            const color = Math.random() < 0.55 ? PARTICLE_COLOR_A : PARTICLE_COLOR_B;
            bitmap.drawCircle(size * 2, size * 2, size, color);
            const sprite = new Sprite(bitmap);
            sprite.anchor.set(0.5);
            sprite.blendMode = 1;
            sprite.x = Math.random() * Math.max(1, Graphics.width);
            sprite.y = Math.random() * Math.max(1, Graphics.height);
            sprite._dexSize = size;
            sprite._dexBaseAlpha = (PARTICLE_OPACITY_MIN + Math.random() * (PARTICLE_OPACITY_MAX - PARTICLE_OPACITY_MIN)) / 255;
            sprite._dexSpeedY = PARTICLE_SPEED_MIN + Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN);
            sprite._dexDrift = (Math.random() - 0.5) * PARTICLE_DRIFT * 2;
            sprite._dexPhase = Math.random() * Math.PI * 2;
            sprite._dexPulse = 0.25 + Math.random() * 0.35;
            sprite.alpha = sprite._dexBaseAlpha;
            this._dexFxRoot.addChild(sprite);
            this._dexParticles.push(sprite);
        }
    };

    //-------------------------------------------------------------------------
    // Fondo dinámico
    //-------------------------------------------------------------------------
    Scene_Title.prototype._nextDexBackgroundIndex = function() {
        if (BG_FILES.length <= 1) return 0;
        if (BG_RANDOM) {
            let next = this._dexBgIndex;
            let tries = 0;
            while (next === this._dexBgIndex && tries < 10) {
                next = Math.floor(Math.random() * BG_FILES.length);
                tries++;
            }
            return next;
        }
        return (this._dexBgIndex + 1) % BG_FILES.length;
    };

    Scene_Title.prototype._beginDexBackgroundChange = function() {
        if (!BG_CHANGE || BG_FILES.length <= 1 || this._dexBgChanging) return;

        const next = this._nextDexBackgroundIndex();
        const bitmap = ImageManager.loadDexMinimalTitle(BG_FILES[next]);
        if (!bitmap) return;

        this._dexBgB.bitmap = bitmap;
        this._dexBgB.opacity = 0;

        const beginTransition = () => {
            if (!this._dexBgB || !this._dexBgB.bitmap) return;
            fitSpriteToScreen(this._dexBgB);
            this._dexBgNextIndex = next;
            this._dexBgTransition = 0;
            this._dexBgChanging = true;
        };

        if (typeof bitmap.addLoadListener === "function") {
            bitmap.addLoadListener(beginTransition);
        } else {
            beginTransition();
        }
    };

    Scene_Title.prototype._updateDexBackgrounds = function() {
        if (!this._dexBgA) return;

        if (!this._dexBgChanging) {
            this._dexBgTimer++;
            const frames = Math.max(1, Math.floor(BG_INTERVAL * 60));
            if (this._dexBgTimer >= frames) {
                this._dexBgTimer = 0;
                this._beginDexBackgroundChange();
            }
        } else {
            this._dexBgTransition++;
            const t = clamp(this._dexBgTransition / BG_FADE, 0, 1);
            this._dexBgA.opacity = Math.round(255 * (1 - t));
            this._dexBgB.opacity = Math.round(255 * t);

            if (t >= 1) {
                const oldA = this._dexBgA;
                this._dexBgA = this._dexBgB;
                this._dexBgB = oldA;
                this._dexBgB.opacity = 0;
                // Nunca dejar bitmap = null. Scene_Title puede consultar
                // .bitmap.width aunque el sprite esté oculto.
                this._dexBgB.bitmap = new Bitmap(1, 1);
                this._backSprite1 = this._dexBgA;
                this._backSprite2 = this._dexBgB;
                this._dexBgIndex = this._dexBgNextIndex;
                this._dexBgChanging = false;
                this._dexBgTransition = 0;
            }
        }

        if (BG_PARALLAX) {
            const nx = Graphics.width > 0 ? (TouchInput.x / Graphics.width - 0.5) : 0;
            const ny = Graphics.height > 0 ? (TouchInput.y / Graphics.height - 0.5) : 0;
            const tx = nx * BG_PARALLAX_STRENGTH;
            const ty = ny * BG_PARALLAX_STRENGTH;
            [this._dexBgA, this._dexBgB].forEach(sprite => {
                if (!sprite || sprite._dexBaseX === undefined) return;
                sprite.x += (sprite._dexBaseX + tx - sprite.x) * 0.04;
                sprite.y += (sprite._dexBaseY + ty - sprite.y) * 0.04;
            });
        }
    };

    //-------------------------------------------------------------------------
    // Input y estados
    //-------------------------------------------------------------------------
    Scene_Title.prototype._dexAnyStartInput = function() {
        return Input.isTriggered("ok") ||
               Input.isTriggered("cancel") ||
               Input.isTriggered("up") ||
               Input.isTriggered("down") ||
               Input.isTriggered("left") ||
               Input.isTriggered("right") ||
               TouchInput.isTriggered();
    };

    Scene_Title.prototype._startDexMenuReveal = function() {
        this._dexUiState = "menu";
        this._dexMenuRevealTimer = 0;
        this._dexMenuRoot.visible = true;
        this._dexMenuItems.forEach(sprite => sprite.opacity = 0);
        this._refreshDexMenu();
    };

    Scene_Title.prototype._updateDexPressState = function() {
        if (!this._dexPressSprite) return;

        this._dexPressTimer++;
        if (PRESS_PULSE) {
            const wave = Math.sin(this._dexPressTimer * PRESS_SPEED);
            this._dexPressSprite.opacity = 175 + Math.round(wave * 55);
        }

        if (this._dexAnyStartInput()) {
            SoundManager.playOk();
            this._dexUiState = "pressFade";
            this._dexPressFade = 12;
        }
    };

    Scene_Title.prototype._updateDexPressFade = function() {
        if (!this._dexPressSprite) {
            this._startDexMenuReveal();
            return;
        }

        this._dexPressFade--;
        this._dexPressSprite.opacity = Math.max(0, Math.round(255 * (this._dexPressFade / 12)));
        if (this._dexPressFade <= 0) {
            this._dexPressSprite.visible = false;
            this._startDexMenuReveal();
        }
    };

    Scene_Title.prototype._updateDexMenuReveal = function() {
        if (!this._dexMenuItems) return;
        this._dexMenuRevealTimer++;

        this._dexMenuItems.forEach((sprite, index) => {
            const local = this._dexMenuRevealTimer - index * MENU_STAGGER;
            const t = clamp(local / MENU_REVEAL_FRAMES, 0, 1);
            sprite.opacity = Math.round(255 * t);
            // Entrada lateral mínima.
            sprite.x = Math.round(-14 * (1 - t));
        });
    };

    Scene_Title.prototype._dexMoveSelection = function(delta) {
        const count = this._dexMenuItems.length;
        if (count <= 0) return;
        this._dexSelectedIndex = (this._dexSelectedIndex + delta + count) % count;
        this._refreshDexMenu();
        SoundManager.playCursor();
    };

    Scene_Title.prototype._dexHoverIndex = function() {
        if (!this._dexMenuRoot || !this._dexUiRoot) return -1;
        const scale = this._dexUiRoot.scale.x || 1;
        const localX = (TouchInput.x - this._dexUiRoot.x) / scale - MENU_X;
        const localY = (TouchInput.y - this._dexUiRoot.y) / scale - MENU_Y;

        if (localX < 0 || localX > MENU_W) return -1;

        const stride = ITEM_H + ITEM_GAP;
        const index = Math.floor(localY / stride);
        if (index < 0 || index >= this._dexMenuItems.length) return -1;

        const within = localY - index * stride;
        return within >= 0 && within <= ITEM_H ? index : -1;
    };

    Scene_Title.prototype._dexExecuteCurrent = function() {
        const cmd = this._dexCommands()[this._dexSelectedIndex];
        if (!cmd) return;

        if (!cmd.enabled) {
            SoundManager.playBuzzer();
            return;
        }

        SoundManager.playOk();

        switch (cmd.symbol) {
            case "newGame":
                this.commandNewGame();
                break;
            case "continue":
                this.commandContinue();
                break;
            case "options":
                this.commandOptions();
                break;
            case "exit":
                SceneManager.exit();
                break;
        }
    };

    Scene_Title.prototype._updateDexMenuInput = function() {
        if (Input.isRepeated("down")) {
            this._dexMoveSelection(1);
            return;
        }
        if (Input.isRepeated("up")) {
            this._dexMoveSelection(-1);
            return;
        }

        const hover = this._dexHoverIndex();
        if (hover >= 0 && hover !== this._dexSelectedIndex) {
            this._dexSelectedIndex = hover;
            this._refreshDexMenu();
        }

        if (Input.isTriggered("ok")) {
            this._dexExecuteCurrent();
        } else if (TouchInput.isTriggered() && hover >= 0) {
            this._dexSelectedIndex = hover;
            this._refreshDexMenu();
            this._dexExecuteCurrent();
        }
    };

    Scene_Title.prototype._updateDexSelectedPulse = function() {
        if (!SELECTED_PULSE || this._dexUiState !== "menu") return;
        const sprite = this._dexMenuItems && this._dexMenuItems[this._dexSelectedIndex];
        if (!sprite || !sprite._dexEnabled) return;

        const wave = Math.sin(Graphics.frameCount * 0.075);
        const scale = 1 + wave * SELECTED_PULSE_STRENGTH;
        sprite.scale.set(scale);
        sprite.x += (1 - scale) * 10;

        this._dexMenuItems.forEach((item, index) => {
            if (index !== this._dexSelectedIndex) item.scale.set(1);
        });
    };

    Scene_Title.prototype._updateDexParticles = function() {
        if (!this._dexParticles || this._dexParticles.length <= 0) return;
        const w = Math.max(1, Graphics.width);
        const h = Math.max(1, Graphics.height);
        const time = Graphics.frameCount;

        for (const sprite of this._dexParticles) {
            if (!sprite) continue;
            sprite.y -= sprite._dexSpeedY;
            sprite.x += sprite._dexDrift;
            const twinkle = 0.78 + Math.sin(time * 0.035 + sprite._dexPhase) * sprite._dexPulse;
            sprite.alpha = clamp(sprite._dexBaseAlpha * twinkle, 0.04, 1);

            if (sprite.y < -24) {
                sprite.y = h + 24;
                sprite.x = Math.random() * w;
            }
            if (sprite.x < -24) sprite.x = w + 24;
            if (sprite.x > w + 24) sprite.x = -24;
        }
    };

    //-------------------------------------------------------------------------
    // Update
    //-------------------------------------------------------------------------
    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        this._updateDexUiScale();
        this._updateDexBackgrounds();
        this._updateDexParticles();

        switch (this._dexUiState) {
            case "press":
                this._updateDexPressState();
                break;
            case "pressFade":
                this._updateDexPressFade();
                break;
            case "menu":
                this._updateDexMenuReveal();
                this._updateDexMenuInput();
                this._updateDexSelectedPulse();
                break;
        }
    };

})();
