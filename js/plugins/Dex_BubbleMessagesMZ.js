/*:
 * @target MZ
 * @plugindesc Dex_BubbleMessagesMZ v1.47 - Mensajes tipo burbuja compacta usando Mostrar Texto normal.
 * @author Dextroyean y Jaime
 *
 * @help
 * ============================================================================
 * Dex_BubbleMessagesMZ v1.47
 * ============================================================================
 *
 * Mensajes tipo burbuja para RPG Maker MZ.
 *
 * Objetivo:
 * - Usar el comando normal "Mostrar texto".
 * - No obligar a escribir códigos de escape.
 * - Detectar hablante por nombre, evento o slot de party.
 * - Estilo compacto inspirado en bubbles modernas.
 *
 * v1.3:
 * - Nuevo modo visual "smart": burbuja compacta, nombre integrado y rostro
 *   reducido.
 * - Corrige seguimiento de posición por player1/player2.
 * - Oculta la NameBox normal en modo smart/custom y dibuja el nombre dentro
 *   de la burbuja.
 * - Escala rostros para evitar ventanas gigantes.
 *
 * v1.4:
 * - Oculta completamente el frame azul/default de RPG Maker en modo smart.
 * - Permite usar códigos default en el nombre del hablante:
 *     \C[30]\N[1]  = actor ID 1 con color 30.
 *     \C[30]\P[2]  = party slot 2 con color 30.
 * - Ya no necesitas usar player1/player2 si prefieres códigos nativos.
 *
 * v1.41:
 * - Quita por defecto la punta fija de la burbuja (se conserva el indicador
 *   animado de continuar).
 * - Quita por defecto el borde azul/oscuro del globo para una apariencia más
 *   limpia.
 * - Agrega parámetro "Mostrar Punta" para activarla si algún proyecto la
 *   necesita más adelante.
 *
 * v1.42:
 * - Oculta de forma forzada los elementos nativos restantes de la ventana
 *   (frame, back, contentsBack, cursor y flechas) en modo bubble.
 * - Reposiciona la flecha animada de continuar para que quede por debajo del
 *   cuadro blanco y no encima.
 * - Cierra/oculta la NameBox nativa en cada actualización mientras la burbuja
 *   está activa.
 *
 * v1.43:
 * - Corrige comentarios temporales como <Bubble: off>. Ahora sólo afectan al
 *   texto inmediatamente siguiente y ya no apagan toda la página del evento.
 *
 * v1.44:
 * - Agrega código de nombre \B[n] para elegir estilo de burbuja sin comentarios.
 *   \B[1] normal, \B[2] pensamiento, \B[3] sorpresa, \B[4] grito, \B[5] susurro.
 *
 * v1.45:
 * - Agrega modo "Requerir \B[n]". Si está activo, sólo los mensajes con \B[n]
 *   salen como burbuja. Los demás respetan la ventana normal de RPG Maker.
 *
 * v1.46:
 * - Hace que \B[2], \B[3], \B[4] y \B[5] tengan formas realmente distintas.
 * - Soporta también el carácter ESC interno de RPG Maker para detectar B[n].
 *
 * v1.47:
 * - Rehace la burbuja de pensamiento para que sea una nube suave y unificada.
 * - Diferencia mejor los estilos: sorpresa moderada, grito explosivo y
 *   susurro más fino.
 *
 * Hablantes por slot de party:
 *   player1, player2, player3, player4
 *   party1, party2, actor1, actor2
 *   member1, member2, jugador1, jugador2, miembro1, miembro2
 *
 * Ejemplo:
 *   Mostrar texto: player1
 *     Hola.
 *
 *   Mostrar texto: player2
 *     Yo soy el segundo miembro del grupo.
 *
 * También puedes usar códigos nativos en el nombre del hablante:
 *   Mostrar texto: \C[30]\N[1]
 *     Hola.
 *
 *   Mostrar texto: \C[30]\P[2]
 *     Yo soy el segundo miembro del grupo.
 *
 * Puedes agregar \B[n] en el nombre para cambiar el tipo de burbuja:
 *   \B[1] normal
 *   \B[2] pensamiento
 *   \B[3] sorpresa
 *   \B[4] grito
 *   \B[5] susurro
 *
 * Ejemplo:
 *   Mostrar texto: \B[2]\C[30]\N[1]
 *     Estoy pensando...
 *
 * Eventos:
 *   <BubbleName: Bruja>
 *   <NombreBurbuja: Bruja>
 *
 * Estilos:
 *   <BubbleStyle: normal>
 *   <BubbleStyle: thought>
 *   <BubbleStyle: shout>
 *   <BubbleStyle: whisper>
 *
 * Español:
 *   <EstiloBurbuja: pensamiento>
 *   <EstiloBurbuja: grito>
 *   <EstiloBurbuja: susurro>
 *
 * Forzar objetivo:
 *   <BubbleTarget: player2>
 *   <ObjetivoBurbuja: jugador2>
 *
 * Desactivar un mensaje:
 *   <Bubble: off>
 *   <Burbuja: off>
 *
 * Ajustes rápidos por comentario:
 *   <BubbleOffsetY: 84>
 *   <BubbleMinWidth: 180>
 *   <BubbleMaxWidth: 520>
 *
 * ============================================================================
 *
 * @param EnabledDefault
 * @text Activado por Defecto
 * @type boolean
 * @default true
 *
 * @param AutoMapMessages
 * @text Convertir Mensajes de Mapa
 * @type boolean
 * @default true
 *
 * @param RequireBubbleCode
 * @text Requerir Código B
 * @desc Si está ON, sólo los mensajes cuyo nombre tenga \B[n] se muestran como burbuja.
 * @type boolean
 * @default true
 *
 * @param FrameMode
 * @text Modo Visual
 * @type select
 * @option Smart Compacto
 * @value smart
 * @option Burbuja Blanca Custom
 * @value custom
 * @option Recuadro RPG Maker
 * @value windowskin
 * @default smart
 *
 * @param DefaultStyle
 * @text Estilo Predeterminado
 * @type select
 * @option Normal
 * @value normal
 * @option Pensamiento
 * @value thought
 * @option Grito
 * @value shout
 * @option Susurro
 * @value whisper
 * @default normal
 *
 * @param MinWidth
 * @text Ancho Mínimo
 * @type number
 * @min 80
 * @default 170
 *
 * @param MaxWidth
 * @text Ancho Máximo
 * @type number
 * @min 220
 * @default 560
 *
 * @param Padding
 * @text Relleno
 * @type number
 * @min 4
 * @default 12
 *
 * @param OffsetY
 * @text Offset Y
 * @type number
 * @default 76
 *
 * @param TailSize
 * @text Tamaño de Punta
 * @type number
 * @min 0
 * @default 14
 *
 * @param ShowTail
 * @text Mostrar Punta
 * @type boolean
 * @default false
 *
 * @param FaceScale
 * @text Escala de Rostro %
 * @type number
 * @min 30
 * @max 100
 * @default 66
 *
 * @param NameSpace
 * @text Espacio para Nombre
 * @type number
 * @min 0
 * @default 24
 *
 * @param ReplaceSlotSpeakerName
 * @text Mostrar Nombre Real en Slots
 * @type boolean
 * @default true
 *
 * @param NameColor
 * @text Color del Nombre
 * @type text
 * @default #d79a25
 *
 * @param BubbleFill
 * @text Color de Burbuja
 * @type text
 * @default #ffffff
 *
 * @param BubbleStroke
 * @text Borde de Burbuja
 * @type text
 * @default #4b4b4b
 *
 * @param TextColor
 * @text Color de Texto
 * @type text
 * @default #202832
 *
 * @param DebugMode
 * @text Modo Debug
 * @type boolean
 * @default false
 *
 * @command EnableBubbles
 * @text Activar / Desactivar Burbujas
 *
 * @arg enabled
 * @text Activado
 * @type boolean
 * @default true
 *
 * @command SetNextBubble
 * @text Configurar Próxima Burbuja
 * @desc Aplica sólo al próximo Mostrar Texto.
 *
 * @arg style
 * @text Estilo
 * @type select
 * @option Normal
 * @value normal
 * @option Pensamiento
 * @value thought
 * @option Grito
 * @value shout
 * @option Susurro
 * @value whisper
 * @default normal
 *
 * @arg target
 * @text Objetivo
 * @type text
 * @desc this, player1, player2, nombre de evento/actor, o vacío para automático.
 * @default
 *
 * @arg eventId
 * @text ID Evento
 * @type number
 * @min 0
 * @default 0
 *
 * @arg offsetY
 * @text Offset Y
 * @type number
 * @default 0
 *
 * @command ClearNextBubble
 * @text Limpiar Próxima Burbuja
 */

