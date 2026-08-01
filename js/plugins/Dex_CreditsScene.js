//=============================================================================
// Dex_CreditsScene.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v0.4.3) Escena de créditos con scroll, postales, partículas y pantalla final con tecla.
 * @author Dextroyean y Jaime
 *
 * @param Fondo
 * @text Fondo
 * @type file
 * @dir img/credits
 * @desc Imagen de fondo para los créditos. Vacío usa fondo oscuro.
 * @default
 *
 * @param Oscurecer Fondo
 * @text Oscurecer Fondo
 * @type number
 * @min 0
 * @max 255
 * @desc Capa oscura encima del fondo. 0 = nada, 255 = negro total.
 * @default 90
 *
 * @param Musica
 * @text Música
 * @type file
 * @dir audio/bgm
 * @desc Música BGM para los créditos. Vacío no cambia música.
 * @default
 *
 * @param Volumen Musica
 * @text Volumen Música
 * @type number
 * @min 0
 * @max 100
 * @desc Volumen de la música.
 * @default 70
 *
 * @param Velocidad Scroll
 * @text Velocidad Scroll
 * @type number
 * @decimals 2
 * @min 0.10
 * @desc Velocidad del scroll. Recomendado: 0.55 a 1.20.
 * @default 0.75
 *
 * @param Espera Inicial
 * @text Espera Inicial
 * @type number
 * @min 0
 * @desc Frames antes de que empiece el scroll. 60 frames = 1 segundo.
 * @default 90
 *
 * @param Permitir Saltar
 * @text Permitir Saltar
 * @type boolean
 * @on Sí
 * @off No
 * @desc Permite saltar el scroll con OK/Cancel. Si hay pantalla final, salta hacia ella.
 * @default true
 *
 * @param Mantener para Cancelar
 * @text Mantener para Cancelar
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está en Sí, el jugador debe mantener OK/Cancel para cancelar o saltar créditos.
 * @default true
 *
 * @param Frames para Cancelar
 * @parent Mantener para Cancelar
 * @text Frames para Cancelar
 * @type number
 * @min 1
 * @desc 60 = 1 segundo. 90 = 1.5 segundos. 120 = 2 segundos.
 * @default 90
 *
 * @param Texto Cancelando
 * @parent Mantener para Cancelar
 * @text Texto Cancelando
 * @type string
 * @default Cancelando créditos...
 *
 * @param Ancho Barra Cancelar
 * @parent Mantener para Cancelar
 * @text Ancho Barra Cancelar
 * @type number
 * @min 160
 * @default 520
 *
 * @param Alto Barra Cancelar
 * @parent Mantener para Cancelar
 * @text Alto Barra Cancelar
 * @type number
 * @min 6
 * @default 18
 *
 * @param Salida
 * @text Salida
 * @type select
 * @option Volver al título
 * @value title
 * @option Volver al mapa
 * @value map
 * @desc Qué hacer al terminar la pantalla final.
 * @default title
 *
 * @param Particulas
 * @text Partículas
 * @type boolean
 * @on Sí
 * @off No
 * @desc Muestra partículas suaves durante los créditos.
 * @default true
 *
 * @param Numero Particulas
 * @text Número Partículas
 * @type number
 * @min 0
 * @desc Cantidad de partículas decorativas.
 * @default 42
 *
 * @param Color Principal
 * @text Color Principal
 * @desc Color principal del texto.
 * @default #FFFFFF
 *
 * @param Color Titulo
 * @text Color Título
 * @desc Color de títulos principales.
 * @default #EED9FF
 *
 * @param Color Seccion
 * @text Color Sección
 * @desc Color de encabezados de sección.
 * @default #C8A2FF
 *
 * @param --- Pantalla Final ---
 * @default
 *
 * @param Usar Pantalla Final
 * @parent --- Pantalla Final ---
 * @text Usar Pantalla Final
 * @type boolean
 * @on Sí
 * @off No
 * @desc Al terminar el scroll, muestra una imagen final y espera una tecla.
 * @default true
 *
 * @param Imagen Final
 * @parent --- Pantalla Final ---
 * @text Imagen Final
 * @type file
 * @dir img/credits
 * @desc Imagen final. Vacío usa una escena oscura elegante.
 * @default
 *
 * @param Texto Final
 * @parent --- Pantalla Final ---
 * @text Texto Final
 * @desc Texto grande sobre la pantalla final.
 * @default Gracias por jugar
 *
 * @param Texto Presionar Tecla
 * @parent --- Pantalla Final ---
 * @text Texto Presionar Tecla
 * @desc Texto que parpadea esperando input.
 * @default Presiona una tecla
 *
 * @param Esperar Tecla Final
 * @parent --- Pantalla Final ---
 * @text Esperar Tecla Final
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está en Sí, no regresa hasta que el jugador presione una tecla.
 * @default true
 *
 * @param Espera Final Automatica
 * @parent --- Pantalla Final ---
 * @text Espera Final Automática
 * @type number
 * @min 0
 * @desc Si Esperar Tecla Final está en No, espera estos frames antes de salir.
 * @default 240
 *
 * @param Oscurecer Imagen Final
 * @parent --- Pantalla Final ---
 * @text Oscurecer Imagen Final
 * @type number
 * @min 0
 * @max 255
 * @desc Capa oscura encima de la imagen final.
 * @default 50
 *
 * @command IniciarCreditos
 * @text Iniciar créditos
 * @desc Abre la escena de créditos.
 *
 * @help
 * ============================================================================
 * Dex_CreditsScene v0.4.3
 * ============================================================================
 *
 * Crea una escena propia de créditos con:
 *
 * - Scroll vertical suave.
 * - Fondo opcional desde img/credits.
 * - Música opcional desde audio/bgm.
 * - Partículas decorativas.
 * - Postales/imágenes acompañando los créditos.
 * - Pantalla final con imagen y espera por tecla.
 * - Barra gráfica de cancelación por mantener botón.
 * - Postales/fotos renombradas como creditos1, creditos2, etc.
 * - Créditos de entrega parcial integrados desde Excel.
 * - Postales/fotos restauradas como sección visual del scroll.
 * - Nombre oficial corregido al inicio: Tales of Dex: A Nymphi Story.
 * - Postales/fotos restauradas como sección visual del scroll.
 *
 * Archivo:
 * js/plugins/Dex_CreditsScene.js
 *
 * Comando:
 * Plugin Command -> Dex_CreditsScene -> Iniciar créditos
 *
 * ---------------------------------------------------------------------------
 * Imágenes para postales
 * ---------------------------------------------------------------------------
 *
 * Las imágenes deben estar en:
 * img/credits/
 *
 * IMPORTANTE:
 * La carpeta credits no existe por defecto. Créala manualmente dentro de img.
 *
 * En la lista Dex.CreditsScene.defaultCredits puedes usar:
 *
 * { type: "image", name: "creditos1", caption: "Bosque Lumaria" }
 * { type: "imageLeft", name: "creditos3", caption: "Nymphi" }
 * { type: "imageRight", name: "creditos4", caption: "Yoss" }
 *
 * Si name está vacío, el plugin dibuja una postal temporal para pruebas.
 *
 * ---------------------------------------------------------------------------
 * Tipos disponibles
 * ---------------------------------------------------------------------------
 *
 * title
 * subtitle
 * section
 * name
 * role
 * text
 * small
 * space
 * image
 * imageLeft
 * imageRight
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_CreditsScene = true;

