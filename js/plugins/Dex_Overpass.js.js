/*:
 * @target MZ
 * @plugindesc Dex_Overpass v2.4.2 - Puentes, pasos bajos, caminos secretos y techos superiores forzados por regiones.
 * @author Dextroyean y Jaime
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
 * @param RegionTechoForzado
 * @text Región Techo / Estrella Forzada
 * @type number
 * @min 1
 * @max 255
 * @default 250
 * @desc Los tiles de las capas superiores se dibujan sobre el jugador aunque no tengan estrella.
 *
 * @param TechoIgnoraBloqueo
 * @text Techo usa paso tipo Estrella
 * @type boolean
 * @default true
 * @desc Ignora el bloqueo de las capas superiores y usa el paso de las capas inferiores.
 *
 * @param ForzarPasoTecho
 * @text Forzar paso en Región Techo
 * @type boolean
 * @default true
 * @desc Permite entrar a la región de techo aunque debajo no exista un tile transitable.
 *
 * @param CoberturaCompletaTecho
 * @text Cubrir con todos los tiles
 * @type boolean
 * @default true
 * @desc Duplica las capas inferiores arriba del jugador para que pase visualmente por debajo del tile completo.
 *
 * @param FilasExtraArriba
 * @text Filas extra de cobertura
 * @type number
 * @min 0
 * @max 4
 * @default 1
 * @desc Cubre también tiles situados encima de la región 250 para ocultar sprites altos.
 *
 * @param FilasExtraIgnoranRegionesEspeciales
 * @text Filas extra ignoran regiones especiales
 * @type boolean
 * @default true
 * @desc Evita que la cobertura extra se aplique sobre 251/252/253/254/255. Corrige tiles raros/transparentes arriba de 250.
 *
 * @param BloquearBordesTecho
 * @text Bloquear bordes de Región Techo
 * @type boolean
 * @default true
 * @desc Si está ON, 250 se comporta como zona confinada: no puedes salir/entrar a regiones normales sin entrada permitida.
 *
 * @param TechoRegionesEntrada
 * @text Regiones de entrada/salida a 250
 * @type text
 * @default 251,252,253
 * @desc Regiones desde/hacia las que se permite cruzar con 250. Usa 0,251,252,253 si quieres permitir entrada desde suelo normal.
 *
 * @param ModoDebug
 * @text Modo Debug
 * @type boolean
 * @default false
 *
 * @help
 * Dex_Overpass v2.4.2
 * ----------------------------------------------------------------------------
 * 250 = Techo / estrella forzada.
 * 251 = Camino bajo / entrada a camino secreto. Activa modo debajo.
 * 252 = Camino alto. Activa modo encima.
 * 253 = Puente / camino secreto. Mantiene el modo actual.
 * 254 = Bloqueo total.
 * 255 = Bloqueo entre alto y bajo.
 *
 * TECHO / ESTRELLA FORZADA:
 * ----------------------------------------------------------------------------
 * 1. Pinta el suelo normal en una capa inferior.
 * 2. Pinta el techo, copa, arco o decoración en la capa 3 o 4 del mapa.
 * 3. Coloca la región 250 sobre esas casillas.
 *
 * El plugin enviará los tiles de las capas superiores por encima del jugador,
 * aunque en la base de datos no tengan la bandera de estrella.
 *
 * Si "Cubrir con todos los tiles" está ON, también duplica visualmente las
 * capas inferiores sobre el jugador. Esto permite caminar por debajo incluso
 * cuando el gráfico fue pintado en las capas 1 o 2 del editor.
 *
 * "Filas extra de cobertura" extiende el techo visual hacia arriba.
 * El valor 1 evita que la cabeza, sombrero o cabello de sprites altos asome
 * por el borde superior de la región.
 *
 * La región 250 debe estar en LA MISMA CASILLA que contiene el tile que debe
 * cubrir al personaje. Una región colocada sobre una casilla vacía o negra
 * permite pasar, pero no tiene ningún gráfico que pueda dibujarse encima.
 *
 * Si "Techo usa paso tipo Estrella" está ON, el tile superior no bloqueará:
 * la transitabilidad será decidida por el suelo de las capas inferiores.
 *
 * Si "Forzar paso en Región Techo" está ON, la región 250 será transitable
 * incluso cuando no exista un suelo válido debajo. Esta opción es útil para
 * bordes, vacío visual, copas y estructuras donde el mapa no tiene una capa
 * inferior marcada como transitable.
 *
 * Esta región es ideal para:
 * - Copas de árboles.
 * - Arcos y entradas.
 * - Techos interiores.
 * - Túneles visuales.
 * - Rocas o estructuras por debajo de las que pasa el jugador.
 *
 * IMPORTANTE:
 * Con "Cubrir con todos los tiles" ON, el gráfico puede estar en cualquier
 * capa. El plugin conserva el dibujo inferior y crea una copia superior para
 * ocultar correctamente al personaje.
 *
 * Para mayor control visual sigue siendo recomendable separar el suelo y el
 * techo en capas diferentes, pero ya no es obligatorio.
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

    function parseRegionList(value, fallback) {
        const raw = String(value || "").trim();
        const source = raw ? raw : String((fallback || []).join(","));

        return source
            .split(/[,;|\s]+/)
            .map(n => Number(n))
            .filter(n => Number.isFinite(n) && n >= 0 && n <= 255);
    }

    const REGION_BAJO = Number(params.RegionBajo || 251);
    const REGION_ALTO = Number(params.RegionAlto || 252);
    const REGION_PUENTE = Number(params.RegionPuente || 253);
    const REGION_BLOQUEO = Number(params.RegionBloqueo || 254);
    const REGION_BLOQUEO_ALTO_BAJO = Number(params.RegionBloqueoAltoBajo || 255);
    const REGION_TECHO_FORZADO = Number(params.RegionTechoForzado || 250);
    const PERMITIR_PUENTE_BLOQUEADO = String(params.PermitirPuenteBloqueado || "true") === "true";
    const TECHO_IGNORA_BLOQUEO = String(params.TechoIgnoraBloqueo || "true") === "true";
    const FORZAR_PASO_TECHO = String(params.ForzarPasoTecho || "true") === "true";
    const COBERTURA_COMPLETA_TECHO = String(params.CoberturaCompletaTecho || "true") === "true";
    const FILAS_EXTRA_ARRIBA = Math.max(
        0,
        Math.min(4, Number(params.FilasExtraArriba || 1))
    );
    const FILAS_EXTRA_IGNORAN_ESPECIALES = String(params.FilasExtraIgnoranRegionesEspeciales || "true") === "true";
    const BLOQUEAR_BORDES_TECHO = String(params.BloquearBordesTecho || "true") === "true";
    const TECHO_REGIONES_ENTRADA = parseRegionList(
        params.TechoRegionesEntrada,
        [REGION_BAJO, REGION_ALTO, REGION_PUENTE]
    );
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

    function esTechoForzado(regionId) {
        return regionId === REGION_TECHO_FORZADO;
    }

    function tilesInferioresConEventos(mapa, x, y) {
        const tiles = [];

        if (mapa.tileEventsXy) {
            const eventosTile = mapa.tileEventsXy(x, y);

            for (const evento of eventosTile) {
                const tileId = evento.tileId();

                if (tileId > 0) {
                    tiles.push(tileId);
                }
            }
        }

        // Conservamos las dos capas inferiores.
        // Las capas 2 y 3 son tratadas como la parte visual superior.
        tiles.push(mapa.tileId(x, y, 1));
        tiles.push(mapa.tileId(x, y, 0));

        return tiles;
    }

    function comprobarPasoComoEstrella(mapa, x, y, bit) {
        const flags = mapa.tilesetFlags();
        const tiles = tilesInferioresConEventos(mapa, x, y);

        for (const tileId of tiles) {
            const flag = flags[tileId] || 0;

            // Una estrella real también se ignora al decidir el paso.
            if ((flag & 0x10) !== 0) {
                continue;
            }

            if ((flag & bit) === 0) {
                return true;
            }

            if ((flag & bit) === bit) {
                return false;
            }
        }

        return false;
    }

    function esEspecial(regionId) {
        return [
            REGION_BAJO,
            REGION_ALTO,
            REGION_PUENTE,
            REGION_BLOQUEO,
            REGION_BLOQUEO_ALTO_BAJO,
            REGION_TECHO_FORZADO
        ].includes(regionId);
    }

    function esEntradaPermitidaTecho(regionId) {
        return TECHO_REGIONES_ENTRADA.includes(Number(regionId));
    }

    function cruceTechoPermitido(actual, destino) {
        const actualTecho = esTechoForzado(actual);
        const destinoTecho = esTechoForzado(destino);

        if (!actualTecho && !destinoTecho) return null;
        if (actualTecho && destinoTecho) return true;

        if (actualTecho && !destinoTecho) {
            return esEntradaPermitidaTecho(destino);
        }

        if (!actualTecho && destinoTecho) {
            return esEntradaPermitidaTecho(actual);
        }

        return null;
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

    //-------------------------------------------------------------------------
    // Techo / estrella forzada por región
    //-------------------------------------------------------------------------

    const _Tilemap_isOverpassPosition = Tilemap.prototype._isOverpassPosition;
    Tilemap.prototype._isOverpassPosition = function(mx, my) {
        const regionId = this._readMapData(mx, my, 5);

        if (esTechoForzado(regionId)) {
            return true;
        }

        return _Tilemap_isOverpassPosition.call(this, mx, my);
    };

    const _Tilemap_addSpot = Tilemap.prototype._addSpot;
    Tilemap.prototype._addSpot = function(startX, startY, x, y) {
        _Tilemap_addSpot.call(this, startX, startY, x, y);

        if (!COBERTURA_COMPLETA_TECHO) {
            return;
        }

        const mx = startX + x;
        const my = startY + y;
        const regionId = this._readMapData(mx, my, 5);
        const esCasillaTecho = esTechoForzado(regionId);

        if (!esCasillaTecho && FILAS_EXTRA_IGNORAN_ESPECIALES && esEspecial(regionId)) {
            return;
        }

        let filaBuffer = 0;

        if (!esCasillaTecho && FILAS_EXTRA_ARRIBA > 0) {
            for (let offset = 1; offset <= FILAS_EXTRA_ARRIBA; offset++) {
                const regionDebajo = this._readMapData(mx, my + offset, 5);

                if (esTechoForzado(regionDebajo)) {
                    filaBuffer = offset;
                    break;
                }
            }
        }

        if (!esCasillaTecho && filaBuffer === 0) {
            return;
        }

        const dx = x * this.tileWidth;
        const dy = y * this.tileHeight;
        const tileId0 = this._readMapData(mx, my, 0);
        const tileId1 = this._readMapData(mx, my, 1);
        const tileId2 = this._readMapData(mx, my, 2);
        const tileId3 = this._readMapData(mx, my, 3);

        // En la propia casilla 250, MZ ya envía las capas 2 y 3 arriba
        // mediante _isOverpassPosition. Sólo duplicamos 0 y 1.
        if (esCasillaTecho) {
            this._addTile(this._upperLayer, tileId0, dx, dy);
            this._addTile(this._upperLayer, tileId1, dx, dy);
        } else {
            // En las filas de colchón situadas encima, duplicamos todas las
            // capas porque esas casillas no tienen región 250 propia.
            this._addTile(this._upperLayer, tileId0, dx, dy);
            this._addTile(this._upperLayer, tileId1, dx, dy);
            this._addTile(this._upperLayer, tileId2, dx, dy);
            this._addTile(this._upperLayer, tileId3, dx, dy);
        }

        logDex(
            "Cobertura completa",
            "x:", mx,
            "y:", my,
            "techo:", esCasillaTecho,
            "buffer:", filaBuffer,
            "tiles:", [tileId0, tileId1, tileId2, tileId3]
        );
    };

    const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
    Game_Map.prototype.checkPassage = function(x, y, bit) {
        const regionId = this.regionId(x, y);

        if (esTechoForzado(regionId)) {
            if (FORZAR_PASO_TECHO) {
                logDex(
                    "Paso techo forzado",
                    "x:", x,
                    "y:", y,
                    "bit:", bit,
                    "resultado: true"
                );
                return true;
            }

            if (TECHO_IGNORA_BLOQUEO) {
                const resultado = comprobarPasoComoEstrella(this, x, y, bit);
                logDex(
                    "Paso techo por suelo inferior",
                    "x:", x,
                    "y:", y,
                    "bit:", bit,
                    "resultado:", resultado
                );
                return resultado;
            }
        }

        return _Game_Map_checkPassage.call(this, x, y, bit);
    };

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

        if (BLOQUEAR_BORDES_TECHO && (esTechoForzado(actual) || esTechoForzado(destino))) {
            const permitido = cruceTechoPermitido(actual, destino);

            if (permitido !== null) {
                logDex(
                    "Cruce techo 250",
                    "actual:", actual,
                    "destino:", destino,
                    "permitido:", permitido
                );
                return permitido;
            }
        }

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

        setTimeout(() => {
            actualizarEventosVisualesPuente();

            const scene = SceneManager._scene;
            const tilemap = scene && scene._spriteset
                ? scene._spriteset._tilemap
                : null;

            if (tilemap && tilemap.refresh) {
                tilemap.refresh();
            }
        }, 0);
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        actualizarNivelPorRegion(this);
        actualizarEventosVisualesPuente();
    };

})();
