//=============================================================================
// Dex_EchoSense.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.4.2] Ecos explorables: orbes, detección por proximidad y activación con Escuchar Eco.
 * @author Dextroyean y Jaime
 * @orderAfter Dex_EchoWhisper
 *
 * @param --- Visual ---
 * @default
 *
 * @param markerVisibility
 * @parent --- Visual ---
 * @text Visibilidad del Orbe
 * @type select
 * @option Siempre tenue
 * @value always
 * @option Sólo al estar cerca
 * @value nearby
 * @default always
 *
 * @param orbSize
 * @parent --- Visual ---
 * @text Tamaño del Orbe
 * @type number
 * @min 12
 * @max 96
 * @default 34
 *
 * @param markerOffsetY
 * @parent --- Visual ---
 * @text Altura Sobre el Evento
 * @type number
 * @min -200
 * @max 100
 * @desc Ajuste vertical adicional. Negativo = más arriba.
 * @default -14
 *
 * @param defaultRadius
 * @parent --- Visual ---
 * @text Radio Predeterminado
 * @type number
 * @min 1
 * @max 20
 * @default 3
 *
 * @param nearbyLabel
 * @parent --- Visual ---
 * @text Texto de Detección
 * @type string
 * @default Eco latente
 *
 * @param nearbyPrompt
 * @parent --- Visual ---
 * @text Indicación
 * @type string
 * @default Usa Escuchar Eco
 *
 * @param showPrompt
 * @parent --- Visual ---
 * @text Mostrar Indicación
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param --- Pistas Flotantes ---
 * @default
 *
 * @param hintFontSize
 * @parent --- Pistas Flotantes ---
 * @text Tamaño de Fuente
 * @type number
 * @min 12
 * @max 64
 * @default 22
 *
 * @param hintMaxWidth
 * @parent --- Pistas Flotantes ---
 * @text Ancho Máximo
 * @type number
 * @min 180
 * @max 900
 * @default 520
 *
 * @param hintDefaultDuration
 * @parent --- Pistas Flotantes ---
 * @text Duración Predeterminada
 * @type number
 * @min 0
 * @desc En frames. 0 = permanece visible mientras se cumpla la condición.
 * @default 180
 *
 * @param hintDefaultOffsetY
 * @parent --- Pistas Flotantes ---
 * @text Altura Predeterminada
 * @type number
 * @min -300
 * @max 100
 * @desc Negativo = más arriba del orbe.
 * @default -72
 *
 * @param hintDefaultMotion
 * @parent --- Pistas Flotantes ---
 * @text Movimiento Predeterminado
 * @type text
 * @desc Amplitud vertical en píxeles.
 * @default 2
 *
 * @param hintDefaultSpeed
 * @parent --- Pistas Flotantes ---
 * @text Velocidad Predeterminada
 * @type text
 * @default 0.04
 *
 * @param hintDefaultShake
 * @parent --- Pistas Flotantes ---
 * @text Vibración Predeterminada
 * @type text
 * @default 0
 *
 * @param hintFadeFrames
 * @parent --- Pistas Flotantes ---
 * @text Frames de Fundido
 * @type number
 * @min 1
 * @max 120
 * @default 24
 *
 * @param --- Sonidos ---
 * @default
 *
 * @param detectSe
 * @parent --- Sonidos ---
 * @text SE al Detectar
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Detect
 *
 * @param naturalSe
 * @parent --- Sonidos ---
 * @text SE Eco Natural
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Natural
 *
 * @param windSe
 * @parent --- Sonidos ---
 * @text SE Eco de Viento
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Wind
 *
 * @param iceSe
 * @parent --- Sonidos ---
 * @text SE Eco de Hielo
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Ice
 *
 * @param fireSe
 * @parent --- Sonidos ---
 * @text SE Eco de Fuego
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Fire
 *
 * @param corruptSe
 * @parent --- Sonidos ---
 * @text SE Eco Corrupto
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Corrupt
 *
 * @param completeSe
 * @parent --- Sonidos ---
 * @text SE Eco Completado
 * @type file
 * @dir audio/se
 * @default Dex_Echo_Complete
 *
 * @param seVolume
 * @parent --- Sonidos ---
 * @text Volumen General
 * @type number
 * @min 0
 * @max 100
 * @default 38
 *
 * @param --- Comportamiento ---
 * @default
 *
 * @param defaultOnce
 * @parent --- Comportamiento ---
 * @text Una Sola Vez
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param defaultSelfSwitch
 * @parent --- Comportamiento ---
 * @text Self Switch Predeterminado
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @param noEchoText
 * @parent --- Comportamiento ---
 * @text Texto Sin Eco Cercano
 * @type string
 * @default No percibes ningún eco cercano.
 *
 * @command ActivateNearestEcho
 * @text Activar Eco Cercano
 * @desc Activa el eco disponible más cercano dentro de su radio.
 *
 * @arg waitForFinish
 * @text Esperar a que Termine
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @arg noEchoText
 * @text Texto si no hay Eco
 * @type string
 * @desc Vacío = usar el parámetro general.
 * @default
 *
 * @arg noEchoUseWhisper
 * @text Mostrar Falta de Eco como Susurro
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @command SetEchoIndicator
 * @text Cambiar Indicador de Eco
 * @desc Cambia u oculta el indicador de un evento. Los cambios se guardan.
 *
 * @arg eventId
 * @text ID del Evento
 * @type number
 * @min 0
 * @desc 0 = evento actual; en evento común usa el último Eco activado.
 * @default 0
 *
 * @arg visibility
 * @text Visibilidad
 * @type select
 * @option Sin cambio
 * @value default
 * @option Mostrar
 * @value show
 * @option Ocultar
 * @value hide
 * @default default
 *
 * @arg profile
 * @text Perfil Visual
 * @type select
 * @option Sin cambio
 * @value unchanged
 * @option Natural
 * @value natural
 * @option Viento
 * @value wind
 * @option Hielo
 * @value ice
 * @option Fuego
 * @value fire
 * @option Corrupto
 * @value corrupt
 * @option Esperanza
 * @value hope
 * @default unchanged
 *
 * @arg label
 * @text Texto Superior
 * @type string
 * @desc Vacío = sin cambio. Escribe none para quitarlo.
 * @default
 *
 * @arg prompt
 * @text Indicación Inferior
 * @type string
 * @desc Vacío = sin cambio. Escribe none para quitarla.
 * @default
 *
 * @arg opacity
 * @text Opacidad
 * @type number
 * @min 0
 * @max 255
 * @desc 0 = sin cambio.
 * @default 0
 *
 * @arg scale
 * @text Escala
 * @type text
 * @desc 0 = sin cambio. Ejemplo: 0.8 o 1.25.
 * @default 0
 *
 * @command ResetEchoIndicator
 * @text Restablecer Indicador de Eco
 * @desc Elimina los cambios manuales hechos al indicador.
 *
 * @arg eventId
 * @text ID del Evento
 * @type number
 * @min 0
 * @desc 0 = evento actual; en evento común usa el último Eco activado.
 * @default 0
 *
 * @command RefreshEchoes
 * @text Refrescar Ecos
 * @desc Vuelve a leer las etiquetas de todos los eventos del mapa.
 *
 * @help
 * ============================================================================
 * Dex_EchoSense v1.4.2
 * ============================================================================
 *
 * Convierte eventos del mapa en recuerdos que Nymphi puede percibir y
 * escuchar usando la habilidad "Escuchar Eco".
 *
 * v1.4.2:
 * - Corrige un error que impedía guardar la partida cuando había ecos activos.
 * - El sprite visual del Eco ya no se serializa dentro de Game_Event.
 *
 * FUNCIONES:
 * - Orbe animado encima del evento, incluso si no tiene imagen.
 * - Pulso circular y partículas temáticas por perfil.
 * - Texto "Eco latente" al acercarse.
 * - Pista flotante estilo mini Whisper encima del eco.
 * - SE al detectar el eco.
 * - Activación del eco disponible más cercano.
 * - Compatibilidad con Dex_EchoWhisper.
 * - Ecos de una sola escucha o repetibles.
 * - Self Switch automático al completar.
 * - Eventos invisibles con Eco no bloquean el paso.
 * - Indicador configurable después de descubrir el Eco.
 * - Puede ejecutar un evento común después de escuchar.
 *
 * ============================================================================
 * ETIQUETAS DEL EVENTO
 * ============================================================================
 *
 * Coloca uno o varios comandos Comentario en la página activa.
 * No es necesario que todas las etiquetas quepan en un solo comentario:
 * el plugin une automáticamente todos los comentarios de la página.
 *
 * Uso mínimo:
 *
 * <Echo>
 * <EchoHint: Las raíces susurran...>
 *
 * También puedes usar únicamente <EchoHint: ...> como atajo.
 *
 * Ejemplo completo:
 *
 * <Echo>
 * <EchoId: estatua_bosque_01>
 * <EchoProfile: natural>
 * <EchoRadius: 3>
 * <EchoOnce: true>
 * <EchoSelfSwitch: A>
 * <EchoText>
 * El bosque todavía recuerda las manos que lo protegieron...
 * </EchoText>
 *
 * ETIQUETAS DISPONIBLES:
 *
 * <Echo>
 *   Marca el evento como eco.
 *
 * <EchoId: texto>
 *   Identificador opcional. Si se omite, usa mapa + ID de evento.
 *
 * <EchoProfile: natural>
 *   Perfiles: natural, wind, ice, fire, corrupt, hope.
 *
 * <EchoRadius: 3>
 *   Distancia máxima en casillas.
 *
 * <EchoOnce: true>
 *   true = sólo una vez. false = repetible.
 *
 * <EchoSelfSwitch: A>
 *   Self Switch activado después de escuchar.
 *
 * <EchoLabel: Eco latente>
 *   Cambia el texto mostrado al acercarse.
 *
 * <EchoPrompt: Usa Escuchar Eco>
 *   Cambia la indicación de interacción.
 *
 * <EchoCommonEvent: 5>
 *   Reserva un evento común después de activar el eco.
 *
 * <EchoMarkerOffsetY: -10>
 *   Ajuste vertical individual del indicador.
 *
 * <EchoHint: Las raíces susurran...>
 *   Pista flotante corta mostrada encima del evento.
 *
 * También admite bloque:
 *
 * <EchoHint>
 * El viento evita tocar estas piedras...
 * </EchoHint>
 *
 * <EchoHintProfile: natural>
 *   Perfil de color de la pista. Si se omite, usa EchoProfile.
 *
 * <EchoHintMode: before>
 *   before = al acercarse antes de activar.
 *   near = al acercarse, esté descubierto o no.
 *   always = siempre visible.
 *   discovered = al acercarse después de descubrir.
 *   off = desactivada.
 *
 * <EchoHintDuration: 180>
 *   Duración en frames. 0 = visible mientras se cumpla la condición.
 *
 * <EchoHintOffsetY: -72>
 *   Altura de la pista respecto al centro del indicador.
 *
 * <EchoHintMotion: 2>
 *   Movimiento vertical en píxeles.
 *
 * <EchoHintSpeed: 0.04>
 *   Velocidad de la oscilación.
 *
 * <EchoHintShake: 0>
 *   Vibración horizontal.
 *
 * <EchoWhisperMotion: 0.35>
 *   Multiplica la intensidad de movimiento del texto Whisper.
 *   1 = movimiento del perfil; 0.5 = mitad; 0 = sin onda ni elevación.
 *
 * <EchoWhisperSpeed: 0.60>
 *   Multiplica la velocidad de la onda.
 *
 * <EchoWhisperShake: 0>
 *   Multiplica la vibración horizontal. 0 la desactiva.
 *
 * <EchoAfterIndicator: hide>
 *   Comportamiento después de descubrirlo:
 *   hide = ocultar, keep = conservar, change = cambiar apariencia.
 *
 * <EchoAfterProfile: hope>
 *   Perfil usado cuando EchoAfterIndicator es change.
 *
 * <EchoAfterLabel: Eco escuchado>
 *   Texto superior después de descubrirlo.
 *
 * <EchoAfterPrompt: none>
 *   Texto inferior después de descubrirlo. none lo elimina.
 *
 * <EchoAfterOpacity: 150>
 *   Opacidad posterior entre 0 y 255.
 *
 * <EchoAfterScale: 0.85>
 *   Escala posterior del indicador.
 *
 * Los eventos con <Echo> y sin imagen se vuelven atravesables
 * automáticamente. El indicador se coloca sobre su casilla.
 *
 * <EchoText> ... </EchoText>
 *   Texto enviado a Dex_EchoWhisper.
 *
 * También se admite una línea corta:
 *
 * <EchoText: El bosque todavía te recuerda...>
 *
 * EJEMPLO: OCULTAR DESPUÉS DE ACTIVAR
 *
 * <EchoAfterIndicator: hide>
 *
 * EJEMPLO: CAMBIAR A ESPERANZA
 *
 * <EchoAfterIndicator: change>
 * <EchoAfterProfile: hope>
 * <EchoAfterLabel: Eco escuchado>
 * <EchoAfterPrompt: none>
 * <EchoAfterOpacity: 145>
 * <EchoAfterScale: 0.82>
 *
 * EJEMPLO: PISTA LOCAL + WHISPER IMPORTANTE
 *
 * <EchoHint: Las raíces vibran débilmente...>
 * <EchoHintMode: before>
 * <EchoHintDuration: 180>
 * <EchoHintOffsetY: -72>
 * <EchoHintMotion: 1.5>
 * <EchoHintSpeed: 0.035>
 * <EchoHintShake: 0>
 *
 * <EchoWhisperMotion: 0.30>
 * <EchoWhisperSpeed: 0.55>
 * <EchoWhisperShake: 0>
 *
 * ============================================================================
 * HABILIDAD ESCUCHAR ECO
 * ============================================================================
 *
 * 1. Crea una habilidad llamada "Escuchar Eco".
 * 2. Ocasión: Sólo desde el menú.
 * 3. Añade el efecto "Evento común".
 * 4. En ese evento común usa:
 *
 * Comando de Plugin
 * -> Dex_EchoSense
 * -> Activar Eco Cercano
 *
 * ============================================================================
 * DEX_ECHOWHISPER
 * ============================================================================
 *
 * Si Dex_EchoWhisper está activo, el recuerdo se muestra con sus letras
 * animadas. Si no está activo, se usa una ventana de mensaje normal.
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_EchoSense = true;

