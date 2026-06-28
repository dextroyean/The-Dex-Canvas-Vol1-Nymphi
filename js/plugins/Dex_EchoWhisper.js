//=============================================================================
// Dex_EchoWhisper.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.4] Ecos susurrantes animados, letra por letra, para escenas y recuerdos.
 * @author Dextroyean y Jaime
 *
 * @param --- General ---
 * @default
 *
 * @param defaultProfile
 * @parent --- General ---
 * @text Perfil Predeterminado
 * @type select
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
 * @option Personalizado
 * @value custom
 * @default wind
 *
 * @param defaultFontFace
 * @parent --- General ---
 * @text Fuente
 * @type string
 * @desc Déjalo vacío para usar la fuente principal del juego.
 * @default
 *
 * @param defaultFontSize
 * @parent --- General ---
 * @text Tamaño de Fuente
 * @type number
 * @min 12
 * @max 120
 * @default 48
 *
 * @param defaultCenterY
 * @parent --- General ---
 * @text Posición Vertical
 * @type text
 * @desc Posición vertical como porcentaje. 0.50 = centro exacto; 0.42 = más arriba.
 * @default 0.47
 *
 * @param defaultMaxWidth
 * @parent --- General ---
 * @text Ancho Máximo
 * @type text
 * @desc Ancho máximo como porcentaje. 0.82 = 82% de la pantalla.
 * @default 0.82
 *
 * @param defaultRevealFrames
 * @parent --- General ---
 * @text Frames Aparición
 * @type number
 * @min 1
 * @default 42
 *
 * @param defaultHoldFrames
 * @parent --- General ---
 * @text Frames Permanencia
 * @type number
 * @min 1
 * @default 150
 *
 * @param defaultFadeFrames
 * @parent --- General ---
 * @text Frames Desaparición
 * @type number
 * @min 1
 * @default 54
 *
 * @param defaultStaggerFrames
 * @parent --- General ---
 * @text Retraso por Letra
 * @type number
 * @min 0
 * @default 3
 *
 * @param defaultParticleCount
 * @parent --- General ---
 * @text Cantidad de Partículas
 * @type number
 * @min 0
 * @max 100
 * @default 22
 *
 * @param defaultBlockPlayer
 * @parent --- General ---
 * @text Bloquear Movimiento
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param defaultAllowSkip
 * @parent --- General ---
 * @text Permitir Saltar
 * @type boolean
 * @on Sí
 * @off No
 * @desc Permite acelerar la desaparición con OK, Cancelar o clic.
 * @default false
 *
 * @param --- Movimiento Global ---
 * @default
 *
 * @param globalMotionScale
 * @parent --- Movimiento Global ---
 * @text Intensidad Global
 * @type text
 * @desc Multiplica la amplitud y elevación de todos los perfiles. 1 = normal; 0.5 = mitad; 0 = estático.
 * @default 1.0
 *
 * @param globalSpeedScale
 * @parent --- Movimiento Global ---
 * @text Velocidad Global
 * @type text
 * @desc Multiplica la velocidad de onda. 1 = normal; 0.5 = más lento.
 * @default 1.0
 *
 * @param globalShakeScale
 * @parent --- Movimiento Global ---
 * @text Vibración Global
 * @type text
 * @desc Multiplica la vibración horizontal. 1 = normal; 0 = sin vibración.
 * @default 1.0
 *
 * @param --- Apariencia Personalizada ---
 * @default
 *
 * @param customMainColor
 * @parent --- Apariencia Personalizada ---
 * @text Color Principal
 * @type string
 * @default #EAFBFF
 *
 * @param customGlowColor
 * @parent --- Apariencia Personalizada ---
 * @text Color de Brillo
 * @type string
 * @default #9DEAFF
 *
 * @param customGhostColor
 * @parent --- Apariencia Personalizada ---
 * @text Color del Eco
 * @type string
 * @default #D9D1FF
 *
 * @param customParticleColor
 * @parent --- Apariencia Personalizada ---
 * @text Color de Partículas
 * @type string
 * @default #CDEFFF
 *
 * @param customWaveAmplitude
 * @parent --- Apariencia Personalizada ---
 * @text Amplitud de Onda
 * @type text
 * @desc Movimiento vertical en píxeles.
 * @default 5
 *
 * @param customWaveSpeed
 * @parent --- Apariencia Personalizada ---
 * @text Velocidad de Onda
 * @type text
 * @desc Velocidad de la oscilación. Recomendado: 0.05 a 0.12.
 * @default 0.075
 *
 * @param customShake
 * @parent --- Apariencia Personalizada ---
 * @text Vibración Horizontal
 * @type text
 * @desc Movimiento horizontal irregular. 0 = desactivado.
 * @default 0
 *
 * @command ShowEcho
 * @text Mostrar Eco
 * @desc Muestra un texto susurrante animado en pantalla.
 *
 * @arg text
 * @text Texto
 * @type multiline_string
 * @desc Puedes usar saltos de línea. Admite \V[n], \N[n], \P[n] y \G.
 * @default El viento aún conoce tu nombre...
 *
 * @arg profile
 * @text Perfil
 * @type select
 * @option Predeterminado
 * @value default
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
 * @option Personalizado
 * @value custom
 * @default default
 *
 * @arg fontSize
 * @text Tamaño de Fuente
 * @type number
 * @min 0
 * @max 120
 * @desc 0 = usar valor predeterminado.
 * @default 0
 *
 * @arg centerY
 * @text Posición Vertical
 * @type text
 * @desc Déjalo vacío para usar el valor predeterminado. Ejemplo: 0.47.
 * @default
 *
 * @arg maxWidth
 * @text Ancho Máximo
 * @type text
 * @desc Déjalo vacío para usar el valor predeterminado. Ejemplo: 0.82.
 * @default
 *
 * @arg revealFrames
 * @text Frames Aparición
 * @type number
 * @min 0
 * @desc 0 = usar valor predeterminado.
 * @default 0
 *
 * @arg holdFrames
 * @text Frames Permanencia
 * @type number
 * @min 0
 * @desc 0 = usar valor predeterminado.
 * @default 0
 *
 * @arg fadeFrames
 * @text Frames Desaparición
 * @type number
 * @min 0
 * @desc 0 = usar valor predeterminado.
 * @default 0
 *
 * @arg staggerFrames
 * @text Retraso por Letra
 * @type number
 * @min 0
 * @desc 0 usa el valor configurado. Para desactivar por completo usa 1 y baja Aparición.
 * @default 0
 *
 * @arg particleCount
 * @text Cantidad de Partículas
 * @type number
 * @min 0
 * @max 100
 * @desc 0 = usar valor predeterminado.
 * @default 0
 *
 * @arg motionScale
 * @text Intensidad de Movimiento
 * @type text
 * @desc Vacío = usar valor global. 1 = normal; 0.5 = mitad; 0 = sin onda ni elevación.
 * @default
 *
 * @arg speedScale
 * @text Velocidad de Movimiento
 * @type text
 * @desc Vacío = usar valor global. 1 = normal; 0.5 = más lento.
 * @default
 *
 * @arg shakeScale
 * @text Vibración
 * @type text
 * @desc Vacío = usar valor global. 1 = normal; 0 = sin vibración horizontal.
 * @default
 *
 * @arg seName
 * @text Sonido Inicial
 * @type file
 * @dir audio/se
 * @desc Sonido opcional al comenzar el eco.
 * @default
 *
 * @arg seVolume
 * @text Volumen del Sonido
 * @type number
 * @min 0
 * @max 100
 * @default 35
 *
 * @arg sePitch
 * @text Tono del Sonido
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @arg blockPlayer
 * @text Bloquear Movimiento
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @arg waitForFinish
 * @text Esperar a que Termine
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está activo, el evento no continúa hasta que el eco termine.
 * @default true
 *
 * @arg allowSkip
 * @text Permitir Saltar
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @command UseNaturalEcho
 * @text Usar Eco Natural
 * @desc Muestra rápidamente un eco con el perfil Natural.
 *
 * @arg text
 * @text Texto
 * @type multiline_string
 * @desc Texto del eco natural. Admite \V[n], \N[n], \P[n] y \G.
 * @default El bosque todavía te recuerda...
 *
 * @arg blockPlayer
 * @text Bloquear Movimiento
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @arg waitForFinish
 * @text Esperar a que Termine
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @arg allowSkip
 * @text Permitir Saltar
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @arg motionScale
 * @text Intensidad de Movimiento
 * @type text
 * @desc Vacío = usar valor global. 0 = sin onda ni elevación.
 * @default
 *
 * @arg speedScale
 * @text Velocidad de Movimiento
 * @type text
 * @desc Vacío = usar valor global.
 * @default
 *
 * @arg shakeScale
 * @text Vibración
 * @type text
 * @desc Vacío = usar valor global. 0 = sin vibración.
 * @default
 *
 * @arg seName
 * @text Sonido Inicial
 * @type file
 * @dir audio/se
 * @desc Sonido opcional al comenzar el eco natural.
 * @default
 *
 * @arg seVolume
 * @text Volumen del Sonido
 * @type number
 * @min 0
 * @max 100
 * @default 35
 *
 * @arg sePitch
 * @text Tono del Sonido
 * @type number
 * @min 50
 * @max 150
 * @default 105
 *
 * @command ClearEcho
 * @text Limpiar Ecos
 * @desc Cierra el eco actual y vacía la cola.
 *
 * @help
 * ============================================================================
 * Dex_EchoWhisper v1.4
 * ============================================================================
 *
 * Colores de perfiles:
 * - Natural: gris perla frío con contorno gris azulado discreto.
 * - Viento: verde.
 * - Hielo: azul oscuro.
 * - Fuego: rojo.
 * - Corrupto: morado.
 * - Esperanza: dorado con movimiento calmado.
 *
 * CONTROL DE MOVIMIENTO:
 * - Intensidad Global, Velocidad Global y Vibración Global se configuran
 *   en el Plugin Manager.
 * - Cada comando Mostrar Eco puede sobrescribir esos valores.
 * - Dex_EchoSense puede usar:
 *   <EchoWhisperMotion: 0.35>
 *   <EchoWhisperSpeed: 0.60>
 *   <EchoWhisperShake: 0>
 *
 * Muestra frases susurrantes en el centro de la pantalla:
 *
 * Ahora las partículas cambian según el perfil:
 * - Natural: motas orgánicas / polen.
 * - Viento: hojitas.
 * - Hielo: copos.
 * - Fuego: llamitas.
 * - Corrupto: fragmentos.
 * - Esperanza: estrellitas.

 *
 * - Aparición progresiva letra por letra.
 * - Movimiento ondulado individual.
 * - Brillo y copia fantasmal.
 * - Partículas ascendentes.
 * - Desaparición elevándose.
 * - Cola automática de varios ecos.
 * - Bloqueo opcional del movimiento del jugador.
 * - Espera opcional del evento hasta terminar.
 *
 * ============================================================================
 * INSTALACIÓN
 * ============================================================================
 *
 * Copia:
 *
 * Dex_EchoWhisper.js
 *
 * dentro de:
 *
 * js/plugins/
 *
 * Actívalo en el Plugin Manager.
 *
 * ============================================================================
 * USO
 * ============================================================================
 *
 * En un evento:
 *
 * Comando de Plugin -> Dex_EchoWhisper -> Mostrar Eco
 *
 * También existe el comando rápido:
 *
 * Comando de Plugin -> Dex_EchoWhisper -> Usar Eco Natural
 *
 * Este comando ya selecciona automáticamente el perfil Natural y sólo pide
 * el texto y las opciones esenciales.
 *
 * Ejemplo:
 *
 * Texto:
 * El viento aún conoce tu nombre...
 *
 * Perfil:
 * Viento
 *
 * Esperar a que Termine:
 * Sí
 *
 * ============================================================================
 * PERFILES
 * ============================================================================
 *
 * Natural:
 * Verde pálido, movimiento suave.
 *
 * Viento:
 * Blanco azulado, onda más ligera y viva.
 *
 * Hielo:
 * Azul claro, movimiento lento.
 *
 * Fuego:
 * Marfil y naranja, vibración más cálida.
 *
 * Corrupto:
 * Morado, movimiento irregular.
 *
 * Esperanza:
 * Dorado, brillo suave y movimiento calmado.
 *
 * Personalizado:
 * Usa los parámetros de Apariencia Personalizada.
 *
 * ============================================================================
 * CÓDIGOS DE TEXTO
 * ============================================================================
 *
 * \V[n] = valor de una variable.
 * \N[n] = nombre de un actor.
 * \P[n] = nombre del miembro n del grupo.
 * \G    = nombre de la moneda.
 *
 * ============================================================================
 * LLAMADA POR SCRIPT
 * ============================================================================
 *
 * Dex.EchoWhisper.show("El bosque todavía te recuerda...", {
 *     profile: "natural",
 *     wait: false,
 *     blockPlayer: true,
 *     motionScale: 0.35,
 *     speedScale: 0.60,
 *     shakeScale: 0
 * });
 *
 * ============================================================================
 */