(() => {
"use strict";

const pluginName = (() => {
    const src = document.currentScript && document.currentScript.src;
    return src ? decodeURIComponent(src.split("/").pop().replace(/\.js$/i, "")) : "Dex_BubbleMessagesMZ";
})();

const P = PluginManager.parameters(pluginName);

const D = {
    enabled: String(P.EnabledDefault || "true") === "true",
    autoMap: String(P.AutoMapMessages || "true") === "true",
    requireBubbleCode: String(P.RequireBubbleCode || "true") === "true",
    frameMode: String(P.FrameMode || "smart"),
    style: String(P.DefaultStyle || "normal"),
    minW: Number(P.MinWidth || 170),
    maxW: Number(P.MaxWidth || 560),
    pad: Number(P.Padding || 12),
    offY: Number(P.OffsetY || 76),
    tail: Number(P.TailSize || 14),
    showTail: String(P.ShowTail || "false") === "true",
    faceScale: Number(P.FaceScale || 66),
    nameSpace: Number(P.NameSpace || 24),
    replaceSlotSpeaker: String(P.ReplaceSlotSpeakerName || "true") === "true",
    nameColor: String(P.NameColor || "#d79a25"),
    bubbleFill: String(P.BubbleFill || "#ffffff"),
    bubbleStroke: "transparent",
    textColor: String(P.TextColor || "#202832"),
    debug: String(P.DebugMode || "false") === "true"
};

const Dex = window.Dex || (window.Dex = {});
const M = Dex.BubbleMessagesMZ = { enabled: D.enabled, next: null };

function log() {
    if (D.debug) console.log("[Dex_BubbleMessagesMZ]", ...arguments);
}

function norm(s) {
    return String(s || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase();
}

function clamp(v, a, b) {
    return Math.max(a, Math.min(b, Number(v)));
}

function tag(txt, names) {
    txt = String(txt || "");
    names = Array.isArray(names) ? names : [names];

    for (const n of names) {
        const r = new RegExp("<\\s*" + n + "\\s*:\\s*([^>]+)>", "i");
        const m = txt.match(r);
        if (m) return String(m[1]).trim();
    }

    return null;
}

function has(txt, names) {
    txt = String(txt || "");
    names = Array.isArray(names) ? names : [names];

    return names.some(n => new RegExp("<\\s*" + n + "\\s*>", "i").test(txt));
}

function bool(v, def) {
    if (v === null || v === undefined || v === "") return def;

    const s = norm(v);

    if (["true", "on", "yes", "si", "1", "activar", "activado"].includes(s)) return true;
    if (["false", "off", "no", "0", "apagar", "apagado"].includes(s)) return false;

    return def;
}

function style(v) {
    const s = norm(v || D.style);

    if (["thought", "think", "thinking", "pensamiento", "mente"].includes(s)) return "thought";
    if (["surprise", "surprised", "sorpresa", "sorprendido", "impacto", "shock"].includes(s)) return "surprise";
    if (["shout", "yell", "scream", "grito", "gritar"].includes(s)) return "shout";
    if (["whisper", "susurro", "secreto", "quiet"].includes(s)) return "whisper";
    if (["off", "none", "no", "apagado"].includes(s)) return "off";

    return "normal";
}

function frameMode() {
    return String(D.frameMode || "smart").toLowerCase();
}

function smartFrame() {
    const mode = frameMode();
    return mode === "smart" || mode === "custom";
}

function hasBubbleTail() {
    return !!D.showTail && Number(D.tail || 0) > 0;
}

function customBubble() {
    const mode = frameMode();
    return mode === "smart" || mode === "custom";
}

function comments(list) {
    let out = "";

    for (const c of list || []) {
        if (c && (c.code === 108 || c.code === 408)) {
            out += String(c.parameters[0] || "") + "\n";
        }
    }

    return out;
}

function pageDefaultComments(list) {
    let out = "";

    for (const c of list || []) {
        if (!c || (c.code !== 108 && c.code !== 408)) break;
        out += String(c.parameters[0] || "") + "\n";
    }

    return out;
}

function prevComments(list, index) {
    const a = [];

    for (let i = Number(index || 0) - 1; i >= 0; i--) {
        const c = list[i];
        if (!c || (c.code !== 108 && c.code !== 408)) break;
        a.unshift(String(c.parameters[0] || ""));
    }

    return a.join("\n");
}

function metaFrom(txt) {
    txt = String(txt || "");

    const b = tag(txt, ["Bubble", "Burbuja"]);
    const st = tag(txt, ["BubbleStyle", "EstiloBurbuja", "BurbujaEstilo"]);

    const m = {
        off: false,
        style: null,
        target: tag(txt, ["BubbleTarget", "ObjetivoBurbuja", "BurbujaObjetivo"]),
        names: [],
        offY: null,
        minW: null,
        maxW: null
    };

    const name = tag(txt, ["BubbleName", "NombreBurbuja", "BurbujaNombre"]);
    if (name) m.names.push(name);

    if (b) {
        const s = style(b);
        if (s === "off") m.off = true;
        else m.style = s;
    }

    if (st) m.style = style(st);
    if (has(txt, ["NoBubble", "SinBurbuja"])) m.off = true;

    const oy = tag(txt, ["BubbleOffsetY", "BurbujaOffsetY"]);
    if (oy !== null) m.offY = Number(oy);

    const mn = tag(txt, ["BubbleMinWidth", "BurbujaAnchoMin"]);
    if (mn !== null) m.minW = Number(mn);

    const mx = tag(txt, ["BubbleMaxWidth", "BurbujaAnchoMax"]);
    if (mx !== null) m.maxW = Number(mx);

    return m;
}

M.parse = metaFrom;

M.eventMeta = function(ev) {
    if (!ev) return {};

    if (!ev._dexBubbleMeta) {
        ev._dexBubbleMeta = metaFrom(pageDefaultComments(ev.page() ? ev.page().list : []));

        if (ev.event && ev.event()) {
            ev._dexBubbleMeta.names.push(ev.event().name);
        }
    }

    return ev._dexBubbleMeta;
};

const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.call(this);
    this._dexBubbleMeta = null;
    M.eventMeta(this);
};

M.findEvent = function(name) {
    const wanted = norm(name);

    if (!wanted || !$gameMap) return null;

    for (const ev of $gameMap.events()) {
        const mt = M.eventMeta(ev);

        for (const n of (mt.names || [])) {
            if (norm(n) === wanted) return ev;
        }
    }

    return null;
};

M.partySlotFromToken = function(value) {
    const s = norm(value);

    if (!s) return 0;

    let m = s.match(/^(player|party|actor|member|miembro|jugador|pj)(\d+)$/);
    if (m) return Math.max(1, Number(m[2] || 0));

    m = s.match(/^(p)(\d+)$/);
    if (m) return Math.max(1, Number(m[2] || 0));

    return 0;
};

M.partyCharacterBySlot = function(slot) {
    slot = Number(slot || 0);

    if (slot <= 0 || !$gamePlayer || !$gameParty) return null;
    if (slot === 1) return $gamePlayer;

    const followers = $gamePlayer.followers && $gamePlayer.followers();
    const data = followers && followers.data ? followers.data() : [];

    return data[slot - 2] || null;
};

M.partyActorNameBySlot = function(slot) {
    slot = Number(slot || 0);

    if (slot <= 0 || !$gameParty) return "";

    const actor = $gameParty.members()[slot - 1];

    return actor && actor.name ? String(actor.name()) : "";
};

M.actorIdFromNameCode = function(value) {
    const m = String(value || "").match(/\\N\[(\d+)\]/i);
    return m ? Number(m[1] || 0) : 0;
};

M.partySlotFromPartyCode = function(value) {
    const m = String(value || "").match(/\\P\[(\d+)\]/i);
    return m ? Number(m[1] || 0) : 0;
};

M.colorFromSpeakerCode = function(value) {
    const m = String(value || "").match(/\\C\[(\d+)\]/i);
    if (!m) return "";

    const index = Number(m[1] || 0);

    if (window.ColorManager && ColorManager.textColor) {
        return ColorManager.textColor(index);
    }

    return D.nameColor;
};

M.bubbleCodeFromSpeaker = function(value) {
    const m = String(value || "").match(/(?:\\|\x1b)B\[(\d+)\]/i);
    return m ? Number(m[1] || 0) : 0;
};

M.styleFromBubbleCode = function(value) {
    switch (Number(value || 0)) {
        case 1: return "normal";
        case 2: return "thought";
        case 3: return "surprise";
        case 4: return "shout";
        case 5: return "whisper";
        default: return "";
    }
};

M.stripBubbleCode = function(value) {
    return String(value || "")
        .replace(/\\B\[\d+\]/gi, "")
        .replace(/\x1bB\[\d+\]/gi, "");
};

M.hasBubbleCode = function(value) {
    return /(?:\\|\x1b)B\[\d+\]/i.test(String(value || ""));
};

M.partySlotByActorId = function(actorId) {
    actorId = Number(actorId || 0);

    if (actorId <= 0 || !$gameParty) return 0;

    const members = $gameParty.members();

    for (let i = 0; i < members.length; i++) {
        if (members[i] && members[i].actorId && Number(members[i].actorId()) === actorId) {
            return i + 1;
        }
    }

    return 0;
};

M.characterFromSpeakerCode = function(value) {
    value = M.stripBubbleCode(value);
    const partySlot = M.partySlotFromPartyCode(value);
    if (partySlot > 0) return M.partyCharacterBySlot(partySlot);

    const actorId = M.actorIdFromNameCode(value);
    if (actorId > 0) {
        const slot = M.partySlotByActorId(actorId);
        if (slot > 0) return M.partyCharacterBySlot(slot);
    }

    return null;
};

M.actorNameById = function(actorId) {
    actorId = Number(actorId || 0);

    if (actorId <= 0 || !$dataActors || !$dataActors[actorId]) return "";

    return String($dataActors[actorId].name || "");
};

M.displaySpeakerInfo = function(name) {
    const raw = String(name || "");
    const cleanRaw = M.stripBubbleCode(raw);
    const color = M.colorFromSpeakerCode(cleanRaw) || D.nameColor;

    let text = cleanRaw;

    text = text.replace(/\\N\[(\d+)\]/gi, (_, n) => M.actorNameById(Number(n)) || "");
    text = text.replace(/\\P\[(\d+)\]/gi, (_, n) => M.partyActorNameBySlot(Number(n)) || "");
    text = text.replace(/\\C\[(\d+)\]/gi, "");
    text = text.replace(/\\[A-Z]+\[[^\]]*\]/gi, "");
    text = text.replace(/\\[A-Z]+/gi, "");
    text = text.trim();

    if (!D.replaceSlotSpeaker) {
        return { name: text || raw, color };
    }

    const slot = M.partySlotFromToken(cleanRaw);

    if (slot > 0) {
        const actorName = M.partyActorNameBySlot(slot);
        if (actorName) return { name: actorName, color };
    }

    return { name: text || raw, color };
};

M.displaySpeakerName = function(name) {
    return M.displaySpeakerInfo(name).name;
};

M.findActorChar = function(name) {
    name = M.stripBubbleCode(name);
    const wanted = norm(name);

    if (!wanted || !$gameParty) return null;

    const byCode = M.characterFromSpeakerCode(name);
    if (byCode) return byCode;

    const slot = M.partySlotFromToken(name);
    if (slot > 0) return M.partyCharacterBySlot(slot);

    if (["player", "jugador", "protagonista", "leader", "lider", "líder"].includes(wanted)) {
        return $gamePlayer;
    }

    const members = $gameParty.members();

    for (let i = 0; i < members.length; i++) {
        if (members[i] && norm(members[i].name()) === wanted) {
            if (i === 0) return $gamePlayer;

            const followers = $gamePlayer.followers && $gamePlayer.followers();
            const data = followers && followers.data ? followers.data() : [];

            return data[i - 1] || $gamePlayer;
        }
    }

    return null;
};

M.explicitTarget = function(value, source) {
    const raw = M.stripBubbleCode(String(value || "").trim());
    const s = norm(raw);

    if (!s) return null;
    if (["this", "este", "evento"].includes(s)) return $gameMap.event(source || 0);
    if (["player", "jugador", "protagonista", "leader", "lider", "líder"].includes(s)) return $gamePlayer;

    const byCode = M.characterFromSpeakerCode(raw);
    if (byCode) return byCode;

    const slot = M.partySlotFromToken(raw);
    if (slot > 0) return M.partyCharacterBySlot(slot);

    const n = Number(raw.replace(/[^0-9]/g, ""));
    if ((/^event/i.test(raw) || /^evento/i.test(raw) || String(n) === raw) && n > 0) {
        return $gameMap.event(n);
    }

    return M.findEvent(raw) || M.findActorChar(raw);
};

M.target = function(ctx) {
    if (ctx.eventId > 0 && $gameMap.event(ctx.eventId)) return $gameMap.event(ctx.eventId);

    if (ctx.target) {
        const t = M.explicitTarget(ctx.target, ctx.source);
        if (t) return t;
    }

    const token = $gameMessage._dexBubbleTargetToken || "";
    if (token) {
        const t = M.findActorChar(token) || M.findEvent(token);
        if (t) return t;
    }

    const sp = $gameMessage.speakerName ? $gameMessage.speakerName() : ($gameMessage._speakerName || "");
    if (sp) {
        const t = M.findActorChar(sp) || M.findEvent(sp);
        if (t) return t;
    }

    if (ctx.source > 0) return $gameMap.event(ctx.source);

    return null;
};

M.text = function() {
    return $gameMessage.allText ? $gameMessage.allText() : (($gameMessage._texts || []).join("\n"));
};

M.context = function() {
    if (!M.enabled || !D.autoMap || !$gameMap || !SceneManager._scene || !(SceneManager._scene instanceof Scene_Map)) {
        return { active:false };
    }

    const rt = $gameMessage._dexBubbleRuntime || {};
    const source = Number($gameMessage._dexBubbleSourceEventId || 0);
    const em = M.eventMeta($gameMap.event(source));
    const nx = M.next;
    const token = $gameMessage._dexBubbleTargetToken || "";
    const bubbleStyle = M.styleFromBubbleCode(M.bubbleCodeFromSpeaker(token));
    const explicitBubbleRequest = !!((nx && (nx.style || nx.target || nx.eventId)) || rt.style || rt.target || bubbleStyle || M.hasBubbleCode(token));

    if ((rt && rt.off) || (em && em.off) || (nx && nx.off)) return { active:false };

    // En modo recomendado, sólo los mensajes con \B[n] o una petición explícita
    // de burbuja usan el sistema. Los demás respetan Mostrar Texto normal.
    if (D.requireBubbleCode && !explicitBubbleRequest) return { active:false };

    const tgt = M.target({
        target: (nx && nx.target) || rt.target || token || (em && em.target),
        eventId: Number((nx && nx.eventId) || 0),
        source
    });

    if (!tgt) return { active:false };

    const speakerInfo = M.displaySpeakerInfo(token || ($gameMessage.speakerName ? $gameMessage.speakerName() : $gameMessage._speakerName || ""));

    const ctx = {
        active:true,
        target:tgt,
        speakerName: speakerInfo.name,
        speakerColor: speakerInfo.color,
        style:style((nx && nx.style) || rt.style || bubbleStyle || (em && em.style) || D.style),
        offY:Number((nx && nx.offY) || rt.offY || (em && em.offY) || D.offY),
        minW:Number((nx && nx.minW) || rt.minW || (em && em.minW) || D.minW),
        maxW:Number((nx && nx.maxW) || rt.maxW || (em && em.maxW) || D.maxW)
    };

    M.next = null;

    log("bubble", ctx);

    return ctx;
};

M.clean = s => String(s || "")
    .replace(/\x1b[A-Z]+\[[^\]]*\]/gi, "")
    .replace(/\x1b[A-Z]+/gi, "")
    .replace(/\\[A-Z]+\[[^\]]*\]/gi, "")
    .replace(/\\[A-Z]+/gi, "");

