/*:
 * @target MZ
 * @plugindesc v1.0.4 Pulido UX: jerarquía de botones, selección elegante y versión discreta.
 * @author Dextroyean y Jaime
 *
 * @help
 * Dex_MysticTitleMenuMZ.js
 * ============================================================================
 * Reemplaza la ventana de título estándar de RPG Maker MZ por un menú formado
 * por sprites: fondo, logotipo, panel y botones con estados normal/seleccionado.
 *
 * CARPETA DE IMÁGENES
 * Crea la carpeta:
 *   img/title_menu/
 *
 * Nombres sugeridos:
 *   Title_Background.png
 *   Title_Logo.png
 *   Title_Panel.png
 *   Title_Button_Normal.png
 *   Title_Button_Selected.png
 *
 * En los parámetros escribe el nombre SIN la extensión .png.
 *
 * CARACTERÍSTICAS
 * - Escala adaptativa tomando una resolución de referencia.
 * - Fondo a pantalla completa mediante recorte proporcional.
 * - Navegación con teclado, mando, ratón y pantalla táctil.
 * - Estado deshabilitado de Continuar cuando no existe una partida guardada.
 * - Botón seleccionado con imagen propia y pulso opcional.
 * - Texto de versión opcional.
 * - Pantalla "presiona una tecla" opcional y configurable.
 * - El panel y los botones permanecen ocultos hasta la entrada inicial.
 * - Partículas decorativas opcionales.
 * - Si no se asignan imágenes de botón, el plugin dibuja botones de respaldo.
 *
 * v1.0.2
 * - Añade escala visual de botones independiente de su lienzo PNG.
 * - Preset UX recomendado: 91.5% (400x240 -> aprox. 366x220).
 * - Añade hitbox configurable e independiente para ratón/touch.
 * - Corrige el solapamiento invisible de áreas clicables cuando ButtonHeight
 *   es mayor que ButtonSpacing.
 * - Mantiene la pantalla inicial "Presiona Z para Entrar al Bosque".
 *
 * v1.0.3
 * - Nombre oficial: Dex_MysticTitleMenuMZ.js.
 * - Detecta automáticamente el nombre real del archivo cargado.
 * - Ya no depende de una cadena fija para leer parámetros.
 * - Incluye fallback de compatibilidad con MysticTitleMenuMZ.
 * - Evita perder parámetros si el plugin cambia de nombre durante la migración.
 *
 * v1.0.4
 * - Preset UX automático para no depender de parámetros guardados de v1.0.3.
 * - Botones al 88% (400x240 -> aprox. 352x211).
 * - Fuente recomendada reducida de 38 a 34.
 * - Pulso seleccionado reducido de 2.5% a 1.5%.
 * - Botones no seleccionados al 84% de opacidad.
 * - Botón deshabilitado más tenue y ligeramente desaturado.
 * - El botón seleccionado conserva 100% de opacidad; el pulso afecta escala,
 *   no legibilidad.
 * - Texto de versión a ~75% de opacidad.
 *
 * COMPATIBILIDAD
 * Este plugin reemplaza la presentación de Scene_Title. Desactiva otros
 * plugins que también sustituyan el menú de título, o colócalo debajo de ellos
 * y prueba cuidadosamente. Para el proyecto de Nymphi debe reemplazar al
 * plugin anterior de TitleMenu, no ejecutarse al mismo tiempo.
 *
 * No contiene comandos de plugin.
 *
 * @param UXPreset104
 * @text Aplicar preset UX v1.0.4
 * @type boolean
 * @on Sí
 * @off No
 * @desc Recomendado. Aplica automáticamente escala 88%, fuente 34 y pulso 1.5% aunque conserves parámetros antiguos. Desactívalo si quieres controlar esos tres valores manualmente.
 * @default true
 *
 * @param General
 * @text Configuración general
 * @type struct<GeneralSettings>
 * @default {"ReferenceWidth":"1920","ReferenceHeight":"1080","ImageFolder":"img/title_menu/","UsePressStart":"true","PromptText":"Presiona Z para Entrar al Bosque","PromptX":"960","PromptY":"940","PromptFontSize":"28","PromptTextColor":"#fcd757","PromptOutlineColor":"rgba(0,0,0,0.75)","PromptOutlineWidth":"6","PromptPulse":"true","PromptPulseSpeed":"0.05","PromptPulseScale":"0.06","VersionText":"","VersionX":"1840","VersionY":"1035","VersionOpacity":"190"}
 *
 * @param Images
 * @text Imágenes
 * @type struct<ImageSettings>
 * @default {"BackgroundImage":"Title_Background","LogoImage":"Title_Logo","PanelImage":"Title_Panel","ButtonNormalImage":"Title_Button_Normal","ButtonSelectedImage":"Title_Button_Selected"}
 *
 * @param Layout
 * @text Posiciones y tamaños
 * @type struct<LayoutSettings>
 * @default {"LogoX":"430","LogoY":"260","LogoWidth":"760","LogoHeight":"390","ShowPanel":"true","PanelX":"356","PanelY":"670","PanelWidth":"620","PanelHeight":"560","ButtonX":"356","ButtonY":"565","ButtonWidth":"400","ButtonHeight":"240","ButtonSpacing":"105","ButtonVisualScale":"88","ButtonHitboxWidth":"370","ButtonHitboxHeight":"86"}
 *
 * @param Text
 * @text Texto de botones
 * @type struct<TextSettings>
 * @default {"NewGameText":"Nueva Partida","ContinueText":"Continuar","OptionsText":"Opciones","FontFace":"rmmz-mainfont","FontSize":"34","TextColor":"#f6e4b5","SelectedTextColor":"#fff4d6","DisabledTextColor":"#9a8d9f","OutlineColor":"rgba(35,10,45,0.95)","OutlineWidth":"5"}
 *
 * @param Effects
 * @text Efectos
 * @type struct<EffectSettings>
 * @default {"SelectedPulse":"true","PulseStrength":"0.015","UnselectedOpacity":"0.84","DisabledOpacity":"0.46","DisabledTint":"#b9b0ba","UseParticles":"true","ParticleCount":"28","BackgroundParallax":"true","ParallaxStrength":"10","FadeFrames":"36"}
 */

