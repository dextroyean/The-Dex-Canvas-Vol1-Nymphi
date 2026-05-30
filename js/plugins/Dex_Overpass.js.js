/*:
 * @target MZ
 * @plugindesc Dex_Overpass v2.2 - Puentes, pasos bajos y caminos secretos por regiones para Tales of Dex.
 * @author Dex Team
 *
 * @param RegionBajo
 * @text Región Bajo / Entrada secreta
 * @type number
 * @default 251
 *
 * @param RegionAlto
 * @text Región Alto
 * @type number
 * @default 252
 *
 * @param RegionPuente
 * @text Región Puente / Camino secreto
 * @type number
 * @default 253
 *
 * @param RegionBloqueo
 * @text Región Bloqueo Total
 * @type number
 * @default 254
 *
 * @param RegionBloqueoAltoBajo
 * @text Región Bloqueo Alto/Bajo
 * @type number
 * @default 255
 *
 * @param PermitirPuenteBloqueado
 * @text Permitir Puente/Camino aunque el tile bloquee
 * @type boolean
 * @default true
 * @desc Si está ON, la región puente/camino secreto permite caminar aunque el tile tenga X.
 *
 * @param ModoDebug
 * @text Modo Debug
 * @type boolean
 * @default false
 *
 * @help
 * Dex_Overpass v2.2
 * ----------------------------------------------------------------------------
 * 251 = Camino bajo / entrada a camino secreto. Activa modo debajo.
 * 252 = Camino alto. Activa modo encima.
 * 253 = Puente / camino secreto. Mantiene el modo actual.
 * 254 = Bloqueo total.
 * 255 = Bloqueo entre alto y bajo.
 *
 * Visual del puente:
 * Crea eventos encima de los tiles 253 con estas opciones:
 * - Comentario: <dex_puente_visual>
 * - Prioridad: Encima de personajes
 * - Pasar a través: ON
 * - Gráfico: el pedazo visual del puente
 *
 * El plugin mostrará esos eventos solo cuando el jugador esté en 253 viniendo desde 251.
 *
 * Camino secreto:
 * Coloca región 251 en la entrada y región 253 en todo el camino oculto.
 * Si "Permitir Puente/Camino aunque el tile bloquee" está ON, podrás caminar
 * por región 253 aunque visualmente parezca pared, vacío, arbusto o borde.
 */

