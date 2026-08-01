/*:
 * @target MZ
 * @plugindesc Dex_LightingMZ v1.6 - Iluminación ambiental simple e intuitiva generada por código.
 * @author Dextroyean y Jaime
 *
 * @param EnabledDefault
 * @text Iluminación Activada por Defecto
 * @type boolean
 * @default true
 *
 * @param DefaultAmbientColor
 * @text Color Ambiente Predeterminado
 * @type text
 * @default #101820
 *
 * @param DefaultAmbientOpacity
 * @text Opacidad Ambiente Predeterminada
 * @type number
 * @min 0
 * @max 255
 * @default 170
 *
 * @param DefaultFadeFrames
 * @text Fundido Predeterminado
 * @type number
 * @min 0
 * @default 60
 *
 * @param PlayerLightPreset
 * @text Luz Inicial del Jugador
 * @type text
 * @desc Vacío = sin luz. Ejemplos: torch, candle, moonSoft.
 * @default
 *
 * @param DebugMode
 * @text Modo Debug
 * @type boolean
 * @default false
 *
 * @param LightOverlapMode
 * @text Superposición de Luces
 * @desc softCap reduce brillo cuando varias luces se cruzan. additive es el modo clásico. normal evita acumulación fuerte.
 * @type select
 * @option Suavizar acumulación
 * @value softCap
 * @option Clásico aditivo
 * @value additive
 * @option Sin acumulación fuerte
 * @value normal
 * @default softCap
 *
 * @param OverlapStrength
 * @text Fuerza Anti-Saturación
 * @desc 0 = no reduce. 100 = reduce mucho el brillo en cruces de luces.
 * @type number
 * @min 0
 * @max 100
 * @default 70
 *
 * @command SetAmbient
 * @text Cambiar Ambiente
 * @desc Cambia el color y opacidad de la oscuridad.
 *
 * @arg color
 * @text Color
 * @type text
 * @default #101820
 *
 * @arg opacity
 * @text Opacidad
 * @type number
 * @min 0
 * @max 255
 * @default 170
 *
 * @arg duration
 * @text Duración
 * @type number
 * @min 0
 * @default 60
 *
 * @command EnableLighting
 * @text Activar / Desactivar Iluminación
 * @arg enabled
 * @text Activado
 * @type boolean
 * @default true
 *
 * @command SetAmbientPreset
 * @text Cambiar Ambiente por Preset
 * @desc Cambia el ambiente usando presets listos: day, afternoon, night, caveDark, caveVeryDark.
 *
 * @arg preset
 * @text Preset
 * @type select
 * @option Día
 * @value day
 * @option Tarde
 * @value afternoon
 * @option Noche
 * @value night
 * @option Cueva Oscura
 * @value caveDark
 * @option Cueva Muy Oscura
 * @value caveVeryDark
 * @default day
 *
 * @arg duration
 * @text Duración
 * @type number
 * @min 0
 * @default 120
 *
 * @command SetTimeOfDay
 * @text Cambiar Hora del Día
 * @desc Cambia suavemente entre día, tarde, noche o amanecer.
 *
 * @arg phase
 * @text Momento
 * @type select
 * @option Día
 * @value day
 * @option Tarde
 * @value afternoon
 * @option Noche
 * @value night
 * @option Amanecer
 * @value dawn
 * @default day
 *
 * @arg duration
 * @text Duración
 * @type number
 * @min 0
 * @desc Frames de transición. 60 = 1 segundo.
 * @default 120
 *
 * @arg continueCycle
 * @text Continuar Ciclo
 * @type boolean
 * @on Sí
 * @off No
 * @desc Si está ON, después de cambiar la hora continúa el ciclo automático.
 * @default false
 *
 * @arg cycleSeconds
 * @text Segundos del Ciclo
 * @type number
 * @min 10
 * @desc 0 = conservar velocidad actual.
 * @default 0
 *
 * @command StartDayNightCycle
 * @text Iniciar Ciclo Día/Noche
 * @desc Inicia un ciclo automático con transiciones continuas.
 *
 * @arg startPhase
 * @text Empezar en
 * @type select
 * @option Día
 * @value day
 * @option Tarde
 * @value afternoon
 * @option Noche
 * @value night
 * @option Amanecer
 * @value dawn
 * @default day
 *
 * @arg cycleSeconds
 * @text Segundos del Ciclo
 * @type number
 * @min 10
 * @desc Duración de un ciclo completo en segundos.
 * @default 300
 *
 * @arg fade
 * @text Fundido Inicial
 * @type number
 * @min 0
 * @desc Frames para fundir hacia la hora inicial.
 * @default 120
 *
 * @command StopDayNightCycle
 * @text Detener Ciclo Día/Noche
 * @desc Detiene el ciclo automático y conserva la luz actual.
 *
 * @command SetCycleSpeed
 * @text Cambiar Velocidad del Ciclo
 * @desc Cambia la duración del ciclo completo.
 *
 * @arg cycleSeconds
 * @text Segundos del Ciclo
 * @type number
 * @min 10
 * @default 300
 *
 * @command SetPlayerLight
 * @text Cambiar Luz del Jugador
 * @arg enabled
 * @text Activada
 * @type boolean
 * @default true
 * @arg preset
 * @text Preset
 * @type text
 * @default torch
 * @arg radius
 * @text Radio
 * @type number
 * @min 0
 * @default 0
 * @arg color
 * @text Color
 * @type text
 * @default
 * @arg opacity
 * @text Opacidad
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @arg offsetX
 * @text Offset X
 * @type number
 * @default 0
 * @arg offsetY
 * @text Offset Y
 * @type number
 * @desc 999 = usar preset.
 * @default 999
 * @arg flicker
 * @text Parpadeo
 * @type text
 * @default
 * @arg pulse
 * @text Pulso
 * @type text
 * @default
 *
 * @arg switchId
 * @text Interruptor
 * @type switch
 * @desc 0 = sin interruptor. La luz sólo aparece si este interruptor está ON.
 * @default 0
 *
 * @command ClearPlayerLight
 * @text Apagar Luz del Jugador
 *
 * @command SetEventLight
 * @text Cambiar Luz de Evento
 * @arg eventId
 * @text ID del Evento
 * @type number
 * @min 0
 * @desc 0 = este evento.
 * @default 0
 * @arg enabled
 * @text Activada
 * @type boolean
 * @default true
 * @arg preset
 * @text Preset
 * @type text
 * @default torch
 * @arg radius
 * @text Radio
 * @type number
 * @min 0
 * @default 0
 * @arg color
 * @text Color
 * @type text
 * @default
 * @arg opacity
 * @text Opacidad
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @arg offsetX
 * @text Offset X
 * @type number
 * @default 0
 * @arg offsetY
 * @text Offset Y
 * @type number
 * @desc 999 = usar preset.
 * @default 999
 * @arg flicker
 * @text Parpadeo
 * @type text
 * @default
 * @arg pulse
 * @text Pulso
 * @type text
 * @default
 *
 * @arg switchId
 * @text Interruptor
 * @type switch
 * @desc 0 = sin interruptor. La luz sólo aparece si este interruptor está ON.
 * @default 0
 *
 * @command ClearEventLight
 * @text Apagar Luz de Evento
 * @arg eventId
 * @text ID del Evento
 * @type number
 * @min 0
 * @desc 0 = este evento.
 * @default 0
 *
 * @command ResetEventLight
 * @text Restablecer Luz de Evento
 * @arg eventId
 * @text ID del Evento
 * @type number
 * @min 0
 * @desc 0 = este evento.
 * @default 0
 *
 * @command AddStaticLight
 * @text Agregar Luz Estática
 * @arg id
 * @text ID Único
 * @type text
 * @default luz_1
 * @arg x
 * @text X
 * @type number
 * @default 0
 * @arg y
 * @text Y
 * @type number
 * @default 0
 * @arg preset
 * @text Preset
 * @type text
 * @default torch
 * @arg radius
 * @text Radio
 * @type number
 * @min 0
 * @default 0
 * @arg color
 * @text Color
 * @type text
 * @default
 * @arg opacity
 * @text Opacidad
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @command RemoveStaticLight
 * @text Quitar Luz Estática
 * @arg id
 * @text ID Único
 * @type text
 * @default luz_1
 *
 * @command RefreshLights
 * @text Refrescar Luces
 *
 * @help
 * Dex_LightingMZ v1.6
 * ============================================================================
 * Plugin nuevo para RPG Maker MZ.
 * No necesita imágenes. Las luces se generan por código.
 *
 * v1.0.1:
 * Corrige el error this._bitmap.addLoadListener is not a function.
 *
 * v1.0.2:
 * Permite ejecutar <Ambient>, <AmbientOpacity> y <Lighting> desde comentarios
 * dentro de eventos, elecciones y ramas condicionales.
 *
 * v1.1:
 * Agrega transiciones de día, tarde, noche, amanecer y ciclo automático.
 *
 * v1.2:
 * Agrega presets de ventanas, cuevas oscuras, antorcha del jugador por
 * interruptor y etiquetas de ambiente por preset.
 *
 * v1.2.1:
 * Corrige el ciclo día/noche para que no se reinicie si un comentario se
 * ejecuta en paralelo y ajusta la curva para que la noche sea más evidente.
 *
 * v1.3:
 * Agrega hora global entre mapas. Los mapas exteriores pueden heredar la hora
 * actual del ciclo y los interiores/cuevas pueden usar ambiente fijo mientras
 * el reloj global sigue avanzando.
 *
 * v1.3.1:
 * Refuerza carga de partida. Al cargar un save, el mapa actual vuelve a aplicar
 * su modo de tiempo sin reiniciar la hora global.
 *
 * v1.4:
 * Agrega luces de entrada de cueva que leen la hora global. Así la entrada se
 * ve clara de día, cálida de tarde y tenue/azulada de noche.
 *
 * v1.5:
 * Agrega luces automáticas por horario y etiquetas rápidas para farolas,
 * luminarias, ventanas, fogatas, velas, antorchas y cristales.
 *
 * v1.6:
 * Agrega control de superposición de luces para evitar que zonas con varias
 * farolas se quemen demasiado. Nuevo parámetro: Superposición de Luces.
 *
 * HORARIO:
 * <LightTime: night>
 * <LightTime: afternoon,night>
 * <LuzHorario: noche>
 * <LuzHorario: tarde,noche>
 * <LightTime: always>
 * <LuzHorario: siempre>
 *
 * ETIQUETAS RÁPIDAS:
 * <Farola>
 * <Farola: warm>
 * <Farola: cold>
 * <Farola: small>
 * <Luminaria>
 * <Ventana>
 * <Ventana: warm>
 * <Ventana: cold>
 * <Ventana: moon>
 * <Fogata>
 * <Vela>
 * <Antorcha>
 * <CristalViento>
 * <CristalHielo>
 * <CristalFuego>
 *
 * Por defecto:
 * - Farola / Luminaria / Ventana: tarde y noche.
 * - Fogata / Vela / Antorcha / Cristales: siempre.
 *
 * ENTRADA DE CUEVA:
 * <EntranceLight: outside>
 * <LuzEntrada: exterior>
 * <CaveEntranceLight: outside>
 *
 * Ajustes:
 * <LightWidth: 130>
 * <LightHeight: 340>
 * <LightOffsetY: 80>
 * <LightSoftness: 1>
 *
 * MAPAS:
 * <TimeMode: global>  / <ModoTiempo: global>
 * <TimeMode: fixed>   / <ModoTiempo: fijo>
 * <TimeMode: pause>   / <ModoTiempo: pausa>
 *
 * VENTANAS:
 * <WindowLight: warm>
 * <WindowLight: cold>
 * <WindowLight: moon>
 * <LuzVentana: calida>
 *
 * CUEVAS:
 * <AmbientPreset: caveDark>
 * <AmbientPreset: caveVeryDark>
 * <AmbientePreset: cuevaOscura>
 *
 * ANTORCHA DEL JUGADOR:
 * <PlayerLight: torchPlayer>
 * <PlayerLightSwitch: 25>
 * <LuzJugador: antorchaJugador>
 * <LuzJugadorInterruptor: 25>
 *
 * CICLO DÍA/NOCHE EN COMENTARIOS:
 * <TimeOfDay: day>
 * <TimeOfDay: afternoon>
 * <TimeOfDay: night>
 * <TimeOfDay: dawn>
 * <TimeFade: 120>
 *
 * <DayNightCycle: on>
 * <CycleSeconds: 300>
 *
 * Alias:
 * <HoraDia: dia>
 * <HoraDia: tarde>
 * <HoraDia: noche>
 * <CicloDiaNoche: on>
 *
 * NOTAS DE MAPA:
 * <Lighting: on>
 * <Lighting: off>
 * <Ambient: #101820>
 * <AmbientOpacity: 170>
 *
 * EVENTOS:
 * <Light: torch>
 * <LightRadius: 280>
 * <LightColor: #ffc27a>
 * <LightOpacity: 230>
 * <LightOffsetY: -24>
 * <LightFlicker: torch>
 * <LightPulse: fire>
 * <LightSwitch: 12>
 *
 * Alias español:
 * <Luz: antorcha>
 * <LuzRadio: 280>
 * <LuzColor: #ffc27a>
 * <LuzOpacidad: 230>
 * <LuzOffsetY: -24>
 * <LuzParpadeo: fire>
 * <LuzPulso: soft>
 * <LuzInterruptor: 12>
 *
 * PRESETS:
 * torch, candle, campfire, crystalBlue, crystalGreen,
 * magicWind, magicIce, magicFire, echoNatural, echoHope, moonSoft, firefly
 */