var Imported = Imported || {};
Imported.Dex_EchoWhisper = true;

var Dex = Dex || {};
Dex.EchoWhisper = Dex.EchoWhisper || {};

(() => {
    "use strict";

    const pluginName = (() => {
        const script = document.currentScript;
        if (script && script.src) {
            const file = decodeURIComponent(script.src.split("/").pop() || "");
            return file.replace(/\.js$/i, "");
        }
        return "Dex_EchoWhisper";
    })();

    const params = PluginManager.parameters(pluginName);

    const pText = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || String(value).trim() === "") {
            return fallback;
        }
        return String(value);
    };

    const pNumber = function(name, fallback) {
        const value = Number(pText(name, fallback));
        return Number.isFinite(value) ? value : fallback;
    };

    const pBool = function(name, fallback) {
        const value = params[name];
        if (value === undefined || value === null || value === "") return fallback;
        return String(value) === "true";
    };

    const DEFAULTS = {
        profile: pText("defaultProfile", "wind"),
        fontFace: pText("defaultFontFace", ""),
        fontSize: Math.max(12, pNumber("defaultFontSize", 48)),
        centerY: pNumber("defaultCenterY", 0.47),
        maxWidth: pNumber("defaultMaxWidth", 0.82),
        revealFrames: Math.max(1, pNumber("defaultRevealFrames", 42)),
        holdFrames: Math.max(1, pNumber("defaultHoldFrames", 150)),
        fadeFrames: Math.max(1, pNumber("defaultFadeFrames", 54)),
        staggerFrames: Math.max(0, pNumber("defaultStaggerFrames", 3)),
        particleCount: Math.max(0, pNumber("defaultParticleCount", 22)),
        blockPlayer: pBool("defaultBlockPlayer", true),
        allowSkip: pBool("defaultAllowSkip", false),
        globalMotionScale: Math.max(0, pNumber("globalMotionScale", 1.0)),
        globalSpeedScale: Math.max(0, pNumber("globalSpeedScale", 1.0)),
        globalShakeScale: Math.max(0, pNumber("globalShakeScale", 1.0))
    };

    const CUSTOM = {
        mainColor: pText("customMainColor", "#EAFBFF"),
        glowColor: pText("customGlowColor", "#9DEAFF"),
        ghostColor: pText("customGhostColor", "#D9D1FF"),
        particleColor: pText("customParticleColor", "#CDEFFF"),
        mainOutlineColor: "rgba(0,0,0,0.65)",
        mainOutlineWidth: 4,
        waveAmplitude: pNumber("customWaveAmplitude", 5),
        waveSpeed: pNumber("customWaveSpeed", 0.075),
        shake: pNumber("customShake", 0)
    };

    const PROFILES = {
        natural: {
            mainColor: "#D2D6D8",
            glowColor: "#E7ECEC",
            ghostColor: "#AEB7BA",
            particleColor: "#E5E9E8",
            mainOutlineColor: "#596166",
            mainOutlineWidth: 3,
            waveAmplitude: 1.8,
            waveSpeed: 0.036,
            shake: 0.03,
            riseDistance: 20
        },
        wind: {
            mainColor: "#9DFFAA",
            glowColor: "#36D85B",
            ghostColor: "#69F083",
            particleColor: "#C7FFD0",
            mainOutlineColor: "rgba(8,55,20,0.88)",
            mainOutlineWidth: 4,
            waveAmplitude: 3.6,
            waveSpeed: 0.060,
            shake: 0.10,
            riseDistance: 29
        },
        ice: {
            mainColor: "#214F9D",
            glowColor: "#5E8DFF",
            ghostColor: "#315DAA",
            particleColor: "#8DB8FF",
            mainOutlineColor: "rgba(190,220,255,0.96)",
            mainOutlineWidth: 4,
            waveAmplitude: 1.25,
            waveSpeed: 0.030,
            shake: 0,
            riseDistance: 18
        },
        fire: {
            mainColor: "#FF4B4B",
            glowColor: "#FF2424",
            ghostColor: "#D83434",
            particleColor: "#FF9585",
            mainOutlineColor: "rgba(70,0,0,0.92)",
            mainOutlineWidth: 4,
            waveAmplitude: 4.5,
            waveSpeed: 0.078,
            shake: 0.72,
            riseDistance: 34
        },
        corrupt: {
            mainColor: "#C678FF",
            glowColor: "#8D2BCE",
            ghostColor: "#A94DDE",
            particleColor: "#DDA8FF",
            mainOutlineColor: "rgba(35,0,50,0.92)",
            mainOutlineWidth: 4,
            waveAmplitude: 7,
            waveSpeed: 0.115,
            shake: 1.8,
            riseDistance: 42
        },
        hope: {
            mainColor: "#FFD76A",
            glowColor: "#FFF0A6",
            ghostColor: "#D9A93B",
            particleColor: "#FFE9A0",
            mainOutlineColor: "rgba(70,45,0,0.88)",
            mainOutlineWidth: 4,
            waveAmplitude: 0.95,
            waveSpeed: 0.022,
            shake: 0,
            riseDistance: 14
        },
        custom: CUSTOM
    };

    const screenWidth = function() {
        return Graphics.boxWidth || Graphics.width || 1280;
    };

    const screenHeight = function() {
        return Graphics.boxHeight || Graphics.height || 720;
    };

    const clamp = function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    const easeOutCubic = function(t) {
        const p = clamp(t, 0, 1) - 1;
        return p * p * p + 1;
    };

    const easeInCubic = function(t) {
        const p = clamp(t, 0, 1);
        return p * p * p;
    };

    const colorToRgba = function(hex, alpha) {
        let value = String(hex || "#FFFFFF").replace("#", "");
        if (value.length === 3) {
            value = value.split("").map(c => c + c).join("");
        }

        const number = parseInt(value, 16);
        if (!Number.isFinite(number)) {
            return `rgba(255,255,255,${alpha})`;
        }

        const r = (number >> 16) & 255;
        const g = (number >> 8) & 255;
        const b = number & 255;
        return `rgba(${r},${g},${b},${alpha})`;
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

    const drawEchoParticleShape = function(bitmap, profile, color) {
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
        ctx.lineWidth = Math.max(1.2, s * 0.08);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        switch (profile) {
            case "wind":
                ctx.translate(cx, cy);
                ctx.rotate(-0.48);

                ctx.beginPath();
                ctx.moveTo(0, -s * 0.30);
                ctx.quadraticCurveTo(s * 0.24, -s * 0.06, s * 0.12, s * 0.26);
                ctx.quadraticCurveTo(-s * 0.20, s * 0.16, -s * 0.10, -s * 0.18);
                ctx.quadraticCurveTo(-s * 0.05, -s * 0.28, 0, -s * 0.30);
                ctx.closePath();
                ctx.fill();

                ctx.strokeStyle = "rgba(255,255,255,0.42)";
                ctx.lineWidth = Math.max(1, s * 0.05);
                ctx.beginPath();
                ctx.moveTo(0, -s * 0.22);
                ctx.lineTo(0.01, s * 0.16);
                ctx.stroke();
                break;

            case "ice":
                ctx.translate(cx, cy);
                ctx.strokeStyle = color;
                ctx.lineWidth = Math.max(1.2, s * 0.08);

                for (let i = 0; i < 3; i++) {
                    const angle = i * Math.PI / 3;

                    ctx.save();
                    ctx.rotate(angle);

                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.34);
                    ctx.lineTo(0, s * 0.34);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.12);
                    ctx.lineTo(-s * 0.12, -s * 0.02);
                    ctx.moveTo(0, -s * 0.12);
                    ctx.lineTo(s * 0.12, -s * 0.02);
                    ctx.moveTo(0, s * 0.12);
                    ctx.lineTo(-s * 0.12, s * 0.02);
                    ctx.moveTo(0, s * 0.12);
                    ctx.lineTo(s * 0.12, s * 0.02);
                    ctx.stroke();

                    ctx.restore();
                }
                break;

            case "fire":
                ctx.translate(cx, cy + s * 0.06);

                ctx.beginPath();
                ctx.moveTo(0, -s * 0.34);
                ctx.bezierCurveTo(s * 0.26, -s * 0.18, s * 0.28, s * 0.05, 0, s * 0.33);
                ctx.bezierCurveTo(-s * 0.26, s * 0.08, -s * 0.24, -s * 0.18, 0, -s * 0.34);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "rgba(255, 240, 170, 0.65)";
                ctx.beginPath();
                ctx.moveTo(0, -s * 0.18);
                ctx.bezierCurveTo(s * 0.13, -s * 0.08, s * 0.11, s * 0.04, 0, s * 0.17);
                ctx.bezierCurveTo(-s * 0.13, s * 0.04, -s * 0.10, -s * 0.07, 0, -s * 0.18);
                ctx.closePath();
                ctx.fill();
                break;

            case "corrupt":
                ctx.translate(cx, cy);
                ctx.rotate(0.35);

                ctx.beginPath();
                ctx.moveTo(-s * 0.08, -s * 0.32);
                ctx.lineTo(s * 0.22, -s * 0.12);
                ctx.lineTo(s * 0.10, s * 0.30);
                ctx.lineTo(-s * 0.24, s * 0.14);
                ctx.lineTo(-s * 0.18, -s * 0.04);
                ctx.closePath();
                ctx.fill();
                break;

            case "hope":
                ctx.fillStyle = color;
                drawStarShape(ctx, cx, cy, s * 0.30, s * 0.14);
                ctx.fill();

                ctx.fillStyle = "rgba(255, 249, 210, 0.72)";
                ctx.beginPath();
                ctx.arc(cx, cy, s * 0.08, 0, Math.PI * 2);
                ctx.fill();
                break;

            case "natural":
            default:
                ctx.translate(cx, cy);
                ctx.rotate(-0.34);

                ctx.beginPath();
                ctx.ellipse(0, 0, s * 0.23, s * 0.16, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "rgba(255,255,255,0.34)";
                ctx.beginPath();
                ctx.arc(s * 0.11, -s * 0.07, s * 0.07, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
        refreshBitmapTexture(bitmap);
    };

    const cleanFileName = function(value) {
        return String(value || "")
            .trim()
            .replace(/^.*[\\\/]/, "")
            .replace(/\.(ogg|m4a|wav)$/i, "");
    };

    const resolveText = function(text) {
        let result = String(text || "");

        result = result.replace(/\\\\/g, "\x1b");
        result = result.replace(/\x1bV\[(\d+)\]/gi, (_, n) => {
            return $gameVariables ? String($gameVariables.value(Number(n))) : "0";
        });
        result = result.replace(/\x1bN\[(\d+)\]/gi, (_, n) => {
            const actor = $gameActors ? $gameActors.actor(Number(n)) : null;
            return actor ? actor.name() : "";
        });
        result = result.replace(/\x1bP\[(\d+)\]/gi, (_, n) => {
            const index = Number(n) - 1;
            const actor = $gameParty && $gameParty.members ? $gameParty.members()[index] : null;
            return actor ? actor.name() : "";
        });
        result = result.replace(/\x1bG/gi, TextManager.currencyUnit || "");
        result = result.replace(/\x1b/g, "\\");
        result = result.replace(/\\n/gi, "\n");
        result = result.replace(/<br\s*\/?>/gi, "\n");

        return result;
    };

    const Manager = Dex.EchoWhisper;

    Manager._queue = [];
    Manager._overlay = null;
    Manager._nextId = 1;
    Manager._finishedIds = new Set();

    Manager.profile = function(name) {
        const key = PROFILES[name] ? name : DEFAULTS.profile;
        return Object.assign({}, PROFILES[key] || PROFILES.wind);
    };

    Manager.makeConfig = function(raw) {
        raw = raw || {};

        let profileName = String(raw.profile || "default");
        if (profileName === "default") profileName = DEFAULTS.profile;
        if (!PROFILES[profileName]) profileName = DEFAULTS.profile;

        const appearance = Manager.profile(profileName);

        const valueOrDefault = function(value, fallback) {
            if (value === undefined || value === null || String(value).trim() === "") return fallback;
            const number = Number(value);
            return Number.isFinite(number) ? number : fallback;
        };

        const positiveOrDefault = function(value, fallback) {
            const number = valueOrDefault(value, fallback);
            return number > 0 ? number : fallback;
        };

        const nonNegativeOrDefault = function(value, fallback) {
            if (value === undefined || value === null || String(value).trim() === "") {
                return fallback;
            }

            const number = Number(value);
            return Number.isFinite(number) ? Math.max(0, number) : fallback;
        };

        const localMotionScale = nonNegativeOrDefault(raw.motionScale, 1);
        const localSpeedScale = nonNegativeOrDefault(raw.speedScale, 1);
        const localShakeScale = nonNegativeOrDefault(raw.shakeScale, 1);

        const effectiveMotionScale = DEFAULTS.globalMotionScale * localMotionScale;
        const effectiveSpeedScale = DEFAULTS.globalSpeedScale * localSpeedScale;
        const effectiveShakeScale = DEFAULTS.globalShakeScale * localShakeScale;

        return {
            id: raw.id || 0,
            text: resolveText(raw.text || ""),
            profile: profileName,
            fontFace: raw.fontFace || DEFAULTS.fontFace,
            fontSize: positiveOrDefault(raw.fontSize, DEFAULTS.fontSize),
            centerY: clamp(valueOrDefault(raw.centerY, DEFAULTS.centerY), 0.05, 0.95),
            maxWidth: clamp(valueOrDefault(raw.maxWidth, DEFAULTS.maxWidth), 0.20, 0.98),
            revealFrames: positiveOrDefault(raw.revealFrames, DEFAULTS.revealFrames),
            holdFrames: positiveOrDefault(raw.holdFrames, DEFAULTS.holdFrames),
            fadeFrames: positiveOrDefault(raw.fadeFrames, DEFAULTS.fadeFrames),
            staggerFrames: raw.staggerFrames === 0 || raw.staggerFrames === "0"
                ? DEFAULTS.staggerFrames
                : Math.max(0, valueOrDefault(raw.staggerFrames, DEFAULTS.staggerFrames)),
            particleCount: raw.particleCount === 0 || raw.particleCount === "0"
                ? DEFAULTS.particleCount
                : Math.max(0, valueOrDefault(raw.particleCount, DEFAULTS.particleCount)),
            blockPlayer: raw.blockPlayer !== undefined ? !!raw.blockPlayer : DEFAULTS.blockPlayer,
            allowSkip: raw.allowSkip !== undefined ? !!raw.allowSkip : DEFAULTS.allowSkip,
            seName: cleanFileName(raw.seName || ""),
            seVolume: clamp(valueOrDefault(raw.seVolume, 35), 0, 100),
            sePitch: clamp(valueOrDefault(raw.sePitch, 100), 50, 150),
            mainColor: appearance.mainColor,
            glowColor: appearance.glowColor,
            ghostColor: appearance.ghostColor,
            particleColor: appearance.particleColor,
            mainOutlineColor: appearance.mainOutlineColor || colorToRgba(appearance.glowColor, 0.92),
            mainOutlineWidth: appearance.mainOutlineWidth || 5,
            motionScale: effectiveMotionScale,
            speedScale: effectiveSpeedScale,
            shakeScale: effectiveShakeScale,
            waveAmplitude: appearance.waveAmplitude * effectiveMotionScale,
            waveSpeed: appearance.waveSpeed * effectiveSpeedScale,
            shake: appearance.shake * effectiveShakeScale,
            riseDistance: (appearance.riseDistance || 32) * effectiveMotionScale
        };
    };

    Manager.request = function(raw) {
        const id = this._nextId++;
        const data = Object.assign({}, raw || {}, { id: id });
        const config = this.makeConfig(data);

        this._finishedIds.delete(id);
        this._queue.push(config);

        if (this._overlay && !this._overlay.isBusy()) {
            this._overlay.startNext();
        }

        return id;
    };

    Manager.show = function(text, options) {
        const raw = Object.assign({}, options || {}, { text: text });
        return this.request(raw);
    };

    Manager.attach = function(overlay) {
        this._overlay = overlay;

        if (this._queue.length > 0 && !overlay.isBusy()) {
            overlay.startNext();
        }
    };

    Manager.detach = function(overlay) {
        if (this._overlay === overlay) {
            this._overlay = null;
        }
    };

    Manager.finishId = function(id) {
        this._finishedIds.add(id);

        if (this._finishedIds.size > 200) {
            const values = Array.from(this._finishedIds);
            this._finishedIds = new Set(values.slice(values.length - 100));
        }
    };

    Manager.isFinished = function(id) {
        return this._finishedIds.has(id);
    };

    Manager.isBusy = function() {
        return !!(
            (this._overlay && this._overlay.isBusy()) ||
            this._queue.length > 0
        );
    };

    Manager.isBlockingPlayer = function() {
        return !!(
            this._overlay &&
            this._overlay.isBusy() &&
            this._overlay.currentConfig() &&
            this._overlay.currentConfig().blockPlayer
        );
    };

    Manager.clear = function() {
        if (this._overlay) {
            this._overlay.forceClear();
        }

        while (this._queue.length > 0) {
            const config = this._queue.shift();
            if (config && config.id) this.finishId(config.id);
        }
    };

    //-------------------------------------------------------------------------
    // Sprite_DexEchoLetter
    //-------------------------------------------------------------------------

    function Sprite_DexEchoLetter() {
        this.initialize(...arguments);
    }

    Sprite_DexEchoLetter.prototype = Object.create(Sprite.prototype);
    Sprite_DexEchoLetter.prototype.constructor = Sprite_DexEchoLetter;

    Sprite_DexEchoLetter.prototype.initialize = function(character, width, height, index, config) {
        Sprite.prototype.initialize.call(this);

        this._index = index;
        this._config = config;
        this._baseX = 0;
        this._baseY = 0;
        this._charWidth = width;

        this._ghost = new Sprite(this.createTextBitmap(
            character,
            width,
            height,
            config.ghostColor,
            colorToRgba(config.glowColor, 0.38),
            2
        ));
        this._ghost.anchor.set(0.5);
        this._ghost.opacity = 0;
        this._ghost.x = 3;
        this._ghost.y = 7;

        if (PIXI.filters && PIXI.filters.BlurFilter) {
            this._ghost.filters = [new PIXI.filters.BlurFilter(3)];
        }

        this.addChild(this._ghost);

        this._main = new Sprite(this.createTextBitmap(
            character,
            width,
            height,
            config.mainColor,
            config.mainOutlineColor || colorToRgba(config.glowColor, 0.92),
            config.mainOutlineWidth || 5
        ));
        this._main.anchor.set(0.5);
        this._main.opacity = 0;
        this.addChild(this._main);

        this.opacity = 0;
    };

    Sprite_DexEchoLetter.prototype.createTextBitmap = function(character, width, height, color, outlineColor, outlineWidth) {
        const bitmap = new Bitmap(Math.max(8, Math.ceil(width)), Math.max(8, Math.ceil(height)));

        bitmap.fontFace = this._config.fontFace ||
            ($gameSystem && $gameSystem.mainFontFace ? $gameSystem.mainFontFace() : "sans-serif");
        bitmap.fontSize = this._config.fontSize;
        bitmap.fontBold = false;
        bitmap.fontItalic = false;
        bitmap.textColor = color;
        bitmap.outlineColor = outlineColor;
        bitmap.outlineWidth = outlineWidth;
        bitmap.drawText(character, 0, 0, bitmap.width, bitmap.height, "center");

        return bitmap;
    };

    Sprite_DexEchoLetter.prototype.setBasePosition = function(x, y) {
        this._baseX = x;
        this._baseY = y;
        this.x = x;
        this.y = y;
    };

    Sprite_DexEchoLetter.prototype.updateWhisper = function(frame, fadeStart, totalFrames) {
        const config = this._config;
        const start = this._index * config.staggerFrames;
        const local = frame - start;

        if (local < 0) {
            this.opacity = 0;
            return;
        }

        let revealRate = 1;
        if (local < config.revealFrames) {
            revealRate = easeOutCubic(local / config.revealFrames);
        }

        let fadeRate = 0;
        if (frame >= fadeStart) {
            fadeRate = easeInCubic((frame - fadeStart) / Math.max(1, totalFrames - fadeStart));
        }

        const visibleRate = clamp(revealRate * (1 - fadeRate), 0, 1);
        const phase = frame * config.waveSpeed + this._index * 0.58;
        const wave = Math.sin(phase) * config.waveAmplitude;
        const smallWave = Math.sin(phase * 0.63 + 1.7) * config.waveAmplitude * 0.26;
        const jitter = config.shake > 0
            ? Math.sin(frame * 0.47 + this._index * 2.13) * config.shake
            : 0;

        const introRise = (1 - revealRate) * 18;
        const outroRise = fadeRate * config.riseDistance;

        this.x = this._baseX + jitter;
        this.y = this._baseY + wave + smallWave + introRise - outroRise;

        const breathing = 0.88 + Math.sin(frame * 0.055 + this._index * 0.2) * 0.10;
        this.opacity = Math.floor(255 * visibleRate);
        this._main.opacity = 255;
        this._ghost.opacity = Math.floor(145 * visibleRate * breathing);

        const scale = 0.95 + revealRate * 0.05 + fadeRate * 0.025;
        this.scale.set(scale);
    };

    //-------------------------------------------------------------------------
    // Sprite_DexEchoParticle
    //-------------------------------------------------------------------------

    function Sprite_DexEchoParticle() {
        this.initialize(...arguments);
    }

    Sprite_DexEchoParticle.prototype = Object.create(Sprite.prototype);
    Sprite_DexEchoParticle.prototype.constructor = Sprite_DexEchoParticle;

    Sprite_DexEchoParticle.prototype.initialize = function(config, bounds) {
        const size = 6 + Math.random() * 7;
        const bitmap = new Bitmap(Math.ceil(size * 4), Math.ceil(size * 4));

        Sprite.prototype.initialize.call(this, bitmap);

        this.anchor.set(0.5);
        this._config = config;
        this._echoBounds = bounds;
        this._seed = Math.random() * Math.PI * 2;
        this._size = size;
        this._rotationSpeed = 0;
        this.redrawParticle();
        this.reset(true);
    };

    Sprite_DexEchoParticle.prototype.redrawParticle = function() {
        drawEchoParticleShape(this.bitmap, this._config.profile, this._config.particleColor);
    };

    Sprite_DexEchoParticle.prototype.reset = function(initial) {
        const b = this._echoBounds;
        const profile = this._config.profile;

        this.x = b.x + Math.random() * b.width;
        this.y = b.y + b.height * (0.45 + Math.random() * 0.75);
        this._baseX = this.x;
        this._life = 0;
        this._maxLife = 100 + Math.random() * 150;
        this._speedY = 0.22 + Math.random() * 0.58;
        this._drift = 0.18 + Math.random() * 0.48;
        this._phase = this._seed + Math.random() * 4;
        this._rotationSpeed = 0;

        switch (profile) {
            case "wind":
                this._speedY = 0.18 + Math.random() * 0.42;
                this._drift = 0.42 + Math.random() * 0.68;
                this._rotationSpeed = 0.018 + Math.random() * 0.018;
                break;
            case "ice":
                this._speedY = 0.10 + Math.random() * 0.24;
                this._drift = 0.10 + Math.random() * 0.24;
                this._rotationSpeed = 0.006 + Math.random() * 0.010;
                break;
            case "fire":
                this._speedY = 0.34 + Math.random() * 0.72;
                this._drift = 0.12 + Math.random() * 0.24;
                this._rotationSpeed = -0.012 + Math.random() * 0.024;
                break;
            case "corrupt":
                this._speedY = 0.16 + Math.random() * 0.42;
                this._drift = 0.22 + Math.random() * 0.44;
                this._rotationSpeed = -0.040 + Math.random() * 0.080;
                break;
            case "hope":
                this._speedY = 0.14 + Math.random() * 0.26;
                this._drift = 0.14 + Math.random() * 0.22;
                this._rotationSpeed = 0.008 + Math.random() * 0.010;
                break;
            case "natural":
            default:
                this._speedY = 0.18 + Math.random() * 0.36;
                this._drift = 0.18 + Math.random() * 0.32;
                this._rotationSpeed = 0.010 + Math.random() * 0.015;
                break;
        }

        this.opacity = initial ? Math.floor(Math.random() * 180) : 0;
        this.scale.set(0.55 + Math.random() * 0.85);
        this.rotation = Math.random() * Math.PI * 2;
    };

    Sprite_DexEchoParticle.prototype.updateParticle = function(activeOpacity) {
        this._life++;
        const profile = this._config.profile;

        let xOffset = Math.sin(this._life * 0.035 + this._phase) * 18 * this._drift;

        if (profile === "wind") {
            xOffset += Math.cos(this._life * 0.055 + this._phase) * 10;
        } else if (profile === "corrupt") {
            xOffset += Math.sin(this._life * 0.16 + this._phase * 1.3) * 4;
        }

        this.y -= this._speedY;
        this.x = this._baseX + xOffset;
        this.rotation += this._rotationSpeed;

        const rate = this._life / this._maxLife;
        let alpha;

        if (rate < 0.18) {
            alpha = rate / 0.18;
        } else if (rate > 0.72) {
            alpha = 1 - (rate - 0.72) / 0.28;
        } else {
            alpha = 1;
        }

        let scaleMod = 1;
        if (profile === "fire") {
            scaleMod = 0.94 + Math.sin(this._life * 0.28 + this._phase) * 0.12;
        } else if (profile === "hope") {
            scaleMod = 0.96 + Math.sin(this._life * 0.12 + this._phase) * 0.08;
        }

        this.scale.x = Math.max(0.25, this.scale.x * 0.92 + (0.55 + scaleMod * 0.45) * 0.08);
        this.scale.y = Math.max(0.25, this.scale.y * 0.92 + (0.55 + scaleMod * 0.45) * 0.08);

        this.opacity = Math.floor(170 * clamp(alpha, 0, 1) * activeOpacity);

        if (this._life >= this._maxLife || this.y < this._echoBounds.y - 70) {
            this.reset(false);
        }
    };

    //-------------------------------------------------------------------------
    // Sprite_DexEchoOverlay
    //-------------------------------------------------------------------------

    function Sprite_DexEchoOverlay() {
        this.initialize(...arguments);
    }

    Sprite_DexEchoOverlay.prototype = Object.create(Sprite.prototype);
    Sprite_DexEchoOverlay.prototype.constructor = Sprite_DexEchoOverlay;

    Sprite_DexEchoOverlay.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._current = null;
        this._frame = 0;
        this._fadeStart = 0;
        this._totalFrames = 0;
        this._letters = [];
        this._particles = [];

        this._particleLayer = new Sprite();
        this.addChild(this._particleLayer);

        this._ghostShade = new Sprite(new Bitmap(screenWidth(), screenHeight()));
        this._ghostShade.bitmap.fillAll("rgba(0,0,0,0.01)");
        this._ghostShade.opacity = 0;
        this.addChild(this._ghostShade);

        this._letterLayer = new Sprite();
        this.addChild(this._letterLayer);

        Manager.attach(this);
    };

    Sprite_DexEchoOverlay.prototype.destroy = function(options) {
        Manager.detach(this);
        Sprite.prototype.destroy.call(this, options);
    };

    Sprite_DexEchoOverlay.prototype.isBusy = function() {
        return !!this._current;
    };

    Sprite_DexEchoOverlay.prototype.currentConfig = function() {
        return this._current;
    };

    Sprite_DexEchoOverlay.prototype.startNext = function() {
        if (this._current) return;
        if (Manager._queue.length <= 0) return;

        const config = Manager._queue.shift();
        this.startEcho(config);
    };

    Sprite_DexEchoOverlay.prototype.startEcho = function(config) {
        this.clearVisuals();

        this._current = config;
        this._frame = 0;

        if (!config.text || !config.text.trim()) {
            Manager.finishId(config.id);
            this._current = null;
            this.startNext();
            return;
        }

        this.createLetters(config);
        this.createParticles(config);

        const lastStart = Math.max(0, this._letters.length - 1) * config.staggerFrames;
        this._fadeStart = lastStart + config.revealFrames + config.holdFrames;
        this._totalFrames = this._fadeStart + config.fadeFrames;

        if (config.seName) {
            AudioManager.playSe({
                name: config.seName,
                volume: config.seVolume,
                pitch: config.sePitch,
                pan: 0
            });
        }
    };

    Sprite_DexEchoOverlay.prototype.createLetters = function(config) {
        const fontFace = config.fontFace ||
            ($gameSystem && $gameSystem.mainFontFace ? $gameSystem.mainFontFace() : "sans-serif");

        const measure = new Bitmap(8, 8);
        measure.fontFace = fontFace;
        measure.fontSize = config.fontSize;

        const maxWidth = screenWidth() * config.maxWidth;
        const lineHeight = Math.ceil(config.fontSize * 1.55);
        const rawLines = config.text.split("\n");
        const lines = [];

        for (let r = 0; r < rawLines.length; r++) {
            const source = rawLines[r];

            if (source.length === 0) {
                lines.push([]);
                continue;
            }

            let current = [];
            let currentWidth = 0;

            for (let i = 0; i < source.length; i++) {
                const char = source[i];
                const width = char === " "
                    ? Math.max(config.fontSize * 0.34, measure.measureTextWidth(" "))
                    : Math.max(4, measure.measureTextWidth(char));

                if (current.length > 0 && currentWidth + width > maxWidth) {
                    while (current.length > 0 && current[current.length - 1].char === " ") {
                        currentWidth -= current[current.length - 1].width;
                        current.pop();
                    }

                    lines.push(current);
                    current = [];
                    currentWidth = 0;

                    if (char === " ") continue;
                }

                current.push({ char: char, width: width });
                currentWidth += width;
            }

            lines.push(current);
        }

        const totalHeight = Math.max(1, lines.length) * lineHeight;
        const centerY = screenHeight() * config.centerY;
        const firstY = centerY - totalHeight / 2 + lineHeight / 2;

        let globalIndex = 0;
        let minX = screenWidth();
        let maxX = 0;

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineWidth = line.reduce((sum, item) => sum + item.width, 0);
            let cursorX = (screenWidth() - lineWidth) / 2;
            const y = firstY + lineIndex * lineHeight;

            for (let i = 0; i < line.length; i++) {
                const item = line[i];
                const x = cursorX + item.width / 2;
                cursorX += item.width;

                if (item.char !== " ") {
                    const sprite = new Sprite_DexEchoLetter(
                        item.char,
                        item.width + config.fontSize * 0.70,
                        lineHeight + config.fontSize * 0.38,
                        globalIndex,
                        config
                    );

                    sprite.setBasePosition(x, y);
                    this._letterLayer.addChild(sprite);
                    this._letters.push(sprite);

                    minX = Math.min(minX, x - item.width / 2);
                    maxX = Math.max(maxX, x + item.width / 2);
                }

                globalIndex++;
            }
        }

        this._textBounds = {
            x: Number.isFinite(minX) ? minX : screenWidth() * 0.25,
            y: firstY - lineHeight * 0.6,
            width: Math.max(200, maxX - minX),
            height: totalHeight + lineHeight * 0.8
        };
    };

    Sprite_DexEchoOverlay.prototype.createParticles = function(config) {
        const bounds = this._textBounds || {
            x: screenWidth() * 0.25,
            y: screenHeight() * 0.35,
            width: screenWidth() * 0.5,
            height: screenHeight() * 0.3
        };

        const expanded = {
            x: Math.max(0, bounds.x - 100),
            y: Math.max(0, bounds.y - 70),
            width: Math.min(screenWidth(), bounds.width + 200),
            height: Math.min(screenHeight(), bounds.height + 150)
        };

        for (let i = 0; i < config.particleCount; i++) {
            const particle = new Sprite_DexEchoParticle(config, expanded);
            this._particleLayer.addChild(particle);
            this._particles.push(particle);
        }
    };

    Sprite_DexEchoOverlay.prototype.clearVisuals = function() {
        this._letterLayer.removeChildren();
        this._particleLayer.removeChildren();
        this._letters = [];
        this._particles = [];
        this._ghostShade.opacity = 0;
    };

    Sprite_DexEchoOverlay.prototype.forceClear = function() {
        if (this._current && this._current.id) {
            Manager.finishId(this._current.id);
        }

        this._current = null;
        this._frame = 0;
        this.clearVisuals();
    };

    Sprite_DexEchoOverlay.prototype.finishCurrent = function() {
        const id = this._current ? this._current.id : 0;

        this._current = null;
        this._frame = 0;
        this.clearVisuals();

        if (id) Manager.finishId(id);
        this.startNext();
    };

    Sprite_DexEchoOverlay.prototype.update = function() {
        Sprite.prototype.update.call(this);

        if (!this._current) {
            this.startNext();
            return;
        }

        this._frame++;

        if (this._current.allowSkip) {
            const skip = Input.isTriggered("ok") ||
                Input.isTriggered("cancel") ||
                TouchInput.isTriggered();

            if (skip && this._frame < this._fadeStart) {
                this._frame = this._fadeStart;
            }
        }

        const activeOpacity = this._frame < this._fadeStart
            ? 1
            : clamp(1 - (this._frame - this._fadeStart) / this._current.fadeFrames, 0, 1);

        for (let i = 0; i < this._letters.length; i++) {
            this._letters[i].updateWhisper(
                this._frame,
                this._fadeStart,
                this._totalFrames
            );
        }

        for (let i = 0; i < this._particles.length; i++) {
            this._particles[i].updateParticle(activeOpacity);
        }

        const shadePulse = 0.45 + Math.sin(this._frame * 0.035) * 0.08;
        this._ghostShade.opacity = Math.floor(30 * activeOpacity * shadePulse);

        if (this._frame >= this._totalFrames) {
            this.finishCurrent();
        }
    };

    //-------------------------------------------------------------------------
    // Scene integration
    //-------------------------------------------------------------------------

    const createOverlayForScene = function(scene) {
        if (scene._dexEchoWhisperOverlay) return;

        scene._dexEchoWhisperOverlay = new Sprite_DexEchoOverlay();
        scene.addChild(scene._dexEchoWhisperOverlay);
    };

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        createOverlayForScene(this);
    };

    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);
        createOverlayForScene(this);
    };

    //-------------------------------------------------------------------------
    // Player movement blocking
    //-------------------------------------------------------------------------

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if (Manager.isBlockingPlayer()) {
            return false;
        }

        return _Game_Player_canMove.call(this);
    };

    //-------------------------------------------------------------------------
    // Event wait mode
    //-------------------------------------------------------------------------

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === "dexEchoWhisper") {
            if (this._dexEchoWhisperWaitId && !Manager.isFinished(this._dexEchoWhisperWaitId)) {
                return true;
            }

            this._dexEchoWhisperWaitId = 0;
            this._waitMode = "";
            return false;
        }

        return _Game_Interpreter_updateWaitMode.call(this);
    };

    //-------------------------------------------------------------------------
    // Plugin commands
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "ShowEcho", function(args) {
        const boolArg = function(name, fallback) {
            if (args[name] === undefined || args[name] === null || args[name] === "") return fallback;
            return String(args[name]) === "true";
        };

        const requestId = Manager.request({
            text: args.text || "",
            profile: args.profile || "default",
            fontSize: Number(args.fontSize || 0),
            centerY: args.centerY,
            maxWidth: args.maxWidth,
            revealFrames: Number(args.revealFrames || 0),
            holdFrames: Number(args.holdFrames || 0),
            fadeFrames: Number(args.fadeFrames || 0),
            staggerFrames: Number(args.staggerFrames || 0),
            particleCount: Number(args.particleCount || 0),
            motionScale: args.motionScale,
            speedScale: args.speedScale,
            shakeScale: args.shakeScale,
            seName: args.seName || "",
            seVolume: Number(args.seVolume || 35),
            sePitch: Number(args.sePitch || 100),
            blockPlayer: boolArg("blockPlayer", DEFAULTS.blockPlayer),
            allowSkip: boolArg("allowSkip", DEFAULTS.allowSkip)
        });

        if (boolArg("waitForFinish", true)) {
            this._dexEchoWhisperWaitId = requestId;
            this.setWaitMode("dexEchoWhisper");
        }
    });

    PluginManager.registerCommand(pluginName, "UseNaturalEcho", function(args) {
        const boolArg = function(name, fallback) {
            if (args[name] === undefined || args[name] === null || args[name] === "") return fallback;
            return String(args[name]) === "true";
        };

        const requestId = Manager.request({
            text: args.text || "",
            profile: "natural",
            fontSize: 0,
            centerY: "",
            maxWidth: "",
            revealFrames: 0,
            holdFrames: 0,
            fadeFrames: 0,
            staggerFrames: 0,
            particleCount: 0,
            motionScale: args.motionScale,
            speedScale: args.speedScale,
            shakeScale: args.shakeScale,
            seName: args.seName || "",
            seVolume: Number(args.seVolume || 35),
            sePitch: Number(args.sePitch || 105),
            blockPlayer: boolArg("blockPlayer", true),
            allowSkip: boolArg("allowSkip", false)
        });

        if (boolArg("waitForFinish", true)) {
            this._dexEchoWhisperWaitId = requestId;
            this.setWaitMode("dexEchoWhisper");
        }
    });

    PluginManager.registerCommand(pluginName, "ClearEcho", function() {
        Manager.clear();
    });

})();
