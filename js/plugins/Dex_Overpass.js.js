/*:
 * @target MZ MV
 * @plugindesc [v2.0.0] Sistema de Control de 4 Zonas para "The Dex Canvas"
 * @author The Dex Canvas Team & Gemini
 *
 * @param Zona Entrada
 * @type number
 * @default 255
 * @desc ID de Región o Terrain Tag para las rampas de entrada (Activa Nivel 1).
 *
 * @param Zona Camino
 * @type number
 * @default 254
 * @desc ID de Región o Terrain Tag para el cuerpo del puente/camino secreto.
 *
 * @param Zona Paso Inferior
 * @type number
 * @default 253
 * @desc ID de Región o Terrain Tag para pasar por debajo (Pared si estás arriba).
 *
 * @param Zona Bloqueo Total
 * @type number
 * @default 252
 * @desc ID de Región o Terrain Tag para denegar el paso por completo.
 */

(function() {
    "use strict";

    const params = PluginManager.parameters('Dex_Overpass');
    const Z_ENTRANCE  = Number(params['Zona Entrada'] || 255);
    const Z_PATH      = Number(params['Zona Camino'] || 254);
    const Z_UNDERPASS = Number(params['Zona Paso Inferior'] || 253);
    const Z_BLOCK     = Number(params['Zona Bloqueo Total'] || 252);

    // 1. Inicialización de Nivel
    const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._bridgeLevel = 0; // 0 = Suelo común, 1 = Elevado
    };

    // 2. Máquina de Estados (Actualización pasiva al pisar el Tile)
    const _Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
    Game_CharacterBase.prototype.refreshBushDepth = function() {
        _Game_CharacterBase_refreshBushDepth.call(this);
        
        const r = this.regionId();
        const t = this.terrainTag();

        if (r === Z_ENTRANCE || t === Z_ENTRANCE) {
            this._bridgeLevel = 1; // Subir al sistema elevado
        } else if (r === Z_PATH || t === Z_PATH) {
            if (this._bridgeLevel === undefined) this._bridgeLevel = 0; // Mantener nivel actual
        } else if (r === Z_UNDERPASS || t === Z_UNDERPASS) {
            this._bridgeLevel = 0; // Forzar nivel inferior
        } else {
            this._bridgeLevel = 0; // Suelo normal fuera del mapa
        }
    };

    // Sincronización de seguidores
    const _Game_Follower_refreshBushDepth = Game_Follower.prototype.refreshBushDepth;
    Game_Follower.prototype.refreshBushDepth = function() {
        _Game_Follower_refreshBushDepth.call(this);
        const r = this.regionId();
        const t = this.terrainTag();
        if (r === Z_ENTRANCE || t === Z_ENTRANCE) {
            this._bridgeLevel = 1;
        } else if (r === Z_PATH || t === Z_PATH) {
            this._bridgeLevel = $gamePlayer._bridgeLevel || 0;
        } else {
            this._bridgeLevel = 0;
        }
    };

    // 3. Renderizado de Capas (Z-Index)
    const _Game_CharacterBase_screenZ = Game_CharacterBase.prototype.screenZ;
    Game_CharacterBase.prototype.screenZ = function() {
        if (this._bridgeLevel === 1) return 6; // Por encima de todo
        return _Game_CharacterBase_screenZ.call(this);
    };

    // 4. Control de Físicas Avanzado (canPass)
    const _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
    Game_CharacterBase.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        
        if (!$gameMap.isValid(x2, y2)) return false;
        if (this.isThrough() || this.isDebugThrough()) return true;

        const r1 = $gameMap.regionId(x, y);
        const t1 = $gameMap.terrainTag(x, y);
        const r2 = $gameMap.regionId(x2, y2);
        const t2 = $gameMap.terrainTag(x2, y2);
        
        const lvl = this._bridgeLevel || 0;

        // Regla General: Bloqueo absoluto zona 252
        if (r2 === Z_BLOCK || t2 === Z_BLOCK) return false;

        const srcEntrance = (r1 === Z_ENTRANCE || t1 === Z_ENTRANCE);
        const dstEntrance = (r2 === Z_ENTRANCE || t2 === Z_ENTRANCE);
        const srcPath     = (r1 === Z_PATH || t1 === Z_PATH);
        const dstPath     = (r2 === Z_PATH || t2 === Z_PATH);
        const dstUnder     = (r2 === Z_UNDERPASS || t2 === Z_UNDERPASS);

        // --- COMPORTAMIENTO NIVEL 1 (ARRIBA) ---
        if (lvl === 1) {
            // Permitir moverse libremente entre Entradas (255) y Caminos (254) ignorando las 'X' del mapa
            if ((srcEntrance || srcPath) && (dstEntrance || dstPath)) {
                return !this.isCollidedWithCharacters(x2, y2);
            }
            // Permitir salir de la entrada de regreso al suelo normal común (Región 0)
            if (srcEntrance && !dstEntrance && !dstPath && !dstUnder) {
                return _Game_CharacterBase_canPass.call(this, x, y, d);
            }
            // Muro de contención: Si estás arriba y quieres ir a un paso inferior (253) o al vacío -> Bloquear
            if ((srcEntrance || srcPath) && (dstUnder || (!dstEntrance && !dstPath))) {
                return false;
            }
        } 
        // --- COMPORTAMIENTO NIVEL 0 (ABAJO) ---
        else {
            // Permitir entrar al sistema desde el suelo común pisando la Entrada (255) -> Ignora la 'X'
            if (!srcEntrance && !srcPath && dstEntrance) {
                return !this.isCollidedWithCharacters(x2, y2);
            }
            // Permitir caminar bajo el puente (Zonas 253 o los mismos caminos de 254 desde abajo)
            if (dstUnder || dstPath) {
                return !this.isCollidedWithCharacters(x2, y2);
            }
            // Evitar que alguien abajo intente subirse de lado a una rampa (255)
            if ((srcPath) && dstEntrance) {
                return false;
            }
        }

        return _Game_CharacterBase_canPass.call(this, x, y, d);
    };

    // 5. Aislamiento de colisiones entre alturas
    const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        if ((this._bridgeLevel || 0) !== ($gamePlayer._bridgeLevel || 0)) return false;
        return _Game_Event_isCollidedWithPlayerCharacters.call(this, x, y);
    };

})();