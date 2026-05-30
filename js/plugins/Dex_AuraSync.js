/*:
 * @target MZ
 * @plugindesc [v1.8] Aura Sync de "The Dex Canvas" - Edición Feedback Reactivo y Zona Perfecta de Neon.
 * @author The Dex Canvas Team
 *
 * @param perfectSE
 * @text Sonido de Perfecto
 * @desc El efecto de sonido que se escuchará al lograr un parry perfecto.
 * @default Up4
 *
 * @param mitigatedLastVar
 * @text Variable: Último Daño Mitigado
 * @desc ID de la Variable donde se guardará el daño mitigado en el ÚLTIMO golpe.
 * @type variable
 * @default 1
 *
 * @param mitigatedTotalVar
 * @text Variable: Daño Mitigado Total
 * @desc ID de la Variable que acumulará todo el daño mitigado del juego.
 * @type variable
 * @default 2
 *
 * @param enemyIdVar
 * @text Variable: ID del Enemigo
 * @desc ID de la Variable donde se guardará el ID del enemigo que ataca.
 * @type variable
 * @default 3
 *
 * @param defaultMinRings
 * @text Por Defecto: Mínimo Círculos
 * @desc Círculos mínimos si el enemigo no tiene etiqueta en la base de datos.
 * @type number
 * @default 1
 *
 * @param defaultMaxRings
 * @text Por Defecto: Máximo Círculos
 * @desc Círculos máximos si el enemigo no tiene etiqueta en la base de datos.
 * @type number
 * @default 2
 *
 * @param defaultSpeed
 * @text Por Defecto: Velocidad
 * @desc Velocidad base optimizada y acelerada (Por defecto: 0.053).
 * @type text
 * @default 0.053
 *
 * @param defaultColor
 * @text Por Defecto: Color Mágico
 * @desc Color en formato HEX del círculo mágico (Por defecto: morado místico #a855f7).
 * @type text
 * @default #a855f7
 *
 * @help
 * ============================================================================
 * THE DEX CANVAS - AURA SYNC v1.8 (Sincronización Reactiva de Neon)
 * ============================================================================
 * Resuelve la confusión de timing añadiendo un indicador de zona perfecta 
 * que brilla con luz aditiva en el frame exacto de activación.
 */