/*~struct~GeneralSettings:
 * @param ReferenceWidth
 * @text Ancho de referencia
 * @type number
 * @min 320
 * @default 1920
 *
 * @param ReferenceHeight
 * @text Alto de referencia
 * @type number
 * @min 240
 * @default 1080
 *
 * @param ImageFolder
 * @text Carpeta de imágenes
 * @type string
 * @default img/title_menu/
 *
 * @param UsePressStart
 * @text Usar "presiona una tecla"
 * @type boolean
 * @on Sí
 * @off No
 * @desc Oculta el panel y los botones hasta recibir una entrada.
 * @default true
 *
 * @param PromptText
 * @text Texto inicial
 * @type string
 * @default Presiona Z para Entrar al Bosque
 *
 * @param PromptX
 * @text Posición X del texto inicial
 * @type number
 * @default 960
 *
 * @param PromptY
 * @text Posición Y del texto inicial
 * @type number
 * @default 940
 *
 * @param PromptFontSize
 * @text Tamaño del texto inicial
 * @type number
 * @min 8
 * @max 96
 * @default 28
 *
 * @param PromptTextColor
 * @text Color del texto inicial
 * @type string
 * @default #fcd757
 *
 * @param PromptOutlineColor
 * @text Color del contorno inicial
 * @type string
 * @default rgba(0,0,0,0.75)
 *
 * @param PromptOutlineWidth
 * @text Grosor del contorno inicial
 * @type number
 * @min 0
 * @max 20
 * @default 6
 *
 * @param PromptPulse
 * @text Pulso del texto inicial
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param PromptPulseSpeed
 * @text Velocidad del pulso
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1
 * @default 0.05
 *
 * @param PromptPulseScale
 * @text Intensidad de escala del pulso
 * @type number
 * @decimals 3
 * @min 0
 * @max 0.5
 * @default 0.06
 *
 * @param VersionText
 * @text Texto de versión
 * @desc Déjalo vacío para ocultarlo.
 * @type string
 * @default
 *
 * @param VersionX
 * @text Posición X de versión
 * @type number
 * @default 1840
 *
 * @param VersionY
 * @text Posición Y de versión
 * @type number
 * @default 1035
 *
 * @param VersionOpacity
 * @text Opacidad de versión
 * @type number
 * @min 0
 * @max 255
 * @desc 190 equivale aproximadamente a 75% de opacidad.
 * @default 190
 */

/*~struct~ImageSettings:
 * @param BackgroundImage
 * @text Fondo
 * @type file
 * @dir img/title_menu/
 * @default Title_Background
 *
 * @param LogoImage
 * @text Logotipo/título
 * @type file
 * @dir img/title_menu/
 * @default Title_Logo
 *
 * @param PanelImage
 * @text Panel del menú
 * @type file
 * @dir img/title_menu/
 * @default Title_Panel
 *
 * @param ButtonNormalImage
 * @text Botón normal
 * @type file
 * @dir img/title_menu/
 * @default Title_Button_Normal
 *
 * @param ButtonSelectedImage
 * @text Botón seleccionado
 * @type file
 * @dir img/title_menu/
 * @default Title_Button_Selected
 */