(() => {
    "use strict";

    const NOMBRE_PLUGIN = (() => {
        const script = document.currentScript;
        if (!script) return "Dex_Overpass";
        const src = script.src || "Dex_Overpass.js";
        return decodeURIComponent(src.split("/").pop().replace(/\.js$/i, ""));
    })();

    const params = PluginManager.parameters(NOMBRE_PLUGIN);

    const REGION_BAJO = Number(params.RegionBajo || 251);
    const REGION_ALTO = Number(params.RegionAlto || 252);
    const REGION_PUENTE = Number(params.RegionPuente || 253);
    const REGION_BLOQUEO = Number(params.RegionBloqueo || 254);
    const REGION_BLOQUEO_ALTO_BAJO = Number(params.RegionBloqueoAltoBajo || 255);
    const PERMITIR_PUENTE_BLOQUEADO = String(params.PermitirPuenteBloqueado || "true") === "true";
    const DEBUG = String(params.ModoDebug || "false") === "true";

    function logDex(...args) {
        if (DEBUG) console.log("[Dex_Overpass]", ...args);
    }

    function regionEn(x, y) {
        return $gameMap.regionId(x, y);
    }

    function esBajo(regionId) {
        return regionId === REGION_BAJO;
    }

    function esAlto(regionId) {
        return regionId === REGION_ALTO;
    }

    function esPuente(regionId) {
        return regionId === REGION_PUENTE;
    }

    function esEspecial(regionId) {
        return [
            REGION_BAJO,
            REGION_ALTO,
            REGION_PUENTE,
            REGION_BLOQUEO,
            REGION_BLOQUEO_ALTO_BAJO
        ].includes(regionId);
    }

    function nivelActual(personaje) {
        return personaje._dexNivelOverpass || "bajo";
    }

    function setNivel(personaje, nivel) {
        if (!personaje) return;
        personaje._dexNivelOverpass = nivel === "alto" ? "alto" : "bajo";
        logDex("Nivel:", personaje.constructor.name, personaje._dexNivelOverpass, "region", personaje.regionId());
    }

    function actualizarNivelPorRegion(personaje) {
        if (!personaje) return;
        const regionId = personaje.regionId();

        if (esBajo(regionId)) {
            setNivel(personaje, "bajo");
        } else if (esAlto(regionId)) {
            setNivel(personaje, "alto");
        } else if (!personaje._dexNivelOverpass) {
            setNivel(personaje, "bajo");
        }
    }

    function jugadorDebajoDelPuente() {
        return $gamePlayer &&
            esPuente($gamePlayer.regionId()) &&
            nivelActual($gamePlayer) === "bajo";
    }

    function debeMostrarPuenteVisual() {
        return jugadorDebajoDelPuente() || !!$gamePlayer._dexMantenerPuenteVisual;
    }

    function comentariosEvento(evento) {
        if (!evento || !evento.list()) return [];
        return evento.list()
            .filter(cmd => cmd.code === 108 || cmd.code === 408)
            .flatMap(cmd => cmd.parameters || []);
    }

    function esEventoVisualPuente(evento) {
        return comentariosEvento(evento).includes("<dex_puente_visual>");
    }

    function actualizarEventosVisualesPuente() {
        if (!$gameMap || !$gamePlayer) return;
        const mostrar = debeMostrarPuenteVisual();

        $gameMap.events().forEach(evento => {
            if (!esEventoVisualPuente(evento)) return;
            evento.setTransparent(!mostrar);
        });
    }

    const _Game_Player_refresh = Game_Player.prototype.refresh;
    Game_Player.prototype.refresh = function() {
        _Game_Player_refresh.call(this);
        actualizarNivelPorRegion(this);
    };

    const _Game_Player_updateMove = Game_Player.prototype.updateMove;
    Game_Player.prototype.updateMove = function() {
        _Game_Player_updateMove.call(this);
        actualizarNivelPorRegion(this);

        if (!this.isMoving() && !esPuente(this.regionId())) {
            this._dexMantenerPuenteVisual = false;
        }
    };

    const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(d) {
        const regionOrigen = this.regionId();
        const nivelOrigen = nivelActual(this);

        _Game_Player_moveStraight.call(this, d);

        const regionDestino = this.regionId();

        if ((esPuente(regionDestino) && nivelOrigen === "bajo") ||
            (esPuente(regionOrigen) && nivelOrigen === "bajo")) {
            this._dexMantenerPuenteVisual = true;
        }
    };

    const _Game_Player_locate = Game_Player.prototype.locate;
    Game_Player.prototype.locate = function(x, y) {
        _Game_Player_locate.call(this, x, y);
        actualizarNivelPorRegion(this);
    };

    const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);

        const actual = regionEn(x, y);
        const destino = regionEn(x2, y2);

        if (!esEspecial(actual) && !esEspecial(destino)) {
            return _Game_CharacterBase_isMapPassable.call(this, x, y, d);
        }

        if (destino === REGION_BLOQUEO) return false;
        if (destino === REGION_BLOQUEO_ALTO_BAJO) return false;

        const nivel = nivelActual(this);

        // Entrada al puente/camino secreto.
        // Solo puedes entrar a 253 desde 251, 252 o desde otro 253.
        if (esPuente(destino)) {
            if (esBajo(actual) || esAlto(actual) || esPuente(actual)) {
                return PERMITIR_PUENTE_BLOQUEADO
                    ? true
                    : _Game_CharacterBase_isMapPassable.call(this, x, y, d);
            }
            return false;
        }

        // Camino secreto bajo: permite volver de 253 a 251.
        if (esPuente(actual) && nivel === "bajo" && esBajo(destino)) {
            return true;
        }

        // Camino alto: permite volver de 253 a 252.
        if (esPuente(actual) && nivel === "alto" && esAlto(destino)) {
            return true;
        }

        // Si estás dentro de 253, no puedes salir a tiles sin región especial.
        // Esto evita caminar libre por el mapa después de entrar al camino secreto.
        if (esPuente(actual) && !esEspecial(destino)) {
            return false;
        }

        if (esPuente(actual) && nivel === "bajo" && esAlto(destino)) {
            return false;
        }

        if (esPuente(actual) && nivel === "alto" && esBajo(destino)) {
            return false;
        }

        return _Game_CharacterBase_isMapPassable.call(this, x, y, d);
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.call(this, mapId);
        setTimeout(() => actualizarEventosVisualesPuente(), 0);
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        actualizarNivelPorRegion(this);
        actualizarEventosVisualesPuente();
    };

})();