(() => {
    const pluginName = "Dex_AuraSync";
    const params = PluginManager.parameters(pluginName);
    const PERFECT_SE = String(params['perfectSE'] || 'Up4');
    const VAR_LAST = Number(params['mitigatedLastVar'] || 1);
    const VAR_TOTAL = Number(params['mitigatedTotalVar'] || 2);
    const VAR_ENEMY_ID = Number(params['enemyIdVar'] || 3);
    
    const DEF_MIN = Number(params['defaultMinRings'] || 1);
    const DEF_MAX = Number(params['defaultMaxRings'] || 2);
    const DEF_SPEED = Number(params['defaultSpeed'] || 0.053);
    const DEF_COLOR = String(params['defaultColor'] || '#a855f7');

    // --- CONTROL DE COMBATE ---

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._auraSyncActive = false;
        this._parryHandlingDamage = false; 
        this._currentMitigationMod = 1.0;
        this._parrySubject = null;
        this._parryTarget = null;
        this._parryChainIndex = 0;
        this._parryChainMax = 1;
        this._parryChainScores = [];
        this._currentMobSpeed = 0.053;
        this._currentMobColor = '#a855f7';
    };

    const _BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function() {
        return _BattleManager_isBusy.call(this) || this._auraSyncActive;
    };

    const _BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        if (subject.isEnemy() && target.isActor() && !this._auraSyncActive && !this._parryHandlingDamage) {
            this._auraSyncActive = true;
            this._parrySubject = subject;
            this._parryTarget = target;
            
            if (VAR_ENEMY_ID > 0) {
                $gameVariables.setValue(VAR_ENEMY_ID, subject.enemyId());
            }

            const enemyData = subject.enemy();
            let minRings = DEF_MIN;
            let maxRings = DEF_MAX;
            this._currentMobSpeed = DEF_SPEED;
            this._currentMobColor = DEF_COLOR;

            if (enemyData.meta.AuraSyncRings) {
                const rings = enemyData.meta.AuraSyncRings.split(',').map(Number);
                minRings = rings[0] || DEF_MIN;
                maxRings = rings[1] || minRings;
            }
            if (enemyData.meta.AuraSyncSpeed) {
                this._currentMobSpeed = Number(enemyData.meta.AuraSyncSpeed) || DEF_SPEED;
            }
            if (enemyData.meta.AuraSyncColor) {
                this._currentMobColor = String(enemyData.meta.AuraSyncColor).trim();
            }

            this._parryChainIndex = 0;
            this._parryChainMax = Math.floor(Math.random() * (maxRings - minRings + 1)) + minRings;
            this._parryChainScores = [];

            if (SceneManager._scene instanceof Scene_Battle) {
                SceneManager._scene.createAuraSyncVisuals(target);
            }
        } else {
            _BattleManager_invokeNormalAction.call(this, subject, target);
        }
    };

    BattleManager.reportRingResult = function(score) {
        this._parryChainScores.push(score);
        this._parryChainIndex++;

        if (this._parryChainIndex < this._parryChainMax) {
            if (SceneManager._scene instanceof Scene_Battle) {
                SceneManager._scene.spawnNextRing();
            }
        } else {
            this.calculateFinalChainMitigation();
        }
    };

    BattleManager.calculateFinalChainMitigation = function() {
        const totalScore = this._parryChainScores.reduce((a, b) => a + b, 0);
        const performancePct = totalScore / this._parryChainMax; 
        this._currentMitigationMod = 1.0 - performancePct;

        this._auraSyncActive = false;
        if (SceneManager._scene instanceof Scene_Battle) {
            SceneManager._scene.removeParryDimmer();
        }

        this._parryHandlingDamage = true;
        this.invokeNormalAction(this._parrySubject, this._parryTarget);
        this._parryHandlingDamage = false; 
        this._currentMitigationMod = 1.0; 
    };

    // --- CÁLCULO DE DAÑO ---

    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        let value = _Game_Action_makeDamageValue.call(this, target, critical);
        
        if (BattleManager._parryHandlingDamage) {
            const originalDamage = value;
            value = Math.floor(value * BattleManager._currentMitigationMod);
            const damageMitigated = originalDamage - value;

            if (VAR_LAST > 0) $gameVariables.setValue(VAR_LAST, damageMitigated);
            if (damageMitigated > 0 && VAR_TOTAL > 0) {
                $gameVariables.setValue(VAR_TOTAL, $gameVariables.value(VAR_TOTAL) + damageMitigated);
            }
        }
        return value;
    };

    // --- CONTROL DE ESCENA ---

    Scene_Battle.prototype.createAuraSyncVisuals = function(target) {
        this._parryDimmer = new ScreenSprite();
        this._parryDimmer.setColor(0, 0, 0);
        this._parryDimmer.opacity = 130; 
        this.addChild(this._parryDimmer);

        this.spawnNextRing();
    };

    Scene_Battle.prototype.spawnNextRing = function() {
        let targetX = Graphics.width / 2;
        let targetY = Graphics.height / 2;

        if (this._spriteset && this._spriteset._actorSprites) {
            const actorSprite = this._spriteset._actorSprites.find(s => s._actor === BattleManager._parryTarget);
            if (actorSprite) {
                targetX = actorSprite.x;
                targetY = actorSprite.y - 50; 
            }
        }

        this._parrySprite = new Sprite_ParryCircle(targetX, targetY, BattleManager._currentMobSpeed, BattleManager._currentMobColor);
        this.addChild(this._parrySprite);
    };

    Scene_Battle.prototype.createParryFeedbackText = function(x, y, score) {
        const textSprite = new Sprite_ParryText(x, y, score);
        this.addChild(textSprite);
    };

    Scene_Battle.prototype.removeParrySprite = function(sprite) {
        if (sprite === this._parrySprite) {
            this.removeChild(this._parrySprite);
            this._parrySprite = null;
        }
    };

    Scene_Battle.prototype.removeParryDimmer = function() {
        if (this._parryDimmer) {
            this.removeChild(this._parryDimmer);
            this._parryDimmer = null;
        }
    };

    // --- SPRITE: MATRIZ ARCANA REACTIVA ---

    function Sprite_ParryCircle() {
        this.initialize(...arguments);
    }

    Sprite_ParryCircle.prototype = Object.create(Sprite.prototype);
    Sprite_ParryCircle.prototype.constructor = Sprite_ParryCircle;

    Sprite_ParryCircle.prototype.initialize = function(x, y, baseSpeed, color) {
        Sprite.prototype.initialize.call(this);
        this.x = x;
        this.y = y;
        this._hasTriggered = false;
        this._frameAge = 0;
        this._color = color;
        
        const minorVariance = (Math.random() * 0.01) - 0.005;
        this._scaleSpeed = baseSpeed + minorVariance; 
        this._rotationSpeed = (Math.random() * 0.012 + 0.012) * (Math.random() > 0.5 ? 1 : -1);

        this.createMagicMatrices();
    };

    Sprite_ParryCircle.prototype.createMagicMatrices = function() {
        const canvasSize = 360; 
        const radius = 80;      
        const cx = canvasSize / 2;
        const cy = canvasSize / 2;

        // 1. MATRIZ BASE OBJETIVO (Fija de fondo)
        this._targetRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._targetRing.anchor.x = 0.5;
        this._targetRing.anchor.y = 0.5;
        let ctx = this._targetRing.bitmap.context;
        this.drawArcaneStructure(ctx, cx, cy, radius, 'rgba(255, 255, 255, 0.35)', 2);
        this.addChild(this._targetRing);

        // 2. NUEVO: HAZ DE LUZ DE ZONA PERFECTA (Indicador físico del Sweet Spot)
        this._perfectZoneGuide = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._perfectZoneGuide.anchor.x = 0.5;
        this._perfectZoneGuide.anchor.y = 0.5;
        let ctxZone = this._perfectZoneGuide.bitmap.context;
        ctxZone.strokeStyle = 'rgba(250, 204, 21, 0.2)'; // Oro translúcido de fondo
        ctxZone.lineWidth = 12; // Un carril ancho visible
        ctxZone.beginPath();
        ctxZone.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctxZone.stroke();
        this.addChild(this._perfectZoneGuide);

        // 3. NUEVO: SPRITE DE DESTELLO ADITIVO (Se activa con brillo de neón en el frame del Perfect)
        this._perfectGlowRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._perfectGlowRing.anchor.x = 0.5;
        this._perfectGlowRing.anchor.y = 0.5;
        this._perfectGlowRing.blendMode = 1; // Mezcla aditiva (Brillo de luz pura)
        this._perfectGlowRing.visible = false; // Oculto hasta que entremos en ventana
        let ctxGlow = this._perfectGlowRing.bitmap.context;
        ctxGlow.strokeStyle = '#fde047'; // Amarillo Neón/Oro Eléctrico
        ctxGlow.lineWidth = 6;
        ctxGlow.shadowColor = '#eab308';
        ctxGlow.shadowBlur = 12; // Difuminado mágico de luz
        ctxGlow.beginPath();
        ctxGlow.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctxGlow.stroke();
        this.addChild(this._perfectGlowRing);

        // 4. MATRIZ DE ACCIÓN (La que viaja y gira)
        this._actionRing = new Sprite(new Bitmap(canvasSize, canvasSize));
        this._actionRing.anchor.x = 0.5;
        this._actionRing.anchor.y = 0.5;
        ctx = this._actionRing.bitmap.context;
        this.drawArcaneStructure(ctx, cx, cy, radius, this._color, 4);
        
        this._actionRing.scale.x = 2.6;
        this._actionRing.scale.y = 2.6;
        this.addChild(this._actionRing);
    };

    Sprite_ParryCircle.prototype.drawArcaneStructure = function(ctx, cx, cy, r, color, coreLineWidth) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 10]);
        ctx.beginPath();
        ctx.arc(cx, cy, r + 22, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]); 

        ctx.lineWidth = coreLineWidth;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 14, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 1;
        const innerR = r - 14;
        ctx.beginPath();
        ctx.moveTo(cx + innerR, cy);     
        ctx.lineTo(cx, cy + innerR);     
        ctx.lineTo(cx - innerR, cy);     
        ctx.lineTo(cx, cy - innerR);     
        ctx.closePath();
        ctx.stroke();

        const dotRadius = 3;
        const points = [
            {x: cx + innerR, y: cy}, {x: cx - innerR, y: cy},
            {x: cx, y: cy + innerR}, {x: cx, y: cy - innerR}
        ];
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    Sprite_ParryCircle.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._hasTriggered) return;

        if (this._actionRing) {
            this._actionRing.scale.x -= this._scaleSpeed;
            this._actionRing.scale.y -= this._scaleSpeed;
            this._actionRing.rotation += this._rotationSpeed; 

            this._frameAge++;
            
            // VERIFICACIÓN DE FRAME DESTELLO (Real-time Feedback)
            const precision = this._actionRing.scale.x;
            if (precision >= 0.92 && precision <= 1.08) {
                // Si está en la zona exacta, encendemos el Neón y lo hacemos pulsar intensamente
                this._perfectGlowRing.visible = true;
                this._perfectGlowRing.opacity = 170 + Math.sin(this._frameAge * 0.6) * 85;
            } else {
                this._perfectGlowRing.visible = false;
            }

            if (this._frameAge > 2) {
                if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                    this._hasTriggered = true;
                    this.evaluateTiming();
                }
            }

            if (this._actionRing.scale.x <= 0.3) {
                this._hasTriggered = true;
                this.executeEnd(0.0); 
            }
        }
    };

    Sprite_ParryCircle.prototype.evaluateTiming = function() {
        const precision = this._actionRing.scale.x;
        
        if (precision >= 0.92 && precision <= 1.08) {
            AudioManager.playStaticSe({ name: PERFECT_SE, volume: 100, pitch: 115, pan: 0 });
            this.executeEnd(1.0); 
        } else if (precision >= 0.72 && precision <= 1.32) {
            SoundManager.playOk();
            this.executeEnd(0.5); 
        } else {
            this.executeEnd(0.0); 
        }
    };

    Sprite_ParryCircle.prototype.executeEnd = function(score) {
        if (SceneManager._scene instanceof Scene_Battle) {
            SceneManager._scene.createParryFeedbackText(this.x, this.y - 30, score);
            SceneManager._scene.removeParrySprite(this);
        }
        BattleManager.reportRingResult(score);
    };

})();