/*~struct~LayoutSettings:
 * @param LogoX
 * @text Logotipo X
 * @type number
 * @default 430
 *
 * @param LogoY
 * @text Logotipo Y
 * @type number
 * @default 260
 *
 * @param LogoWidth
 * @text Ancho del logotipo
 * @type number
 * @min 0
 * @desc 0 conserva el tamaño original.
 * @default 760
 *
 * @param LogoHeight
 * @text Alto del logotipo
 * @type number
 * @min 0
 * @desc 0 conserva el tamaño original.
 * @default 390
 *
 * @param ShowPanel
 * @text Mostrar panel
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param PanelX
 * @text Panel X
 * @type number
 * @default 300
 *
 * @param PanelY
 * @text Panel Y
 * @type number
 * @default 670
 *
 * @param PanelWidth
 * @text Ancho del panel
 * @type number
 * @min 0
 * @default 520
 *
 * @param PanelHeight
 * @text Alto del panel
 * @type number
 * @min 0
 * @default 610
 *
 * @param ButtonX
 * @text Botones X
 * @type number
 * @default 300
 *
 * @param ButtonY
 * @text Primer botón Y
 * @type number
 * @default 575
 *
 * @param ButtonWidth
 * @text Ancho del botón
 * @type number
 * @min 120
 * @default 450
 *
 * @param ButtonHeight
 * @text Alto del botón
 * @type number
 * @min 40
 * @default 85
 *
 * @param ButtonSpacing
 * @text Separación vertical
 * @type number
 * @min 40
 * @default 105
 *
 * @param ButtonVisualScale
 * @text Escala visual del botón %
 * @type number
 * @decimals 1
 * @min 50
 * @max 150
 * @desc Escala final aplicada al botón completo. 88 reduce 400x240 a aprox. 352x211 sin cambiar tus parámetros base.
 * @default 88
 *
 * @param ButtonHitboxWidth
 * @text Ancho área de clic
 * @type number
 * @min 80
 * @desc Área interactiva horizontal. Es independiente del lienzo PNG.
 * @default 370
 *
 * @param ButtonHitboxHeight
 * @text Alto área de clic
 * @type number
 * @min 30
 * @desc Evita que PNGs altos/transparentes hagan que los botones se solapen al usar ratón o touch.
 * @default 86
 */

/*~struct~TextSettings:
 * @param NewGameText
 * @text Nueva partida
 * @type string
 * @default Nueva Partida
 *
 * @param ContinueText
 * @text Continuar
 * @type string
 * @default Continuar
 *
 * @param OptionsText
 * @text Opciones
 * @type string
 * @default Opciones
 *
 * @param FontFace
 * @text Fuente
 * @type string
 * @default rmmz-mainfont
 *
 * @param FontSize
 * @text Tamaño de fuente
 * @type number
 * @min 12
 * @default 34
 *
 * @param TextColor
 * @text Color normal
 * @type string
 * @default #f6e4b5
 *
 * @param SelectedTextColor
 * @text Color seleccionado
 * @type string
 * @default #fff4d6
 *
 * @param DisabledTextColor
 * @text Color deshabilitado
 * @type string
 * @default #9a8d9f
 *
 * @param OutlineColor
 * @text Color de contorno
 * @type string
 * @default rgba(35,10,45,0.95)
 *
 * @param OutlineWidth
 * @text Grosor de contorno
 * @type number
 * @min 0
 * @default 5
 */

/*~struct~EffectSettings:
 * @param SelectedPulse
 * @text Pulso del seleccionado
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param PulseStrength
 * @text Intensidad del pulso
 * @type number
 * @decimals 3
 * @min 0
 * @max 0.15
 * @desc 0.015 = pulso muy sutil, recomendado para esta interfaz.
 * @default 0.015
 *
 * @param UnselectedOpacity
 * @text Opacidad no seleccionado
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc Los botones no seleccionados se apagan ligeramente. Recomendado: 0.84.
 * @default 0.84
 *
 * @param DisabledOpacity
 * @text Opacidad deshabilitado
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc Opacidad de Continuar cuando no existe una partida guardada.
 * @default 0.46
 *
 * @param DisabledTint
 * @text Tinte deshabilitado
 * @type string
 * @desc Tinte aplicado al arte del botón deshabilitado para desaturarlo.
 * @default #b9b0ba
 *
 * @param UseParticles
 * @text Partículas decorativas
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ParticleCount
 * @text Cantidad de partículas
 * @type number
 * @min 0
 * @max 100
 * @default 28
 *
 * @param BackgroundParallax
 * @text Paralaje suave del fondo
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ParallaxStrength
 * @text Intensidad del paralaje
 * @type number
 * @min 0
 * @max 50
 * @default 10
 *
 * @param FadeFrames
 * @text Duración de aparición
 * @type number
 * @min 0
 * @max 180
 * @default 36
 */

var Imported = Imported || {};
Imported.Dex_MysticTitleMenuMZ = true;

var Dex = Dex || {};
Dex.MysticTitleMenuMZ = Dex.MysticTitleMenuMZ || {};