M.measure = function(win, ctx) {
    const raw = M.text();
    const converted = win.convertEscapeCharacters ? win.convertEscapeCharacters(raw) : raw;
    const lines = String(converted || "").split(/\n/);
    const face = !!($gameMessage.faceName && $gameMessage.faceName());
    const smart = smartFrame();

    let max = 0;

    for (const l of lines) {
        max = Math.max(max, win.textWidth(M.clean(l)));
    }

    const faceSize = smart ? win.dexFaceSize() : ImageManager.faceWidth;
    const faceW = face ? faceSize + (smart ? 14 : 20) : 0;
    const faceH = face ? faceSize : 0;
    const nameSpace = smart && ctx.speakerName ? D.nameSpace : 0;
    const tail = customBubble() && hasBubbleTail() ? D.tail : 0;
    const w = clamp(Math.ceil(max + faceW + D.pad * 2 + 18), ctx.minW, ctx.maxW);
    const h = Math.ceil(Math.max(lines.length * win.lineHeight(), faceH) + D.pad * 2 + tail + nameSpace);

    return { w, h };
};

function rgba(hex, a) {
    hex = String(hex || "#fff").replace("#", "");
    const n = parseInt(hex, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function colors(st) {
    if (st === "thought") return { f:"#f9fbff", a:.97, s:"#9aa8b8", lw:2, t:D.textColor };
    if (st === "surprise") return { f:"#fffaf0", a:.98, s:"#f0ab42", lw:2.5, t:"#332616" };
    if (st === "shout") return { f:"#fff4c8", a:.99, s:"#dc8b18", lw:4, t:"#3a2810" };
    if (st === "whisper") return { f:"#dbe8ff", a:.62, s:"#95afd9", lw:2, t:"#253147" };
    return { f:D.bubbleFill, a:.95, s:D.bubbleStroke, lw:2, t:D.textColor };
}

function drawCloud(ctx, x, y, w, h) {
    const left = x;
    const top = y;
    const right = x + w;
    const bottom = y + h;
    const midX = x + w * 0.5;
    const midY = y + h * 0.54;

    ctx.beginPath();
    ctx.moveTo(left + w * 0.16, bottom - h * 0.18);
    ctx.quadraticCurveTo(left - w * 0.02, bottom - h * 0.24, left + w * 0.08, midY + h * 0.08);
    ctx.bezierCurveTo(left - w * 0.02, midY - h * 0.03, left + w * 0.10, top + h * 0.24, left + w * 0.25, top + h * 0.26);
    ctx.bezierCurveTo(left + w * 0.24, top + h * 0.06, left + w * 0.43, top - h * 0.02, midX - w * 0.06, top + h * 0.14);
    ctx.bezierCurveTo(midX - w * 0.01, top - h * 0.04, midX + w * 0.22, top + h * 0.02, midX + w * 0.20, top + h * 0.20);
    ctx.bezierCurveTo(right - w * 0.03, top + h * 0.14, right + w * 0.02, midY - h * 0.02, right - w * 0.05, midY + h * 0.15);
    ctx.bezierCurveTo(right + w * 0.01, bottom - h * 0.02, midX + w * 0.25, bottom + h * 0.02, midX + w * 0.10, bottom - h * 0.02);
    ctx.bezierCurveTo(midX + w * 0.05, bottom + h * 0.08, midX - w * 0.16, bottom + h * 0.05, midX - w * 0.17, bottom - h * 0.02);
    ctx.bezierCurveTo(left + w * 0.22, bottom + h * 0.04, left + w * 0.09, bottom, left + w * 0.16, bottom - h * 0.18);
    ctx.closePath();
}

function drawSurpriseBubble(ctx, x, y, w, h) {
    const cut = Math.min(14, Math.max(8, Math.round(Math.min(w, h) * 0.08)));
    ctx.beginPath();
    ctx.moveTo(x + cut, y);
    ctx.lineTo(x + w - cut, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + cut);
    ctx.lineTo(x + w, y + h - cut);
    ctx.quadraticCurveTo(x + w, y + h, x + w - cut, y + h);
    ctx.lineTo(x + cut, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - cut);
    ctx.lineTo(x, y + cut);
    ctx.quadraticCurveTo(x, y, x + cut, y);
    ctx.closePath();
}

function drawBurst(ctx, x, y, w, h, outerPower, innerPower, spikes) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const rx = w / 2;
    const ry = h / 2;
    const total = Math.max(8, spikes || 18) * 2;

    ctx.beginPath();
    for (let i = 0; i < total; i++) {
        const t = (Math.PI * 2 * i) / total - Math.PI / 2;
        const isOuter = i % 2 === 0;
        const px = cx + Math.cos(t) * (rx + (isOuter ? outerPower : -innerPower));
        const py = cy + Math.sin(t) * (ry + (isOuter ? outerPower : -innerPower));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
}

function drawShockMarks(ctx, x, y, color) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.strokeStyle = color || "rgba(240,120,60,.95)";
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 6);
    ctx.moveTo(x + 10, y - 5);
    ctx.lineTo(x + 4, y + 7);
    ctx.stroke();
    ctx.restore();
}