var Dex = Dex || {};
Dex.CreditsScene = Dex.CreditsScene || {};

(function() {
    "use strict";

    const pluginName = "Dex_CreditsScene";
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

    const cleanFileName = function(value) {
        return String(value || "")
            .trim()
            .replace(/^.*[\\\/]/, "")
            .replace(/\.(png|ogg|m4a|mp3|wav)$/i, "");
    };

    Dex.CreditsScene.background = cleanFileName(stringParam("Fondo", ""));
    Dex.CreditsScene.dim = Math.max(0, Math.min(255, numberParam("Oscurecer Fondo", 90)));
    Dex.CreditsScene.music = cleanFileName(stringParam("Musica", ""));
    Dex.CreditsScene.musicVolume = Math.max(0, Math.min(100, numberParam("Volumen Musica", 70)));
    Dex.CreditsScene.scrollSpeed = Math.max(0.10, numberParam("Velocidad Scroll", 0.75));
    Dex.CreditsScene.startWait = Math.max(0, numberParam("Espera Inicial", 90));
    Dex.CreditsScene.allowSkip = boolParam("Permitir Saltar", true);
    Dex.CreditsScene.holdToCancel = boolParam("Mantener para Cancelar", true);
    Dex.CreditsScene.cancelHoldFrames = Math.max(1, numberParam("Frames para Cancelar", 90));
    Dex.CreditsScene.cancelText = stringParam("Texto Cancelando", "Cancelando créditos...");
    Dex.CreditsScene.cancelBarWidth = Math.max(160, numberParam("Ancho Barra Cancelar", 520));
    Dex.CreditsScene.cancelBarHeight = Math.max(6, numberParam("Alto Barra Cancelar", 18));
    Dex.CreditsScene.exitMode = stringParam("Salida", "title");
    Dex.CreditsScene.particles = boolParam("Particulas", true);
    Dex.CreditsScene.particlesNumber = Math.max(0, numberParam("Numero Particulas", 42));
    Dex.CreditsScene.mainColor = stringParam("Color Principal", "#FFFFFF");
    Dex.CreditsScene.titleColor = stringParam("Color Titulo", "#EED9FF");
    Dex.CreditsScene.sectionColor = stringParam("Color Seccion", "#C8A2FF");

    Dex.CreditsScene.useFinalScreen = boolParam("Usar Pantalla Final", true);
    Dex.CreditsScene.finalImage = cleanFileName(stringParam("Imagen Final", ""));
    Dex.CreditsScene.finalText = stringParam("Texto Final", "Gracias por jugar");
    Dex.CreditsScene.pressText = stringParam("Texto Presionar Tecla", "Presiona una tecla");
    Dex.CreditsScene.waitFinalKey = boolParam("Esperar Tecla Final", true);
    Dex.CreditsScene.finalAutoWait = Math.max(0, numberParam("Espera Final Automatica", 240));
    Dex.CreditsScene.finalDim = Math.max(0, Math.min(255, numberParam("Oscurecer Imagen Final", 50)));

    //-------------------------------------------------------------------------
    // Créditos de entrega parcial
    // Lista generada desde Creditos_Nymphi_Wiki_y_Final.xlsx para la entrega parcial.
    //-------------------------------------------------------------------------

    Dex.CreditsScene.defaultCredits = [
        { type: "space", size: 60 },
        { type: "subtitle", text: "THE DEX CANVAS" },
        { type: "space", size: 36 },
        { type: "title", text: "Echoes of the Last Nymph" },
        { type: "space", size: 90 },
        { type: "text", text: "Gracias por acompañar este pequeño viaje lleno de magia, cafe, errores de programacion y muchas otras cosas." },
        { type: "space", size: 48 },

        { type: "section", text: "Frases motivacionales que compartieron" },
        { type: "space", size: 24 },
        { type: "image", name: "creditos1", caption: "Kike: Dame un momento", width: 620, height: 320, label: "Kike" },
        { type: "space", size: 44 },
        { type: "imageLeft", name: "creditos2", caption: "Dex: El que lea esto se le quema la maruchan", width: 500, height: 285, label: "Dex" },
        { type: "space", size: 46 },
        { type: "imageRight", name: "creditos3", caption: "Yoss: (No me respondio asi que creo que quiso decir): Voy a verguiar a kike", width: 460, height: 270, label: "Yoss" },
        { type: "space", size: 46 },
        { type: "imageLeft", name: "creditos4", caption: "Ivancin: (Ya era tarde no le pude preguntar u,u) Digamos que dijo que no le gusta el LoL", width: 460, height: 270, label: "Ivan" },
        { type: "space", size: 46 },
        { type: "image", name: "creditos5", caption: "Aqui deberia ir Pepe, pero se me olvido y ya no me alcanzo el tiempo", width: 620, height: 320, label: "Pepe" },
        { type: "space", size: 78 },
        { type: "section", text: "DIRECCIÓN" },
        { type: "space", size: 12 },
        { type: "role", text: "Director del Proyecto" },
        { type: "name", text: "The Dex Canvas" },
        { type: "space", size: 14 },
        { type: "role", text: "Director Creativo" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Productor" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "DISEÑO DEL JUEGO" },
        { type: "space", size: 12 },
        { type: "role", text: "Diseñador Principal (Game Designer)" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Combate" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Jefes" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Mobs" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Balance y Progresión" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "NARRATIVA" },
        { type: "space", size: 12 },
        { type: "role", text: "Historia Original" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Guion Principal" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diálogos" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Lore y Worldbuilding" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Revisión Narrativa" },
        { type: "name", text: "Yoss Moto" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "PROGRAMACIÓN" },
        { type: "space", size: 12 },
        { type: "role", text: "Programador Principal" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Programación de Gameplay" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Programación de Sistemas" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Programación de UI/HUD" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Programación de Plugins" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "ARTE" },
        { type: "space", size: 12 },
        { type: "role", text: "Director de Arte" },
        { type: "name", text: "Yoss Moto" },
        { type: "space", size: 14 },
        { type: "role", text: "Arte Conceptual" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Ilustraciones" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Personajes" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Enemigos" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño de Jefes" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "PIXEL ART" },
        { type: "space", size: 12 },
        { type: "role", text: "Pixel Artist Principal" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Sprites de Personajes" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Sprites de Enemigos" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Sprites de Jefes" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Tilesets" },
        { type: "name", text: "RPG Maker Team" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "INTERFAZ" },
        { type: "space", size: 12 },
        { type: "role", text: "Diseño de Menús" },
        { type: "name", text: "Dextroyean" },
        { type: "name", text: "Yoss Moto" },
        { type: "space", size: 14 },
        { type: "role", text: "Diseño UX/UI" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "AUDIO" },
        { type: "space", size: 12 },
        { type: "role", text: "Director de Audio" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Compositor Principal" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Música de Combate" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Música Ambiental" },
        { type: "name", text: "Dextroyean" },
        { type: "name", text: "Yuufuruka" },
        { type: "name", text: "Koichi Morita" },
        { type: "space", size: 14 },
        { type: "role", text: "Música de Jefes" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Efectos de Sonido" },
        { type: "name", text: "RPG Maker Team" },
        { type: "space", size: 14 },
        { type: "role", text: "Edición de Audio" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "CONTROL DE CALIDAD" },
        { type: "space", size: 12 },
        { type: "role", text: "QA Lead" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Testers Internos" },
        { type: "name", text: "Yoss Moto" },
        { type: "name", text: "EnriqueArturo98" },
        { type: "name", text: "PepeOwO" },
        { type: "name", text: "Ivancin" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "COMUNIDAD" },
        { type: "space", size: 12 },
        { type: "role", text: "Comunidad" },
        { type: "name", text: "Souls & Stars" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "PRODUCCIÓN" },
        { type: "space", size: 12 },
        { type: "role", text: "Administración" },
        { type: "name", text: "Dextroyean" },
        { type: "name", text: "Yoss Moto" },
        { type: "space", size: 14 },
        { type: "role", text: "Coordinación General" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Gestión de Proyecto" },
        { type: "name", text: "Dextroyean" },
        { type: "name", text: "Yoss Moto" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "FINANCIACIÓN" },
        { type: "space", size: 12 },
        { type: "role", text: "Financiamiento Principal" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 14 },
        { type: "role", text: "Donadores principales" },
        { type: "name", text: "Ivancin" },
        { type: "space", size: 14 },
        { type: "space", size: 62 },
        { type: "section", text: "MÚSICA IMPLEMENTADA" },
        { type: "space", size: 12 },
        { type: "role", text: "Prologo" },
        { type: "name", text: "Prologo — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Tierras de Lúmira" },
        { type: "name", text: "The overworld — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "SilverRain" },
        { type: "name", text: "Silverain — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Bosque de Lumira" },
        { type: "name", text: "Moonlit lake — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Guardian del Manantial" },
        { type: "name", text: "the guardian of the spring — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Manantial Lumira" },
        { type: "name", text: "El manantial que olvida — Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Entrada al templo del viento" },
        { type: "name", text: "Whispers Before the Gale — Dextroyean" },
        { type: "space", size: 12 },
        { type: "space", size: 68 },
        { type: "section", text: "PLUGINS Y SCRIPTS" },
        { type: "space", size: 12 },
        { type: "role", text: "Adaptative Layout" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Aura Sync" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Battle Positions" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Battle Results" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Map name HUD" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Over Pass" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "Tittle Menu" },
        { type: "name", text: "Dextroyean" },
        { type: "space", size: 12 },
        { type: "role", text: "MOG - Action Name" },
        { type: "name", text: "Moghunter" },
        { type: "space", size: 12 },
        { type: "space", size: 68 },
        { type: "section", text: "RECURSOS E INSPIRACIONES" },
        { type: "space", size: 16 },
        { type: "role", text: "Motor" },
        { type: "name", text: "RPG Maker MZ" },
        { type: "space", size: 10 },
        { type: "role", text: "Software de arte" },
        { type: "name", text: "Photoshop / Affinity" },
        { type: "space", size: 10 },
        { type: "role", text: "Inspiraciones" },
        { type: "name", text: "The Legend of Zelda" },
        { type: "name", text: "Golden Sun" },
        { type: "name", text: "Pokémon" },
        { type: "name", text: "Expedition 33" },
        { type: "name", text: "Los Simpson" },
        { type: "name", text: "Bob Esponja" },
        { type: "name", text: "Malcolm el de en medio" },
        { type: "space", size: 68 },
        { type: "section", text: "RECUERDOS DEL DESARROLLO" },
        { type: "space", size: 24 },
        { type: "imageLeft", name: "creditos6", caption: "Pruebas, ideas y ajustes del proyecto", width: 500, height: 285, label: "EQUIPO" },
        { type: "space", size: 46 },
        { type: "imageRight", name: "creditos7", caption: "Souls & Stars", width: 500, height: 285, label: "COMUNIDAD" },
        { type: "space", size: 78 },

        { type: "section", text: "AGRADECIMIENTOS ESPECIALES" },
        { type: "space", size: 16 },
        { type: "name", text: "Dulce" },
        { type: "text", text: "Por inspirar a Nymphi y convertirse en parte del corazón de esta historia." },
        { type: "space", size: 28 },
        { type: "name", text: "Yoss" },
        { type: "text", text: "Por inspirar un personaje basado en la amistad, el apoyo y esos momentos que hacen más ligero cualquier camino." },
        { type: "space", size: 28 },
        { type: "name", text: "Souls & Stars" },
        { type: "text", text: "Por acompañar el desarrollo, las pruebas y las ideas de este mundo." },
        { type: "space", size: 76 },
        { type: "section", text: "MENSAJE DEL DIRECTOR" },
        { type: "space", size: 20 },
        { type: "name", text: "A Dulce," },
        { type: "space", size: 22 },
        { type: "text", text: "Gracias por inspirar a Nymphi." },
        { type: "space", size: 22 },
        { type: "text", text: "Aunque este mundo está lleno de bosques mágicos, criaturas extrañas y aventuras imposibles, la verdad es que todo comenzó con algo mucho más sencillo: una persona capaz" },
        { type: "text", text: "de inspirar una historia." },
        { type: "space", size: 22 },
        { type: "text", text: "Muchas de las cualidades que hicieron de Nymphi quien es, nacieron de la admiración, el cariño y los recuerdos compartidos a lo largo de este viaje." },
        { type: "space", size: 22 },
        { type: "name", text: "Y a Yoss," },
        { type: "space", size: 22 },
        { type: "text", text: "Gracias por tu amistad, por tu apoyo y por formar parte de esta aventura incluso antes de que existiera." },
        { type: "space", size: 22 },
        { type: "text", text: "Tu personaje fue creado como un pequeño homenaje a alguien que siempre estuvo ahí, aportando alegría, ocurrencias inesperadas y la capacidad de hacer sonreír a los demás" },
        { type: "text", text: "incluso en los momentos más complicados." },
        { type: "space", size: 22 },
        { type: "name", text: "A ambas," },
        { type: "space", size: 22 },
        { type: "text", text: "Gracias por convertirse, de una forma u otra, en parte de este mundo." },
        { type: "space", size: 22 },
        { type: "text", text: "Espero que al recorrer los caminos de Sylverain, escuchar sus historias y acompañar a Nymphi en esta aventura, puedan encontrar un pequeño fragmento de ustedes mismas" },
        { type: "text", text: "entre sus páginas." },
        { type: "space", size: 22 },
        { type: "text", text: "Y espero, sobre todo, que este juego les recuerde lo importantes que fueron para hacerlo posible." },
        { type: "space", size: 22 },
        { type: "name", text: "Con cariño," },
        { type: "space", size: 22 },
        { type: "text", text: "Adrián (Dex)" },
        { type: "space", size: 22 },
        { type: "text", text: "The Dex Canvas" },
        { type: "space", size: 22 },
        { type: "space", size: 80 },
        { type: "section", text: "GRACIAS POR JUGAR" },
        { type: "space", size: 22 },
        { type: "text", text: "Esperamos que hayas disfrutado este pequeño mundo tanto como nosotros disfrutamos creándolo." },
        { type: "space", size: 28 },
        { type: "subtitle", text: "Toda historia comienza con una inspiración." },
        { type: "subtitle", text: "Gracias por formar parte de la mía." },
        { type: "space", size: 70 },
        { type: "small", text: "THE DEX CANVAS" },
        { type: "space", size: 260 }
    ];

    PluginManager.registerCommand(pluginName, "IniciarCreditos", function() {
        SceneManager.push(Scene_DexCredits);
    });

    //-------------------------------------------------------------------------
    // Scene_DexCredits
    //-------------------------------------------------------------------------

    function Scene_DexCredits() {
        this.initialize.apply(this, arguments);
    }

    Scene_DexCredits.prototype = Object.create(Scene_Base.prototype);
    Scene_DexCredits.prototype.constructor = Scene_DexCredits;
    window.Scene_DexCredits = Scene_DexCredits;

    Scene_DexCredits.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
        this._phase = "fadeIn";
        this._startWaitCount = Dex.CreditsScene.startWait;
        this._finalWaitCount = Dex.CreditsScene.finalAutoWait;
        this._finished = false;
        this._totalCreditsHeight = 0;
        this._previousBgm = null;
        this._cancelHoldCount = 0;
    };

    Scene_DexCredits.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this._previousBgm = AudioManager.saveBgm();
        this.createBackground();
        this.createDimLayer();
        this.createParticles();
        this.createCreditsContainer();
        this.createFinalLayer();
        this.createFadeLayer();
        this.createCancelHoldLayer();
        this.playCreditsMusic();
    };

    Scene_DexCredits.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();

        if (Dex.CreditsScene.background) {
            this._backgroundSprite.bitmap = ImageManager.loadBitmap("img/credits/", Dex.CreditsScene.background);
            this._backgroundSprite.bitmap.addLoadListener(this.fitSpriteToScreen.bind(this, this._backgroundSprite, true));
        } else {
            this._backgroundSprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.drawDefaultBackground(this._backgroundSprite.bitmap);
        }

        this.addChild(this._backgroundSprite);
    };

    Scene_DexCredits.prototype.fitSpriteToScreen = function(sprite, cover) {
        const bitmap = sprite.bitmap;
        if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;

        const sx = Graphics.width / bitmap.width;
        const sy = Graphics.height / bitmap.height;
        const scale = cover ? Math.max(sx, sy) : Math.min(sx, sy);

        sprite.scale.x = scale;
        sprite.scale.y = scale;
        sprite.x = Math.floor((Graphics.width - bitmap.width * scale) / 2);
        sprite.y = Math.floor((Graphics.height - bitmap.height * scale) / 2);
    };

    Scene_DexCredits.prototype.drawDefaultBackground = function(bitmap) {
        const ctx = bitmap.context;
        const gradient = ctx.createLinearGradient(0, 0, 0, Graphics.height);

        gradient.addColorStop(0, "#07050F");
        gradient.addColorStop(0.42, "#171026");
        gradient.addColorStop(1, "#050407");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, Graphics.width, Graphics.height);
        ctx.restore();

        bitmap.baseTexture.update();
    };

    Scene_DexCredits.prototype.createDimLayer = function() {
        this._dimLayer = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._dimLayer.bitmap.fillAll("black");
        this._dimLayer.opacity = Dex.CreditsScene.dim;
        this.addChild(this._dimLayer);
    };

    Scene_DexCredits.prototype.createFadeLayer = function() {
        this._fadeLayer = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._fadeLayer.bitmap.fillAll("black");
        this._fadeLayer.opacity = 255;
        this.addChild(this._fadeLayer);
    };

    Scene_DexCredits.prototype.createCreditsContainer = function() {
        this._creditsContainer = new Sprite();
        this._creditsContainer.x = 0;
        this._creditsContainer.y = Graphics.height + 40;
        this.addChild(this._creditsContainer);
        this.buildCredits();
    };

    Scene_DexCredits.prototype.buildCredits = function() {
        const items = Dex.CreditsScene.defaultCredits;
        let y = 0;

        for (let i = 0; i < items.length; i++) {
            const entry = items[i] || {};
            const type = entry.type || "text";

            if (type === "space") {
                y += Number(entry.size || 32);
                continue;
            }

            if (type === "image" || type === "imageLeft" || type === "imageRight") {
                const imageItem = this.createCreditImageItem(entry, type);
                imageItem.y = y;
                this._creditsContainer.addChild(imageItem);
                y += imageItem._dexHeight + Number(entry.marginBottom || 52);
                continue;
            }

            const style = this.styleForType(type);
            const lines = this.wrapText(String(entry.text || ""), style.width, style.fontSize);
            const height = Math.max(style.height, lines.length * style.lineHeight + style.padding * 2);
            const sprite = this.createTextSprite(lines, style, height);

            sprite.x = Math.floor((Graphics.width - style.width) / 2);
            sprite.y = y;
            this._creditsContainer.addChild(sprite);

            y += height + style.marginBottom;
        }

        this._totalCreditsHeight = y;
    };

    Scene_DexCredits.prototype.styleForType = function(type) {
        const baseWidth = Math.min(Graphics.width - 96, 920);

        const styles = {
            title: {
                width: baseWidth,
                height: 78,
                fontSize: 54,
                lineHeight: 60,
                padding: 8,
                color: Dex.CreditsScene.titleColor,
                outlineColor: "rgba(40, 15, 70, 0.95)",
                outlineWidth: 6,
                bold: true,
                italic: false,
                align: "center",
                marginBottom: 14
            },
            subtitle: {
                width: baseWidth,
                height: 54,
                fontSize: 30,
                lineHeight: 38,
                padding: 8,
                color: "#F4ECFF",
                outlineColor: "rgba(25, 10, 45, 0.95)",
                outlineWidth: 5,
                bold: false,
                italic: true,
                align: "center",
                marginBottom: 12
            },
            section: {
                width: baseWidth,
                height: 46,
                fontSize: 26,
                lineHeight: 34,
                padding: 8,
                color: Dex.CreditsScene.sectionColor,
                outlineColor: "rgba(20, 10, 35, 0.95)",
                outlineWidth: 5,
                bold: true,
                italic: false,
                align: "center",
                marginBottom: 12
            },
            name: {
                width: baseWidth,
                height: 42,
                fontSize: 28,
                lineHeight: 36,
                padding: 4,
                color: "#FFFFFF",
                outlineColor: "rgba(0, 0, 0, 0.90)",
                outlineWidth: 4,
                bold: false,
                italic: false,
                align: "center",
                marginBottom: 2
            },
            role: {
                width: baseWidth,
                height: 34,
                fontSize: 19,
                lineHeight: 28,
                padding: 4,
                color: "#D7C9EE",
                outlineColor: "rgba(0, 0, 0, 0.85)",
                outlineWidth: 4,
                bold: false,
                italic: true,
                align: "center",
                marginBottom: 8
            },
            small: {
                width: baseWidth,
                height: 30,
                fontSize: 18,
                lineHeight: 26,
                padding: 4,
                color: "#BFA9DA",
                outlineColor: "rgba(0, 0, 0, 0.85)",
                outlineWidth: 3,
                bold: false,
                italic: false,
                align: "center",
                marginBottom: 4
            },
            text: {
                width: Math.min(Graphics.width - 160, 760),
                height: 40,
                fontSize: 22,
                lineHeight: 32,
                padding: 8,
                color: Dex.CreditsScene.mainColor,
                outlineColor: "rgba(0, 0, 0, 0.88)",
                outlineWidth: 4,
                bold: false,
                italic: false,
                align: "center",
                marginBottom: 8
            }
        };

        return styles[type] || styles.text;
    };

    Scene_DexCredits.prototype.createTextSprite = function(lines, style, height) {
        const bitmap = new Bitmap(style.width, height);
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = style.fontSize;
        bitmap.fontBold = !!style.bold;
        bitmap.fontItalic = !!style.italic;
        bitmap.textColor = style.color;
        bitmap.outlineColor = style.outlineColor;
        bitmap.outlineWidth = style.outlineWidth;

        let y = style.padding;
        for (let i = 0; i < lines.length; i++) {
            bitmap.drawText(lines[i], 0, y, style.width, style.lineHeight, style.align);
            y += style.lineHeight;
        }

        return new Sprite(bitmap);
    };

    Scene_DexCredits.prototype.wrapText = function(text, maxWidth, fontSize) {
        const temp = new Bitmap(1, 1);
        temp.fontFace = $gameSystem.mainFontFace();
        temp.fontSize = fontSize;

        const hardLines = String(text).split(/\n/);
        const result = [];

        for (let h = 0; h < hardLines.length; h++) {
            const raw = hardLines[h].trim();
            if (!raw) {
                result.push("");
                continue;
            }

            const words = raw.split(/\s+/);
            let line = "";

            for (let i = 0; i < words.length; i++) {
                const testLine = line ? line + " " + words[i] : words[i];
                const width = temp.measureTextWidth(testLine);

                if (width > maxWidth && line) {
                    result.push(line);
                    line = words[i];
                } else {
                    line = testLine;
                }
            }

            if (line) result.push(line);
        }

        if (temp.destroy) temp.destroy();
        return result.length > 0 ? result : [""];
    };

    //-------------------------------------------------------------------------
    // Postales / imágenes del scroll
    //-------------------------------------------------------------------------

    Scene_DexCredits.prototype.createCreditImageItem = function(entry, type) {
        const width = Math.min(Graphics.width - 120, Number(entry.width || 560));
        const imageHeight = Number(entry.height || 300);
        const caption = String(entry.caption || "");
        const captionHeight = caption ? 42 : 0;
        const totalHeight = imageHeight + captionHeight;
        const sprite = new Sprite();

        sprite._dexHeight = totalHeight;
        sprite._dexCreditImage = true;
        sprite._dexBaseScale = 0.96;
        sprite.opacity = 0;
        sprite.scale.x = sprite._dexBaseScale;
        sprite.scale.y = sprite._dexBaseScale;

        if (type === "imageLeft") {
            sprite.x = 84;
            sprite.rotation = this.degToRad(Number(entry.angle || -1.5));
        } else if (type === "imageRight") {
            sprite.x = Graphics.width - width - 84;
            sprite.rotation = this.degToRad(Number(entry.angle || 1.5));
        } else {
            sprite.x = Math.floor((Graphics.width - width) / 2);
            sprite.rotation = this.degToRad(Number(entry.angle || 0));
        }

        const frame = new Sprite(this.createPostcardFrameBitmap(width, imageHeight));
        sprite.addChild(frame);

        const imageName = cleanFileName(entry.name || "");
        if (imageName) {
            const picture = new Sprite(ImageManager.loadBitmap("img/credits/", imageName));
            picture.bitmap.addLoadListener(this.fitPictureInside.bind(this, picture, width - 24, imageHeight - 24));
            picture.x = 12;
            picture.y = 12;
            sprite.addChild(picture);
        } else {
            const placeholder = new Sprite(this.createPlaceholderBitmap(width - 24, imageHeight - 24, String(entry.label || "IMAGEN")));
            placeholder.x = 12;
            placeholder.y = 12;
            sprite.addChild(placeholder);
        }

        if (caption) {
            const cap = this.createCaptionSprite(caption, width, captionHeight);
            cap.y = imageHeight;
            sprite.addChild(cap);
        }

        return sprite;
    };

    Scene_DexCredits.prototype.fitPictureInside = function(sprite, maxWidth, maxHeight) {
        const bitmap = sprite.bitmap;
        if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;

        const scale = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height);
        sprite.scale.x = scale;
        sprite.scale.y = scale;
        sprite.x = 12 + Math.floor((maxWidth - bitmap.width * scale) / 2);
        sprite.y = 12 + Math.floor((maxHeight - bitmap.height * scale) / 2);
    };

    Scene_DexCredits.prototype.createPostcardFrameBitmap = function(width, height) {
        const bitmap = new Bitmap(width, height);
        const ctx = bitmap.context;

        ctx.save();
        this.roundRect(ctx, 0, 0, width, height, 18);
        ctx.fillStyle = "rgba(8, 6, 14, 0.70)";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(238, 217, 255, 0.45)";
        ctx.stroke();

        this.roundRect(ctx, 10, 10, width - 20, height - 20, 12);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        bitmap.baseTexture.update();
        return bitmap;
    };

    Scene_DexCredits.prototype.createPlaceholderBitmap = function(width, height, label) {
        const bitmap = new Bitmap(width, height);
        const ctx = bitmap.context;
        const gradient = ctx.createLinearGradient(0, 0, width, height);

        gradient.addColorStop(0, "#211536");
        gradient.addColorStop(0.50, "#49306C");
        gradient.addColorStop(1, "#0B0714");

        ctx.save();
        this.roundRect(ctx, 0, 0, width, height, 12);
        ctx.fillStyle = gradient;
        ctx.fill();

        for (let i = 0; i < 34; i++) {
            ctx.globalAlpha = 0.12 + Math.random() * 0.18;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, 1 + Math.random() * 2.8, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        bitmap.baseTexture.update();

        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = 28;
        bitmap.textColor = "#EED9FF";
        bitmap.outlineColor = "rgba(0, 0, 0, 0.9)";
        bitmap.outlineWidth = 5;
        bitmap.drawText(label, 0, Math.floor(height / 2) - 24, width, 48, "center");
        bitmap.fontSize = 18;
        bitmap.textColor = "#D7C9EE";
        bitmap.drawText("reemplaza esta postal en img/credits", 0, Math.floor(height / 2) + 24, width, 32, "center");

        return bitmap;
    };

    Scene_DexCredits.prototype.createCaptionSprite = function(text, width, height) {
        const bitmap = new Bitmap(width, height);
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = 18;
        bitmap.fontItalic = true;
        bitmap.textColor = "#D7C9EE";
        bitmap.outlineColor = "rgba(0, 0, 0, 0.85)";
        bitmap.outlineWidth = 4;
        bitmap.drawText(text, 0, 2, width, height - 4, "center");
        return new Sprite(bitmap);
    };

    Scene_DexCredits.prototype.degToRad = function(degrees) {
        return degrees * Math.PI / 180;
    };

    Scene_DexCredits.prototype.roundRect = function(ctx, x, y, w, h, r) {
        const radius = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };

    //-------------------------------------------------------------------------
    // Pantalla final
    //-------------------------------------------------------------------------

    Scene_DexCredits.prototype.createFinalLayer = function() {
        this._finalLayer = new Sprite();
        this._finalLayer.opacity = 0;
        this._finalLayer.visible = false;
        this.addChild(this._finalLayer);

        this.createFinalBackground();
        this.createFinalDim();
        this.createFinalText();
        this.createPressText();
    };

    Scene_DexCredits.prototype.createFinalBackground = function() {
        this._finalBackground = new Sprite();

        if (Dex.CreditsScene.finalImage) {
            this._finalBackground.bitmap = ImageManager.loadBitmap("img/credits/", Dex.CreditsScene.finalImage);
            this._finalBackground.bitmap.addLoadListener(this.fitSpriteToScreen.bind(this, this._finalBackground, true));
        } else {
            this._finalBackground.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.drawFinalDefaultBackground(this._finalBackground.bitmap);
        }

        this._finalLayer.addChild(this._finalBackground);
    };

    Scene_DexCredits.prototype.drawFinalDefaultBackground = function(bitmap) {
        const ctx = bitmap.context;
        const gradient = ctx.createRadialGradient(
            Graphics.width / 2,
            Graphics.height / 2,
            20,
            Graphics.width / 2,
            Graphics.height / 2,
            Math.max(Graphics.width, Graphics.height) * 0.72
        );

        gradient.addColorStop(0, "#312045");
        gradient.addColorStop(0.45, "#130D21");
        gradient.addColorStop(1, "#030204");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, Graphics.width, Graphics.height);
        ctx.restore();
        bitmap.baseTexture.update();
    };

    Scene_DexCredits.prototype.createFinalDim = function() {
        this._finalDim = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._finalDim.bitmap.fillAll("black");
        this._finalDim.opacity = Dex.CreditsScene.finalDim;
        this._finalLayer.addChild(this._finalDim);
    };

    Scene_DexCredits.prototype.createFinalText = function() {
        const width = Math.min(Graphics.width - 120, 900);
        const bitmap = new Bitmap(width, 110);

        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = 42;
        bitmap.fontBold = true;
        bitmap.textColor = Dex.CreditsScene.titleColor;
        bitmap.outlineColor = "rgba(0, 0, 0, 0.95)";
        bitmap.outlineWidth = 6;
        bitmap.drawText(Dex.CreditsScene.finalText, 0, 0, width, 70, "center");

        bitmap.fontSize = 22;
        bitmap.fontBold = false;
        bitmap.fontItalic = true;
        bitmap.textColor = "#F4ECFF";
        bitmap.drawText("Que los recuerdos del bosque sigan vivos en ti.", 0, 70, width, 34, "center");

        this._finalTextSprite = new Sprite(bitmap);
        this._finalTextSprite.x = Math.floor((Graphics.width - width) / 2);
        this._finalTextSprite.y = Math.floor(Graphics.height * 0.62);
        this._finalLayer.addChild(this._finalTextSprite);
    };

    Scene_DexCredits.prototype.createPressText = function() {
        const width = Math.min(Graphics.width - 160, 760);
        const bitmap = new Bitmap(width, 46);

        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = 20;
        bitmap.textColor = "#D7C9EE";
        bitmap.outlineColor = "rgba(0, 0, 0, 0.90)";
        bitmap.outlineWidth = 4;
        bitmap.drawText(Dex.CreditsScene.pressText, 0, 0, width, 42, "center");

        this._pressTextSprite = new Sprite(bitmap);
        this._pressTextSprite.x = Math.floor((Graphics.width - width) / 2);
        this._pressTextSprite.y = Graphics.height - 84;
        this._pressTextSprite.visible = Dex.CreditsScene.waitFinalKey;
        this._finalLayer.addChild(this._pressTextSprite);
    };

    //-------------------------------------------------------------------------
    // Partículas
    //-------------------------------------------------------------------------

    Scene_DexCredits.prototype.createParticles = function() {
        this._particlesField = new Sprite();
        this.addChild(this._particlesField);
        this._particles = [];

        if (!Dex.CreditsScene.particles) return;

        this._particleBitmap = this.createParticleBitmap();

        for (let i = 0; i < Dex.CreditsScene.particlesNumber; i++) {
            const sprite = new Sprite(this._particleBitmap);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._particlesField.addChild(sprite);
            this.resetParticle(sprite, true);
            this._particles.push(sprite);
        }
    };

    Scene_DexCredits.prototype.createParticleBitmap = function() {
        const bitmap = new Bitmap(16, 16);
        const ctx = bitmap.context;
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);

        gradient.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.35, "rgba(210, 170, 255, 0.85)");
        gradient.addColorStop(1.0, "rgba(210, 170, 255, 0.0)");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        bitmap.baseTexture.update();
        return bitmap;
    };

    Scene_DexCredits.prototype.resetParticle = function(sprite, randomY) {
        sprite.x = Math.randomInt(Graphics.width);
        sprite.y = randomY ? Math.randomInt(Graphics.height) : Graphics.height + 20;
        sprite.opacity = 60 + Math.randomInt(120);
        sprite.speedY = 0.25 + Math.random() * 0.75;
        sprite.speedX = -0.25 + Math.random() * 0.50;
        sprite.twinkle = Math.random() * Math.PI * 2;
        sprite.twinkleSpeed = 0.015 + Math.random() * 0.035;

        const scale = 0.35 + Math.random() * 0.85;
        sprite.scale.x = scale;
        sprite.scale.y = scale;
    };


    //-------------------------------------------------------------------------
    // Barra de cancelación
    //-------------------------------------------------------------------------

    Scene_DexCredits.prototype.createCancelHoldLayer = function() {
        this._cancelHoldSprite = new Sprite(new Bitmap(Graphics.width, 96));
        this._cancelHoldSprite.x = 0;
        this._cancelHoldSprite.y = Graphics.height - 118;
        this._cancelHoldSprite.opacity = 0;
        this._cancelHoldSprite.visible = false;
        this.addChild(this._cancelHoldSprite);
        this.refreshCancelHoldBar(0);
    };

    Scene_DexCredits.prototype.cancelHoldAllowed = function() {
        if (!Dex.CreditsScene.holdToCancel) return false;

        if (this._phase === "finalWaitKey" || this._phase === "finalAutoWait") {
            return true;
        }

        if (!Dex.CreditsScene.allowSkip) return false;

        return this._phase === "startWait" || this._phase === "scroll";
    };

    Scene_DexCredits.prototype.cancelHoldPressed = function() {
        const keyboard = Input.isPressed("ok") || Input.isPressed("cancel");
        const touch = TouchInput.isPressed ? TouchInput.isPressed() : false;
        return keyboard || touch;
    };

    Scene_DexCredits.prototype.updateCancelHold = function() {
        if (!this._cancelHoldSprite) return;

        if (this.cancelHoldAllowed() && this.cancelHoldPressed()) {
            this._cancelHoldCount++;
            const rate = Math.min(1, this._cancelHoldCount / Dex.CreditsScene.cancelHoldFrames);

            this._cancelHoldSprite.visible = true;
            this._cancelHoldSprite.opacity += (255 - this._cancelHoldSprite.opacity) * 0.22;
            this.refreshCancelHoldBar(rate);

            if (rate >= 1) {
                this.completeCancelHold();
            }

            return;
        }

        this._cancelHoldCount = 0;

        if (this._cancelHoldSprite.visible) {
            this._cancelHoldSprite.opacity -= 24;
            if (this._cancelHoldSprite.opacity <= 0) {
                this._cancelHoldSprite.opacity = 0;
                this._cancelHoldSprite.visible = false;
            }
        }
    };

    Scene_DexCredits.prototype.completeCancelHold = function() {
        this._cancelHoldCount = 0;

        if (this._cancelHoldSprite) {
            this._cancelHoldSprite.opacity = 0;
            this._cancelHoldSprite.visible = false;
        }

        if (this._phase === "finalWaitKey" || this._phase === "finalAutoWait") {
            this._phase = "fadeOut";
            return;
        }

        if (this._phase === "startWait" || this._phase === "scroll") {
            this.startFinalOrExit();
        }
    };

    Scene_DexCredits.prototype.refreshCancelHoldBar = function(rate) {
        const sprite = this._cancelHoldSprite;
        if (!sprite || !sprite.bitmap) return;

        const bitmap = sprite.bitmap;
        const ctx = bitmap.context;
        const width = Math.min(Graphics.width - 160, Dex.CreditsScene.cancelBarWidth);
        const height = Dex.CreditsScene.cancelBarHeight;
        const x = Math.floor((Graphics.width - width) / 2);
        const y = 46;
        const fillWidth = Math.floor(width * Math.max(0, Math.min(1, rate)));

        bitmap.clear();

        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
        this.roundRect(ctx, x - 26, 4, width + 52, 84, 18);
        ctx.fill();

        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = 20;
        bitmap.textColor = "#F4ECFF";
        bitmap.outlineColor = "rgba(0, 0, 0, 0.95)";
        bitmap.outlineWidth = 4;
        bitmap.drawText(Dex.CreditsScene.cancelText, 0, 11, Graphics.width, 28, "center");

        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        this.roundRect(ctx, x, y, width, height, height / 2);
        ctx.fill();

        ctx.fillStyle = "rgba(200, 162, 255, 0.96)";
        this.roundRect(ctx, x, y, fillWidth, height, height / 2);
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        this.roundRect(ctx, x, y, width, height, height / 2);
        ctx.stroke();
        ctx.restore();

        bitmap.baseTexture.update();
    };

    //-------------------------------------------------------------------------
    // Update
    //-------------------------------------------------------------------------

    Scene_DexCredits.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.updateFade();
        this.updateParticles();
        this.updateImageAnimations();
        this.updateCreditsScroll();
        this.updateFinalScreen();
        this.updateCancelHold();
        this.updateInput();
    };

    Scene_DexCredits.prototype.updateFade = function() {
        if (!this._fadeLayer) return;

        if (this._phase === "fadeIn") {
            this._fadeLayer.opacity -= 8;
            if (this._fadeLayer.opacity <= 0) {
                this._fadeLayer.opacity = 0;
                this._phase = "startWait";
            }
        } else if (this._phase === "fadeOut") {
            this._fadeLayer.opacity += 8;
            if (this._fadeLayer.opacity >= 255) {
                this._fadeLayer.opacity = 255;
                this.finishCredits();
            }
        }
    };

    Scene_DexCredits.prototype.updateCreditsScroll = function() {
        if (!this._creditsContainer) return;

        if (this._phase === "startWait") {
            this._startWaitCount--;
            if (this._startWaitCount <= 0) this._phase = "scroll";
            return;
        }

        if (this._phase === "scroll") {
            this._creditsContainer.y -= Dex.CreditsScene.scrollSpeed;

            const endY = -this._totalCreditsHeight - 40;
            if (this._creditsContainer.y <= endY) {
                this.startFinalOrExit();
            }
        }
    };

    Scene_DexCredits.prototype.startFinalOrExit = function() {
        if (Dex.CreditsScene.useFinalScreen) {
            this._phase = "finalFadeIn";
            this._finalLayer.visible = true;
            this._finalLayer.opacity = 0;
            this._creditsContainer.visible = false;
        } else {
            this._phase = "fadeOut";
        }
    };

    Scene_DexCredits.prototype.updateFinalScreen = function() {
        if (!Dex.CreditsScene.useFinalScreen || !this._finalLayer) return;

        if (this._phase === "finalFadeIn") {
            this._finalLayer.opacity += 6;
            if (this._finalLayer.opacity >= 255) {
                this._finalLayer.opacity = 255;
                this._phase = Dex.CreditsScene.waitFinalKey ? "finalWaitKey" : "finalAutoWait";
            }
        } else if (this._phase === "finalAutoWait") {
            this._finalWaitCount--;
            if (this._finalWaitCount <= 0) this._phase = "fadeOut";
        }

        if (this._pressTextSprite && Dex.CreditsScene.waitFinalKey) {
            this._pressTextSprite.opacity = 150 + Math.sin(Graphics.frameCount * 0.06) * 80;
        }

        if (this._finalBackground && this._phase !== "fadeOut") {
            const pulse = 1.0 + Math.sin(Graphics.frameCount * 0.008) * 0.006;
            this._finalBackground.scale.x *= pulse / (this._finalBackground._dexLastPulse || 1);
            this._finalBackground.scale.y *= pulse / (this._finalBackground._dexLastPulse || 1);
            this._finalBackground._dexLastPulse = pulse;
        }
    };

    Scene_DexCredits.prototype.updateParticles = function() {
        if (!this._particles) return;

        for (let i = 0; i < this._particles.length; i++) {
            const sprite = this._particles[i];
            sprite.x += sprite.speedX;
            sprite.y -= sprite.speedY;
            sprite.twinkle += sprite.twinkleSpeed;
            sprite.opacity = 75 + Math.sin(sprite.twinkle) * 55;

            if (sprite.y < -20 || sprite.x < -30 || sprite.x > Graphics.width + 30) {
                this.resetParticle(sprite, false);
            }
        }
    };

    Scene_DexCredits.prototype.updateImageAnimations = function() {
        if (!this._creditsContainer || this._phase !== "scroll") return;

        const children = this._creditsContainer.children;
        for (let i = 0; i < children.length; i++) {
            const sprite = children[i];
            if (!sprite._dexCreditImage) continue;

            const screenY = this._creditsContainer.y + sprite.y;
            const centerY = screenY + sprite._dexHeight / 2;
            const distance = Math.abs(centerY - Graphics.height / 2);
            const maxDistance = Graphics.height * 0.62;
            const factor = Math.max(0, 1 - distance / maxDistance);
            const targetOpacity = Math.floor(255 * Math.min(1, factor * 1.6));
            const targetScale = 0.96 + factor * 0.045;

            sprite.opacity += (targetOpacity - sprite.opacity) * 0.12;
            sprite.scale.x += (targetScale - sprite.scale.x) * 0.08;
            sprite.scale.y = sprite.scale.x;
        }
    };

    Scene_DexCredits.prototype.updateInput = function() {
        const triggered = Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered() || TouchInput.isCancelled();

        if (!triggered) return;

        // En modo nuevo, OK/Cancel ya no corta de golpe. Debe mantenerse
        // presionado para llenar la barra de cancelación.
        if (Dex.CreditsScene.holdToCancel) {
            return;
        }

        if (this._phase === "finalWaitKey") {
            this._phase = "fadeOut";
            return;
        }

        if (this._phase === "finalAutoWait") {
            this._phase = "fadeOut";
            return;
        }

        if (Dex.CreditsScene.allowSkip && (this._phase === "startWait" || this._phase === "scroll")) {
            this.startFinalOrExit();
        }
    };

    Scene_DexCredits.prototype.playCreditsMusic = function() {
        if (!Dex.CreditsScene.music) return;

        AudioManager.playBgm({
            name: Dex.CreditsScene.music,
            volume: Dex.CreditsScene.musicVolume,
            pitch: 100,
            pan: 0
        });
    };

    Scene_DexCredits.prototype.finishCredits = function() {
        if (this._finished) return;
        this._finished = true;

        if (Dex.CreditsScene.exitMode === "map") {
            if (this._previousBgm) AudioManager.replayBgm(this._previousBgm);
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Title);
        }
    };

})();