(() => {
    "use strict";

    //-------------------------------------------------------------------------
    // Nombre del plugin y lectura robusta de parámetros
    //-------------------------------------------------------------------------
    // RPG Maker MZ vincula los parámetros al nombre del archivo .js.
    // Detectarlo automáticamente evita romper la configuración si el archivo
    // se renombra en el futuro.
    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            try {
                const file = decodeURIComponent(script.src.split("/").pop() || "");
                const detected = file.replace(/\.js$/i, "");
                if (detected) return detected;
            } catch (error) {
                console.warn("[Dex_MysticTitleMenuMZ] No se pudo detectar el nombre del archivo.", error);
            }
        }
        return "Dex_MysticTitleMenuMZ";
    })();

    const hasUsefulParameters = params => {
        return params && Object.keys(params).length > 0;
    };

    // 1) Nombre real del archivo actual.
    // 2) Nombre oficial nuevo.
    // 3) Nombre anterior, solo como compatibilidad durante la migración.
    const parameterSources = [
        pluginName,
        "Dex_MysticTitleMenuMZ",
        "MysticTitleMenuMZ"
    ].filter((name, index, list) => name && list.indexOf(name) === index);

    let raw = {};
    let parameterSourceName = pluginName;

    for (const name of parameterSources) {
        const candidate = PluginManager.parameters(name);
        if (hasUsefulParameters(candidate)) {
            raw = candidate;
            parameterSourceName = name;
            break;
        }
    }

    if (!hasUsefulParameters(raw)) {
        console.warn(
            `[${pluginName}] No se encontraron parámetros guardados. ` +
            "Se usarán los valores predeterminados del plugin."
        );
    } else if (parameterSourceName !== pluginName) {
        console.info(
            `[${pluginName}] Parámetros recuperados temporalmente desde "${parameterSourceName}".`
        );
    }

    const parseStruct = (value, fallback = {}) => {
        try {
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn(`[${pluginName}] No se pudo leer un parámetro estructurado.`, error);
            return fallback;
        }
    };

    const bool = (value, fallback = false) => {
        if (value === undefined || value === null || value === "") return fallback;
        return String(value).toLowerCase() === "true";
    };
    const num = (value, fallback = 0) => {
        const result = Number(value);
        return Number.isFinite(result) ? result : fallback;
    };
    const str = (value, fallback = "") => value !== undefined && value !== null ? String(value) : fallback;
    const colorNumber = (value, fallback = 0xffffff) => {
        const text = String(value ?? "").trim().replace(/^#/, "").replace(/^0x/i, "");
        const result = Number.parseInt(text, 16);
        return Number.isFinite(result) ? result : fallback;
    };

    const generalRaw = parseStruct(raw.General);
    const imagesRaw = parseStruct(raw.Images);
    const layoutRaw = parseStruct(raw.Layout);
    const textRaw = parseStruct(raw.Text);
    const effectsRaw = parseStruct(raw.Effects);

    Dex.MysticTitleMenuMZ.pluginName = pluginName;
    Dex.MysticTitleMenuMZ.parameterSourceName = parameterSourceName;

    // El preset existe para que reemplazar el JS sea suficiente. RPG Maker
    // conserva valores antiguos en plugins.js, por lo que cambiar solamente
    // los @default no actualizaría un proyecto existente.
    const useUxPreset104 = bool(raw.UXPreset104, true);

    const P = {
        referenceWidth: num(generalRaw.ReferenceWidth, 1920),
        referenceHeight: num(generalRaw.ReferenceHeight, 1080),
        imageFolder: str(generalRaw.ImageFolder, "img/title_menu/").replace(/\\/g, "/").replace(/\/?$/, "/"),
        usePressStart: bool(generalRaw.UsePressStart, true),
        promptText: str(generalRaw.PromptText, "Presiona Z para Entrar al Bosque"),
        promptX: num(generalRaw.PromptX, 960),
        promptY: num(generalRaw.PromptY, 940),
        promptFontSize: num(generalRaw.PromptFontSize, 28),
        promptTextColor: str(generalRaw.PromptTextColor, "#fcd757"),
        promptOutlineColor: str(generalRaw.PromptOutlineColor, "rgba(0,0,0,0.75)"),
        promptOutlineWidth: num(generalRaw.PromptOutlineWidth, 6),
        promptPulse: bool(generalRaw.PromptPulse, true),
        promptPulseSpeed: num(generalRaw.PromptPulseSpeed, 0.05),
        promptPulseScale: num(generalRaw.PromptPulseScale, 0.06),
        versionText: str(generalRaw.VersionText, ""),
        versionX: num(generalRaw.VersionX, 1840),
        versionY: num(generalRaw.VersionY, 1035),
        versionOpacity: Math.max(0, Math.min(255, num(generalRaw.VersionOpacity, 190))),

        backgroundImage: str(imagesRaw.BackgroundImage, "Title_Background"),
        logoImage: str(imagesRaw.LogoImage, "Title_Logo"),
        panelImage: str(imagesRaw.PanelImage, "Title_Panel"),
        buttonNormalImage: str(imagesRaw.ButtonNormalImage, "Title_Button_Normal"),
        buttonSelectedImage: str(imagesRaw.ButtonSelectedImage, "Title_Button_Selected"),

        logoX: num(layoutRaw.LogoX, 430),
        logoY: num(layoutRaw.LogoY, 260),
        logoWidth: num(layoutRaw.LogoWidth, 760),
        logoHeight: num(layoutRaw.LogoHeight, 390),
        showPanel: bool(layoutRaw.ShowPanel, true),
        panelX: num(layoutRaw.PanelX, 356),
        panelY: num(layoutRaw.PanelY, 670),
        panelWidth: num(layoutRaw.PanelWidth, 620),
        panelHeight: num(layoutRaw.PanelHeight, 560),
        buttonX: num(layoutRaw.ButtonX, 356),
        buttonY: num(layoutRaw.ButtonY, 565),
        buttonWidth: num(layoutRaw.ButtonWidth, 400),
        buttonHeight: num(layoutRaw.ButtonHeight, 240),
        buttonSpacing: num(layoutRaw.ButtonSpacing, 105),
        buttonVisualScale: useUxPreset104
            ? 0.88
            : Math.max(0.5, num(layoutRaw.ButtonVisualScale, 88) / 100),
        buttonHitboxWidth: Math.max(80, num(layoutRaw.ButtonHitboxWidth, 370)),
        buttonHitboxHeight: Math.max(30, num(layoutRaw.ButtonHitboxHeight, 86)),

        labels: [
            str(textRaw.NewGameText, "Nueva Partida"),
            str(textRaw.ContinueText, "Continuar"),
            str(textRaw.OptionsText, "Opciones")
        ],
        fontFace: str(textRaw.FontFace, "rmmz-mainfont"),
        fontSize: useUxPreset104 ? 34 : num(textRaw.FontSize, 34),
        textColor: str(textRaw.TextColor, "#f6e4b5"),
        selectedTextColor: str(textRaw.SelectedTextColor, "#fff4d6"),
        disabledTextColor: str(textRaw.DisabledTextColor, "#9a8d9f"),
        outlineColor: str(textRaw.OutlineColor, "rgba(35,10,45,0.95)"),
        outlineWidth: num(textRaw.OutlineWidth, 5),

        selectedPulse: bool(effectsRaw.SelectedPulse, true),
        pulseStrength: useUxPreset104 ? 0.015 : num(effectsRaw.PulseStrength, 0.015),
        unselectedOpacity: Math.max(0, Math.min(1, num(effectsRaw.UnselectedOpacity, 0.84))),
        disabledOpacity: Math.max(0, Math.min(1, num(effectsRaw.DisabledOpacity, 0.46))),
        disabledTint: colorNumber(effectsRaw.DisabledTint, 0xb9b0ba),
        useParticles: bool(effectsRaw.UseParticles, true),
        particleCount: Math.max(0, Math.floor(num(effectsRaw.ParticleCount, 28))),
        backgroundParallax: bool(effectsRaw.BackgroundParallax, true),
        parallaxStrength: num(effectsRaw.ParallaxStrength, 10),
        fadeFrames: Math.max(0, Math.floor(num(effectsRaw.FadeFrames, 36)))
    };

    const loadTitleBitmap = filename => ImageManager.loadBitmap(P.imageFolder, filename);

    const fitSprite = (sprite, width, height) => {
        if (!sprite || !sprite.bitmap) return;
        const apply = () => {
            const bitmap = sprite.bitmap;
            if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;
            const targetWidth = width > 0 ? width : bitmap.width;
            const targetHeight = height > 0 ? height : bitmap.height;
            sprite.scale.x = targetWidth / bitmap.width;
            sprite.scale.y = targetHeight / bitmap.height;
        };
        sprite.bitmap.addLoadListener(apply);
        apply();
    };

    class Sprite_MysticTitleButton extends Sprite {
        constructor(index, label) {
            super();
            this._index = index;
            this._selected = false;
            this._enabled = true;
            this._phase = index * 0.9;
            this._baseScale = P.buttonVisualScale;
            this._createBacks();
            this._createLabel(label);
            this.scale.set(this._baseScale);
            this._refreshVisualState();
        }

        _createBacks() {
            this._normalSprite = this._makeBackSprite(P.buttonNormalImage, false);
            this._selectedSprite = this._makeBackSprite(P.buttonSelectedImage, true);
            this.addChild(this._normalSprite);
            this.addChild(this._selectedSprite);
            this._selectedSprite.visible = false;
        }

        _makeBackSprite(filename, selected) {
            let sprite;
            if (filename) {
                sprite = new Sprite(loadTitleBitmap(filename));
                sprite.anchor.set(0.5);
                fitSprite(sprite, P.buttonWidth, P.buttonHeight);
            } else {
                const bitmap = new Bitmap(P.buttonWidth, P.buttonHeight);
                const top = selected ? "#6f248c" : "#351348";
                const bottom = selected ? "#b34ad2" : "#572067";
                bitmap.gradientFillRect(2, 2, P.buttonWidth - 4, P.buttonHeight - 4, top, bottom, true);
                bitmap.strokeRect(1, 1, P.buttonWidth - 2, P.buttonHeight - 2, selected ? "#ffe49a" : "#c99752");
                bitmap.strokeRect(5, 5, P.buttonWidth - 10, P.buttonHeight - 10, selected ? "#d38cff" : "#8f5fa0");
                sprite = new Sprite(bitmap);
                sprite.anchor.set(0.5);
            }
            return sprite;
        }

        _createLabel(label) {
            const bitmap = new Bitmap(P.buttonWidth, P.buttonHeight);
            bitmap.fontFace = P.fontFace;
            bitmap.fontSize = P.fontSize;
            bitmap.textColor = P.textColor;
            bitmap.outlineColor = P.outlineColor;
            bitmap.outlineWidth = P.outlineWidth;
            bitmap.drawText(label, 0, 0, P.buttonWidth, P.buttonHeight, "center");
            this._labelSprite = new Sprite(bitmap);
            this._labelSprite.anchor.set(0.5);
            this.addChild(this._labelSprite);
        }

        setSelected(value) {
            this._selected = !!value;
            this._refreshVisualState();
            this._redrawLabel();
        }

        setEnabled(value) {
            this._enabled = !!value;
            this._refreshVisualState();
            this._redrawLabel();
        }

        _refreshVisualState() {
            // Un comando deshabilitado nunca utiliza el arte brillante de
            // selección. Esto evita que "Continuar" parezca disponible.
            const showSelected = this._selected && this._enabled;
            this._selectedSprite.visible = showSelected;
            this._normalSprite.visible = !showSelected;

            if (!this._enabled) {
                this.alpha = P.disabledOpacity;
                this._normalSprite.tint = P.disabledTint;
                this._selectedSprite.tint = P.disabledTint;
            } else {
                this.alpha = this._selected ? 1 : P.unselectedOpacity;
                this._normalSprite.tint = 0xffffff;
                this._selectedSprite.tint = 0xffffff;
            }
        }

        _redrawLabel() {
            if (!this._labelSprite || !this._labelSprite.bitmap) return;
            const bitmap = this._labelSprite.bitmap;
            bitmap.clear();
            bitmap.fontFace = P.fontFace;
            bitmap.fontSize = P.fontSize;
            bitmap.textColor = !this._enabled
                ? P.disabledTextColor
                : this._selected
                    ? P.selectedTextColor
                    : P.textColor;
            bitmap.outlineColor = P.outlineColor;
            bitmap.outlineWidth = P.outlineWidth;
            bitmap.drawText(P.labels[this._index] || "", 0, 0, P.buttonWidth, P.buttonHeight, "center");
        }

        containsPoint(x, y) {
            // Convierte las coordenadas globales a coordenadas locales del botón.
            // Así el área de interacción no depende del tamaño/transparencia del PNG.
            const point = new PIXI.Point(x, y);
            const local = this.worldTransform.applyInverse(point);
            const halfW = P.buttonHitboxWidth / 2;
            const halfH = P.buttonHitboxHeight / 2;
            return local.x >= -halfW && local.x <= halfW &&
                   local.y >= -halfH && local.y <= halfH;
        }

        update() {
            super.update();
            if (this._selected && this._enabled && P.selectedPulse) {
                const pulse = 1 + Math.sin(Graphics.frameCount * 0.08 + this._phase) * P.pulseStrength;
                this.scale.set(this._baseScale * pulse);
            } else {
                this.scale.set(this._baseScale);
            }
            // La imagen seleccionada permanece totalmente legible.
            this._selectedSprite.alpha = 1;
        }
    }

    const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        if (P.backgroundImage) {
            this._backSprite1 = new Sprite(loadTitleBitmap(P.backgroundImage));
            this._backSprite2 = null;
            this.addChild(this._backSprite1);
            this._backSprite1.bitmap.addLoadListener(() => this._refreshMysticBackground());
        } else {
            _Scene_Title_createBackground.call(this);
        }
        this._mysticLastWidth = 0;
        this._mysticLastHeight = 0;
    };

    Scene_Title.prototype._refreshMysticBackground = function() {
        const sprite = this._backSprite1;
        if (!sprite || !sprite.bitmap || sprite.bitmap.width <= 0 || sprite.bitmap.height <= 0) return;
        const scale = Math.max(Graphics.width / sprite.bitmap.width, Graphics.height / sprite.bitmap.height);
        sprite.scale.set(scale);
        sprite.anchor.set(0.5);
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        this._mysticBaseBackX = sprite.x;
        this._mysticBaseBackY = sprite.y;
        this._mysticLastWidth = Graphics.width;
        this._mysticLastHeight = Graphics.height;
    };

    Scene_Title.prototype.adjustBackground = function() {
        if (P.backgroundImage) {
            this._refreshMysticBackground();
        } else {
            if (this._backSprite1) {
                this.scaleSprite(this._backSprite1);
                this.centerSprite(this._backSprite1);
            }
            if (this._backSprite2) {
                this.scaleSprite(this._backSprite2);
                this.centerSprite(this._backSprite2);
            }
        }
    };

    Scene_Title.prototype.createForeground = function() {
        this._mysticRoot = new Sprite();
        this.addChild(this._mysticRoot);

        if (P.useParticles) this._createMysticParticles();
        this._createMysticLogo();
        this._createMysticPanel();
        this._createMysticPrompt();
        this._createMysticVersion();
        this._refreshMysticLayout();
    };

    Scene_Title.prototype._createMysticLogo = function() {
        if (P.logoImage) {
            this._mysticLogo = new Sprite(loadTitleBitmap(P.logoImage));
            this._mysticLogo.anchor.set(0.5);
            this._mysticLogo.x = P.logoX;
            this._mysticLogo.y = P.logoY;
            fitSprite(this._mysticLogo, P.logoWidth, P.logoHeight);
            this._mysticRoot.addChild(this._mysticLogo);
        } else {
            const bitmap = new Bitmap(900, 240);
            bitmap.fontFace = P.fontFace;
            bitmap.fontSize = 74;
            bitmap.textColor = "#f5ecff";
            bitmap.outlineColor = "rgba(44,15,75,0.95)";
            bitmap.outlineWidth = 8;
            bitmap.drawText($dataSystem.gameTitle, 0, 0, 900, 240, "center");
            this._mysticLogo = new Sprite(bitmap);
            this._mysticLogo.anchor.set(0.5);
            this._mysticLogo.x = P.logoX;
            this._mysticLogo.y = P.logoY;
            this._mysticRoot.addChild(this._mysticLogo);
        }
    };

    Scene_Title.prototype._createMysticPanel = function() {
        if (!P.showPanel || !P.panelImage) return;
        this._mysticPanel = new Sprite(loadTitleBitmap(P.panelImage));
        this._mysticPanel.anchor.set(0.5);
        this._mysticPanel.x = P.panelX;
        this._mysticPanel.y = P.panelY;
        fitSprite(this._mysticPanel, P.panelWidth, P.panelHeight);
        this._mysticRoot.addChild(this._mysticPanel);
    };

    Scene_Title.prototype._createMysticPrompt = function() {
        if (!P.usePressStart) return;
        const height = Math.max(72, P.promptFontSize + 44);
        const bitmap = new Bitmap(1100, height);
        bitmap.fontFace = P.fontFace;
        bitmap.fontSize = P.promptFontSize;
        bitmap.textColor = P.promptTextColor;
        bitmap.outlineColor = P.promptOutlineColor;
        bitmap.outlineWidth = P.promptOutlineWidth;
        bitmap.drawText(P.promptText, 0, 0, 1100, height, "center");
        this._mysticPrompt = new Sprite(bitmap);
        this._mysticPrompt.anchor.set(0.5);
        this._mysticPrompt.x = P.promptX;
        this._mysticPrompt.y = P.promptY;
        this._mysticPrompt._mysticBaseScaleX = 1;
        this._mysticPrompt._mysticBaseScaleY = 1;
        this._mysticRoot.addChild(this._mysticPrompt);
    };

    Scene_Title.prototype._createMysticVersion = function() {
        if (!P.versionText) return;
        const bitmap = new Bitmap(360, 48);
        bitmap.fontFace = P.fontFace;
        bitmap.fontSize = 22;
        bitmap.textColor = "rgba(255,255,255,0.78)";
        bitmap.outlineColor = "rgba(0,0,0,0.85)";
        bitmap.outlineWidth = 4;
        bitmap.drawText(P.versionText, 0, 0, 360, 48, "right");
        this._mysticVersion = new Sprite(bitmap);
        this._mysticVersion.anchor.set(1, 0.5);
        this._mysticVersion.x = P.versionX;
        this._mysticVersion.y = P.versionY;
        this._mysticVersion.opacity = P.versionOpacity;
        this._mysticRoot.addChild(this._mysticVersion);
    };

    Scene_Title.prototype._createMysticParticles = function() {
        this._mysticParticles = [];
        this._mysticParticleLayer = new Sprite();
        this._mysticRoot.addChild(this._mysticParticleLayer);
        for (let i = 0; i < P.particleCount; i++) {
            const size = 2 + Math.floor(Math.random() * 4);
            const bitmap = new Bitmap(size * 4, size * 4);
            const color = Math.random() < 0.55 ? "#d8c4ff" : "#78dfff";
            bitmap.drawCircle(size * 2, size * 2, size, color);
            const particle = new Sprite(bitmap);
            particle.anchor.set(0.5);
            particle.x = Math.random() * P.referenceWidth;
            particle.y = Math.random() * P.referenceHeight;
            particle.alpha = 0.15 + Math.random() * 0.55;
            particle._mysticSpeedY = 0.12 + Math.random() * 0.45;
            particle._mysticDrift = (Math.random() - 0.5) * 0.3;
            particle._mysticPhase = Math.random() * Math.PI * 2;
            this._mysticParticleLayer.addChild(particle);
            this._mysticParticles.push(particle);
        }
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.x = -10000;
        this._commandWindow.y = -10000;
        this._commandWindow.opacity = 0;
        this._commandWindow.contentsOpacity = 0;
        this._commandWindow.backOpacity = 0;

        this._mysticButtons = [];
        for (let i = 0; i < 3; i++) {
            const button = new Sprite_MysticTitleButton(i, P.labels[i]);
            button.x = P.buttonX;
            button.y = P.buttonY + P.buttonSpacing * i;
            this._mysticRoot.addChild(button);
            this._mysticButtons.push(button);
        }

        this._mysticStarted = !P.usePressStart;
        if (!this._mysticStarted) {
            this._commandWindow.deactivate();
            this._setMysticButtonsVisible(false);
        }
        this._syncMysticButtons(true);
    };

    Scene_Title.prototype._setMysticButtonsVisible = function(value) {
        if (!this._mysticButtons) return;
        for (const button of this._mysticButtons) button.visible = value;
        if (this._mysticPanel) this._mysticPanel.visible = value;
    };

    Scene_Title.prototype._syncMysticButtons = function(force = false) {
        if (!this._mysticButtons || !this._commandWindow) return;
        const index = this._commandWindow.index();
        if (!force && this._mysticLastIndex === index) return;
        this._mysticLastIndex = index;
        for (let i = 0; i < this._mysticButtons.length; i++) {
            const button = this._mysticButtons[i];
            button.setSelected(i === index);
            button.setEnabled(this._commandWindow.isCommandEnabled(i));
        }
    };

    Scene_Title.prototype._refreshMysticLayout = function() {
        if (!this._mysticRoot) return;
        const scale = Math.min(Graphics.width / P.referenceWidth, Graphics.height / P.referenceHeight);
        this._mysticRoot.scale.set(scale);
        this._mysticRoot.x = Math.round((Graphics.width - P.referenceWidth * scale) / 2);
        this._mysticRoot.y = Math.round((Graphics.height - P.referenceHeight * scale) / 2);
    };

    Scene_Title.prototype._updateMysticPressStart = function() {
        if (this._mysticStarted) return;
        if (this._mysticPrompt) {
            const wave = Math.sin(Graphics.frameCount * P.promptPulseSpeed);
            this._mysticPrompt.alpha = 0.72 + wave * 0.22;
            if (P.promptPulse) {
                const scale = 1 + wave * P.promptPulseScale;
                this._mysticPrompt.scale.set(scale);
            } else {
                this._mysticPrompt.scale.set(1);
            }
        }
        const pressed = Input.isTriggered("ok") || Input.isTriggered("cancel") ||
            Input.isTriggered("up") || Input.isTriggered("down") ||
            Input.isTriggered("left") || Input.isTriggered("right") ||
            TouchInput.isTriggered();
        if (pressed) {
            SoundManager.playOk();
            this._mysticStarted = true;
            if (this._mysticPrompt) this._mysticPrompt.visible = false;
            this._setMysticButtonsVisible(true);
            this._commandWindow.activate();
            this._commandWindow.select(0);
            this._syncMysticButtons(true);
        }
    };

    Scene_Title.prototype._updateMysticTouch = function() {
        if (!this._mysticStarted || !this._mysticButtons || !this._commandWindow.active) return;
        let hovered = -1;
        for (let i = 0; i < this._mysticButtons.length; i++) {
            if (this._mysticButtons[i].visible && this._mysticButtons[i].containsPoint(TouchInput.x, TouchInput.y)) {
                hovered = i;
                break;
            }
        }
        if (hovered >= 0 && hovered !== this._commandWindow.index()) {
            this._commandWindow.select(hovered);
            SoundManager.playCursor();
            this._syncMysticButtons(true);
        }
        if (hovered >= 0 && TouchInput.isTriggered()) {
            this._commandWindow.select(hovered);
            this._commandWindow.processOk();
        }
    };

    Scene_Title.prototype._updateMysticParticles = function() {
        if (!this._mysticParticles) return;
        for (const particle of this._mysticParticles) {
            particle.y -= particle._mysticSpeedY;
            particle.x += particle._mysticDrift;
            particle.alpha = 0.32 + Math.sin(Graphics.frameCount * 0.035 + particle._mysticPhase) * 0.22;
            if (particle.y < -20) {
                particle.y = P.referenceHeight + 20;
                particle.x = Math.random() * P.referenceWidth;
            }
            if (particle.x < -20) particle.x = P.referenceWidth + 20;
            if (particle.x > P.referenceWidth + 20) particle.x = -20;
        }
    };

    Scene_Title.prototype._updateMysticParallax = function() {
        if (!P.backgroundParallax || !this._backSprite1 || this._mysticBaseBackX === undefined) return;
        const nx = Graphics.width > 0 ? TouchInput.x / Graphics.width - 0.5 : 0;
        const ny = Graphics.height > 0 ? TouchInput.y / Graphics.height - 0.5 : 0;
        const tx = this._mysticBaseBackX - nx * P.parallaxStrength;
        const ty = this._mysticBaseBackY - ny * P.parallaxStrength;
        this._backSprite1.x += (tx - this._backSprite1.x) * 0.04;
        this._backSprite1.y += (ty - this._backSprite1.y) * 0.04;
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);
        if (this._mysticLastWidth !== Graphics.width || this._mysticLastHeight !== Graphics.height) {
            this._refreshMysticBackground();
            this._refreshMysticLayout();
        }
        this._updateMysticPressStart();
        this._updateMysticTouch();
        this._updateMysticParticles();
        this._updateMysticParallax();
        this._syncMysticButtons();
    };

    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        if (P.fadeFrames > 0) {
            this.startFadeIn(P.fadeFrames, false);
        }
    };
})();