function drawWhisperRings(ctx, x, y, w, h, radius) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.setLineDash([7, 5]);
    ctx.strokeStyle = "rgba(255,255,255,.48)";
    ctx.lineWidth = 2;
    roundRect(ctx, x + 7, y + 7, w - 14, h - 14, Math.max(8, radius - 2));
    ctx.stroke();
    ctx.restore();
}

function drawThoughtDots(ctx, x, y, dir, fill, stroke) {
    ctx.save();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    const y1 = dir === "up" ? y - 6 : y + 6;
    const y2 = dir === "up" ? y - 18 : y + 18;
    ctx.beginPath();
    ctx.arc(x, y1, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 12, y2, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawBubble(bmp, ctxData, tx, dir) {
    const w = bmp.width;
    const h = bmp.height;
    const ctx = bmp.context;
    const st = ctxData.style;
    const c = colors(st);
    const tail = hasBubbleTail() && st !== "thought" ? D.tail : 0;
    const p = 6;
    const nameSpace = ctxData.speakerName ? D.nameSpace : 0;
    const extraInset = st === "shout" ? 12 : st === "surprise" ? 6 : 0;
    const ry = (dir === "up" ? tail + p : p) + nameSpace;
    const rh = h - tail - p * 2 - nameSpace;
    const rx = p + extraInset;
    const rw = w - p * 2 - extraInset * 2;
    const radius = st === "surprise" ? 11 : 15;

    bmp.clear();
    ctx.save();

    ctx.shadowColor = st === "whisper" ? "rgba(150,180,255,.16)" : "rgba(0,0,0,.18)";
    ctx.shadowBlur = st === "whisper" ? 10 : 8;
    ctx.shadowOffsetY = 4;

    if (st === "thought") {
        drawCloud(ctx, rx, ry + 2, rw, rh - 4);
    } else if (st === "shout") {
        drawBurst(ctx, rx + 4, ry + 6, rw - 8, rh - 12, 11, 6, 18);
    } else if (st === "surprise") {
        drawSurpriseBubble(ctx, rx, ry + 2, rw, rh - 4);
    } else {
        roundRect(ctx, rx, ry, rw, rh, radius);
    }

    ctx.fillStyle = rgba(c.f, c.a);
    ctx.fill();

    ctx.shadowColor = "rgba(0,0,0,0)";
    const forceStyleStroke = st === "thought" || st === "surprise" || st === "shout" || st === "whisper";
    const useStroke = forceStyleStroke || (c.s && String(c.s).toLowerCase() !== "transparent" && String(c.s).toLowerCase() !== "none");
    ctx.lineWidth = useStroke ? c.lw : 0;
    ctx.strokeStyle = useStroke ? rgba(c.s, st === "whisper" ? .72 : .95) : "rgba(0,0,0,0)";
    if (useStroke && ctx.lineWidth > 0) ctx.stroke();

    tx = clamp(tx || w / 2, 20, w - 20);

    if (st === "thought") {
        const dotBaseY = dir === "up" ? ry : ry + rh;
        drawThoughtDots(ctx, tx - 4, dotBaseY, dir, rgba(c.f, c.a), rgba(c.s, .82));
    } else if (tail > 0) {
        ctx.beginPath();

        if (dir === "up") {
            ctx.moveTo(tx - 12, ry + 2);
            ctx.lineTo(tx, p);
            ctx.lineTo(tx + 12, ry + 2);
        } else {
            ctx.moveTo(tx - 12, ry + rh - 2);
            ctx.lineTo(tx, h - p);
            ctx.lineTo(tx + 12, ry + rh - 2);
        }

        ctx.closePath();
        ctx.fillStyle = rgba(c.f, c.a);
        ctx.fill();
        if (useStroke && ctx.lineWidth > 0) {
            ctx.strokeStyle = rgba(c.s, .95);
            ctx.lineWidth = c.lw;
            ctx.stroke();
        }
    }

    if (st === "surprise") {
        drawShockMarks(ctx, rx + rw - 20, ry + 18, "rgba(240,120,60,.95)");
    }

    if (st === "whisper") {
        drawWhisperRings(ctx, rx, ry, rw, rh, radius);
    }

    if (ctxData.speakerName) {
        ctx.shadowColor = "rgba(0,0,0,.25)";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetY = 1;
        ctx.font = "bold 20px GameFont, sans-serif";
        ctx.fillStyle = ctxData.speakerColor || D.nameColor;
        ctx.strokeStyle = "rgba(255,255,255,.85)";
        ctx.lineWidth = 3;
        ctx.strokeText(ctxData.speakerName, 12, 20);
        ctx.fillText(ctxData.speakerName, 12, 20);
    }

    ctx.restore();

    if (bmp.baseTexture && bmp.baseTexture.update) bmp.baseTexture.update();
    else if (bmp._baseTexture && bmp._baseTexture.update) bmp._baseTexture.update();
}

const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function(params) {
    const runtime = metaFrom(prevComments(this._list, this._index));
    const originalSpeaker = params && params.length >= 5 ? String(params[4] || "") : "";
    const result = _Game_Interpreter_command101.call(this, params);

    if ($gameMessage) {
        $gameMessage._dexBubbleSourceEventId = this.eventId ? Number(this.eventId() || 0) : 0;
        $gameMessage._dexBubbleRuntime = runtime;

        const sp = $gameMessage.speakerName ? $gameMessage.speakerName() : ($gameMessage._speakerName || "");
        const targetToken = originalSpeaker || sp;

        $gameMessage._dexBubbleTargetToken = targetToken;

        const display = M.displaySpeakerName(targetToken);

        // Si usa \B[n], lo quitamos del nombre nativo para que no aparezca.
        // En modo smart la caja normal se oculta y dibujamos el nombre integrado.
        if (M.hasBubbleCode(targetToken)) {
            const nativeName = M.stripBubbleCode(targetToken);
            if ($gameMessage.setSpeakerName) $gameMessage.setSpeakerName(nativeName);
            else $gameMessage._speakerName = nativeName;
        } else if (M.partySlotFromToken(targetToken) > 0 && display && display !== sp) {
            if ($gameMessage.setSpeakerName) $gameMessage.setSpeakerName(display);
            else $gameMessage._speakerName = display;
        }
    }

    return result;
};

PluginManager.registerCommand(pluginName, "EnableBubbles", args => {
    M.enabled = bool(args.enabled, true);
});

PluginManager.registerCommand(pluginName, "SetNextBubble", args => {
    M.next = {
        style: style(args.style),
        target: String(args.target || ""),
        eventId: Number(args.eventId || 0),
        offY: Number(args.offsetY || 0) || null
    };
});

PluginManager.registerCommand(pluginName, "ClearNextBubble", () => {
    M.next = null;
});

const _Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(rect) {
    _Window_Message_initialize.call(this, rect);
    this._dexBubbleActive = false;
    this._dexBubbleCtx = null;
    this._dexBubbleBack = null;
    this._dexBubbleSize = null;
    this._dexTailX = 0;
    this._dexTailDir = "down";
};

Window_Message.prototype.dexFaceSize = function() {
    return Math.max(32, Math.round(ImageManager.faceWidth * clamp(D.faceScale, 30, 100) / 100));
};

Window_Message.prototype.dexNameSpace = function() {
    return smartFrame() && this._dexBubbleCtx && this._dexBubbleCtx.speakerName ? D.nameSpace : 0;
};

Window_Message.prototype.dexBack = function() {
    if (this._dexBubbleBack) return;

    this._dexBubbleBack = new Sprite(new Bitmap(1, 1));
    this._dexBubbleBack.visible = false;

    const idx = this.children.indexOf(this._clientArea);
    this.addChildAt(this._dexBubbleBack, idx >= 0 ? idx : 0);
};

Window_Message.prototype.dexSetNativeFrameVisible = function(visible) {
    if (this._backSprite) this._backSprite.visible = visible;
    if (this._frameSprite) this._frameSprite.visible = visible;
    if (this._contentsBackSprite) this._contentsBackSprite.visible = visible;
    if (this._cursorSprite) this._cursorSprite.visible = visible;
    if (this._downArrowSprite) this._downArrowSprite.visible = visible;
    if (this._upArrowSprite) this._upArrowSprite.visible = visible;
    if (this._container && this._container.children) {
        for (const child of this._container.children) {
            if (child === this._backSprite || child === this._frameSprite ||
                child === this._contentsBackSprite || child === this._cursorSprite ||
                child === this._downArrowSprite || child === this._upArrowSprite) {
                child.visible = visible;
            }
        }
    }
};

Window_Message.prototype.dexHideNativeBubbleParts = function() {
    this.opacity = 0;
    this.backOpacity = 0;
    this.dexSetNativeFrameVisible(false);
    if (this._pauseSignSprite) {
        this._pauseSignSprite.visible = true;
        this._pauseSignSprite.alpha = 1;
        this._pauseSignSprite.scale.x = 1;
        this._pauseSignSprite.scale.y = 1;
    }
    if (this._nameBoxWindow) {
        this._nameBoxWindow.visible = false;
        this._nameBoxWindow.openness = 0;
        this._nameBoxWindow.opacity = 0;
        this._nameBoxWindow.backOpacity = 0;
        this._nameBoxWindow.contentsOpacity = 0;
        if (this._nameBoxWindow._backSprite) this._nameBoxWindow._backSprite.visible = false;
        if (this._nameBoxWindow._frameSprite) this._nameBoxWindow._frameSprite.visible = false;
        if (this._nameBoxWindow._contentsBackSprite) this._nameBoxWindow._contentsBackSprite.visible = false;
        if (this._nameBoxWindow._contentsSprite) this._nameBoxWindow._contentsSprite.visible = false;
    }
};

Window_Message.prototype.dexUpdatePauseSignPlacement = function() {
    if (!this._pauseSignSprite) return;
    this._pauseSignSprite.x = Math.round(this.width / 2);
    this._pauseSignSprite.y = Math.round(this.height - 8);
};

Window_Message.prototype.dexTextStyle = function() {
    if (!this._dexBubbleActive || !this.contents || !customBubble()) return;

    const c = colors(this._dexBubbleCtx.style);

    this.contents.textColor = c.t;
    this.contents.outlineColor = "rgba(255,255,255,.85)";
    this.contents.outlineWidth = 4;
};

Window_Message.prototype.dexPrepare = function() {
    const ctx = M.context();

    this._dexBubbleActive = !!ctx.active;
    this._dexBubbleCtx = ctx.active ? ctx : null;

    if (!this._dexBubbleActive) {
        this.dexEnd();
        return;
    }

    this.dexBack();

    if (customBubble()) {
        this.dexHideNativeBubbleParts();
    } else {
        this.opacity = 255;
        this.backOpacity = 192;
        this.dexSetNativeFrameVisible(true);
    }

    this._dexBubbleSize = M.measure(this, ctx);
    this.dexPlace(true);
};

Window_Message.prototype.dexEnd = function() {
    this._dexBubbleActive = false;
    this._dexBubbleCtx = null;

    if (this._dexBubbleBack) this._dexBubbleBack.visible = false;

    this.dexSetNativeFrameVisible(true);
    this.opacity = 255;
    this.backOpacity = 192;
};

Window_Message.prototype.dexPlace = function(force) {
    if (!this._dexBubbleActive || !this._dexBubbleCtx) return;

    const c = this._dexBubbleCtx;
    const target = c.target;

    if (!target || !target.screenX) return;

    const size = this._dexBubbleSize || M.measure(this, c);
    const w = size.w;
    const h = size.h;
    const sx = target.screenX();
    const sy = target.screenY();

    let x = Math.round(sx - w / 2);
    let y = Math.round(sy - c.offY - h);
    let dir = "down";

    if (y < 8) {
        y = Math.round(sy + 16);
        dir = "up";
    }

    x = clamp(x, 8, Graphics.boxWidth - w - 8);
    y = clamp(y, 8, Graphics.boxHeight - h - 8);

    const ow = this.width;
    const oh = this.height;

    this.move(x, y, w, h);

    if (force || ow !== w || oh !== h) {
        this.createContents();
    }

    this._dexTailX = clamp(sx - this.x, 20, w - 20);
    this._dexTailDir = dir;

    this.dexRefresh();
    this.dexHideNativeBubbleParts();
    this.dexUpdatePauseSignPlacement();

    if (this._nameBoxWindow && this._nameBoxWindow.updatePlacement) {
        this._nameBoxWindow.updatePlacement();
    }
};

Window_Message.prototype.dexRefresh = function() {
    if (!this._dexBubbleActive) return;

    this.dexBack();

    const back = this._dexBubbleBack;

    if (!customBubble()) {
        back.visible = false;
        return;
    }

    if (!back.bitmap || back.bitmap.width !== this.width || back.bitmap.height !== this.height) {
        back.bitmap = new Bitmap(this.width, this.height);
    }

    back.x = 0;
    back.y = 0;
    back.visible = true;

    drawBubble(back.bitmap, this._dexBubbleCtx, this._dexTailX, this._dexTailDir);
};

const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this.dexPrepare();
    _Window_Message_startMessage.call(this);

    if (this._dexBubbleActive) {
        this.dexTextStyle();
        this.dexRefresh();
    }
};

const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    if (this._dexBubbleActive) {
        this.dexPlace(false);
        return;
    }

    _Window_Message_updatePlacement.call(this);
};