var Dex = Dex || {};
Dex.EchoSense = Dex.EchoSense || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_EchoSense";
    })();

    const params = PluginManager.parameters(pluginName);

    const paramText = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") {
            return fallback;
        }
        return String(value);
    };

    const paramNumber = function(name, fallback) {
        const value = Number(paramText(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const paramBool = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const SETTINGS = {
        markerVisibility: paramText("markerVisibility", "always"),
        orbSize: Math.max(12, paramNumber("orbSize", 34)),
        markerOffsetY: paramNumber("markerOffsetY", -14),
        defaultRadius: Math.max(1, paramNumber("defaultRadius", 3)),
        nearbyLabel: paramText("nearbyLabel", "Eco latente"),
        nearbyPrompt: paramText("nearbyPrompt", "Usa Escuchar Eco"),
        showPrompt: paramBool("showPrompt", true),

        hintFontSize: Math.max(12, paramNumber("hintFontSize", 22)),
        hintMaxWidth: Math.max(180, paramNumber("hintMaxWidth", 520)),
        hintDefaultDuration: Math.max(0, paramNumber("hintDefaultDuration", 180)),
        hintDefaultOffsetY: paramNumber("hintDefaultOffsetY", -72),
        hintDefaultMotion: Math.max(0, paramNumber("hintDefaultMotion", 2)),
        hintDefaultSpeed: Math.max(0, paramNumber("hintDefaultSpeed", 0.04)),
        hintDefaultShake: Math.max(0, paramNumber("hintDefaultShake", 0)),
        hintFadeFrames: Math.max(1, paramNumber("hintFadeFrames", 24)),

        detectSe: paramText("detectSe", "Dex_Echo_Detect"),
        naturalSe: paramText("naturalSe", "Dex_Echo_Natural"),
        windSe: paramText("windSe", "Dex_Echo_Wind"),
        iceSe: paramText("iceSe", "Dex_Echo_Ice"),
        fireSe: paramText("fireSe", "Dex_Echo_Fire"),
        corruptSe: paramText("corruptSe", "Dex_Echo_Corrupt"),
        completeSe: paramText("completeSe", "Dex_Echo_Complete"),
        seVolume: Math.max(0, Math.min(100, paramNumber("seVolume", 38))),

        defaultOnce: paramBool("defaultOnce", true),
        defaultSelfSwitch: paramText("defaultSelfSwitch", "A"),
        noEchoText: paramText("noEchoText", "No percibes ningún eco cercano.")
    };

    const PROFILE_VISUALS = {
        natural: {
            core: "#D9E0E2",
            glow: "#BFCBCD",
            ring: "#E5E9E8",
            particle: "#E5E9E8"
        },
        wind: {
            core: "#B3FFBE",
            glow: "#48D967",
            ring: "#C9FFD0",
            particle: "#D7FFDD"
        },
        ice: {
            core: "#B2CAFF",
            glow: "#4475D8",
            ring: "#D7E4FF",
            particle: "#D8E8FF"
        },
        fire: {
            core: "#FF8C71",
            glow: "#FF4B4B",
            ring: "#FFC1A3",
            particle: "#FFD39A"
        },
        corrupt: {
            core: "#D2A0FF",
            glow: "#8F39D1",
            ring: "#F09ADE",
            particle: "#D9A2FF"
        },
        hope: {
            core: "#FFE089",
            glow: "#D9A83D",
            ring: "#FFF0B0",
            particle: "#FFE9A0"
        }
    };

    const Manager = Dex.EchoSense;

    Manager._nearestEventId = 0;
    Manager._lastDetectedKey = "";
    Manager._lastMapId = 0;
    Manager._lastActivatedEventId = 0;

    const cleanFileName = function(value) {
        return String(value || "")
            .trim()
            .replace(/^.*[\\\/]/, "")
            .replace(/\.(ogg|m4a|wav)$/i, "");
    };

    const refreshBitmapTexture = function(bitmap) {
        if (!bitmap) return;
        if (bitmap.baseTexture && bitmap.baseTexture.update) {
            bitmap.baseTexture.update();
        } else if (bitmap._baseTexture && bitmap._baseTexture.update) {
            bitmap._baseTexture.update();
        }
    };

    const drawStarShape = function(context, cx, cy, outerRadius, innerRadius) {
        context.beginPath();

        for (let i = 0; i < 10; i++) {
            const angle = -Math.PI / 2 + i * Math.PI / 5;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            if (i === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }

        context.closePath();
    };

    const drawSenseParticleShape = function(bitmap, profile, color) {
        bitmap.clear();

        const ctx = bitmap.context;
        const w = bitmap.width;
        const h = bitmap.height;
        const cx = w / 2;
        const cy = h / 2;
        const s = Math.min(w, h);

        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1.1, s * 0.08);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        switch (profile) {
            case "wind":
                ctx.translate(cx, cy);
                ctx.rotate(-0.48);

                ctx.beginPath();
                ctx.moveTo(0, -s * 0.24);
                ctx.quadraticCurveTo(s * 0.20, -s * 0.05, s * 0.10, s * 0.22);
                ctx.quadraticCurveTo(-s * 0.16, s * 0.12, -s * 0.08, -s * 0.14);
                ctx.quadraticCurveTo(-s * 0.03, -s * 0.22, 0, -s * 0.24);
                ctx.closePath();
                ctx.fill();

                ctx.strokeStyle = "rgba(255,255,255,0.42)";
                ctx.lineWidth = Math.max(1, s * 0.05);
                ctx.beginPath();
                ctx.moveTo(0, -s * 0.17);
                ctx.lineTo(0.01, s * 0.12);
                ctx.stroke();
                break;

            case "ice":
                ctx.translate(cx, cy);
                for (let i = 0; i < 3; i++) {
                    const angle = i * Math.PI / 3;
                    ctx.save();
                    ctx.rotate(angle);
                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.28);
                    ctx.lineTo(0, s * 0.28);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.10);
                    ctx.lineTo(-s * 0.08, -s * 0.02);
                    ctx.moveTo(0, -s * 0.10);
                    ctx.lineTo(s * 0.08, -s * 0.02);
                    ctx.moveTo(0, s * 0.10);
                    ctx.lineTo(-s * 0.08, s * 0.02);
                    ctx.moveTo(0, s * 0.10);
                    ctx.lineTo(s * 0.08, s * 0.02);
                    ctx.stroke();
                    ctx.restore();
                }
                break;

            case "fire":
                ctx.translate(cx, cy + s * 0.04);
                ctx.beginPath();
                ctx.moveTo(0, -s * 0.26);
                ctx.bezierCurveTo(s * 0.18, -s * 0.12, s * 0.20, s * 0.04, 0, s * 0.25);
                ctx.bezierCurveTo(-s * 0.18, s * 0.05, -s * 0.16, -s * 0.13, 0, -s * 0.26);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "rgba(255,240,170,0.62)";
                ctx.beginPath();
                ctx.moveTo(0, -s * 0.12);
                ctx.bezierCurveTo(s * 0.08, -s * 0.05, s * 0.07, s * 0.03, 0, s * 0.12);
                ctx.bezierCurveTo(-s * 0.08, s * 0.03, -s * 0.06, -s * 0.04, 0, -s * 0.12);
                ctx.closePath();
                ctx.fill();
                break;

            case "corrupt":
                ctx.translate(cx, cy);
                ctx.rotate(0.38);
                ctx.beginPath();
                ctx.moveTo(-s * 0.08, -s * 0.24);
                ctx.lineTo(s * 0.18, -s * 0.10);
                ctx.lineTo(s * 0.08, s * 0.24);
                ctx.lineTo(-s * 0.20, s * 0.11);
                ctx.closePath();
                ctx.fill();
                break;

            case "hope":
                drawStarShape(ctx, cx, cy, s * 0.24, s * 0.11);
                ctx.fill();

                ctx.fillStyle = "rgba(255,249,210,0.72)";
                ctx.beginPath();
                ctx.arc(cx, cy, s * 0.06, 0, Math.PI * 2);
                ctx.fill();
                break;

            case "natural":
            default:
                ctx.translate(cx, cy);
                ctx.rotate(-0.34);
                ctx.beginPath();
                ctx.ellipse(0, 0, s * 0.18, s * 0.13, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "rgba(255,255,255,0.34)";
                ctx.beginPath();
                ctx.arc(s * 0.08, -s * 0.05, s * 0.05, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
        refreshBitmapTexture(bitmap);
    };

    const playSe = function(name, pitch) {
        name = cleanFileName(name);
        if (!name) return;

        AudioManager.playSe({
            name: name,
            volume: SETTINGS.seVolume,
            pitch: pitch || 100,
            pan: 0
        });
    };

    const normalizeHintMode = function(value, hasHint) {
        if (!hasHint) return "off";

        const mode = String(value || "before").trim().toLowerCase();

        if (["always", "siempre"].includes(mode)) return "always";
        if (["near", "cerca"].includes(mode)) return "near";
        if (["discovered", "descubierto", "after"].includes(mode)) return "discovered";
        if (["off", "none", "false", "no"].includes(mode)) return "off";

        return "before";
    };

    const wrapTextLines = function(bitmap, text, maxWidth) {
        const paragraphs = String(text || "").split("\n");
        const lines = [];

        for (let p = 0; p < paragraphs.length; p++) {
            const paragraph = paragraphs[p].trim();

            if (!paragraph) {
                lines.push("");
                continue;
            }

            const words = paragraph.split(/\s+/);
            let current = "";

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const candidate = current ? current + " " + word : word;

                if (bitmap.measureTextWidth(candidate) <= maxWidth) {
                    current = candidate;
                    continue;
                }

                if (current) {
                    lines.push(current);
                    current = "";
                }

                if (bitmap.measureTextWidth(word) <= maxWidth) {
                    current = word;
                    continue;
                }

                let fragment = "";

                for (let c = 0; c < word.length; c++) {
                    const next = fragment + word[c];

                    if (fragment && bitmap.measureTextWidth(next) > maxWidth) {
                        lines.push(fragment);
                        fragment = word[c];
                    } else {
                        fragment = next;
                    }
                }

                current = fragment;
            }

            if (current) {
                lines.push(current);
            }
        }

        return lines.length > 0 ? lines : [""];
    };

    const parseBool = function(value, fallback) {
        if (value === undefined || value === null || String(value).trim() === "") {
            return fallback;
        }

        const normalized = String(value).trim().toLowerCase();
        return normalized === "true" || normalized === "yes" ||
            normalized === "si" || normalized === "sí" || normalized === "1";
    };

    const tagValue = function(comments, name) {
        const regex = new RegExp("<" + name + "\\s*:\\s*([^>]+)>", "i");
        const match = comments.match(regex);
        return match ? String(match[1]).trim() : null;
    };

    const blockValue = function(comments, name) {
        const regex = new RegExp("<" + name + "\\s*>([\\s\\S]*?)<\\/" + name + "\\s*>", "i");
        const match = comments.match(regex);
        return match ? String(match[1]).trim() : null;
    };

    const commentsFromList = function(list) {
        if (!list) return "";

        const lines = [];

        for (let i = 0; i < list.length; i++) {
            const command = list[i];

            if (command && (command.code === 108 || command.code === 408)) {
                lines.push(String(command.parameters[0] || ""));
            }
        }

        return lines.join("\n");
    };

    const eventComments = function(event) {
        const list = event && event.list ? event.list() : null;
        return commentsFromList(list);
    };

    const normalizedOptionalText = function(value, fallback) {
        if (value === undefined || value === null) return fallback;

        const text = String(value).trim();

        if (/^(none|off|false|ninguno|ninguna|-)$/.test(text.toLowerCase())) {
            return "";
        }

        return text;
    };

    const normalizeAfterMode = function(value, once) {
        const mode = String(value || "").trim().toLowerCase();

        if (["hide", "hidden", "off", "none", "ocultar"].includes(mode)) {
            return "hide";
        }

        if (["change", "changed", "cambiar"].includes(mode)) {
            return "change";
        }

        if (["keep", "show", "same", "conservar", "mostrar"].includes(mode)) {
            return "keep";
        }

        return once ? "hide" : "keep";
    };

    Manager.storageKeyForData = function(data) {
        if (!data) return "";
        return String(data.mapId) + ":" + String(data.id);
    };

    Manager.eventOverrideKey = function(mapId, eventId) {
        return String(mapId) + ":" + String(eventId);
    };

    Manager.discoveredStore = function() {
        if (!$gameSystem._dexEchoSenseDiscovered) {
            $gameSystem._dexEchoSenseDiscovered = {};
        }

        return $gameSystem._dexEchoSenseDiscovered;
    };

    Manager.overrideStore = function() {
        if (!$gameSystem._dexEchoSenseIndicatorOverrides) {
            $gameSystem._dexEchoSenseIndicatorOverrides = {};
        }

        return $gameSystem._dexEchoSenseIndicatorOverrides;
    };

    Manager.isDiscoveredData = function(data) {
        const key = this.storageKeyForData(data);
        return !!(key && this.discoveredStore()[key]);
    };

    Manager.isDiscovered = function(event) {
        const data = event && event.dexEchoData ? event.dexEchoData() : null;
        return this.isDiscoveredData(data);
    };

    Manager.markDiscovered = function(data) {
        const key = this.storageKeyForData(data);

        if (key) {
            this.discoveredStore()[key] = true;
        }
    };

    Manager.parseEventComments = function(event, comments) {
        const hasEchoTag = /<Echo(?:\s[^>]*)?>/i.test(comments);
        const hasHintTag = /<EchoHint(?:\s*:|\s*>)/i.test(comments);

        if (!event || (!hasEchoTag && !hasHintTag)) return null;

        const profileRaw = String(tagValue(comments, "EchoProfile") || "natural").toLowerCase();
        const profile = PROFILE_VISUALS[profileRaw] ? profileRaw : "natural";

        const radiusRaw = Number(tagValue(comments, "EchoRadius"));
        const radius = Number.isFinite(radiusRaw) && radiusRaw > 0
            ? radiusRaw
            : SETTINGS.defaultRadius;

        const once = parseBool(tagValue(comments, "EchoOnce"), SETTINGS.defaultOnce);
        const selfSwitch = String(
            tagValue(comments, "EchoSelfSwitch") || SETTINGS.defaultSelfSwitch
        ).trim().toUpperCase();

        const text = blockValue(comments, "EchoText") ||
            tagValue(comments, "EchoText") || "";

        const hintText = blockValue(comments, "EchoHint") ||
            tagValue(comments, "EchoHint") || "";

        const hintMode = normalizeHintMode(
            tagValue(comments, "EchoHintMode"),
            !!String(hintText).trim()
        );

        const hintProfileRaw = String(
            tagValue(comments, "EchoHintProfile") || profile
        ).toLowerCase();

        const hintProfile = PROFILE_VISUALS[hintProfileRaw]
            ? hintProfileRaw
            : profile;

        const hintDurationRaw = Number(tagValue(comments, "EchoHintDuration"));
        const hintDuration = Number.isFinite(hintDurationRaw) && hintDurationRaw >= 0
            ? hintDurationRaw
            : SETTINGS.hintDefaultDuration;

        const hintOffsetRaw = Number(tagValue(comments, "EchoHintOffsetY"));
        const hintOffsetY = Number.isFinite(hintOffsetRaw)
            ? hintOffsetRaw
            : SETTINGS.hintDefaultOffsetY;

        const hintMotionRaw = Number(tagValue(comments, "EchoHintMotion"));
        const hintMotion = Number.isFinite(hintMotionRaw) && hintMotionRaw >= 0
            ? hintMotionRaw
            : SETTINGS.hintDefaultMotion;

        const hintSpeedRaw = Number(tagValue(comments, "EchoHintSpeed"));
        const hintSpeed = Number.isFinite(hintSpeedRaw) && hintSpeedRaw >= 0
            ? hintSpeedRaw
            : SETTINGS.hintDefaultSpeed;

        const hintShakeRaw = Number(tagValue(comments, "EchoHintShake"));
        const hintShake = Number.isFinite(hintShakeRaw) && hintShakeRaw >= 0
            ? hintShakeRaw
            : SETTINGS.hintDefaultShake;

        const commonEventRaw = Number(tagValue(comments, "EchoCommonEvent"));
        const commonEventId = Number.isFinite(commonEventRaw) && commonEventRaw > 0
            ? commonEventRaw
            : 0;

        const markerOffsetRaw = Number(tagValue(comments, "EchoMarkerOffsetY"));
        const markerOffsetY = Number.isFinite(markerOffsetRaw) ? markerOffsetRaw : 0;

        const afterMode = normalizeAfterMode(
            tagValue(comments, "EchoAfterIndicator"),
            once
        );

        const afterProfileRaw = String(
            tagValue(comments, "EchoAfterProfile") || profile
        ).toLowerCase();

        const afterProfile = PROFILE_VISUALS[afterProfileRaw]
            ? afterProfileRaw
            : profile;

        const afterOpacityRaw = Number(tagValue(comments, "EchoAfterOpacity"));
        const afterOpacity = Number.isFinite(afterOpacityRaw)
            ? Math.max(0, Math.min(255, afterOpacityRaw))
            : 150;

        const afterScaleRaw = Number(tagValue(comments, "EchoAfterScale"));
        const afterScale = Number.isFinite(afterScaleRaw) && afterScaleRaw > 0
            ? afterScaleRaw
            : 0.85;

        const optionalNonNegativeTag = function(name) {
            const rawValue = tagValue(comments, name);

            if (rawValue === undefined || rawValue === null || String(rawValue).trim() === "") {
                return null;
            }

            const number = Number(rawValue);
            return Number.isFinite(number) ? Math.max(0, number) : null;
        };

        const whisperMotionScale = optionalNonNegativeTag("EchoWhisperMotion");
        const whisperSpeedScale = optionalNonNegativeTag("EchoWhisperSpeed");
        const whisperShakeScale = optionalNonNegativeTag("EchoWhisperShake");

        return {
            id: tagValue(comments, "EchoId") ||
                ("map" + $gameMap.mapId() + "_event" + event.eventId()),
            mapId: $gameMap.mapId(),
            eventId: event.eventId(),
            profile: profile,
            radius: radius,
            once: once,
            selfSwitch: ["A", "B", "C", "D"].includes(selfSwitch) ? selfSwitch : "A",
            label: normalizedOptionalText(
                tagValue(comments, "EchoLabel"),
                SETTINGS.nearbyLabel
            ),
            prompt: normalizedOptionalText(
                tagValue(comments, "EchoPrompt"),
                SETTINGS.nearbyPrompt
            ),
            text: String(text).replace(/\\n/gi, "\n"),
            hintText: String(hintText).replace(/\\n/gi, "\n"),
            hintMode: hintMode,
            hintProfile: hintProfile,
            hintDuration: hintDuration,
            hintOffsetY: hintOffsetY,
            hintMotion: hintMotion,
            hintSpeed: hintSpeed,
            hintShake: hintShake,
            commonEventId: commonEventId,
            markerOffsetY: markerOffsetY,
            afterMode: afterMode,
            afterProfile: afterProfile,
            afterLabel: normalizedOptionalText(
                tagValue(comments, "EchoAfterLabel"),
                "Eco escuchado"
            ),
            afterPrompt: normalizedOptionalText(
                tagValue(comments, "EchoAfterPrompt"),
                ""
            ),
            afterOpacity: afterOpacity,
            afterScale: afterScale,
            whisperMotionScale: whisperMotionScale,
            whisperSpeedScale: whisperSpeedScale,
            whisperShakeScale: whisperShakeScale,
            afterOnly: false
        };
    };

    Manager.parseEvent = function(event) {
        return this.parseEventComments(event, eventComments(event));
    };

    Manager.findEchoDataInAnyPage = function(event) {
        if (!event || !event.event) return null;

        const eventData = event.event();
        const pages = eventData && eventData.pages ? eventData.pages : [];

        for (let i = 0; i < pages.length; i++) {
            const data = this.parseEventComments(
                event,
                commentsFromList(pages[i].list)
            );

            if (data) {
                return data;
            }
        }

        return null;
    };

    Manager.refreshAll = function() {
        if (!$gameMap || !$gameMap.events) return;

        const events = $gameMap.events();

        for (let i = 0; i < events.length; i++) {
            if (events[i] && events[i].setupDexEchoData) {
                events[i].setupDexEchoData();
            }
        }
    };

    Manager.distanceToEvent = function(event) {
        if (!$gamePlayer || !event) return Infinity;

        const dx = Math.abs($gameMap.deltaX(event.x, $gamePlayer.x));
        const dy = Math.abs($gameMap.deltaY(event.y, $gamePlayer.y));
        return dx + dy;
    };

    Manager.isCompleted = function(event) {
        const data = event && event.dexEchoData ? event.dexEchoData() : null;
        if (!data || !data.once) return false;

        return $gameSelfSwitches.value([
            $gameMap.mapId(),
            event.eventId(),
            data.selfSwitch
        ]);
    };

    Manager.isAvailable = function(event) {
        return !!(
            event &&
            event.dexEchoData &&
            event.dexEchoData() &&
            !this.isCompleted(event)
        );
    };

    Manager.isNearEvent = function(event) {
        const data = event && event.dexEchoData ? event.dexEchoData() : null;
        if (!data) return false;

        return this.distanceToEvent(event) <= data.radius;
    };

    Manager.isInRange = function(event) {
        return this.isAvailable(event) && this.isNearEvent(event);
    };

    Manager.findNearestEcho = function() {
        if (!$gameMap || !$gameMap.events) return null;

        let nearest = null;
        let nearestDistance = Infinity;
        const events = $gameMap.events();

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            if (!this.isInRange(event)) continue;

            const distance = this.distanceToEvent(event);

            if (distance < nearestDistance) {
                nearest = event;
                nearestDistance = distance;
            }
        }

        return nearest;
    };

    Manager.isNearestDetected = function(event) {
        return !!(event && event.eventId() === this._nearestEventId);
    };

    Manager.updateProximity = function() {
        if (!$gameMap || !$gamePlayer) return;

        const mapId = $gameMap.mapId();

        if (this._lastMapId !== mapId) {
            this._lastMapId = mapId;
            this._lastDetectedKey = "";
            this._nearestEventId = 0;
        }

        const nearest = this.findNearestEcho();
        this._nearestEventId = nearest ? nearest.eventId() : 0;

        const key = nearest ? (mapId + ":" + nearest.eventId()) : "";

        if (key && key !== this._lastDetectedKey) {
            playSe(SETTINGS.detectSe, 112);
        }

        this._lastDetectedKey = key;
    };

    Manager.profileVisual = function(profile) {
        return PROFILE_VISUALS[profile] || PROFILE_VISUALS.natural;
    };

    Manager.profileSe = function(profile) {
        switch (profile) {
            case "wind": return SETTINGS.windSe;
            case "ice": return SETTINGS.iceSe;
            case "fire": return SETTINGS.fireSe;
            case "corrupt": return SETTINGS.corruptSe;
            case "hope": return SETTINGS.completeSe || SETTINGS.naturalSe;
            case "natural":
            default: return SETTINGS.naturalSe;
        }
    };

    Manager.getIndicatorOverride = function(event) {
        if (!event) return null;

        return this.overrideStore()[
            this.eventOverrideKey($gameMap.mapId(), event.eventId())
        ] || null;
    };

    Manager.setIndicatorOverride = function(event, override) {
        if (!event) return;

        const key = this.eventOverrideKey($gameMap.mapId(), event.eventId());
        this.overrideStore()[key] = Object.assign(
            {},
            this.overrideStore()[key] || {},
            override || {}
        );
    };

    Manager.resetIndicatorOverride = function(event) {
        if (!event) return;

        const key = this.eventOverrideKey($gameMap.mapId(), event.eventId());
        delete this.overrideStore()[key];
    };

    Manager.indicatorPresentation = function(event) {
        const data = event && event.dexEchoData ? event.dexEchoData() : null;

        if (!data) {
            return {
                visible: false,
                profile: "natural",
                label: "",
                prompt: "",
                opacity: 255,
                scale: 1
            };
        }

        const discovered = this.isDiscoveredData(data);
        const presentation = {
            visible: true,
            profile: data.profile,
            label: data.label,
            prompt: data.prompt,
            opacity: 255,
            scale: 1
        };

        if (discovered) {
            if (data.afterMode === "hide") {
                presentation.visible = false;
            } else if (data.afterMode === "change") {
                presentation.profile = data.afterProfile;
                presentation.label = data.afterLabel;
                presentation.prompt = data.afterPrompt;
                presentation.opacity = data.afterOpacity;
                presentation.scale = data.afterScale;
            }
        }

        const override = this.getIndicatorOverride(event);

        if (override) {
            if (override.visibility === "show") {
                presentation.visible = true;
            } else if (override.visibility === "hide") {
                presentation.visible = false;
            }

            if (override.profile && PROFILE_VISUALS[override.profile]) {
                presentation.profile = override.profile;
            }

            if (Object.prototype.hasOwnProperty.call(override, "label")) {
                presentation.label = override.label;
            }

            if (Object.prototype.hasOwnProperty.call(override, "prompt")) {
                presentation.prompt = override.prompt;
            }

            if (Number.isFinite(override.opacity)) {
                presentation.opacity = Math.max(0, Math.min(255, override.opacity));
            }

            if (Number.isFinite(override.scale) && override.scale > 0) {
                presentation.scale = override.scale;
            }
        }

        return presentation;
    };

    Manager.resolveCommandEvent = function(interpreter, requestedEventId) {
        let eventId = Number(requestedEventId || 0);

        if (eventId <= 0 && interpreter && interpreter.eventId) {
            eventId = Number(interpreter.eventId() || 0);
        }

        if (eventId <= 0) {
            eventId = Number(this._lastActivatedEventId || 0);
        }

        return eventId > 0 && $gameMap ? $gameMap.event(eventId) : null;
    };

    Manager.showNoEcho = function(text, useWhisper, interpreter) {
        const message = String(text || SETTINGS.noEchoText);

        if (useWhisper && Dex.EchoWhisper && Dex.EchoWhisper.show) {
            const id = Dex.EchoWhisper.show(message, {
                profile: "natural",
                blockPlayer: true,
                allowSkip: true
            });

            if (interpreter && id) {
                interpreter._dexEchoWhisperWaitId = id;
                interpreter.setWaitMode("dexEchoWhisper");
            }
        } else {
            $gameMessage.add(message);

            if (interpreter) {
                interpreter.setWaitMode("message");
            }
        }
    };

    Manager.activateEvent = function(event, interpreter, waitForFinish) {
        if (!this.isAvailable(event)) return false;

        const data = event.dexEchoData();
        const marker = event._dexEchoMarker;

        if (marker && marker.playActivation) {
            marker.playActivation();
        }

        playSe(this.profileSe(data.profile), data.profile === "ice" ? 112 : 100);

        let whisperId = 0;

        if (data.text) {
            if (Dex.EchoWhisper && Dex.EchoWhisper.show) {
                whisperId = Dex.EchoWhisper.show(data.text, {
                    profile: data.profile,
                    blockPlayer: true,
                    allowSkip: false,
                    motionScale: data.whisperMotionScale,
                    speedScale: data.whisperSpeedScale,
                    shakeScale: data.whisperShakeScale
                });
            } else {
                $gameMessage.add(data.text);
            }
        }

        this._lastActivatedEventId = event.eventId();
        this.markDiscovered(data);

        if (data.once) {
            $gameSelfSwitches.setValue([
                $gameMap.mapId(),
                event.eventId(),
                data.selfSwitch
            ], true);
        }

        if (data.commonEventId > 0) {
            $gameTemp.reserveCommonEvent(data.commonEventId);
        }

        if (SETTINGS.completeSe) {
            setTimeout(() => {
                try {
                    playSe(SETTINGS.completeSe, 105);
                } catch (error) {
                    console.warn(error);
                }
            }, 450);
        }

        if (waitForFinish && interpreter) {
            if (whisperId) {
                interpreter._dexEchoWhisperWaitId = whisperId;
                interpreter.setWaitMode("dexEchoWhisper");
            } else if (data.text) {
                interpreter.setWaitMode("message");
            }
        }

        return true;
    };

    //-------------------------------------------------------------------------
    // Game_Event
    //-------------------------------------------------------------------------

    const _Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        _Game_Event_refresh.call(this);
        this.setupDexEchoData();
    };

    Game_Event.prototype.dexEchoHasGraphic = function() {
        return this.tileId() > 0 || !!this.characterName();
    };

    Game_Event.prototype.setupDexEchoData = function() {
        let data = Manager.parseEvent(this);

        if (!data) {
            const fallback = Manager.findEchoDataInAnyPage(this);

            if (
                fallback &&
                Manager.isDiscoveredData(fallback) &&
                fallback.afterMode !== "hide"
            ) {
                fallback.afterOnly = true;
                data = fallback;
            }
        }

        this._dexEchoData = data;

        if (data && !this.dexEchoHasGraphic()) {
            this.setThrough(true);
        }
    };

    Game_Event.prototype.dexEchoData = function() {
        return this._dexEchoData || null;
    };

    //-------------------------------------------------------------------------
    // Marker sprite
    //-------------------------------------------------------------------------

    function Sprite_DexEchoMarker() {
        this.initialize(...arguments);
    }

    Sprite_DexEchoMarker.prototype = Object.create(Sprite.prototype);
    Sprite_DexEchoMarker.prototype.constructor = Sprite_DexEchoMarker;

    Sprite_DexEchoMarker.prototype.initialize = function(event, characterSprite) {
        Sprite.prototype.initialize.call(this);

        this._event = event;
        this._characterSprite = characterSprite || null;
        this._profile = "";
        this._frame = 0;
        this._activationFrames = 0;
        this._labelOpacity = 0;
        this._hintOpacity = 0;
        this._hintTimer = 0;
        this._hintConditionWasActive = false;
        this._hintDisplaySignature = "";
        this._particles = [];

        this.createVisuals();

        if (event) {
            // El marcador es un objeto gráfico de PIXI y no debe formar parte
            // de los datos de guardado de Game_Event. Al hacerlo no enumerable,
            // JsonEx lo ignora y el sistema de guardado funciona normalmente.
            Object.defineProperty(event, "_dexEchoMarker", {
                value: this,
                writable: true,
                configurable: true,
                enumerable: false
            });
        }
    };

    Sprite_DexEchoMarker.prototype.createVisuals = function() {
        const size = SETTINGS.orbSize;

        this._ring = new Sprite(new Bitmap(size * 3, size * 3));
        this._ring.anchor.set(0.5);
        this.addChild(this._ring);

        this._core = new Sprite(new Bitmap(size * 2, size * 2));
        this._core.anchor.set(0.5);
        this.addChild(this._core);

        this._particleLayer = new Sprite();
        this.addChild(this._particleLayer);

        for (let i = 0; i < 7; i++) {
            const particle = new Sprite(new Bitmap(18, 18));
            particle.anchor.set(0.5);
            particle._phase = Math.random() * Math.PI * 2;
            particle._radius = 15 + Math.random() * 18;
            particle._speed = 0.018 + Math.random() * 0.026;
            particle._baseY = -8 + Math.random() * 22;
            particle._spin = -0.05 + Math.random() * 0.10;
            particle._baseScale = 0.8 + Math.random() * 0.5;
            this._particleLayer.addChild(particle);
            this._particles.push(particle);
        }

        this._label = new Sprite(new Bitmap(360, 86));
        this._label.anchor.set(0.5, 1);
        this._label.y = -38;
        this._label.opacity = 0;
        this.addChild(this._label);

        const hintWidth = SETTINGS.hintMaxWidth + 40;
        const hintHeight = Math.max(48, SETTINGS.hintFontSize * 2);

        this._hintContainer = new Sprite();
        this._hintContainer.opacity = 0;
        this._hintContainer.visible = true;
        this.addChild(this._hintContainer);

        this._hintGhost = new Sprite(new Bitmap(hintWidth, hintHeight));
        this._hintGhost.anchor.set(0.5);
        this._hintGhost.x = 2;
        this._hintGhost.y = 3;

        if (PIXI.filters && PIXI.filters.BlurFilter) {
            this._hintGhost.filters = [new PIXI.filters.BlurFilter(2)];
        }

        this._hintContainer.addChild(this._hintGhost);

        this._hintMain = new Sprite(new Bitmap(hintWidth, hintHeight));
        this._hintMain.anchor.set(0.5);
        this._hintContainer.addChild(this._hintMain);
    };

    Sprite_DexEchoMarker.prototype.redrawProfile = function(profile) {
        this._profile = profile;

        const visual = Manager.profileVisual(profile);
        const size = SETTINGS.orbSize;

        this._core.bitmap.clear();
        this._core.bitmap.drawCircle(size, size, size * 0.50, visual.glow);
        this._core.bitmap.drawCircle(size, size, size * 0.31, visual.core);
        this._core.bitmap.drawCircle(size, size, size * 0.12, "#FFFFFF");

        const ringBitmap = this._ring.bitmap;
        ringBitmap.clear();

        const context = ringBitmap.context;
        const center = ringBitmap.width / 2;
        context.save();
        context.strokeStyle = visual.ring;
        context.globalAlpha = 0.72;
        context.lineWidth = 2.5;
        context.beginPath();
        context.arc(center, center, size * 0.76, 0, Math.PI * 2);
        context.stroke();
        context.restore();
        refreshBitmapTexture(ringBitmap);

        for (let i = 0; i < this._particles.length; i++) {
            drawSenseParticleShape(this._particles[i].bitmap, profile, visual.particle);
        }
    };

    Sprite_DexEchoMarker.prototype.redrawLabel = function(presentation) {
        const bitmap = this._label.bitmap;
        bitmap.clear();

        bitmap.fontFace = $gameSystem && $gameSystem.mainFontFace
            ? $gameSystem.mainFontFace()
            : "sans-serif";
        bitmap.outlineColor = "rgba(0,0,0,0.85)";
        bitmap.outlineWidth = 5;

        if (presentation.label) {
            bitmap.fontSize = 24;
            bitmap.textColor = "#F3FCFF";
            bitmap.drawText(presentation.label, 0, 4, bitmap.width, 34, "center");
        }

        if (SETTINGS.showPrompt && presentation.prompt) {
            bitmap.fontSize = 18;
            bitmap.textColor = "#BFEFFF";
            bitmap.drawText(presentation.prompt, 0, 37, bitmap.width, 28, "center");
        }
    };

    Sprite_DexEchoMarker.prototype.redrawHint = function(data) {
        const text = String(data.hintText || "");
        const visual = Manager.profileVisual(data.hintProfile || data.profile);
        const fontFace = $gameSystem && $gameSystem.mainFontFace
            ? $gameSystem.mainFontFace()
            : "sans-serif";
        const fontSize = SETTINGS.hintFontSize;
        const lineHeight = Math.ceil(fontSize * 1.35);
        const maxWidth = SETTINGS.hintMaxWidth;
        const bitmapWidth = maxWidth + 40;

        const measureBitmap = new Bitmap(bitmapWidth, lineHeight + 20);
        measureBitmap.fontFace = fontFace;
        measureBitmap.fontSize = fontSize;
        measureBitmap.fontBold = false;
        measureBitmap.fontItalic = true;

        const lines = wrapTextLines(measureBitmap, text, maxWidth);
        const bitmapHeight = Math.max(
            lineHeight + 20,
            lines.length * lineHeight + 20
        );

        const mainBitmap = new Bitmap(bitmapWidth, bitmapHeight);
        const ghostBitmap = new Bitmap(bitmapWidth, bitmapHeight);

        this._hintMain.bitmap = mainBitmap;
        this._hintGhost.bitmap = ghostBitmap;
        this._hintMain.anchor.set(0.5);
        this._hintGhost.anchor.set(0.5);

        mainBitmap.fontFace = fontFace;
        mainBitmap.fontSize = fontSize;
        mainBitmap.fontBold = false;
        mainBitmap.fontItalic = true;
        mainBitmap.textColor = visual.core;
        mainBitmap.outlineColor = "rgba(18,22,28,0.92)";
        mainBitmap.outlineWidth = 4;

        ghostBitmap.fontFace = fontFace;
        ghostBitmap.fontSize = fontSize;
        ghostBitmap.fontBold = false;
        ghostBitmap.fontItalic = true;
        ghostBitmap.textColor = visual.glow;
        ghostBitmap.outlineColor = visual.glow;
        ghostBitmap.outlineWidth = 3;

        for (let i = 0; i < lines.length; i++) {
            const y = 10 + i * lineHeight;

            mainBitmap.drawText(
                lines[i],
                10,
                y,
                bitmapWidth - 20,
                lineHeight,
                "center"
            );

            ghostBitmap.drawText(
                lines[i],
                10,
                y,
                bitmapWidth - 20,
                lineHeight,
                "center"
            );
        }

        refreshBitmapTexture(mainBitmap);
        refreshBitmapTexture(ghostBitmap);
        this._hintGhost.opacity = 100;
    };

    Sprite_DexEchoMarker.prototype.hintCondition = function(
        data,
        available,
        nearby,
        discovered
    ) {
        if (!data.hintText || data.hintMode === "off") {
            return false;
        }

        if (data.hintMode === "always") {
            return true;
        }

        if (data.hintMode === "discovered") {
            return nearby && discovered;
        }

        if (data.hintMode === "near") {
            return nearby;
        }

        return nearby && available;
    };

    Sprite_DexEchoMarker.prototype.updateHintState = function(
        data,
        condition
    ) {
        if (condition && !this._hintConditionWasActive) {
            this._hintTimer = Math.max(0, Number(data.hintDuration || 0));
        }

        if (!condition) {
            this._hintTimer = 0;
        }

        let active = false;

        if (condition) {
            if (data.hintMode === "always" || data.hintDuration === 0) {
                active = true;
            } else if (this._hintTimer > 0) {
                active = true;
                this._hintTimer--;
            }
        }

        this._hintConditionWasActive = condition;
        return active;
    };

    Sprite_DexEchoMarker.prototype.playActivation = function() {
        this._activationFrames = 45;
    };

    Sprite_DexEchoMarker.prototype.anchorHeight = function() {
        const event = this._event;
        const tileHeight = $gameMap && $gameMap.tileHeight
            ? $gameMap.tileHeight()
            : 48;

        if (!event || !event.dexEchoHasGraphic || !event.dexEchoHasGraphic()) {
            return tileHeight / 2;
        }

        const characterSprite = this._characterSprite;

        if (characterSprite) {
            try {
                if (
                    characterSprite.bitmap &&
                    characterSprite.bitmap.height > 0 &&
                    characterSprite.patternHeight
                ) {
                    return Math.max(1, characterSprite.patternHeight());
                }

                if (characterSprite.height && characterSprite.height > 0) {
                    return characterSprite.height;
                }
            } catch (error) {
                return tileHeight;
            }
        }

        return tileHeight;
    };

    Sprite_DexEchoMarker.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this._frame++;

        const event = this._event;
        const data = event && event.dexEchoData ? event.dexEchoData() : null;

        if (!event || event._erased || !data) {
            this.visible = false;
            return;
        }

        const presentation = Manager.indicatorPresentation(event);
        const signature = [
            presentation.profile,
            presentation.label,
            presentation.prompt
        ].join("|");

        if (signature !== this._displaySignature) {
            this._displaySignature = signature;
            this.redrawProfile(presentation.profile);
            this.redrawLabel(presentation);
        }

        const hintSignature = [
            data.hintText,
            data.hintProfile,
            data.hintMode
        ].join("|");

        if (hintSignature !== this._hintDisplaySignature) {
            this._hintDisplaySignature = hintSignature;
            this.redrawHint(data);
            this._hintTimer = 0;
            this._hintConditionWasActive = false;
        }

        const available = Manager.isAvailable(event);
        const nearby = Manager.isNearEvent(event);
        const nearest = available && Manager.isNearestDetected(event);
        const discovered = Manager.isDiscovered(event);
        const activationVisible = this._activationFrames > 0;

        const rangeVisible = SETTINGS.markerVisibility === "nearby"
            ? nearby
            : true;

        const indicatorVisible = !!(
            (presentation.visible && rangeVisible) ||
            activationVisible
        );

        const hintCondition = this.hintCondition(
            data,
            available,
            nearby,
            discovered
        );
        const hintActive = this.updateHintState(data, hintCondition);

        this.visible = !!(
            indicatorVisible ||
            hintActive ||
            this._hintOpacity > 1
        );

        if (!this.visible) return;

        this._ring.visible = indicatorVisible;
        this._core.visible = indicatorVisible;
        this._particleLayer.visible = indicatorVisible;
        this._label.visible = indicatorVisible;

        const extraOffset = Number(data.markerOffsetY || 0);
        this.x = event.screenX();
        this.y = event.screenY() - this.anchorHeight() +
            SETTINGS.markerOffsetY + extraOffset;
        this.z = Math.max(7, event.screenZ ? event.screenZ() + 2 : 7);

        const rootScale = Number.isFinite(presentation.scale)
            ? presentation.scale
            : 1;
        this.scale.set(rootScale);

        const opacityMultiplier = Math.max(
            0,
            Math.min(1, presentation.opacity / 255)
        );

        const pulse = 1 + Math.sin(this._frame * 0.065) * 0.08;
        const nearBoost = nearest ? 1.12 : 1;
        this._core.scale.set(pulse * nearBoost);

        const ringCycle = (this._frame % 110) / 110;
        this._ring.scale.set(0.72 + ringCycle * 0.86);
        this._ring.opacity = Math.floor(
            (1 - ringCycle) *
            (nearest ? 210 : 110) *
            opacityMultiplier
        );

        const baseOpacity = nearest ? 255 : (nearby ? 205 : 105);
        this._core.opacity = Math.floor(
            (activationVisible ? 255 : baseOpacity) *
            opacityMultiplier
        );

        for (let i = 0; i < this._particles.length; i++) {
            const particle = this._particles[i];
            const angle = this._frame * particle._speed + particle._phase;
            let x = Math.cos(angle) * particle._radius;
            let y = particle._baseY + Math.sin(angle * 1.7) * 9 -
                ((this._frame + i * 13) % 80) * 0.16;
            let opacityRate = 0.62 + Math.sin(angle * 2.1) * 0.28;
            let scaleRate = 1;
            let rotationStep = particle._spin;
            const profileName = presentation.profile || "natural";

            if (profileName === "wind") {
                x += Math.sin(angle * 2.6) * 6;
                rotationStep = 0.03;
            } else if (profileName === "ice") {
                y += Math.sin(angle * 0.8) * 2;
                rotationStep = 0.01;
                scaleRate = 0.95 + Math.sin(angle * 1.4) * 0.05;
            } else if (profileName === "fire") {
                y -= ((this._frame + i * 9) % 50) * 0.08;
                scaleRate = 0.9 + Math.sin(angle * 4.4) * 0.15;
                opacityRate = 0.70 + Math.sin(angle * 5.2) * 0.22;
            } else if (profileName === "corrupt") {
                x += Math.sin(angle * 5.7) * 3.5;
                y += Math.cos(angle * 4.3) * 1.8;
                rotationStep = -0.05;
            } else if (profileName === "hope") {
                rotationStep = 0.015;
                scaleRate = 0.95 + Math.sin(angle * 1.6) * 0.12;
                opacityRate = 0.70 + Math.sin(angle * 3.0) * 0.18;
            }

            particle.x = x;
            particle.y = y;
            particle.opacity = Math.floor(
                (nearest ? 210 : 95) *
                opacityRate *
                opacityMultiplier
            );
            particle.scale.set(particle._baseScale * scaleRate);
            particle.rotation += rotationStep;
        }

        const showLabel = presentation.visible && nearby && (
            available ? nearest : discovered
        );

        const targetLabelOpacity = showLabel ? presentation.opacity : 0;
        this._labelOpacity += (
            targetLabelOpacity - this._labelOpacity
        ) * 0.14;
        this._label.opacity = Math.floor(this._labelOpacity);
        this._label.y = -42 + Math.sin(this._frame * 0.05) * 3;

        const hintTargetOpacity = hintActive ? 255 : 0;
        const hintFadeStep = 255 / Math.max(1, SETTINGS.hintFadeFrames);

        if (this._hintOpacity < hintTargetOpacity) {
            this._hintOpacity = Math.min(
                hintTargetOpacity,
                this._hintOpacity + hintFadeStep
            );
        } else if (this._hintOpacity > hintTargetOpacity) {
            this._hintOpacity = Math.max(
                hintTargetOpacity,
                this._hintOpacity - hintFadeStep
            );
        }

        const hintPhase = this._frame * data.hintSpeed;
        const hintWave = Math.sin(hintPhase) * data.hintMotion;
        const hintJitter = data.hintShake > 0
            ? Math.sin(this._frame * 0.41 + event.eventId()) * data.hintShake
            : 0;

        this._hintContainer.visible = this._hintOpacity > 0 || hintActive;
        this._hintContainer.x = hintJitter;
        this._hintContainer.y = data.hintOffsetY + hintWave;
        this._hintContainer.opacity = Math.floor(this._hintOpacity);

        const hintBreath = 1 + Math.sin(
            this._frame * Math.max(0.015, data.hintSpeed * 0.55)
        ) * 0.018;
        this._hintContainer.scale.set(hintBreath);

        if (this._activationFrames > 0) {
            const progress = 1 - this._activationFrames / 45;
            this._ring.scale.set(0.45 + progress * 2.8);
            this._ring.opacity = Math.floor(
                (1 - progress) * 255 * opacityMultiplier
            );
            this._core.scale.set(1.3 - progress * 0.55);
            this._activationFrames--;
        }
    };

    //-------------------------------------------------------------------------
    // Spriteset_Map integration
    //-------------------------------------------------------------------------

    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        _Spriteset_Map_createCharacters.call(this);
        this.createDexEchoMarkers();
    };

    Spriteset_Map.prototype.createDexEchoMarkers = function() {
        this._dexEchoMarkers = [];

        const events = $gameMap && $gameMap.events
            ? $gameMap.events()
            : [];

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const characterSprite = this._characterSprites
                ? this._characterSprites.find(
                    sprite => sprite._character === event
                )
                : null;

            const marker = new Sprite_DexEchoMarker(event, characterSprite);
            this._dexEchoMarkers.push(marker);
            this._tilemap.addChild(marker);
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Map proximity update
    //-------------------------------------------------------------------------

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        Manager.updateProximity();
    };

    //-------------------------------------------------------------------------
    // Plugin commands
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "ActivateNearestEcho", function(args) {
        const waitForFinish = String(args.waitForFinish || "true") === "true";
        const noEchoUseWhisper = String(args.noEchoUseWhisper || "false") === "true";
        const customNoEchoText = String(args.noEchoText || "").trim();
        const nearest = Manager.findNearestEcho();

        if (nearest) {
            Manager.activateEvent(nearest, this, waitForFinish);
        } else {
            Manager.showNoEcho(
                customNoEchoText || SETTINGS.noEchoText,
                noEchoUseWhisper,
                this
            );
        }
    });

    PluginManager.registerCommand(pluginName, "SetEchoIndicator", function(args) {
        const event = Manager.resolveCommandEvent(
            this,
            Number(args.eventId || 0)
        );

        if (!event) {
            console.warn(
                pluginName +
                ": no se encontró el evento para cambiar su indicador."
            );
            return;
        }

        const override = {};
        const visibility = String(args.visibility || "default");
        const profile = String(args.profile || "unchanged");
        const label = String(args.label || "").trim();
        const prompt = String(args.prompt || "").trim();
        const opacity = Number(args.opacity || 0);
        const scale = Number(args.scale || 0);

        if (visibility === "show" || visibility === "hide") {
            override.visibility = visibility;
        }

        if (PROFILE_VISUALS[profile]) {
            override.profile = profile;
        }

        if (label) {
            override.label = normalizedOptionalText(label, "");
        }

        if (prompt) {
            override.prompt = normalizedOptionalText(prompt, "");
        }

        if (Number.isFinite(opacity) && opacity > 0) {
            override.opacity = Math.max(0, Math.min(255, opacity));
        }

        if (Number.isFinite(scale) && scale > 0) {
            override.scale = scale;
        }

        Manager.setIndicatorOverride(event, override);
    });

    PluginManager.registerCommand(pluginName, "ResetEchoIndicator", function(args) {
        const event = Manager.resolveCommandEvent(
            this,
            Number(args.eventId || 0)
        );

        if (!event) {
            console.warn(
                pluginName +
                ": no se encontró el evento para restablecer su indicador."
            );
            return;
        }

        Manager.resetIndicatorOverride(event);
    });

    PluginManager.registerCommand(pluginName, "RefreshEchoes", function() {
        Manager.refreshAll();
    });

})();