// --- SPRITE: TEXTO FLOTANTE ---

function Sprite_ParryText() {
    this.initialize(...arguments);
}

Sprite_ParryText.prototype = Object.create(Sprite.prototype);
Sprite_ParryText.prototype.constructor = Sprite_ParryText;

Sprite_ParryText.prototype.initialize = function(x, y, score) {
    Sprite.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    
    this._duration = 45; 
    this._maxDuration = 45;
    
    this.createTextBox(score);
};

Sprite_ParryText.prototype.createTextBox = function(score) {
    const w = 240;
    const h = 60;
    this.bitmap = new Bitmap(w, h);
    
    const ctx = this.bitmap.context;
    ctx.font = "italic bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    let text = "";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    if (score === 1.0) {
        text = "PERFECT";
        const rainbowGrad = ctx.createLinearGradient(40, 0, 200, 0);
        rainbowGrad.addColorStop(0.0, "#ff3333"); 
        rainbowGrad.addColorStop(0.2, "#ff9933"); 
        rainbowGrad.addColorStop(0.4, "#ffff33"); 
        rainbowGrad.addColorStop(0.6, "#33cc33"); 
        rainbowGrad.addColorStop(0.8, "#3399ff"); 
        rainbowGrad.addColorStop(1.0, "#b333ff"); 
        
        ctx.fillStyle = rainbowGrad;
    } else if (score === 0.5) {
        text = "GOOD";
        ctx.fillStyle = "#38bdf8"; 
    } else {
        text = "MISS";
        ctx.fillStyle = "#f87171"; 
    }

    ctx.strokeText(text, w / 2, h / 2);
    ctx.fillText(text, w / 2, h / 2);
    this.bitmap._hasChanges = true;
};

Sprite_ParryText.prototype.update = function() {
    Sprite.prototype.update.call(this);
    
    if (this._duration > 0) {
        this._duration--;
        this.y -= 0.8;
        
        if (this._duration > this._maxDuration - 8) {
            this.scale.x += 0.03;
            this.scale.y += 0.03;
        }
        
        if (this._duration < 20) {
            this.opacity = (this._duration / 20) * 255;
        }
        
        if (this._duration === 0) {
            if (this.parent) this.parent.removeChild(this);
        }
    }
};