const _Window_Message_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
    _Window_Message_update.call(this);

    if (this._dexBubbleActive) {
        this.dexPlace(false);
        this.dexTextStyle();
        this.dexHideNativeBubbleParts();
        this.dexUpdatePauseSignPlacement();
    }
};

const _Window_Message_newLineX = Window_Message.prototype.newLineX;
Window_Message.prototype.newLineX = function(textState) {
    if (this._dexBubbleActive && smartFrame() && $gameMessage.faceName()) {
        return this.dexFaceSize() + 14;
    }

    return _Window_Message_newLineX.call(this, textState);
};

const _Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
    if (this._dexBubbleActive && smartFrame() && $gameMessage.faceName()) {
        const faceName = $gameMessage.faceName();
        const faceIndex = $gameMessage.faceIndex();
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sx = (faceIndex % 4) * pw;
        const sy = Math.floor(faceIndex / 4) * ph;
        const size = this.dexFaceSize();
        const dy = this.dexNameSpace();

        this.contents.blt(bitmap, sx, sy, pw, ph, 0, dy, size, size);
        return;
    }

    _Window_Message_drawMessageFace.call(this);
};

const _Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    _Window_Message_newPage.call(this, textState);

    if (this._dexBubbleActive && smartFrame()) {
        const ns = this.dexNameSpace();

        if (ns > 0 && textState) {
            textState.y += ns;
            textState.startY = (textState.startY || 0) + ns;
        }

        this.dexTextStyle();
    }
};