var Dex = Dex || {};
Dex.LightingMZ = Dex.LightingMZ || {};

(() => {
"use strict";

const pluginName = (() => {
    const script = document.currentScript;
    if (!script) return "Dex_LightingMZ";
    return decodeURIComponent((script.src || "Dex_LightingMZ.js").split("/").pop().replace(/\.js$/i, ""));
})();

const M = Dex.LightingMZ;
const P = PluginManager.parameters(pluginName);

const num = (k, d) => {
    const v = Number(P[k]);
    return Number.isFinite(v) ? v : d;
};
const txt = (k, d) => {
    const v = P[k];
    return v === undefined || v === null || v === "" ? d : String(v);
};
const boo = (k, d) => {
    const v = P[k];
    if (v === undefined || v === null || v === "") return d;
    return String(v).toLowerCase() === "true";
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const DEFAULTS = {
    enabled: boo("EnabledDefault", true),
    ambientColor: txt("DefaultAmbientColor", "#101820"),
    ambientOpacity: clamp(num("DefaultAmbientOpacity", 170), 0, 255),
    fadeFrames: Math.max(0, num("DefaultFadeFrames", 60)),
    playerPreset: txt("PlayerLightPreset", ""),
    debug: boo("DebugMode", false),
    overlapMode: txt("LightOverlapMode", "softCap"),
    overlapStrength: clamp(num("OverlapStrength", 70) / 100, 0, 1)
};

const log = (...args) => { if (DEFAULTS.debug) console.log("[Dex_LightingMZ]", ...args); };

function normHex(v, fallback) {
    let s = String(v || fallback || "#ffffff").trim();
    if (!s.startsWith("#")) s = "#" + s;
    if (/^#[0-9a-fA-F]{3}$/.test(s)) s = "#" + s[1]+s[1]+s[2]+s[2]+s[3]+s[3];
    return /^#[0-9a-fA-F]{6}$/.test(s) ? s.toLowerCase() : (fallback || "#ffffff");
}
function hexInt(v, fb) { return parseInt(normHex(v, fb).slice(1), 16); }
function rgb(i) { return { r:(i>>16)&255, g:(i>>8)&255, b:i&255 }; }
function rgbInt(r,g,b) { return (clamp(Math.round(r),0,255)<<16) | (clamp(Math.round(g),0,255)<<8) | clamp(Math.round(b),0,255); }
function lerp(a,b,t) { return a + (b-a)*t; }
function lerpColor(a,b,t) {
    const A = rgb(a), B = rgb(b);
    return rgbInt(lerp(A.r,B.r,t), lerp(A.g,B.g,t), lerp(A.b,B.b,t));
}
function textBool(v, d) {
    if (v === undefined || v === null || String(v).trim() === "") return d;
    const s = String(v).trim().toLowerCase();
    if (["true","on","yes","si","sí","1"].includes(s)) return true;
    if (["false","off","no","0"].includes(s)) return false;
    return d;
}

function normalizeLightTimeToken(value) {
    const s = String(value || "").trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");

    if (!s || ["always", "all", "siempre", "todo", "todos", "any"].includes(s)) return "always";
    if (["day", "dia", "manana"].includes(s)) return "day";
    if (["afternoon", "tarde", "sunset", "atardecer"].includes(s)) return "afternoon";
    if (["dusk", "anochecer", "ocaso"].includes(s)) return "dusk";
    if (["night", "noche"].includes(s)) return "night";
    if (["deepnight", "medianoche", "deep"].includes(s)) return "deepNight";
    if (["dawn", "amanecer"].includes(s)) return "dawn";

    return s;
}

function normalizeLightTimeRule(value) {
    if (value === undefined || value === null || String(value).trim() === "") return "";
    const raw = String(value).trim();

    if (/^(always|all|siempre|todo|todos)$/i.test(raw)) return "";

    const parts = raw.split(/[,;/|]+/).map(normalizeLightTimeToken).filter(Boolean);
    if (!parts.length || parts.includes("always")) return "";

    return [...new Set(parts)].join(",");
}

function currentPhaseFromProgress(progress) {
    const p = ((Number(progress || 0) % 1) + 1) % 1;

    if (p < 0.14) return "dawn";
    if (p < 0.50) return "day";
    if (p < 0.70) return "afternoon";
    if (p < 0.82) return "dusk";
    if (p < 0.92) return "night";

    return "deepNight";
}

function phaseMatchesRule(phase, rule) {
    rule = normalizeLightTimeRule(rule);
    if (!rule) return true;

    const tokens = rule.split(",").map(normalizeLightTimeToken);

    if (tokens.includes(phase)) return true;
    if (tokens.includes("night") && ["dusk", "night", "deepNight"].includes(phase)) return true;
    if (tokens.includes("afternoon") && ["afternoon", "dusk"].includes(phase)) return true;
    if (tokens.includes("day") && phase === "day") return true;
    if (tokens.includes("dawn") && phase === "dawn") return true;

    return false;
}

function tag(text, names) {
    names = Array.isArray(names) ? names : [names];
    for (const name of names) {
        const m = String(text || "").match(new RegExp("<" + name + "\\s*:\\s*([^>\\n\\r]+)>", "i"));
        if (m) return m[1].trim();
    }
    return null;
}
function hasTag(text, names) {
    names = Array.isArray(names) ? names : [names];
    for (const name of names) {
        if (new RegExp("<" + name + "(?:\\s*:\\s*[^>]+)?\\s*>", "i").test(String(text || ""))) return true;
    }
    return false;
}
function tagNum(text, names, d) {
    const v = tag(text, names);
    if (v === null) return d;
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
}
function tagText(text, names) {
    const v = tag(text, names);
    return v === null || String(v).trim() === "" ? null : String(v).trim();
}
function eventComments(event) {
    if (!event || !event.list) return "";
    return event.list().filter(c => c && (c.code === 108 || c.code === 408)).map(c => String(c.parameters[0] || "")).join("\n");
}
function lightPresetTag(text) {
    const m = String(text || "").match(/<(?:Light|Luz)(?:\s*:\s*([^>]+))?\s*>/i);
    return m ? (m[1] ? m[1].trim() : "default") : null;
}

const PRESETS = {
    default:{radius:240,color:"#ffffff",opacity:220,softness:.9,offsetX:0,offsetY:-24,flicker:"none",pulse:"none",pulseAmount:.06,pulseSpeed:.035},
    torch:{radius:270,color:"#ffbd73",opacity:235,softness:.92,offsetX:0,offsetY:-24,flicker:"torch",pulse:"fire",pulseAmount:.055,pulseSpeed:.05},
    torchPlayer:{radius:315,color:"#ffbd73",opacity:238,softness:.94,offsetX:0,offsetY:-30,flicker:"torch",pulse:"fire",pulseAmount:.055,pulseSpeed:.05},
    candle:{radius:150,color:"#ffd58a",opacity:210,softness:.95,offsetX:0,offsetY:-18,flicker:"soft",pulse:"soft",pulseAmount:.035,pulseSpeed:.035},
    campfire:{radius:440,color:"#ff9b45",opacity:245,softness:.92,offsetX:0,offsetY:-18,flicker:"fire",pulse:"fire",pulseAmount:.08,pulseSpeed:.055},
    crystalBlue:{radius:330,color:"#78d6ff",opacity:220,softness:.97,offsetX:0,offsetY:-24,flicker:"none",pulse:"magic",pulseAmount:.07,pulseSpeed:.03},
    crystalGreen:{radius:330,color:"#8cffb0",opacity:215,softness:.97,offsetX:0,offsetY:-24,flicker:"none",pulse:"magic",pulseAmount:.07,pulseSpeed:.03},
    magicWind:{radius:300,color:"#9dffaa",opacity:215,softness:.96,offsetX:0,offsetY:-20,flicker:"soft",pulse:"magic",pulseAmount:.06,pulseSpeed:.028},
    magicIce:{radius:310,color:"#93baff",opacity:215,softness:.98,offsetX:0,offsetY:-20,flicker:"none",pulse:"soft",pulseAmount:.045,pulseSpeed:.025},
    magicFire:{radius:320,color:"#ff5b4d",opacity:230,softness:.93,offsetX:0,offsetY:-20,flicker:"fire",pulse:"fire",pulseAmount:.075,pulseSpeed:.055},
    echoNatural:{radius:230,color:"#d2d6d8",opacity:180,softness:1,offsetX:0,offsetY:-12,flicker:"soft",pulse:"soft",pulseAmount:.035,pulseSpeed:.022},
    echoHope:{radius:260,color:"#ffe28a",opacity:210,softness:1,offsetX:0,offsetY:-12,flicker:"soft",pulse:"soft",pulseAmount:.045,pulseSpeed:.026},
    moonSoft:{radius:560,color:"#b8d4ff",opacity:145,softness:1,offsetX:0,offsetY:-32,flicker:"none",pulse:"none",pulseAmount:.02,pulseSpeed:.015},
    firefly:{radius:105,color:"#dfff8a",opacity:185,softness:1,offsetX:0,offsetY:-22,flicker:"soft",pulse:"magic",pulseAmount:.11,pulseSpeed:.05},
    streetLamp:{radius:210,color:"#ffd28a",opacity:205,softness:.95,offsetX:0,offsetY:-34,flicker:"soft",pulse:"soft",pulseAmount:.018,pulseSpeed:.018,timeRule:"afternoon,night"},
    streetLampSmall:{radius:165,color:"#ffd28a",opacity:185,softness:.96,offsetX:0,offsetY:-30,flicker:"soft",pulse:"soft",pulseAmount:.014,pulseSpeed:.016,timeRule:"afternoon,night"},
    streetLampCold:{radius:220,color:"#b8d4ff",opacity:175,softness:.98,offsetX:0,offsetY:-34,flicker:"none",pulse:"soft",pulseAmount:.012,pulseSpeed:.014,timeRule:"afternoon,night"},
    lantern:{radius:175,color:"#ffc982",opacity:195,softness:.94,offsetX:0,offsetY:-28,flicker:"soft",pulse:"soft",pulseAmount:.018,pulseSpeed:.020,timeRule:"afternoon,night"},
    windowWarm:{radius:140,width:230,height:105,color:"#ffd18a",opacity:170,softness:1,offsetX:0,offsetY:-18,flicker:"soft",pulse:"soft",pulseAmount:.020,pulseSpeed:.020,rotation:0,timeRule:"afternoon,night"},
    windowCold:{radius:140,width:230,height:105,color:"#9fc8ff",opacity:145,softness:1,offsetX:0,offsetY:-18,flicker:"none",pulse:"soft",pulseAmount:.015,pulseSpeed:.016,rotation:0,timeRule:"afternoon,night"},
    windowMoon:{radius:160,width:260,height:115,color:"#b8d4ff",opacity:130,softness:1,offsetX:0,offsetY:-18,flicker:"none",pulse:"none",pulseAmount:.000,pulseSpeed:.000,rotation:0,timeRule:"night"},
    caveEntrance:{radius:180,width:130,height:340,color:"#e8f2ff",opacity:220,softness:1,offsetX:0,offsetY:80,flicker:"none",pulse:"soft",pulseAmount:.012,pulseSpeed:.012,rotation:0,entranceMode:"outside"}
};
const ALIAS = {
    antorcha:"torch", antorchajugador:"torchPlayer", torchplayer:"torchPlayer", vela:"candle", fogata:"campfire",
    cristalazul:"crystalBlue", cristalverde:"crystalGreen",
    viento:"magicWind", hielo:"magicIce", fuego:"magicFire", econatural:"echoNatural", ecoesperanza:"echoHope",
    esperanza:"echoHope", luna:"moonSoft", luciernaga:"firefly", "luciérnaga":"firefly",
    ventanacalida:"windowWarm", ventanacálida:"windowWarm", calida:"windowWarm", cálida:"windowWarm", warm:"windowWarm",
    ventanafria:"windowCold", ventanafría:"windowCold", fria:"windowCold", fría:"windowCold", cold:"windowCold",
    ventanaluna:"windowMoon", lunares:"windowMoon", moon:"windowMoon", moonlight:"windowMoon",
    entradacueva:"caveEntrance", entrada:"caveEntrance", caveentrance:"caveEntrance", exterior:"caveEntrance", outside:"caveEntrance",
    farola:"streetLamp", farol:"streetLamp", luminaria:"streetLamp", lampara:"streetLamp", lámpara:"streetLamp",
    farolapequena:"streetLampSmall", farolapequeña:"streetLampSmall", farolsmall:"streetLampSmall", smalllamp:"streetLampSmall",
    farolafria:"streetLampCold", farolafría:"streetLampCold", farolcold:"streetLampCold",
    linterna:"lantern", lantern:"lantern",
    ventana:"windowWarm", ventanacasa:"windowWarm", housewindow:"windowWarm",
    cristalviento:"magicWind", cristalhielo:"magicIce", cristalfuego:"magicFire"
};
const AMBIENT_PRESETS = {
    day:{color:"#dfefff", opacity:20},
    forestDay:{color:"#b8d8c8", opacity:40},
    afternoon:{color:"#c9784d", opacity:95},
    night:{color:"#0b1420", opacity:175},
    caveSoft:{color:"#08101a", opacity:195},
    caveDark:{color:"#030407", opacity:225},
    caveVeryDark:{color:"#000000", opacity:240}
};

const AMBIENT_ALIAS = {
    dia:"day", día:"day", day:"day",
    bosquedia:"forestDay", forestday:"forestDay",
    tarde:"afternoon", afternoon:"afternoon", atardecer:"afternoon",
    noche:"night", night:"night",
    cueva:"caveDark", cave:"caveDark", cuevaoscura:"caveDark", cuevaoscuridad:"caveDark", cavedark:"caveDark",
    cuevasuave:"caveSoft", cavesoft:"caveSoft",
    cuevamuyoscura:"caveVeryDark", cuevamuynegra:"caveVeryDark", caveverydark:"caveVeryDark", verydark:"caveVeryDark"
};

function ambientPresetName(name) {
    const raw = String(name || "day").trim();
    const compact = raw.replace(/\s+/g,"").replace(/[_-]+/g,"").toLowerCase();

    if (AMBIENT_ALIAS[compact]) return AMBIENT_ALIAS[compact];

    for (const k in AMBIENT_PRESETS) {
        if (k.toLowerCase() === raw.toLowerCase()) return k;
    }

    return "day";
}

function streetLampPresetName(value) {
    const raw = String(value || "warm").trim();
    const compact = raw.replace(/\s+/g,"").replace(/[_-]+/g,"").toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (["small", "pequena", "pequeña", "chica", "mini"].includes(compact)) return "streetLampSmall";
    if (["cold", "fria", "fría", "azul", "blue"].includes(compact)) return "streetLampCold";
    if (["lantern", "linterna"].includes(compact)) return "lantern";
    if (["warm", "calida", "cálida", "dorada", "dorado", "amarilla", "yellow"].includes(compact)) return "streetLamp";

    return presetName(raw);
}

function quickTagValue(text, names, fallback) {
    const v = tag(text, names);
    if (v !== null) return v;
    return hasTag(text, names) ? fallback : null;
}

function windowPresetName(value) {
    const raw = String(value || "warm").trim();
    const compact = raw.replace(/\s+/g,"").replace(/[_-]+/g,"").toLowerCase();

    if (["warm", "calida", "cálida", "dorado", "dorada", "amarilla", "yellow"].includes(compact)) return "windowWarm";
    if (["cold", "fria", "fría", "azul", "blue"].includes(compact)) return "windowCold";
    if (["moon", "luna", "lunar", "moonlight"].includes(compact)) return "windowMoon";

    return presetName(raw);
}

function presetName(name) {
    let raw = String(name || "default").trim();
    const compact = raw.replace(/\s+/g,"").replace(/[_-]+/g,"").toLowerCase();
    if (ALIAS[compact]) return ALIAS[compact];
    if (PRESETS[raw]) return raw;
    for (const k in PRESETS) if (k.toLowerCase() === raw.toLowerCase()) return k;
    return "default";
}
function makeConfig(name, o) {
    const c = Object.assign({}, PRESETS[presetName(name)] || PRESETS.default);
    o = o || {};
    if (o.radius && Number(o.radius) > 0) c.radius = Number(o.radius);
    if (o.width && Number(o.width) > 0) c.width = Number(o.width);
    if (o.height && Number(o.height) > 0) c.height = Number(o.height);
    if (o.rotation !== null && o.rotation !== undefined) c.rotation = Number(o.rotation);
    if (o.color) c.color = normHex(o.color, c.color);
    if (o.opacity && Number(o.opacity) > 0) c.opacity = clamp(Number(o.opacity),0,255);
    if (o.softness !== null && o.softness !== undefined) c.softness = clamp(Number(o.softness),.05,1);
    if (o.offsetX !== null && o.offsetX !== undefined) c.offsetX = Number(o.offsetX);
    if (o.offsetY !== null && o.offsetY !== undefined && Number(o.offsetY) !== 999) c.offsetY = Number(o.offsetY);
    if (o.flicker) c.flicker = String(o.flicker);
    if (o.pulse) c.pulse = String(o.pulse);
    if (o.entranceMode) c.entranceMode = String(o.entranceMode);
    if (o.pulseAmount !== null && o.pulseAmount !== undefined) c.pulseAmount = Number(o.pulseAmount);
    if (o.pulseSpeed !== null && o.pulseSpeed !== undefined) c.pulseSpeed = Number(o.pulseSpeed);
    if (o.switchId !== null && o.switchId !== undefined) c.switchId = Number(o.switchId);
    if (o.timeRule !== null && o.timeRule !== undefined) c.timeRule = normalizeLightTimeRule(o.timeRule);
    else c.timeRule = normalizeLightTimeRule(c.timeRule || "");
    c.enabled = o.enabled !== undefined ? !!o.enabled : true;
    c.radius = Math.max(1, Number(c.radius || 240));
    c.width = Math.max(1, Number(c.width || c.radius * 2));
    c.height = Math.max(1, Number(c.height || c.radius * 2));
    c.rotation = Number(c.rotation || 0);
    c.opacity = clamp(Number(c.opacity || 220),0,255);
    c.softness = clamp(Number(c.softness || .9),.05,1);
    c.color = normHex(c.color, "#ffffff");
    c.colorInt = hexInt(c.color, "#ffffff");
    c.switchId = Number(c.switchId || 0);
    c.entranceMode = String(c.entranceMode || "");
    return c;
}
function lightOverridesFromText(comments, prefix) {
    prefix = prefix || "Light";

    return {
        radius: tagNum(comments, [prefix + "Radius", "LuzRadio"], 0),
        width: tagNum(comments, [prefix + "Width", "LuzAncho", "WindowWidth", "VentanaAncho"], 0),
        height: tagNum(comments, [prefix + "Height", "LuzAlto", "WindowHeight", "VentanaAlto"], 0),
        rotation: tagNum(comments, [prefix + "Rotation", prefix + "Angle", "LuzRotacion", "LuzÁngulo", "VentanaAngulo"], null),
        color: tagText(comments, [prefix + "Color", "LuzColor"]),
        opacity: tagNum(comments, [prefix + "Opacity", "LuzOpacidad"], 0),
        softness: tagNum(comments, [prefix + "Softness", "LuzSuavidad"], null),
        offsetX: tagNum(comments, [prefix + "OffsetX", "LuzOffsetX"], null),
        offsetY: tagNum(comments, [prefix + "OffsetY", "LuzOffsetY"], null),
        flicker: tagText(comments, [prefix + "Flicker", "LuzParpadeo"]),
        pulse: tagText(comments, [prefix + "Pulse", "LuzPulso"]),
        pulseAmount: tagNum(comments, [prefix + "PulseAmount", "LuzPulsoCantidad"], null),
        pulseSpeed: tagNum(comments, [prefix + "PulseSpeed", "LuzPulsoVelocidad"], null),
        switchId: tagNum(comments, [prefix + "Switch", "LuzInterruptor"], 0),
        timeRule: tagText(comments, [prefix + "Time", prefix + "Schedule", prefix + "Only", "LuzHorario", "LuzTiempo", "HorarioLuz"])
    };
}

function quickConfigFromComments(comments) {
    let raw = quickTagValue(comments, ["StreetLamp", "Farola", "Farol", "Luminaria", "LampPost"], "warm");

    if (raw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        return makeConfig(streetLampPresetName(raw), overrides);
    }

    raw = quickTagValue(comments, ["HouseWindow", "VentanaCasa", "Ventana"], "warm");

    if (raw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        return makeConfig(windowPresetName(raw), overrides);
    }

    raw = quickTagValue(comments, ["Campfire", "Fogata"], "campfire");

    if (raw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        return makeConfig("campfire", overrides);
    }

    raw = quickTagValue(comments, ["Candle", "Vela"], "candle");

    if (raw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        return makeConfig("candle", overrides);
    }

    raw = quickTagValue(comments, ["Torch", "Antorcha"], "torch");

    if (raw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        return makeConfig("torch", overrides);
    }

    if (hasTag(comments, ["WindCrystal", "CristalViento"])) {
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = true;
        return makeConfig("magicWind", overrides);
    }

    if (hasTag(comments, ["IceCrystal", "CristalHielo"])) {
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = true;
        return makeConfig("magicIce", overrides);
    }

    if (hasTag(comments, ["FireCrystal", "CristalFuego"])) {
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = true;
        return makeConfig("magicFire", overrides);
    }

    return null;
}

function configFromComments(comments) {
    const entranceRaw = tag(comments, ["EntranceLight", "CaveEntranceLight", "LuzEntrada", "LuzEntradaCueva"]);

    if (entranceRaw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);
        overrides.entranceMode = "outside";

        return makeConfig("caveEntrance", overrides);
    }

    const quick = quickConfigFromComments(comments);
    if (quick) return quick;

    const windowRaw = tag(comments, ["WindowLight", "LuzVentana"]);

    if (windowRaw !== null) {
        const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
        const overrides = lightOverridesFromText(comments, "Light");
        overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);

        return makeConfig(windowPresetName(windowRaw), overrides);
    }

    if (!hasTag(comments, ["Light","Luz"])) return null;

    const enabledRaw = tag(comments, ["LightEnabled","LuzActivada"]);
    const overrides = lightOverridesFromText(comments, "Light");
    overrides.enabled = enabledRaw === null ? true : textBool(enabledRaw, true);

    return makeConfig(lightPresetTag(comments), overrides);
}

function playerLightFromText(text) {
    const raw = tag(text, ["PlayerLight", "LuzJugador"]);

    if (raw === null) return null;

    if (["off", "false", "none", "no", "apagada", "apagar"].includes(String(raw).trim().toLowerCase())) {
        return makeConfig("default", { enabled:false });
    }

    const enabledRaw = tag(text, ["PlayerLightEnabled", "LuzJugadorActivada"]);
    const overrides = {
        enabled: enabledRaw === null ? true : textBool(enabledRaw, true),
        radius: tagNum(text, ["PlayerLightRadius", "LuzJugadorRadio"], 0),
        width: tagNum(text, ["PlayerLightWidth", "LuzJugadorAncho"], 0),
        height: tagNum(text, ["PlayerLightHeight", "LuzJugadorAlto"], 0),
        rotation: tagNum(text, ["PlayerLightRotation", "PlayerLightAngle", "LuzJugadorRotacion"], null),
        color: tagText(text, ["PlayerLightColor", "LuzJugadorColor"]),
        opacity: tagNum(text, ["PlayerLightOpacity", "LuzJugadorOpacidad"], 0),
        softness: tagNum(text, ["PlayerLightSoftness", "LuzJugadorSuavidad"], null),
        offsetX: tagNum(text, ["PlayerLightOffsetX", "LuzJugadorOffsetX"], null),
        offsetY: tagNum(text, ["PlayerLightOffsetY", "LuzJugadorOffsetY"], null),
        flicker: tagText(text, ["PlayerLightFlicker", "LuzJugadorParpadeo"]),
        pulse: tagText(text, ["PlayerLightPulse", "LuzJugadorPulso"]),
        pulseAmount: tagNum(text, ["PlayerLightPulseAmount", "LuzJugadorPulsoCantidad"], null),
        pulseSpeed: tagNum(text, ["PlayerLightPulseSpeed", "LuzJugadorPulsoVelocidad"], null),
        switchId: tagNum(text, ["PlayerLightSwitch", "LuzJugadorInterruptor"], 0),
        timeRule: tagText(text, ["PlayerLightTime", "LuzJugadorHorario", "LuzJugadorTiempo"])
    };

    return makeConfig(raw, overrides);
}

function normalizeTimeMode(value) {
    if (value === null || value === undefined || String(value).trim() === "") return null;

    const s = String(value).trim().toLowerCase();

    if (["global", "inherit", "sync", "on", "true", "si", "sí", "1"].includes(s)) return "global";
    if (["fixed", "local", "off", "false", "no", "0", "fijo", "interior"].includes(s)) return "fixed";
    if (["pause", "paused", "pausa", "pausar"].includes(s)) return "pause";

    return null;
}

function mapSettings(note) {
    note = String(note || "");
    const light = tag(note, "Lighting");
    const cycleRaw = tag(note, ["DayNightCycle", "CicloDiaNoche"]);
    const ambientRaw = tag(note, ["Ambient","AmbientColor","Ambiente","ColorAmbiente"]);
    const opacityRaw = tag(note, ["AmbientOpacity","OpacidadAmbiente"]);
    const ambientPresetRaw = tag(note, ["AmbientPreset", "AmbientePreset", "CaveLighting", "CuevaLuz", "Cueva"]);

    return {
        enabled: light === null ? DEFAULTS.enabled : textBool(light, DEFAULTS.enabled),
        color: normHex(ambientRaw || DEFAULTS.ambientColor, DEFAULTS.ambientColor),
        opacity: clamp(opacityRaw === null ? DEFAULTS.ambientOpacity : Number(opacityRaw), 0, 255),
        hasAmbient: ambientRaw !== null || opacityRaw !== null,
        ambientPreset: ambientPresetRaw,
        timeMode: normalizeTimeMode(tag(note, ["TimeMode", "ModoTiempo", "UseGlobalTime", "UsarHoraGlobal"])),
        playerLight: playerLightFromText(note),
        timeOfDay: tag(note, ["TimeOfDay", "HoraDia", "HoraDelDia"]),
        dayNightCycle: cycleRaw === null ? null : textBool(cycleRaw, false),
        cycleSeconds: tagNum(note, ["CycleSeconds", "SegundosCiclo"], 300)
    };
}

M._cache = {};
M._layer = null;
M._frame = 0;
M._ambient = {
    color: hexInt(DEFAULTS.ambientColor, "#101820"),
    targetColor: hexInt(DEFAULTS.ambientColor, "#101820"),
    startColor: hexInt(DEFAULTS.ambientColor, "#101820"),
    opacity: DEFAULTS.ambientOpacity,
    targetOpacity: DEFAULTS.ambientOpacity,
    startOpacity: DEFAULTS.ambientOpacity,
    duration: 1,
    count: 1
};

M.state = function() {
    if (!$gameSystem._dexLightingMZ) {
        $gameSystem._dexLightingMZ = {
            enabled: DEFAULTS.enabled,
            mapEnabled: DEFAULTS.enabled,
            playerLight: DEFAULTS.playerPreset ? makeConfig(DEFAULTS.playerPreset, {enabled:true}) : null,
            eventOverrides: {},
            staticLights: {},
            mapTimeMode: "fixed",
            dayNight: {
                enabled: false,
                progress: 0.25,
                seconds: 300,
                delay: 0,
                startPhase: "",
                commandKey: ""
            }
        };
    }

    if (!$gameSystem._dexLightingMZ.dayNight) {
        $gameSystem._dexLightingMZ.dayNight = {
            enabled: false,
            progress: 0.25,
            seconds: 300,
            delay: 0,
            startPhase: "",
            commandKey: ""
        };
    }

    if ($gameSystem._dexLightingMZ.dayNight.startPhase === undefined) {
        $gameSystem._dexLightingMZ.dayNight.startPhase = "";
    }
    if ($gameSystem._dexLightingMZ.dayNight.commandKey === undefined) {
        $gameSystem._dexLightingMZ.dayNight.commandKey = "";
    }
    if ($gameSystem._dexLightingMZ.mapTimeMode === undefined) {
        $gameSystem._dexLightingMZ.mapTimeMode = "fixed";
    }

    return $gameSystem._dexLightingMZ;
};
M.staticMap = function() {
    const st = this.state();
    const id = $gameMap ? $gameMap.mapId() : 0;
    st.staticLights[id] = st.staticLights[id] || {};
    return st.staticLights[id];
};
M.eventKey = function(id) { return String($gameMap.mapId()) + ":" + String(id); };
M.setAmbient = function(color, opacity, duration) {
    duration = Math.max(0, Number(duration || 0));
    this._ambient.startColor = this._ambient.color;
    this._ambient.startOpacity = this._ambient.opacity;
    this._ambient.targetColor = hexInt(color, DEFAULTS.ambientColor);
    this._ambient.targetOpacity = clamp(Number(opacity),0,255);
    this._ambient.duration = Math.max(1, duration);
    this._ambient.count = 0;
    if (duration <= 0) {
        this._ambient.color = this._ambient.targetColor;
        this._ambient.opacity = this._ambient.targetOpacity;
        this._ambient.count = this._ambient.duration;
    }
};
M.applyAmbientPreset = function(name, duration, options) {
    const key = ambientPresetName(name);
    const preset = AMBIENT_PRESETS[key] || AMBIENT_PRESETS.day;
    options = options || {};

    if (!options.keepCycle) {
        this.stopDayNightCycle();
    }

    this.setAmbient(preset.color, preset.opacity, Number(duration || 0));
};

M.updateAmbient = function() {
    const a = this._ambient;
    if (a.count < a.duration) {
        a.count++;
        const t = clamp(a.count / a.duration, 0, 1);
        a.color = lerpColor(a.startColor, a.targetColor, t);
        a.opacity = lerp(a.startOpacity, a.targetOpacity, t);
    }
};
M.resolveMapTimeMode = function(settings) {
    if (settings.timeMode) return settings.timeMode;

    if (settings.ambientPreset || settings.hasAmbient || settings.timeOfDay) return "fixed";
    if (this.dayNight().enabled) return "global";

    return "fixed";
};

M.applyDayNightVisual = function() {
    const sample = this.sampleDayNight(this.dayNight().progress);

    this._ambient.color = sample.color;
    this._ambient.opacity = sample.opacity;
    this._ambient.startColor = sample.color;
    this._ambient.targetColor = sample.color;
    this._ambient.startOpacity = sample.opacity;
    this._ambient.targetOpacity = sample.opacity;
    this._ambient.count = this._ambient.duration;
};

M.applyMap = function(s) {
    const state = this.state();
    state.mapEnabled = s.enabled;

    if (s.playerLight) {
        if (s.playerLight.enabled === false) state.playerLight = null;
        else state.playerLight = s.playerLight;
    }

    if (s.dayNightCycle === true) {
        state.mapTimeMode = "global";
        this.startDayNightCycle(s.timeOfDay || this.dayNight().startPhase || "day", s.cycleSeconds || 300, 0);
        this.applyDayNightVisual();
        return;
    }

    if (s.dayNightCycle === false) {
        this.stopDayNightCycle();
        state.mapTimeMode = "fixed";
    }

    if (s.timeOfDay && s.dayNightCycle !== true) {
        state.mapTimeMode = s.timeMode || "fixed";
        this.setTimeOfDay(s.timeOfDay, 0, state.mapTimeMode === "global", s.cycleSeconds || 0);
        return;
    }

    const mode = this.resolveMapTimeMode(s);
    state.mapTimeMode = mode;

    if (mode === "global" && this.dayNight().enabled) {
        this.applyDayNightVisual();
        return;
    }

    if (s.ambientPreset) {
        this.applyAmbientPreset(s.ambientPreset, 0, { keepCycle:true });
        return;
    }

    this.setAmbient(s.color, s.opacity, 0);
};
M.refreshCurrentMapSettings = function() {
    if (!$dataMap) return;

    this.applyMap(mapSettings($dataMap.note || ""));
};

M.enabled = function() {
    const st = this.state();
    return st.enabled !== false && st.mapEnabled !== false;
};
M.DAY_NIGHT_TIMELINE = [
    { t: 0.00, key: "dawn", color: "#806b86", opacity: 105 },
    { t: 0.14, key: "day", color: "#dfefff", opacity: 20 },
    { t: 0.42, key: "day", color: "#dfefff", opacity: 20 },
    { t: 0.58, key: "afternoon", color: "#c9784d", opacity: 95 },
    { t: 0.70, key: "dusk", color: "#5c3143", opacity: 155 },
    { t: 0.82, key: "night", color: "#0b1420", opacity: 185 },
    { t: 0.92, key: "deepNight", color: "#05070d", opacity: 205 },
    { t: 1.00, key: "dawn", color: "#806b86", opacity: 105 }
];

M.ENTRANCE_LIGHT_TIMELINE = [
    { t: 0.00, key: "dawn", color: "#c3b4da", opacity: 110 },
    { t: 0.14, key: "day", color: "#e8f2ff", opacity: 220 },
    { t: 0.42, key: "day", color: "#e8f2ff", opacity: 220 },
    { t: 0.58, key: "afternoon", color: "#ffd08a", opacity: 190 },
    { t: 0.70, key: "dusk", color: "#c88b8f", opacity: 130 },
    { t: 0.82, key: "night", color: "#9fb8ff", opacity: 85 },
    { t: 0.92, key: "deepNight", color: "#7f94c8", opacity: 55 },
    { t: 1.00, key: "dawn", color: "#c3b4da", opacity: 110 }
];

M.phaseProgress = function(phase) {
    const s = String(phase || "day").trim().toLowerCase();

    if (["dia", "día", "day", "mañana", "manana"].includes(s)) return 0.25;
    if (["tarde", "afternoon", "sunset", "atardecer"].includes(s)) return 0.58;
    if (["anochecer", "dusk", "ocaso"].includes(s)) return 0.70;
    if (["noche", "night"].includes(s)) return 0.84;
    if (["medianoche", "deepnight", "deep_night"].includes(s)) return 0.92;
    if (["amanecer", "dawn"].includes(s)) return 0.00;

    return 0.25;
};

M.smoothStep = function(t) {
    t = clamp(Number(t || 0), 0, 1);
    return t * t * (3 - 2 * t);
};


M.sampleDayNight = function(progress) {
    const p = ((Number(progress) % 1) + 1) % 1;
    const timeline = this.DAY_NIGHT_TIMELINE;

    let a = timeline[0];
    let b = timeline[timeline.length - 1];

    for (let i = 0; i < timeline.length - 1; i++) {
        if (p >= timeline[i].t && p <= timeline[i + 1].t) {
            a = timeline[i];
            b = timeline[i + 1];
            break;
        }
    }

    const span = Math.max(0.0001, b.t - a.t);
    const t = this.smoothStep(clamp((p - a.t) / span, 0, 1));
    const color = lerpColor(hexInt(a.color, "#000000"), hexInt(b.color, "#000000"), t);
    const opacity = lerp(a.opacity, b.opacity, t);

    return { color: color, opacity: opacity };
};

M.sampleEntranceLight = function(progress) {
    const p = ((Number(progress) % 1) + 1) % 1;
    const timeline = this.ENTRANCE_LIGHT_TIMELINE;

    let a = timeline[0];
    let b = timeline[timeline.length - 1];

    for (let i = 0; i < timeline.length - 1; i++) {
        if (p >= timeline[i].t && p <= timeline[i + 1].t) {
            a = timeline[i];
            b = timeline[i + 1];
            break;
        }
    }

    const span = Math.max(0.0001, b.t - a.t);
    const t = this.smoothStep(clamp((p - a.t) / span, 0, 1));
    const color = lerpColor(hexInt(a.color, "#ffffff"), hexInt(b.color, "#ffffff"), t);
    const opacity = lerp(a.opacity, b.opacity, t);

    return { color: color, opacity: opacity };
};

M.dynamicLightConfig = function(config) {
    if (!config || !config.entranceMode) return config;

    const c = Object.assign({}, config);
    const dn = this.dayNight();
    const progress = Number(dn.progress || this.phaseProgress("day"));
    const sample = this.sampleEntranceLight(progress);

    c.colorInt = sample.color;
    c.color = this.colorText(sample.color);
    c.opacity = sample.opacity;

    return c;
};

M.currentPhase = function() {
    const dn = this.dayNight ? this.dayNight() : null;
    const progress = dn ? Number(dn.progress || this.phaseProgress("day")) : this.phaseProgress("day");
    return currentPhaseFromProgress(progress);
};

M.lightTimeAllowed = function(config) {
    if (!config || !config.timeRule) return true;
    return phaseMatchesRule(this.currentPhase(), config.timeRule);
};


M.colorText = function(colorInt) {
    return "#" + Number(colorInt || 0).toString(16).padStart(6, "0");
};

M.dayNight = function() {
    return this.state().dayNight;
};

M.setTimeOfDay = function(phase, duration, continueCycle, seconds) {
    const dn = this.dayNight();
    const progress = this.phaseProgress(phase);
    const sample = this.sampleDayNight(progress);

    dn.progress = progress;
    dn.enabled = !!continueCycle;
    dn.delay = Math.max(0, Number(duration || 0));
    dn.startPhase = String(phase || "day");
    this.state().mapTimeMode = continueCycle ? "global" : "fixed";

    if (Number(seconds || 0) > 0) {
        dn.seconds = Math.max(10, Number(seconds));
    }

    this.setAmbient(this.colorText(sample.color), sample.opacity, Number(duration || 0));
};

M.startDayNightCycle = function(startPhase, seconds, fade, options) {
    const dn = this.dayNight();
    options = options || {};

    if (Number(seconds || 0) > 0) {
        dn.seconds = Math.max(10, Number(seconds));
    }

    const key = String(startPhase || "day") + "|" + String(dn.seconds);

    // Si el mismo comentario se ejecuta en paralelo, no reiniciamos el ciclo
    // cada frame. Antes esto podía dejar el ciclo atrapado visualmente.
    if (!options.force && dn.enabled && dn.commandKey === key) {
        return;
    }

    dn.commandKey = key;
    dn.enabled = true;
    this.setTimeOfDay(startPhase || "day", Number(fade || 0), true, dn.seconds);
};

M.stopDayNightCycle = function() {
    const dn = this.dayNight();
    dn.enabled = false;
    dn.delay = 0;
    dn.commandKey = "";
    this.state().mapTimeMode = "fixed";
};

M.setCycleSpeed = function(seconds) {
    const dn = this.dayNight();
    dn.seconds = Math.max(10, Number(seconds || 300));
};

M.updateDayNightCycle = function() {
    const dn = this.dayNight();
    const mode = this.state().mapTimeMode || "fixed";

    if (!dn.enabled) return;
    if (mode === "pause") return;

    if (dn.delay > 0) {
        dn.delay--;
        return;
    }

    const frames = Math.max(1, Number(dn.seconds || 300) * 60);
    dn.progress = (Number(dn.progress || 0) + 1 / frames) % 1;

    if (mode === "global") {
        this.applyDayNightVisual();
    }
};

M.overlapMode = function() {
    const s = String(DEFAULTS.overlapMode || "softCap").trim().toLowerCase();

    if (["normal", "none", "noadd", "sinacumulacion", "sinacumulación"].includes(s)) return "normal";
    if (["add", "additive", "classic", "clasico", "clásico"].includes(s)) return "additive";

    return "softCap";
};

M.lightSpriteBlendMode = function() {
    if (this.overlapMode() === "normal") return PIXI.BLEND_MODES.NORMAL;
    return PIXI.BLEND_MODES.ADD;
};

M.overlapStrength = function() {
    return clamp(Number(DEFAULTS.overlapStrength || 0), 0, 1);
};

M.gradient = function(softness) {
    const key = "s" + Math.round(clamp(Number(softness || 1), .05, 1) * 100);
    if (this._cache[key]) return this._cache[key];
    const size = 512;
    const bitmap = new Bitmap(size, size);
    const ctx = bitmap.context;
    const c = size/2;
    const g = ctx.createRadialGradient(c,c,0,c,c,c);
    const core = clamp(1 - Number(softness || 1), 0, .86);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(core, "rgba(255,255,255,1)");
    g.addColorStop(.72, "rgba(255,255,255,.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,size,size);
    if (bitmap.baseTexture && bitmap.baseTexture.update) bitmap.baseTexture.update();
    else if (bitmap._baseTexture && bitmap._baseTexture.update) bitmap._baseTexture.update();
    this._cache[key] = bitmap;
    return bitmap;
};
M.flicker = function(mode, frame, seed) {
    mode = String(mode || "none").toLowerCase();
    if (mode === "soft") return .96 + Math.sin(frame*.08+seed)*.025 + Math.sin(frame*.031+seed*1.7)*.018;
    if (mode === "torch" || mode === "fire") return .91 + Math.sin(frame*.17+seed)*.055 + Math.sin(frame*.49+seed*2.1)*.035 + Math.sin(frame*.071+seed*.4)*.03;
    if (mode === "unstable") return .84 + Math.sin(frame*.27+seed)*.095 + Math.sin(frame*.71+seed*1.3)*.07;
    return 1;
};
M.pulse = function(c, frame, seed) {
    const mode = String(c.pulse || "none").toLowerCase();
    const amount = Number(c.pulseAmount || 0), speed = Number(c.pulseSpeed || .03);
    if (!amount || mode === "none" || mode === "off") return 1;
    if (mode === "magic") return 1 + Math.sin(frame*speed+seed)*amount + Math.sin(frame*speed*2.7+seed*.4)*amount*.35;
    if (mode === "fire") return 1 + Math.sin(frame*speed+seed)*amount + Math.sin(frame*speed*5.2+seed*1.1)*amount*.45;
    return 1 + Math.sin(frame*speed+seed)*amount;
};
M.collect = function() {
    const out = [], st = this.state();
    if (st.playerLight && st.playerLight.enabled !== false) {
        if ((!st.playerLight.switchId || $gameSwitches.value(st.playerLight.switchId)) && this.lightTimeAllowed(st.playerLight)) {
            out.push({key:"player", config:st.playerLight, character:$gamePlayer});
        }
    }
    if ($gameMap && $gameMap.events) {
        for (const ev of $gameMap.events()) {
            const ov = st.eventOverrides[this.eventKey(ev.eventId())];
            const c = ov || ev._dexLightConfig;
            if (!c || c.enabled === false || ev._erased) continue;
            if (c.switchId > 0 && !$gameSwitches.value(c.switchId)) continue;
            if (!this.lightTimeAllowed(c)) continue;
            out.push({key:"event:"+ev.eventId(), config:c, character:ev});
        }
    }
    const sm = this.staticMap();
    for (const id in sm) {
        const c = sm[id];
        if (!c || c.enabled === false) continue;
        if (c.switchId > 0 && !$gameSwitches.value(c.switchId)) continue;
        if (!this.lightTimeAllowed(c)) continue;
        out.push({key:"static:"+id, config:c, stat:true});
    }
    return out;
};
M.pos = function(l) {
    const c = l.config, tw = $gameMap.tileWidth(), th = $gameMap.tileHeight();
    if (l.stat) return {x:Math.round($gameMap.adjustX(c.mapX)*tw + tw/2 + c.offsetX), y:Math.round($gameMap.adjustY(c.mapY)*th + th/2 + c.offsetY)};
    return {x:Math.round(l.character.screenX()+c.offsetX), y:Math.round(l.character.screenY()+c.offsetY)};
};
M.refresh = function() {
    if (!$gameMap || !$gameMap.events) return;
    for (const ev of $gameMap.events()) if (ev.dexSetupLighting) ev.dexSetupLighting();
};

class DexLightingLayer {
    constructor(spriteset) {
        this._spriteset = spriteset;
        this._sprites = {};
        this._w = Graphics.width;
        this._h = Graphics.height;
        this._texture = PIXI.RenderTexture.create(this._w, this._h);
        this.sprite = new PIXI.Sprite(this._texture);
        this.sprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this._container = new PIXI.Container();
        this._ambient = new PIXI.Graphics();
        this._lights = new PIXI.Container();
        this._container.addChild(this._ambient);
        this._container.addChild(this._lights);
    }
    destroy() {
        for (const k in this._sprites) this._sprites[k].destroy();
        this._container.destroy({children:true});
        this.sprite.destroy({ texture: true, baseTexture: false });
    }
    ensureSize() {
        if (this._w === Graphics.width && this._h === Graphics.height) return;
        this._w = Graphics.width; this._h = Graphics.height;
        this._texture.resize(this._w, this._h);
    }
    drawAmbient() {
        const a = M._ambient;
        this._ambient.clear();
        this._ambient.beginFill(a.color, clamp(a.opacity/255, 0, 1));
        this._ambient.drawRect(0,0,Graphics.width,Graphics.height);
        this._ambient.endFill();
    }
    spriteFor(key, c) {
        let s = this._sprites[key];
        if (!s) {
            s = new Sprite(M.gradient(c.softness));
            s.anchor.set(.5);
            s._dexSeed = Math.random() * Math.PI * 2;
            this._sprites[key] = s;
            this._lights.addChild(s);
        }

        s.bitmap = M.gradient(c.softness);
        s.blendMode = M.lightSpriteBlendMode();

        return s;
    }
    overlapRadius(c) {
        const w = Number(c.width || c.radius * 2 || 1);
        const h = Number(c.height || c.radius * 2 || 1);
        return Math.max(1, Math.max(w, h) * .5);
    }
    overlapScale(entry, entries) {
        if (M.overlapMode() !== "softCap") return 1;

        const strength = M.overlapStrength();
        if (strength <= 0) return 1;

        let pressure = 0;
        const r1 = this.overlapRadius(entry.c);

        for (const other of entries) {
            if (other === entry) continue;

            const r2 = this.overlapRadius(other.c);
            const range = Math.max(1, (r1 + r2) * .72);
            const dx = entry.p.x - other.p.x;
            const dy = entry.p.y - other.p.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < range) {
                const t = 1 - d / range;
                pressure += t * t;
            }
        }

        if (pressure <= 0) return 1;

        return clamp(1 / (1 + pressure * strength), .42, 1);
    }
    sync() {
        const active = {};
        const entries = M.collect().map(l => {
            return {
                l:l,
                c:M.dynamicLightConfig(l.config),
                p:M.pos(l)
            };
        });

        for (const entry of entries) {
            const l = entry.l;
            const c = entry.c;
            const p = entry.p;
            const s = this.spriteFor(l.key, c);
            const flick = M.flicker(c.flicker, M._frame, s._dexSeed);
            const pulse = M.pulse(c, M._frame, s._dexSeed);
            const overlap = this.overlapScale(entry, entries);

            active[l.key] = true;
            s.x = p.x; s.y = p.y;
            s.tint = c.colorInt;
            s.alpha = clamp(c.opacity/255 * flick * overlap, 0, 1);
            s.scale.set((c.width || c.radius * 2) / 512 * pulse, (c.height || c.radius * 2) / 512 * pulse);
            s.rotation = Number(c.rotation || 0) * Math.PI / 180;
            s.visible = true;
        }
        for (const k in this._sprites) {
            if (!active[k]) {
                const s = this._sprites[k];
                this._lights.removeChild(s);
                s.destroy();
                delete this._sprites[k];
            }
        }
    }
    update() {
        M._frame++;
        if (!M.enabled()) { this.sprite.visible = false; return; }
        this.sprite.visible = true;
        this.ensureSize();
        M.updateDayNightCycle();
        M.updateAmbient();
        this.drawAmbient();
        this.sync();
        Graphics.app.renderer.render(this._container, this._texture, true);
    }
}

function commandConfig(args) {
    return {
        enabled:textBool(args.enabled, true),
        radius:Number(args.radius || 0),
        width:Number(args.width || 0),
        height:Number(args.height || 0),
        rotation:Number(args.rotation || args.angle || 0),
        color:String(args.color || "").trim() || null,
        opacity:Number(args.opacity || 0),
        offsetX:Number(args.offsetX || 0),
        offsetY:Number(args.offsetY || 999),
        flicker:String(args.flicker || "").trim() || null,
        pulse:String(args.pulse || "").trim() || null,
        switchId:Number(args.switchId || 0),
        timeRule:String(args.timeRule || args.lightTime || "").trim() || null
    };
}
function eventIdOf(interpreter, raw) {
    let id = Number(raw || 0);
    if (id <= 0 && interpreter && interpreter.eventId) id = Number(interpreter.eventId() || 0);
    return id;
}

M.applyRuntimeCommentBlock = function(comments) {
    comments = String(comments || "");

    const lightingRaw = tag(comments, "Lighting");
    if (lightingRaw !== null) {
        this.state().enabled = textBool(lightingRaw, true);
        this.state().mapEnabled = textBool(lightingRaw, true);
    }

    const playerConfig = playerLightFromText(comments);
    if (playerConfig) {
        if (playerConfig.enabled === false) this.state().playerLight = null;
        else this.state().playerLight = playerConfig;

        log("Comentario luz jugador aplicada", playerConfig);
    }

    const timeRaw = tag(comments, ["TimeOfDay", "HoraDia", "HoraDelDia"]);
    const cycleRaw = tag(comments, ["DayNightCycle", "CicloDiaNoche"]);
    const cycleSeconds = tagNum(comments, ["CycleSeconds", "SegundosCiclo"], this.dayNight().seconds || 300);
    const fade = tagNum(
        comments,
        ["TimeFade", "AmbientFade", "AmbientDuration", "AmbienteDuracion", "DuracionAmbiente"],
        DEFAULTS.fadeFrames
    );

    if (timeRaw !== null) {
        const continueCycle = cycleRaw !== null
            ? textBool(cycleRaw, false)
            : this.dayNight().enabled;

        if (continueCycle) {
            this.startDayNightCycle(timeRaw, cycleSeconds, fade);
        } else {
            this.setTimeOfDay(timeRaw, fade, false, cycleSeconds);
        }

        log("Comentario hora aplicado", timeRaw, fade, continueCycle, cycleSeconds);
        return;
    }

    if (cycleRaw !== null) {
        if (textBool(cycleRaw, false)) {
            this.startDayNightCycle(this.dayNight().startPhase || "day", cycleSeconds, fade);
        } else {
            this.stopDayNightCycle();
        }

        log("Comentario ciclo aplicado", cycleRaw, cycleSeconds, fade);
        return;
    }

    const timeModeRaw = normalizeTimeMode(tag(comments, ["TimeMode", "ModoTiempo", "UseGlobalTime", "UsarHoraGlobal"]));
    if (timeModeRaw) {
        this.state().mapTimeMode = timeModeRaw;
        if (timeModeRaw === "global" && this.dayNight().enabled) {
            this.applyDayNightVisual();
        }
        log("Comentario modo tiempo aplicado", timeModeRaw);
    }

    const ambientPresetRaw = tag(comments, ["AmbientPreset", "AmbientePreset", "CaveLighting", "CuevaLuz", "Cueva"]);
    if (ambientPresetRaw !== null) {
        this.state().mapTimeMode = timeModeRaw || "fixed";
        this.applyAmbientPreset(ambientPresetRaw, fade, { keepCycle:true });
        log("Comentario ambiente preset aplicado", ambientPresetRaw, fade);
        return;
    }

    const colorRaw = tag(comments, ["Ambient", "AmbientColor", "Ambiente", "ColorAmbiente"]);
    const hasOpacity = tag(comments, ["AmbientOpacity", "OpacidadAmbiente"]) !== null;
    const hasFade = tag(comments, ["AmbientFade", "AmbientDuration", "AmbienteDuracion", "DuracionAmbiente"]) !== null;

    if (colorRaw !== null || hasOpacity || hasFade) {
        this.stopDayNightCycle();
        this.state().mapTimeMode = "fixed";

        const color = colorRaw || ("#" + M._ambient.targetColor.toString(16).padStart(6, "0"));
        const opacity = hasOpacity
            ? tagNum(comments, ["AmbientOpacity", "OpacidadAmbiente"], M._ambient.targetOpacity)
            : M._ambient.targetOpacity;
        const duration = hasFade
            ? tagNum(comments, ["AmbientFade", "AmbientDuration", "AmbienteDuracion", "DuracionAmbiente"], DEFAULTS.fadeFrames)
            : DEFAULTS.fadeFrames;

        this.setAmbient(color, opacity, duration);
        log("Comentario ambiente aplicado", color, opacity, duration);
    }
};

PluginManager.registerCommand(pluginName, "SetAmbient", args => {
    M.stopDayNightCycle();
    M.setAmbient(args.color || DEFAULTS.ambientColor, Number(args.opacity || DEFAULTS.ambientOpacity), Number(args.duration || DEFAULTS.fadeFrames));
});
PluginManager.registerCommand(pluginName, "EnableLighting", args => M.state().enabled = textBool(args.enabled, true));
PluginManager.registerCommand(pluginName, "SetAmbientPreset", args => {
    M.state().mapTimeMode = "fixed";
    M.applyAmbientPreset(args.preset || "day", Number(args.duration || DEFAULTS.fadeFrames));
});
PluginManager.registerCommand(pluginName, "SetTimeOfDay", args => {
    M.setTimeOfDay(
        args.phase || "day",
        Number(args.duration || DEFAULTS.fadeFrames),
        textBool(args.continueCycle, false),
        Number(args.cycleSeconds || 0)
    );
});
PluginManager.registerCommand(pluginName, "StartDayNightCycle", args => {
    M.startDayNightCycle(
        args.startPhase || "day",
        Number(args.cycleSeconds || 300),
        Number(args.fade || DEFAULTS.fadeFrames),
        { force:true }
    );
});
PluginManager.registerCommand(pluginName, "StopDayNightCycle", () => M.stopDayNightCycle());
PluginManager.registerCommand(pluginName, "SetCycleSpeed", args => M.setCycleSpeed(Number(args.cycleSeconds || 300)));
PluginManager.registerCommand(pluginName, "SetPlayerLight", args => M.state().playerLight = makeConfig(args.preset || "torch", commandConfig(args)));
PluginManager.registerCommand(pluginName, "ClearPlayerLight", () => M.state().playerLight = null);
PluginManager.registerCommand(pluginName, "SetEventLight", function(args) {
    const id = eventIdOf(this, args.eventId);
    if (id > 0) M.state().eventOverrides[M.eventKey(id)] = makeConfig(args.preset || "torch", commandConfig(args));
});
PluginManager.registerCommand(pluginName, "ClearEventLight", function(args) {
    const id = eventIdOf(this, args.eventId);
    if (id > 0) M.state().eventOverrides[M.eventKey(id)] = makeConfig("default", {enabled:false});
});
PluginManager.registerCommand(pluginName, "ResetEventLight", function(args) {
    const id = eventIdOf(this, args.eventId);
    if (id > 0) delete M.state().eventOverrides[M.eventKey(id)];
});
PluginManager.registerCommand(pluginName, "AddStaticLight", args => {
    const c = makeConfig(args.preset || "torch", {radius:Number(args.radius||0), color:String(args.color||"").trim()||null, opacity:Number(args.opacity||0)});
    c.mapX = Number(args.x || 0); c.mapY = Number(args.y || 0); c.enabled = true;
    M.staticMap()[String(args.id || "luz_1")] = c;
});
PluginManager.registerCommand(pluginName, "RemoveStaticLight", args => delete M.staticMap()[String(args.id || "luz_1")]);
PluginManager.registerCommand(pluginName, "RefreshLights", () => M.refresh());

const _Game_Interpreter_command108 = Game_Interpreter.prototype.command108;
Game_Interpreter.prototype.command108 = function(params) {
    const result = _Game_Interpreter_command108.call(this, params);

    if (this._comments && this._comments.length) {
        M.applyRuntimeCommentBlock(this._comments.join("\n"));
    }

    return result;
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this._dexLightingSettings = mapSettings($dataMap ? $dataMap.note : "");
    M.applyMap(this._dexLightingSettings);
};

const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.call(this);
    this.dexSetupLighting();
};
Game_Event.prototype.dexSetupLighting = function() {
    this._dexLightConfig = this.page() ? configFromComments(eventComments(this)) : null;
    log("event", this.eventId(), this._dexLightConfig);
};
const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function() {
    _Game_Event_clearPageSettings.call(this);
    this._dexLightConfig = null;
};

const _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    _Spriteset_Map_createUpperLayer.call(this);
    this._dexLightingLayer = new DexLightingLayer(this);
    this._baseSprite.addChild(this._dexLightingLayer.sprite);
    M._layer = this._dexLightingLayer;
};
const _Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.call(this);
    if (this._dexLightingLayer) this._dexLightingLayer.update();
};
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);

    // Al cargar partida, Game_Map.setup no siempre se ejecuta otra vez.
    // Este refresh reaplica la nota del mapa actual y conserva la hora global.
    if ($gameSystem && $gameMap && $dataMap) {
        M.refreshCurrentMapSettings();
    }
};

const _Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
Spriteset_Map.prototype.destroy = function(options) {
    if (this._dexLightingLayer) {
        this._baseSprite.removeChild(this._dexLightingLayer.sprite);
        this._dexLightingLayer.destroy();
        this._dexLightingLayer = null;
        M._layer = null;
    }
    _Spriteset_Map_destroy.call(this, options);
};

})();