const _Window_Message_resetTextColor = Window_Message.prototype.resetTextColor;
Window_Message.prototype.resetTextColor = function() {
    if (this._dexBubbleActive && customBubble()) {
        this.dexTextStyle();
        return;
    }

    _Window_Message_resetTextColor.call(this);
};

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    _Window_Message_terminateMessage.call(this);

    if ($gameMessage) {
        $gameMessage._dexBubbleTargetToken = "";
    }

    this.dexEnd();
};

if (typeof Window_NameBox !== "undefined") {
    Window_NameBox.prototype.dexForceHideForBubble = function() {
        this.visible = false;
        this.openness = 0;
        this.opacity = 0;
        this.backOpacity = 0;
        this.contentsOpacity = 0;
        if (this._backSprite) this._backSprite.visible = false;
        if (this._frameSprite) this._frameSprite.visible = false;
        if (this._contentsBackSprite) this._contentsBackSprite.visible = false;
        if (this._contentsSprite) this._contentsSprite.visible = false;
    };

    const _Window_NameBox_start = Window_NameBox.prototype.start;
    Window_NameBox.prototype.start = function() {
        _Window_NameBox_start.call(this);
        if (this._messageWindow && this._messageWindow._dexBubbleActive && smartFrame()) {
            this.dexForceHideForBubble();
        }
    };

    const _Window_NameBox_update = Window_NameBox.prototype.update;
    Window_NameBox.prototype.update = function() {
        _Window_NameBox_update.call(this);
        if (this._messageWindow && this._messageWindow._dexBubbleActive && smartFrame()) {
            this.dexForceHideForBubble();
        }
    };

    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.call(this);
        if (this._messageWindow && this._messageWindow._dexBubbleActive && smartFrame()) {
            this.dexForceHideForBubble();
        }
    };
}

})();
