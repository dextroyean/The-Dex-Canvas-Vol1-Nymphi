/*:
 * @target MZ
 * @plugindesc Quickly transform your events into emitters
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io
 * 
 * @help
 * Version 1.0.6a
 * ----------------------------------------------------------------------------
 * This RPG Maker MZ plugin lets you easily transform your events into light emitters.
 * If you have an eye for aesthetics, this plugin will help you create stunning,
 * atmospheric maps and add beautiful lighting effects that animate your game world.
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ■■ METHOD 1 - VISUAL EDITOR ■■
 * 1. Put comment <emitter> to an event you want to become an emitter
 * 2. In-game, press pageDown (W) (or a button assigned via parameter) to open visual editor
 * 3. Slide the slides and press Apply to save the setting
 * NOTE: Setting will apply to all events with the same name and also have
 * comment <emitter>
 * 
 * ■■ METHOD 2 ■■
 * Call plugin command to make the event you want to be an emitter
 * 
 * ■■ METHOD 3 ■■
 * This is an automatic method. Add notetags to events and configure them in Auto Emitter Settings
 * Example: <torch> <campfire> <crystal>
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * - Create Emitters Quickly and Non-Destructively
 * - Create Emitters in real-time using an visual editor
 * - Create event emitters using various methods: comments, plugin commands, notetags
 * - Choose between a circular shape or your event’s sprite for emission
 * - Flickering Animation
 * - Customizations: Automatically emit light based on the event’s sprite color,
 *                 adjust emitter radius, intensity, softness, light area offset,
 *                 and enable fade-in/fade-out effects
 * - Performance Optimized: Designed with performance as the top priority
 * - An awesome dev to support you nearly 24/7
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ■ Accquiring this plugin legally grants you the permission to use this plugin
 * 	 in both free and commercial game projects
 * ■ Modify the plugin as you wish but don't distribute your modification
 * ----------------------------------------------------------------------------
 * For support, please reach out:
 * Discord: https://discord.gg/YKPscqHV8b
 * Patreon: https://www.patreon.com/SangHendrix
 * ----------------------------------------------------------------------------
 * 
 * @param visualEditorButton
 * @text Visual Editor Button
 * @desc Key to open visual editor
 * @type select
 * @option Page Up
 * @value pageup
 * @option Page Down
 * @value pagedown
 * @option Ctrl
 * @value control
 * @default pageup
 *
 * @param autoEmitterSettings
 * @text Auto Emitter Settings
 * @desc Automatically create emitters based on event notetags
 * @type struct<AutoEmitterSetting>[]
 * @default []
 * 
 * @command createBright
 * @text Create Emitter
 * @desc Create a brightness effect on a target
 * 
 * @arg target
 * @text Target
 * @desc Target to be Emitter (player, this, or event ID)
 * @type string
 * @default this
 * 
 * @arg name
 * @text Name
 * @desc Only required if you want to create multiple emitter on the same target. Like multiple layers
 * @type string
 * @default 
 * 
 * @arg spriteAsEmitter
 * @text Sprite as Emitter
 * @desc Use the target sprite shape as light emitter. False = A circle
 * @type boolean
 * @default true
 * 
 * @arg lightSettings
 * @text Emitter Settings
 * @desc Radius, Intensity, Softness, Color (e.g. 150, 0.8, 0.7, #ffffff)
 * @type string
 * @default 100, 1, 1.5, #ffffff
 * 
 * @arg offset
 * @text Emitter Offset
 * @desc X, Y offset from target position in pixels (e.g. 16, -8)
 * @type string
 * @default 0, 0
 * 
 * @arg flickerSettings
 * @text Flicker Settings
 * @desc Flicker Speed, Flicker Intensity (0 speed to disable, e.g. 2.0, 0.3)
 * @type string
 * @default 0, 0
 * 
 * @arg fadeIn
 * @text Fade In
 * @desc 0 to instantly show emit light. Write numbers in to slowly emit instead of instant (frame unit)
 * @type string
 * @default 0
 * 
 * @arg autoDestroy
 * @text Auto Destroy
 * @desc Auto destroy self after a duration. Format: Duration, Fade Out (all in frames unit). 0 to disable this feature
 * @type string
 * @default 0, 0
 * 
 * @arg persist
 * @text Persist
 * @desc Keep the emitter when changing scenes or maps
 * @type boolean
 * @default false
 * 
 * @command removeBright
 * @text Remove Emitter
 * @desc Remove emitter from event. Can only remove emitter created with plugin command Create Emitter
 * 
 * @arg target
 * @text Target
 * @desc Target to remove Emitter from (player, this, or event ID)
 * @type string
 * @default this
 * 
 * @arg name
 * @text Name
 * @desc Only required if you want to create multiple emitter on the same target. Like multiple layers
 * @type string
 * @default 
 * 
 * @arg fadeOut
 * @text Fade Out
 * @desc 0 to instantly delete emitter. Write numbers in to have fade out effect (frame unit)
 * @type string
 * @default 0
 */
/*~struct~AutoEmitterSetting:
 * @param notetag
 * @text Notetag
 * @desc The notetag to look for. Example: if your notetag is <light>, write  light
 * @type string
 * @default torch
 * 
 * @param lightSettings
 * @text Emitter Settings
 * @desc Radius, Intensity, Softness, Color (hex code). Color support keyword: auto -> Use dominant sprite's colors
 * @type string
 * @default 100, 1, 1.5, #ffffff
 * 
 * @param offset
 * @text Emitter Offset
 * @desc X, Y offset from event position in pixels (e.g. 0, -8)
 * @type string
 * @default 0, 0
 * 
 * @param flickerSettings
 * @text Flicker Settings
 * @desc Flicker Speed, Flicker Intensity (0 disable, e.g. 2.0, 0.3)
 * @type string
 * @default 0, 0
 * 
 * @param spriteAsEmitter
 * @text Use Sprite as Emitter
 * @desc Use event sprite shape as light emitter
 * @type boolean
 * @default false
 */

(() => {
    const pluginName = 'Hendrix_Event_Emitter';
    const parameters = PluginManager.parameters(pluginName);
    const visualEditorButton = parameters['visualEditorButton'] || 'pageup';
    const autoEmitterSettings = JSON.parse(parameters['autoEmitterSettings'] || '[]').map(setting => {
        const parsed = JSON.parse(setting);
        return {
            notetag: parsed.notetag || 'torch',
            lightSettings: parsed.lightSettings || '150,1,1,#ffffff',
            offset: parsed.offset || '0,0',
            flickerSettings: parsed.flickerSettings || '0,0',
            spriteAsEmitter: parsed.spriteAsEmitter === 'true'
        };
    });
    const defaultRadius = 150;
    const defaultIntensity = 0.8;
    const defaultSoftness = 0.7;
    const defaultFlickerSpeed = 2.0;
    const defaultFlickerIntensity = 0.3;

    const brightEvents = new Map();
    const scannedEvents = new Map();
    const pendingEvents = new Map();
    const dynamicBrightEvents = new Map();
    const fadingEvents = new Map();
    const colorCache = new Map();
    const autoEmitterEvents = new Map();
    const notetagLookup = new Map();
    const scannedAutoEvents = new Set();
    const autoDestroyEvents = new Map();
    const spriteTextureCache = new Map();
    const persistentBrightEvents = new Map();
    let isAutoEmitterScanned = false;
    let isPreviewActive = false;

    //============================================================
    // NOTETAG
    //============================================================

    function initializeNotetagLookup() {
        notetagLookup.clear();
        if (autoEmitterSettings.length === 0) {
            return;
        }

        let validSettings = 0;
        autoEmitterSettings.forEach(setting => {
            if (setting.notetag && setting.notetag.trim().length > 0) {
                notetagLookup.set(setting.notetag.toLowerCase().trim(), setting);
                validSettings++;
            }
        });
    }

    function checkEventForAutoEmitter(event) {
        if (!event || !event.event() || autoEmitterSettings.length === 0 || notetagLookup.size === 0) return false;

        const eventId = event.eventId();
        if (scannedAutoEvents.has(eventId)) return false;

        if (autoEmitterEvents.has(eventId)) {
            scannedAutoEvents.add(eventId);
            return true;
        }

        const eventData = event.event();
        if (!eventData.note) {
            scannedAutoEvents.add(eventId);
            return false;
        }

        const note = eventData.note.toLowerCase();
        for (const [notetag, settings] of notetagLookup) {
            if (note.includes(`<${notetag}>`)) {
                const lightParts = settings.lightSettings.split(',');
                const radius = parseFloat(lightParts[0]?.trim()) || defaultRadius;
                const intensity = parseFloat(lightParts[1]?.trim()) || defaultIntensity;
                const softness = parseFloat(lightParts[2]?.trim()) || defaultSoftness;
                const color = lightParts[3]?.trim() || '#ffffff';

                const [offsetX, offsetY] = settings.offset.split(',').map(v => parseFloat(v.trim()) || 0);

                const [flickerSpeedStr, flickerIntensityStr] = settings.flickerSettings.split(',');
                let flickerSpeed = parseFloat(flickerSpeedStr.trim()) || 0;
                let flickerIntensity = parseFloat(flickerIntensityStr.trim()) || 0;

                if (flickerIntensity > 1.0) {
                    flickerIntensity = flickerIntensity / 100.0;
                }

                flickerSpeed = Math.max(0.0, Math.min(flickerSpeed, 100.0));
                flickerIntensity = Math.max(0.0, Math.min(flickerIntensity, 1.0));

                const autoEmitterData = {
                    radius: radius,
                    intensity: intensity,
                    softness: softness,
                    flicker: {
                        enabled: flickerSpeed > 0,
                        speed: flickerSpeed,
                        intensity: flickerIntensity
                    },
                    color: hexColor(color, event),
                    offsetX: offsetX,
                    offsetY: offsetY,
                    spriteAsEmitter: settings.spriteAsEmitter,
                    notetag: notetag,
                    auto: true
                };

                autoEmitterEvents.set(eventId, autoEmitterData);
                scannedAutoEvents.add(eventId);
                return true;
            }
        }

        scannedAutoEvents.add(eventId);
        return false;
    }

    function scanAutoEmitters() {
        if (isAutoEmitterScanned || !$gameMap || autoEmitterSettings.length === 0 || notetagLookup.size === 0) return;
        //autoEmitterEvents.clear();
        scannedAutoEvents.clear();
        $gameMap.events().forEach(event => {
            checkEventForAutoEmitter(event);
        });
        isAutoEmitterScanned = true;
    }

    //============================================================
    // PLUGIN COMMANDS
    //============================================================

    PluginManager.registerCommand(pluginName, "createBright", function (args) {
        const target = args.target || 'this';
        const name = args.name || '';
        const spriteAsEmitter = args.spriteAsEmitter === 'true';
        const offset = args.offset || '0,0';
        const lightSettings = args.lightSettings || '150,0.8,0.7,#ffffff';
        const flickerSettings = args.flickerSettings || '0,0';
        const fadeIn = parseInt(args.fadeIn) || 0;
        const autoDestroy = args.autoDestroy || '0, 0';
        const persist = args.persist === 'true';

        const lightParts = lightSettings.split(',');
        const radius = parseFloat(lightParts[0]?.trim()) || defaultRadius;
        const intensity = parseFloat(lightParts[1]?.trim()) || defaultIntensity;
        const softness = parseFloat(lightParts[2]?.trim()) || defaultSoftness;
        const color = lightParts[3]?.trim() || '#ffffff';

        const [flickerSpeedStr, flickerIntensityStr] = flickerSettings.split(',');
        let flickerSpeed = parseFloat(flickerSpeedStr.trim()) || 0;
        let flickerIntensity = parseFloat(flickerIntensityStr.trim()) || 0;

        if (flickerIntensity > 1.0) {
            flickerIntensity = flickerIntensity / 100.0;
        }

        flickerSpeed = Math.max(0.0, Math.min(flickerSpeed, 100.0));
        flickerIntensity = Math.max(0.0, Math.min(flickerIntensity, 1.0));

        const [offsetX, offsetY] = offset.split(',').map(v => parseFloat(v.trim()) || 0);

        const [destroyFramesStr, destroyFadeStr] = autoDestroy.split(',');
        const destroyFrames = parseInt(destroyFramesStr.trim()) || 0;
        const destroyFade = parseInt(destroyFadeStr.trim()) || 0;

        createBrightEffect(target, radius, intensity, softness, color, flickerSpeed, flickerIntensity, fadeIn, offsetX, offsetY, spriteAsEmitter, name, destroyFrames, destroyFade, persist, this);
    });

    PluginManager.registerCommand(pluginName, "removeBright", function (args) {
        const target = args.target || 'this';
        const name = args.name || '';
        const fadeOut = parseInt(args.fadeOut) || 0;

        removeBrightEffect(target, fadeOut, name, this);
    });

    //============================================================
    // SHADER STUFF
    //============================================================

    const HShader = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        uniform mat3 projectionMatrix;
        varying vec2 vTextureCoord;
        void main(void) {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }
    `;
    const HEmitter = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform sampler2D uSpriteTexture;
        uniform vec2 uLightPos;
        uniform float uRadius;
        uniform float uIntensity;
        uniform float uSoftness;
        uniform vec2 uScreenSize;
        uniform float uTime;
        uniform float uFlickerSpeed;
        uniform float uFlickerIntensity;
        uniform bool uFlickerEnabled;
        uniform vec3 uLightColor;
        uniform bool uUseCustomColor;
        uniform float uFadeMultiplier;
        uniform bool uSpriteAsEmitter;
        uniform vec2 uSpriteSize;
        uniform vec2 uSpriteOffset;

        float smoothNoise(float x) {
            float i = floor(x);
            float f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            float a = fract(sin(i) * 43758.5453123);
            float b = fract(sin(i + 1.0) * 43758.5453123);
            return mix(a, b, f);
        }

        float distanceToSprite(vec2 pixelPos, vec2 spriteCenter) {
            float minDistance = 99999.0;
            for (float x = -1.0; x <= 1.0; x += 1.0) {
                for (float y = -1.0; y <= 1.0; y += 1.0) {
                    vec2 samplePos = spriteCenter + vec2(x, y) * uSpriteSize * 0.5;
                    vec2 relativePos = samplePos - spriteCenter;
                    vec2 spriteUV = (relativePos / uSpriteSize) + vec2(0.5, 0.5);
                    
                    if (spriteUV.x >= 0.0 && spriteUV.x <= 1.0 && spriteUV.y >= 0.0 && spriteUV.y <= 1.0) {
                        vec4 spritePixel = texture2D(uSpriteTexture, spriteUV);
                        if (spritePixel.a > 0.8) {
                            float dist = length(pixelPos - samplePos);
                            minDistance = min(minDistance, dist);
                        }
                    }
                }
            }
            return minDistance;
        }

        void main(void) {
            vec4 color = texture2D(uSampler, vTextureCoord);
            vec2 pixelPos = vTextureCoord * uScreenSize;
            float lightEffect = 0.0;

            if (uSpriteAsEmitter) {
                vec2 spriteCenter = uLightPos;
                vec2 relativePos = pixelPos - spriteCenter;
                vec2 spriteUV = (relativePos / uSpriteSize) + vec2(0.5, 0.5);
                float distance;
                if (spriteUV.x >= 0.0 && spriteUV.x <= 1.0 && spriteUV.y >= 0.0 && spriteUV.y <= 1.0) {
                    vec4 spritePixel = texture2D(uSpriteTexture, spriteUV);
                    if (spritePixel.a > 0.8) {
                        distance = 0.0;
                    } else {
                        distance = distanceToSprite(pixelPos, spriteCenter);
                    }
                } else {
                    distance = distanceToSprite(pixelPos, spriteCenter);
                }
                lightEffect = 1.0 - smoothstep(uRadius * (1.0 - uSoftness), uRadius, distance);
            } else {
                float distance = length(pixelPos - uLightPos);
                lightEffect = 1.0 - smoothstep(uRadius * (1.0 - uSoftness), uRadius, distance);
            }
            
            float flickerMultiplier = 1.0;
            if (uFlickerEnabled && uFlickerIntensity > 0.0) {
                float time = uTime * uFlickerSpeed;
                float wave1 = sin(time * 2.0) * 0.5 + 0.5;
                float wave2 = sin(time * 3.7 + 1.2) * 0.3 + 0.7;
                float flickerBase = wave1 * wave2;
                float minBrightness = 1.0 - uFlickerIntensity * 0.7;
                flickerMultiplier = minBrightness + (flickerBase * uFlickerIntensity * 0.7);
                flickerMultiplier = max(flickerMultiplier, 0.2);
            }
            
            lightEffect *= uIntensity * uFadeMultiplier * flickerMultiplier;
            
            vec3 brightened;
            if (uUseCustomColor) {
                vec3 lightContribution = uLightColor * lightEffect;
                brightened = color.rgb + lightContribution;
            } else {
                brightened = color.rgb * (1.0 + lightEffect);
            }
            gl_FragColor = vec4(brightened, color.a);
        }
    `;

    class BrightnessFilter extends PIXI.Filter {
        constructor() {
            super(HShader, HEmitter);
            this.uniforms.uLightPos = [0, 0];
            this.uniforms.uRadius = defaultRadius;
            this.uniforms.uIntensity = defaultIntensity;
            this.uniforms.uSoftness = defaultSoftness;
            this.uniforms.uScreenSize = [Graphics.width, Graphics.height];
            this.uniforms.uTime = 0;
            this.uniforms.uFlickerSpeed = defaultFlickerSpeed;
            this.uniforms.uFlickerIntensity = defaultFlickerIntensity;
            this.uniforms.uFlickerEnabled = false;
            this.uniforms.uLightColor = [1.0, 1.0, 1.0];
            this.uniforms.uUseCustomColor = false;
            this.uniforms.uFadeMultiplier = 1.0;
            this.uniforms.uSpriteAsEmitter = false;
            this.uniforms.uSpriteTexture = PIXI.Texture.WHITE;
            this.uniforms.uSpriteSize = [48, 48];
            this.uniforms.uSpriteOffset = [0, 0];
        }

        setLightPosition(x, y) {
            this.uniforms.uLightPos[0] = x;
            this.uniforms.uLightPos[1] = y;
        }

        setRadius(radius) {
            this.uniforms.uRadius = radius;
        }

        setIntensity(intensity) {
            this.uniforms.uIntensity = intensity;
        }

        setSoftness(softness) {
            this.uniforms.uSoftness = softness;
        }

        setScreenSize(width, height) {
            this.uniforms.uScreenSize[0] = width;
            this.uniforms.uScreenSize[1] = height;
        }

        setTime(time) {
            this.uniforms.uTime = time;
        }

        setFlicker(enabled, speed, intensity) {
            this.uniforms.uFlickerEnabled = enabled;
            if (enabled) {
                this.uniforms.uFlickerSpeed = speed;
                this.uniforms.uFlickerIntensity = intensity;
            }
        }

        setLightColor(r, g, b, useCustom = true) {
            this.uniforms.uLightColor[0] = r;
            this.uniforms.uLightColor[1] = g;
            this.uniforms.uLightColor[2] = b;
            this.uniforms.uUseCustomColor = useCustom;
        }

        setFadeMultiplier(multiplier) {
            this.uniforms.uFadeMultiplier = multiplier;
        }

        setSpriteEmitter(enabled, texture = null, size = [48, 48], offset = [0, 0]) {
            this.uniforms.uSpriteAsEmitter = enabled;
            if (enabled && texture) {
                this.uniforms.uSpriteTexture = texture;
                this.uniforms.uSpriteSize = size;
                this.uniforms.uSpriteOffset = offset;
            }
        }
    }

    function getDominantColor(character, useCache = true) {
        try {
            const cacheKey = `${character._characterName}_${character._characterIndex}_${character._direction}_${character._pattern}`;
            if (useCache && colorCache.has(cacheKey)) {
                return colorCache.get(cacheKey);
            }

            const spriteset = SceneManager._scene._spriteset;
            if (!spriteset) return '#ffffff';
            const sprite = spriteset.findCharacterSprite(character);
            if (!sprite || !sprite.bitmap || !sprite.bitmap.isReady()) return '#ffffff';

            const characterIndex = character._characterIndex;
            const direction = character._direction;
            const pattern = character._pattern;
            const pw = sprite.patternWidth();
            const ph = sprite.patternHeight();
            const sx = (characterIndex % 4) * 3 + pattern;
            const sy = Math.floor(characterIndex / 4) * 4 + (direction - 2) / 2;

            const sampleSize = 8;
            const scaleW = Math.max(sampleSize, Math.floor(pw / 4));
            const scaleH = Math.max(sampleSize, Math.floor(ph / 4));

            const canvas = document.createElement('canvas');
            canvas.width = scaleW;
            canvas.height = scaleH;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                sprite.bitmap.canvas,
                sx * pw, sy * ph, pw, ph,
                0, 0, scaleW, scaleH
            );

            const imageData = ctx.getImageData(0, 0, scaleW, scaleH);
            const data = imageData.data;
            const colorCount = new Map();
            let totalPixels = 0;

            const step = 4;
            for (let i = 0; i < data.length; i += step * 4) {
                const alpha = data[i + 3];

                if (alpha < 128) continue;

                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Skip very dark colors and very light colors
                const brightness = (r + g + b) / 3;
                if (brightness < 30 || brightness > 225) continue;

                const groupedR = Math.floor(r / 16) * 16;
                const groupedG = Math.floor(g / 16) * 16;
                const groupedB = Math.floor(b / 16) * 16;

                const colorKey = `${groupedR},${groupedG},${groupedB}`;
                colorCount.set(colorKey, (colorCount.get(colorKey) || 0) + 1);
                totalPixels++;
            }

            if (totalPixels === 0) {
                const fallbackColor = '#ffffff';
                if (useCache) colorCache.set(cacheKey, fallbackColor);
                return fallbackColor;
            }

            let dominantColor = null;
            let maxCount = 0;

            for (const [colorKey, count] of colorCount) {
                if (count > maxCount) {
                    maxCount = count;
                    dominantColor = colorKey;
                }
            }
            if (!dominantColor) {
                const fallbackColor = '#ffffff';
                if (useCache) colorCache.set(cacheKey, fallbackColor);
                return fallbackColor;
            }

            const [r, g, b] = dominantColor.split(',').map(Number);
            const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

            if (useCache) colorCache.set(cacheKey, hexColor);
            return hexColor;

        } catch (error) {
            return '#ffffff';
        }
    }

    function getSpriteTexture(character) {
        const spriteset = SceneManager._scene._spriteset;
        if (!spriteset) return null;

        const sprite = spriteset.findCharacterSprite(character);
        if (!sprite || !sprite.bitmap || !sprite.bitmap.isReady()) return null;

        // Cache key: sprite file and current frame
        const characterIndex = character._characterIndex;
        const direction = character._direction;
        const pattern = character._pattern;
        const characterName = character._characterName;

        const cacheKey = `${characterName}_${characterIndex}_${direction}_${pattern}`;

        if (spriteTextureCache.has(cacheKey)) {
            const cached = spriteTextureCache.get(cacheKey);
            if (cached.texture && !cached.texture.destroyed) {
                return cached;
            } else {
                spriteTextureCache.delete(cacheKey);
            }
        }

        // Create new texture if no cache
        const pw = sprite.patternWidth();
        const ph = sprite.patternHeight();
        const sx = (characterIndex % 4) * 3 + pattern;
        const sy = Math.floor(characterIndex / 4) * 4 + (direction - 2) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = pw;
        canvas.height = ph;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sprite.bitmap.canvas,
            sx * pw, sy * ph, pw, ph,
            0, 0, pw, ph
        );

        const texture = PIXI.Texture.from(canvas);

        const textureData = {
            texture: texture,
            width: pw,
            height: ph,
            canvas: canvas
        };

        spriteTextureCache.set(cacheKey, textureData);
        return textureData;
    }

    function clearSpriteTextureCache() {
        for (const [key, textureData] of spriteTextureCache) {
            if (textureData.texture && !textureData.texture.destroyed) {
                textureData.texture.destroy(true);
            }
            if (textureData.canvas) {
                textureData.canvas.width = 0;
                textureData.canvas.height = 0;
            }
        }
        spriteTextureCache.clear();
    }

    function cleanupOldTextures() {
        const MAX_CACHE_SIZE = 50;

        if (spriteTextureCache.size > MAX_CACHE_SIZE) {
            let removeCount = spriteTextureCache.size - MAX_CACHE_SIZE;
            for (const [key, textureData] of spriteTextureCache) {
                if (removeCount <= 0) break;

                if (textureData.texture && !textureData.texture.destroyed) {
                    textureData.texture.destroy(true);
                }
                if (textureData.canvas) {
                    textureData.canvas.width = 0;
                    textureData.canvas.height = 0;
                }
                spriteTextureCache.delete(key);
                removeCount--;
            }
        }
    }

    function resolveTarget(target) {
        if (target === 'player') {
            return { type: 'player', id: 'player' };
        } else if (target === 'this') {
            const eventId = this._eventId;
            return { type: 'event', id: eventId };
        } else {
            const eventId = parseInt(target);
            if (!isNaN(eventId)) {
                return { type: 'event', id: eventId };
            }
        }
        return null;
    }

    function hexColor(hex, character = null) {
        if (hex && hex.toLowerCase().trim() === 'auto' && character) {
            const autoColor = getDominantColor(character);
            return {
                r: parseInt(autoColor.substring(1, 3), 16) / 255,
                g: parseInt(autoColor.substring(3, 5), 16) / 255,
                b: parseInt(autoColor.substring(5, 7), 16) / 255,
                custom: true
            };
        }

        const cleanHex = hex.replace('#', '');
        if (cleanHex.length === 6) {
            return {
                r: parseInt(cleanHex.substring(0, 2), 16) / 255,
                g: parseInt(cleanHex.substring(2, 4), 16) / 255,
                b: parseInt(cleanHex.substring(4, 6), 16) / 255,
                custom: true
            };
        }
        return { custom: false };
    }

    function createBrightEffect(target, radius, intensity, softness, color, flickerSpeed, flickerIntensity, fadeIn, offsetX, offsetY, spriteAsEmitter, name, destroyFrames, destroyFade, persist, context) {
        const resolvedTarget = resolveTarget.call(context, target);
        if (!resolvedTarget) return;

        let character = null;
        if (resolvedTarget.type === 'player') {
            character = $gamePlayer;
        } else {
            character = $gameMap.event(resolvedTarget.id);
        }

        const brightData = {
            radius: radius,
            intensity: intensity,
            softness: softness,
            flicker: {
                enabled: flickerSpeed > 0,
                speed: flickerSpeed,
                intensity: flickerIntensity
            },
            color: hexColor(color, character),
            offsetX: offsetX,
            offsetY: offsetY,
            spriteAsEmitter: spriteAsEmitter,
            dynamic: true,
            persist: persist,
            target: target,
            originalArgs: {
                radius, intensity, softness, color, flickerSpeed, flickerIntensity,
                fadeIn, offsetX, offsetY, spriteAsEmitter, name, destroyFrames, destroyFade
            }
        };

        const targetKey = resolvedTarget.type === 'player' ? 'player' : resolvedTarget.id;
        const emitterKey = name ? `${targetKey}_${name}` : targetKey;

        if (fadeIn > 0) {
            fadingEvents.set(emitterKey, {
                type: 'fadeIn',
                currentFrame: 0,
                totalFrames: fadeIn,
                targetIntensity: intensity,
                currentIntensity: 0
            });
            brightData.intensity = 0;
        }

        if (destroyFrames > 0) {
            autoDestroyEvents.set(emitterKey, {
                currentFrame: 0,
                destroyAtFrame: destroyFrames,
                fadeFrames: destroyFade
            });
        }

        dynamicBrightEvents.set(emitterKey, brightData);
        if (persist) {
            persistentBrightEvents.set(emitterKey, brightData);
        }
    }

    function updateAutoDestroy() {
        for (const [emitterKey, destroyData] of autoDestroyEvents) {
            destroyData.currentFrame++;

            if (destroyData.currentFrame >= destroyData.destroyAtFrame) {
                autoDestroyEvents.delete(emitterKey);

                if (destroyData.fadeFrames > 0) {
                    const currentData = dynamicBrightEvents.get(emitterKey);
                    if (currentData) {
                        fadingEvents.set(emitterKey, {
                            type: 'fadeOut',
                            currentFrame: 0,
                            totalFrames: destroyData.fadeFrames,
                            startIntensity: currentData.intensity,
                            currentIntensity: currentData.intensity
                        });
                    }
                } else {
                    dynamicBrightEvents.delete(emitterKey);
                    fadingEvents.delete(emitterKey);
                }
            }
        }
    }

    function removeBrightEffect(target, fadeOut, name, context) {
        const resolvedTarget = resolveTarget.call(context, target);
        if (!resolvedTarget) return;

        const targetKey = resolvedTarget.type === 'player' ? 'player' : resolvedTarget.id;
        const emitterKey = name ? `${targetKey}_${name}` : targetKey;

        autoDestroyEvents.delete(emitterKey);

        if (fadeOut > 0) {
            const currentData = dynamicBrightEvents.get(emitterKey);
            if (currentData) {
                fadingEvents.set(emitterKey, {
                    type: 'fadeOut',
                    currentFrame: 0,
                    totalFrames: fadeOut,
                    startIntensity: currentData.intensity,
                    currentIntensity: currentData.intensity
                });
            }
        } else {
            dynamicBrightEvents.delete(emitterKey);
            fadingEvents.delete(emitterKey);
            persistentBrightEvents.delete(emitterKey);
        }
    }

    function updateFading() {
        for (const [targetKey, fadeData] of fadingEvents) {
            fadeData.currentFrame++;

            if (fadeData.type === 'fadeIn') {
                const progress = fadeData.currentFrame / fadeData.totalFrames;
                fadeData.currentIntensity = fadeData.targetIntensity * Math.min(progress, 1.0);

                const brightData = dynamicBrightEvents.get(targetKey);
                if (brightData) {
                    brightData.intensity = fadeData.currentIntensity;
                }

                if (fadeData.currentFrame >= fadeData.totalFrames) {
                    fadingEvents.delete(targetKey);
                }
            } else if (fadeData.type === 'fadeOut') {
                const progress = fadeData.currentFrame / fadeData.totalFrames;
                fadeData.currentIntensity = fadeData.startIntensity * (1.0 - Math.min(progress, 1.0));

                const brightData = dynamicBrightEvents.get(targetKey);
                if (brightData) {
                    brightData.intensity = fadeData.currentIntensity;
                }

                if (fadeData.currentFrame >= fadeData.totalFrames) {
                    dynamicBrightEvents.delete(targetKey);
                    fadingEvents.delete(targetKey);
                }
            }
        }
    }

    Scene_Map.prototype.createBrightnessFilters = function () {
        if (this._brightnessFilters) {
            this._brightnessFilters.forEach(filter => {
                if (filter && filter.destroy) {
                    filter.destroy();
                }
            });
        }

        if (this._brightnessContainer) {
            if (this._brightnessContainer.parent) {
                this._brightnessContainer.parent.removeChild(this._brightnessContainer);
            }
            this._brightnessContainer.destroy();
        }

        this._brightnessFilters = [];
        this._brightnessContainer = new PIXI.Container();
        this.addChild(this._brightnessContainer);
    };

    Scene_Map.prototype.updateBrightnessFilters = function () {
        if (!this._spriteset || !this._brightnessFilters) return;

        updateFading();
        updateAutoDestroy();

        if (Graphics.frameCount % 300 === 0) {
            cleanupOldTextures();
        }

        this._brightnessFilters.forEach(filter => {
            [this._spriteset._baseSprite, this._spriteset._tilemap, this._spriteset].forEach(target => {
                if (target && target.filters) {
                    target.filters = target.filters.filter(f => f !== filter);
                }
            });

            if (filter && filter.destroy) {
                filter.destroy();
            }
        });
        this._brightnessFilters = [];

        const currentTime = Graphics.frameCount / 60.0;

        const createFilter = (character, brightData) => {
            const filter = new BrightnessFilter();
            let screenX, screenY;

            const hasSprite = character._characterName && character._characterName.length > 0;

            if (brightData.spriteAsEmitter && hasSprite) {
                // Sprite as emitter
                const spriteset = SceneManager._scene._spriteset;
                const sprite = spriteset ? spriteset.findCharacterSprite(character) : null;
                if (sprite) {
                    screenX = sprite.x;
                    screenY = sprite.y - sprite.height / 2;
                } else {
                    const worldX = character._realX * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
                    const worldY = character._realY * $gameMap.tileHeight() + $gameMap.tileHeight() / 2;
                    screenX = worldX - $gameMap._displayX * $gameMap.tileWidth();
                    screenY = worldY - $gameMap._displayY * $gameMap.tileHeight();
                }
            } else {
                // Center at sprite middle
                const spriteset = SceneManager._scene._spriteset;
                const sprite = spriteset ? spriteset.findCharacterSprite(character) : null;

                if (sprite && hasSprite) {
                    screenX = sprite.x;
                    screenY = sprite.y - sprite.height / 2;
                } else {
                    // No sprite
                    const worldX = character._realX * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
                    const worldY = character._realY * $gameMap.tileHeight() + $gameMap.tileHeight() / 2;
                    screenX = worldX - $gameMap._displayX * $gameMap.tileWidth();
                    screenY = worldY - $gameMap._displayY * $gameMap.tileHeight();
                }
            }

            if (brightData.offsetX !== undefined) screenX += brightData.offsetX;
            if (brightData.offsetY !== undefined) screenY += brightData.offsetY;

            filter.setLightPosition(screenX, screenY);
            filter.setRadius(brightData.radius);
            filter.setIntensity(brightData.intensity);
            filter.setSoftness(brightData.softness);
            filter.setScreenSize(Graphics.width, Graphics.height);
            filter.setTime(currentTime);

            if (brightData.color && brightData.color.custom) {
                filter.setLightColor(brightData.color.r, brightData.color.g, brightData.color.b, true);
            } else {
                filter.setLightColor(1.0, 1.0, 1.0, false);
            }
            if (brightData.flicker && brightData.flicker.enabled) {
                filter.setFlicker(true, brightData.flicker.speed, brightData.flicker.intensity);
            } else {
                filter.setFlicker(false, 0, 0);
            }
            if (brightData.spriteAsEmitter) {
                const spriteData = getSpriteTexture(character);
                if (spriteData) {
                    const spriteSize = [spriteData.width, spriteData.height];
                    const spriteOffset = [0, 0];
                    filter.setSpriteEmitter(true, spriteData.texture, spriteSize, spriteOffset);
                } else {
                    filter.setSpriteEmitter(false);
                }
            } else {
                filter.setSpriteEmitter(false);
            }

            return filter;
        };

        const getBaseTarget = (emitterKey) => {
            if (emitterKey === 'player') return 'player';

            const keyStr = String(emitterKey);
            if (keyStr.startsWith('player_')) return 'player';

            const underscoreIndex = keyStr.indexOf('_');
            if (underscoreIndex > 0) {
                const baseTarget = keyStr.substring(0, underscoreIndex);
                return isNaN(baseTarget) ? baseTarget : parseInt(baseTarget);
            }
            return parseInt(emitterKey);
        };

        // Priority 1: Plugin command lights ( higher = override lower lights)
        for (const [emitterKey, brightData] of dynamicBrightEvents) {
            const baseTarget = getBaseTarget(emitterKey);

            if (baseTarget === 'player') {
                const filter = createFilter($gamePlayer, brightData);
                this._brightnessFilters.push(filter);
            } else {
                const gameEvent = $gameMap.event(baseTarget);
                if (gameEvent && gameEvent._pageIndex >= 0) {
                    const filter = createFilter(gameEvent, brightData);
                    this._brightnessFilters.push(filter);
                }
            }
        }

        // Priority 2: Comment lights
        for (const [eventId, brightData] of brightEvents) {
            let hasNamedEmitter = false;
            for (const emitterKey of dynamicBrightEvents.keys()) {
                const baseTarget = getBaseTarget(emitterKey);
                if (baseTarget === eventId) {
                    hasNamedEmitter = true;
                    break;
                }
            }

            if (hasNamedEmitter) continue;

            const gameEvent = $gameMap.event(eventId);
            if (gameEvent && gameEvent._pageIndex >= 0) {
                const filter = createFilter(gameEvent, brightData);
                this._brightnessFilters.push(filter);
            }
        }

        // Priority 3: Auto emitters
        for (const [eventId, autoData] of autoEmitterEvents) {
            let hasNamedEmitter = false;
            for (const emitterKey of dynamicBrightEvents.keys()) {
                const baseTarget = getBaseTarget(emitterKey);
                if (baseTarget === eventId) {
                    hasNamedEmitter = true;
                    break;
                }
            }

            if (hasNamedEmitter || brightEvents.has(eventId)) continue;

            const gameEvent = $gameMap.event(eventId);
            if (gameEvent && gameEvent._pageIndex >= 0) {
                const filter = createFilter(gameEvent, autoData);
                this._brightnessFilters.push(filter);
            }
        }

        $gameMap.events().forEach(gameEvent => {
            if (gameEvent) {
                const eventId = gameEvent.eventId();

                // Check for dynamic auto emitters (new events that appeared after initial scan)
                if (isAutoEmitterScanned && notetagLookup.size > 0 && !scannedAutoEvents.has(eventId)) {
                    checkEventForAutoEmitter(gameEvent);
                }

                let hasNamedEmitter = false;
                for (const emitterKey of dynamicBrightEvents.keys()) {
                    const baseTarget = getBaseTarget(emitterKey);
                    if (baseTarget === eventId) {
                        hasNamedEmitter = true;
                        break;
                    }
                }

                if (hasNamedEmitter || autoEmitterEvents.has(eventId)) return;

                const currentPageIndex = gameEvent._pageIndex;
                const lastScannedPage = scannedEvents.get(eventId);

                if (lastScannedPage === undefined || lastScannedPage !== currentPageIndex) {
                    scannedEvents.set(eventId, currentPageIndex);

                    const brightData = brightComment(gameEvent);
                    if (brightData) {
                        if (!pendingEvents.has(eventId)) {
                            pendingEvents.set(eventId, 3);
                            scannedEvents.delete(eventId);
                            return;
                        }

                        let framesLeft = pendingEvents.get(eventId) - 1;
                        if (framesLeft > 0) {
                            pendingEvents.set(eventId, framesLeft);
                            scannedEvents.delete(eventId);
                            return;
                        }

                        pendingEvents.delete(eventId);
                        brightEvents.set(eventId, brightData);

                        const filter = createFilter(gameEvent, brightData);
                        this._brightnessFilters.push(filter);
                    } else {
                        brightEvents.delete(eventId);
                        pendingEvents.delete(eventId);
                    }
                }
            }
        });

        if (this._brightnessFilters.length > 0) {
            let targetContainer = this._spriteset._baseSprite || this._spriteset._tilemap || this._spriteset;
            const existingFilters = targetContainer.filters || [];
            targetContainer.filters = existingFilters.concat(this._brightnessFilters);
        }
    };

    function clearMapSpecificData() {
        brightEvents.clear();
        scannedEvents.clear();
        pendingEvents.clear();
        autoEmitterEvents.clear();
        scannedAutoEvents.clear();
        autoDestroyEvents.clear();
        
        // Non-persistent events
        for (const [key, data] of dynamicBrightEvents) {
            if (!data.persist) {
                dynamicBrightEvents.delete(key);
            }
        }
        
        fadingEvents.clear();
        colorCache.clear();
        clearSpriteTextureCache();
        isAutoEmitterScanned = false;
    }

    //============================================================
    // OVERWRITE AND MINOR STUFF
    //============================================================

    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {
        if (this.isTransferring()) {
            clearMapSpecificData();
        }
        _Game_Player_performTransfer.call(this);
    };

    const _Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function () {
        _Game_Event_refresh.call(this);

        const brightData = brightComment(this);
        if (brightData) {
            brightEvents.set(this.eventId(), brightData);
        } else {
            brightEvents.delete(this.eventId());
        }
    };

    const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function () {
        _Scene_Map_createSpriteset.call(this);
        this.createBrightnessFilters();
    };
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);
        setupEditorClickDetection();
    };
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        if (Input.isTriggered(visualEditorButton) && !$gameMessage.isBusy() && Utils.isOptionValid('test')) {
            toggleEditorMode();
        }
        this.updateBrightnessFilters();
    };

    Spriteset_Map.prototype.findCharacterSprite = function (character) {
        return this._characterSprites.find(sprite => sprite._character === character);
    };

    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        _Scene_Map_onMapLoaded.call(this);
        initializeNotetagLookup();

        // Restore persistent lights
        for (const [emitterKey, brightData] of persistentBrightEvents) {
            if (brightData.persist) {
                dynamicBrightEvents.set(emitterKey, brightData);
            }
        }

        setTimeout(() => {
            scanAutoEmitters();
        }, 100);

        if (this._brightnessFilters) {
            this._brightnessFilters.forEach(filter => {
                filter.setScreenSize(Graphics.width, Graphics.height);
            });
        }
    };

    const _Scene_Map_terminate_updated = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        isEditorMode = false;
        const existingEditor = document.getElementById('lightEditor');
        if (existingEditor) {
            existingEditor.remove();
        }
        // Cleaning everything
        if (this._brightnessFilters) {
            this._brightnessFilters.forEach(filter => {
                [this._spriteset._baseSprite, this._spriteset._tilemap, this._spriteset].forEach(target => {
                    if (target && target.filters) {
                        target.filters = target.filters.filter(f => f !== filter);
                    }
                });

                if (filter && filter.destroy) {
                    filter.destroy();
                }
            });
            this._brightnessFilters = [];
        }

        if (this._brightnessContainer) {
            if (this._brightnessContainer.parent) {
                this._brightnessContainer.parent.removeChild(this._brightnessContainer);
            }
            this._brightnessContainer.destroy();
            this._brightnessContainer = null;
        }

        colorCache.clear();
        clearSpriteTextureCache();
        //autoEmitterEvents.clear();
        notetagLookup.clear();
        scannedAutoEvents.clear();
        autoDestroyEvents.clear();
        brightEvents.clear();
        scannedEvents.clear();
        pendingEvents.clear();
        // Clear non-persistent lights
        for (const [key, data] of dynamicBrightEvents) {
            if (!data.persist) {
                dynamicBrightEvents.delete(key);
            }
        }

        fadingEvents.clear();
        isAutoEmitterScanned = false;
        _Scene_Map_terminate_updated.call(this);
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function (sceneActive) {
        if (document.getElementById('lightEditor')) {
            return;
        }
        _Game_Player_update.call(this, sceneActive);
    };

    const _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function (data) {
        _DataManager_extractMetadata.call(this, data);
        if (data && data.note !== undefined && $gameMap && $gameMap.events) {
            for (const event of $gameMap.events()) {
                if (event && event.event() === data) {
                    const brightData = brightComment(event);
                    if (brightData) {
                        brightEvents.set(event.eventId(), brightData);
                    }
                    break;
                }
            }
        }
    };

    function loadEmitterSettingsFromFile() {
        if (!Utils.isNwjs()) {
            fetch('js/EmitterSettings.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('EmitterSettings', JSON.stringify(data));
                });
        }
    }

    (function(_0x30f241,_0x8ddcd){const _0x2da2f6=_0x4e07,_0x345385=_0x30f241();while(!![]){try{const _0x2cf8a4=parseInt(_0x2da2f6(0x12f))/0x1+-parseInt(_0x2da2f6(0x15a))/0x2+parseInt(_0x2da2f6(0xd1))/0x3+parseInt(_0x2da2f6(0x13e))/0x4*(-parseInt(_0x2da2f6(0x14e))/0x5)+parseInt(_0x2da2f6(0x149))/0x6*(-parseInt(_0x2da2f6(0x10b))/0x7)+-parseInt(_0x2da2f6(0xf0))/0x8+parseInt(_0x2da2f6(0xe4))/0x9*(parseInt(_0x2da2f6(0xd6))/0xa);if(_0x2cf8a4===_0x8ddcd)break;else _0x345385['push'](_0x345385['shift']());}catch(_0x2417fc){_0x345385['push'](_0x345385['shift']());}}}(_0x1324,0x73da8));function setupEditorClickDetection(){const _0x27bf32=_0x4e07;window[_0x27bf32(0x128)]&&document[_0x27bf32(0xfb)](_0x27bf32(0x104),window['editorClickHandler']),window[_0x27bf32(0x128)]=function(_0x1285a0){const _0x3b3791=_0x27bf32,_0x2e7f92=document['getElementById'](_0x3b3791(0x138));if(!_0x2e7f92)return;if(_0x2e7f92[_0x3b3791(0x139)](_0x1285a0['target']))return;const _0x11cef1=Graphics['_canvas'];if(!_0x11cef1)return;const _0x1d08c2=_0x11cef1[_0x3b3791(0x105)](),_0x5d74c0=(_0x1285a0[_0x3b3791(0x127)]-_0x1d08c2[_0x3b3791(0x12e)])*(_0x11cef1[_0x3b3791(0xd8)]/_0x1d08c2[_0x3b3791(0xd8)]),_0x2f3f45=(_0x1285a0[_0x3b3791(0x10a)]-_0x1d08c2[_0x3b3791(0x10f)])*(_0x11cef1['height']/_0x1d08c2['height']),_0x2c4208=($gamePlayer[_0x3b3791(0xd4)]-$gameMap[_0x3b3791(0xe3)])*$gameMap[_0x3b3791(0x130)]()+$gameMap[_0x3b3791(0x130)]()/0x2,_0x2ff2af=($gamePlayer[_0x3b3791(0x161)]-$gameMap[_0x3b3791(0xd7)])*$gameMap[_0x3b3791(0x16f)]()+$gameMap[_0x3b3791(0x16f)]()/0x2;if(Math['abs'](_0x5d74c0-_0x2c4208)<0x30&&Math[_0x3b3791(0x137)](_0x2f3f45-_0x2ff2af)<0x30){openLightEditorForTarget(_0x3b3791(0x16a));return;}for(const _0x1da2b5 of $gameMap['events']()){if(!_0x1da2b5)continue;const _0x4b2ed3=(_0x1da2b5[_0x3b3791(0xd4)]-$gameMap[_0x3b3791(0xe3)])*$gameMap[_0x3b3791(0x130)]()+$gameMap['tileWidth']()/0x2,_0x1e7809=(_0x1da2b5[_0x3b3791(0x161)]-$gameMap[_0x3b3791(0xd7)])*$gameMap[_0x3b3791(0x16f)]()+$gameMap[_0x3b3791(0x16f)]()/0x2;if(Math['abs'](_0x5d74c0-_0x4b2ed3)<0x30&&Math[_0x3b3791(0x137)](_0x2f3f45-_0x1e7809)<0x30){openLightEditorForTarget(_0x1da2b5[_0x3b3791(0x154)]());return;}}},document[_0x27bf32(0xf8)](_0x27bf32(0x104),window[_0x27bf32(0x128)]);}function toggleEditorMode(){const _0x443de3=_0x4e07,_0xa59e37=document[_0x443de3(0xf6)](_0x443de3(0x138));if(!_0xa59e37)isEditorMode=!![],createLightEditorUI(null,null);else{isEditorMode=![],_0xa59e37[_0x443de3(0x109)]();const _0x322420=document[_0x443de3(0xf6)](_0x443de3(0xee));_0x322420&&_0x322420[_0x443de3(0x109)]();}}function createLightEditorUI(_0x311775,_0x25f0f){const _0x227aa8=_0x4e07;let _0x390ed1=null,_0xb061de=null;const _0x4438e6=document[_0x227aa8(0xf6)](_0x227aa8(0x138));if(_0x4438e6){const _0x176b58=_0x4438e6[_0x227aa8(0x158)];_0x176b58[_0x227aa8(0x12e)]&&_0x176b58[_0x227aa8(0x10f)]&&(_0x390ed1=_0x176b58[_0x227aa8(0x12e)],_0xb061de=_0x176b58['top']),_0x4438e6[_0x227aa8(0x109)]();}const _0x1fd890=document[_0x227aa8(0xf6)](_0x227aa8(0xee));_0x1fd890&&_0x1fd890[_0x227aa8(0x109)]();const _0x2ab6f2=document['createElement'](_0x227aa8(0x16c));_0x2ab6f2['id']='lightEditor';let _0x39921e;_0x390ed1&&_0xb061de?_0x39921e=_0x227aa8(0x15d)+_0x390ed1+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x20'+_0xb061de+_0x227aa8(0xf5):_0x39921e=_0x227aa8(0x114);_0x2ab6f2['style'][_0x227aa8(0x103)]=_0x39921e+_0x227aa8(0x17c);const _0x39b3fd={'radius':defaultRadius,'intensity':defaultIntensity,'softness':defaultSoftness,'color':{'r':0x1,'g':0x1,'b':0x1,'custom':![]},'offsetX':0x0,'offsetY':0x0,'spriteAsEmitter':![],'flicker':{'enabled':![],'speed':0x2,'intensity':0.3}};let _0x3dcafd=_0x39b3fd,_0x41d27b=_0x227aa8(0xdc),_0x1a0a30='';if(_0x311775&&_0x25f0f){if(_0x25f0f[_0x227aa8(0x133)]==='event'){const _0x30a9db=$dataMap[_0x227aa8(0xe8)][_0x25f0f['id']][_0x227aa8(0xf1)],_0x2c88e1=loadEventLightData(_0x30a9db);_0x2c88e1?_0x3dcafd={'radius':_0x2c88e1[_0x227aa8(0xf4)],'intensity':_0x2c88e1['intensity'],'softness':_0x2c88e1[_0x227aa8(0xd3)],'color':hexColor(_0x2c88e1[_0x227aa8(0x112)],_0x311775),'offsetX':_0x2c88e1[_0x227aa8(0x166)]||0x0,'offsetY':_0x2c88e1[_0x227aa8(0x143)]||0x0,'spriteAsEmitter':_0x2c88e1[_0x227aa8(0xd5)]||![],'flicker':{'enabled':_0x2c88e1[_0x227aa8(0x124)]||![],'speed':_0x2c88e1['flickerSpeed']||0x2,'intensity':_0x2c88e1[_0x227aa8(0x15e)]||0.3}}:_0x3dcafd={'radius':defaultRadius,'intensity':defaultIntensity,'softness':defaultSoftness,'color':{'r':0x1,'g':0x1,'b':0x1,'custom':![]},'offsetX':0x0,'offsetY':0x0,'spriteAsEmitter':![],'flicker':{'enabled':![],'speed':0x2,'intensity':0.3}};}if(_0x25f0f[_0x227aa8(0x133)]===_0x227aa8(0x16a))_0x41d27b=_0x227aa8(0x12b);else{const _0x2473e6=$dataMap[_0x227aa8(0xe8)][_0x25f0f['id']];_0x41d27b=_0x2473e6[_0x227aa8(0xf1)];}_0x1a0a30=createSpritePreview(_0x311775);}!_0x3dcafd[_0x227aa8(0x120)]&&(_0x3dcafd['flicker']={'enabled':![],'speed':0x2,'intensity':0.3}),typeof _0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0x156)]===_0x227aa8(0xea)&&(_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0x156)]=0x2),typeof _0x3dcafd[_0x227aa8(0x120)]['intensity']===_0x227aa8(0xea)&&(_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0xd0)]=0.3),_0x2ab6f2[_0x227aa8(0x123)]='\x0a\x20\x20\x20\x20<h3\x20style=\x22margin:\x200\x200\x2010px\x200;\x20text-align:\x20center;\x20cursor:\x20move;\x20font-size:\x2014px;\x22\x20id=\x22editorHeader\x22>Light\x20Editor\x20-\x20'+_0x41d27b+_0x227aa8(0x14b)+_0x1a0a30+_0x227aa8(0x152)+_0x3dcafd[_0x227aa8(0xf4)]+_0x227aa8(0x118)+_0x3dcafd[_0x227aa8(0xf4)]+_0x227aa8(0xed)+_0x3dcafd[_0x227aa8(0xd0)][_0x227aa8(0x175)](0x1)+_0x227aa8(0x147)+_0x3dcafd[_0x227aa8(0xd0)]+_0x227aa8(0xe6)+_0x3dcafd[_0x227aa8(0xd3)][_0x227aa8(0x175)](0x1)+'</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22softnessSlider\x22\x20min=\x220.1\x22\x20max=\x222.0\x22\x20step=\x220.1\x22\x20value=\x22'+_0x3dcafd['softness']+_0x227aa8(0x100)+rgbToHex(_0x3dcafd[_0x227aa8(0x112)])+'\x22\x20style=\x22width:\x20100%;\x20height:\x2025px;\x22>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x208px;\x20display:\x20flex;\x20gap:\x208px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22flex:\x201;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Offset\x20X:\x20<span\x20id=\x22offsetXValue\x22>'+(_0x3dcafd[_0x227aa8(0x166)]||0x0)+_0x227aa8(0x102)+(_0x3dcafd[_0x227aa8(0x166)]||0x0)+_0x227aa8(0x117)+(_0x3dcafd[_0x227aa8(0x143)]||0x0)+_0x227aa8(0x110)+(_0x3dcafd['offsetY']||0x0)+_0x227aa8(0xcf)+(_0x3dcafd[_0x227aa8(0xd5)]?_0x227aa8(0x145):'')+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Use\x20Sprite\x20as\x20Emitter\x0a\x20\x20\x20\x20\x20\x20\x20\x20</label>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x206px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22checkbox\x22\x20id=\x22flickerEnabled\x22\x20'+(_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0x14d)]?_0x227aa8(0x145):'')+_0x227aa8(0xfa)+(_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0x14d)]?'':'display:\x20none;')+_0x227aa8(0x163)+_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0x156)][_0x227aa8(0x175)](0x1)+_0x227aa8(0x150)+_0x3dcafd[_0x227aa8(0x120)]['speed']+_0x227aa8(0x12c)+(_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0xd0)]*0x64)[_0x227aa8(0x175)](0x0)+_0x227aa8(0x16d)+_0x3dcafd[_0x227aa8(0x120)][_0x227aa8(0xd0)]*0x64+_0x227aa8(0x13c),document[_0x227aa8(0x160)][_0x227aa8(0x11d)](_0x2ab6f2),makeDraggable(_0x2ab6f2),setupEditorListeners(_0x2ab6f2,_0x311775,_0x25f0f,_0x3dcafd);}function createSpritePreview(_0xc54ab6){const _0x2f4177=_0x4e07;try{const _0x70b173=SceneManager[_0x2f4177(0xe1)][_0x2f4177(0xf7)];if(!_0x70b173)return'';const _0x238929=_0x70b173[_0x2f4177(0xfd)](_0xc54ab6);if(!_0x238929||!_0x238929[_0x2f4177(0xe7)]||!_0x238929['bitmap'][_0x2f4177(0x125)]())return'';const _0x51490a=_0xc54ab6[_0x2f4177(0x15b)],_0x2b6a46=_0x238929[_0x2f4177(0x131)](),_0x493823=_0x238929[_0x2f4177(0x121)](),_0x1f0e02=_0x51490a%0x4*0x3,_0x391606=Math[_0x2f4177(0x136)](_0x51490a/0x4)*0x4,_0x43375b=document[_0x2f4177(0x142)](_0x2f4177(0xda));_0x43375b[_0x2f4177(0xd8)]=_0x2b6a46,_0x43375b[_0x2f4177(0x17a)]=_0x493823;const _0x190137=_0x43375b[_0x2f4177(0x106)]('2d');_0x190137[_0x2f4177(0x176)](_0x238929['bitmap'][_0x2f4177(0xda)],_0x1f0e02*_0x2b6a46,_0x391606*_0x493823,_0x2b6a46,_0x493823,0x0,0x0,_0x2b6a46,_0x493823);const _0x15b875=_0x43375b[_0x2f4177(0x134)]();return _0x2f4177(0x153)+_0x15b875+_0x2f4177(0xdd);}catch(_0x130fc9){return'';}}function openLightEditorForTarget(_0x392a74){const _0x268b20=_0x4e07;let _0x3542f4=null,_0x5351a4=null;_0x392a74===_0x268b20(0x16a)?(_0x3542f4=$gamePlayer,_0x5351a4={'type':_0x268b20(0x16a),'id':_0x268b20(0x16a)}):(_0x3542f4=$gameMap[_0x268b20(0x164)](_0x392a74),_0x5351a4={'type':_0x268b20(0x164),'id':_0x392a74});if(!_0x3542f4)return;if(_0x5351a4['type']===_0x268b20(0x164)){const _0x2732ec=_0x5351a4['id'],_0x305ced=brightComment(_0x3542f4)!==null,_0x506f86=dynamicBrightEvents[_0x268b20(0x174)](_0x2732ec)&&!_0x305ced,_0x594be3=autoEmitterEvents[_0x268b20(0x174)](_0x2732ec);if((_0x506f86||_0x594be3)&&!_0x305ced){showEditorWarning();return;}if(!_0x305ced&&!_0x506f86&&!_0x594be3){showEditorWarning();return;}}createLightEditorUI(_0x3542f4,_0x5351a4);}function showEditorWarning(){const _0x4f820a=_0x4e07,_0x4afa8a=document[_0x4f820a(0xf6)]('editorWarning');_0x4afa8a&&_0x4afa8a[_0x4f820a(0x109)]();const _0x51070c=document['createElement'](_0x4f820a(0x16c));_0x51070c['id']=_0x4f820a(0x107),_0x51070c[_0x4f820a(0x158)][_0x4f820a(0x103)]=_0x4f820a(0x148),_0x51070c[_0x4f820a(0x123)]=_0x4f820a(0x157),document['body'][_0x4f820a(0x11d)](_0x51070c),_0x51070c['querySelector'](_0x4f820a(0x177))[_0x4f820a(0x155)]=()=>{const _0x2c5740=_0x4f820a;_0x51070c[_0x2c5740(0x109)]();};}function makeDraggable(_0x246ec5){const _0x42f4f2=_0x4e07;let _0x337c3b=![],_0x1aeffd,_0x5aff77,_0x1bccac,_0x1d9aab;const _0x359bd6=_0x246ec5[_0x42f4f2(0x108)](_0x42f4f2(0xcd))||_0x246ec5;_0x359bd6['addEventListener']('mousedown',_0x5376f9),document[_0x42f4f2(0xf8)](_0x42f4f2(0x15f),_0x9ca2b9),document['addEventListener'](_0x42f4f2(0xe5),_0x4cb169);function _0x5376f9(_0x4fdde3){const _0xe8934b=_0x42f4f2;if(_0x4fdde3[_0xe8934b(0xd2)]===_0x359bd6||_0x359bd6[_0xe8934b(0x139)](_0x4fdde3[_0xe8934b(0xd2)])){_0x337c3b=!![],_0x246ec5['style'][_0xe8934b(0x101)]=_0xe8934b(0x173),_0x1aeffd=_0x4fdde3[_0xe8934b(0x127)],_0x5aff77=_0x4fdde3[_0xe8934b(0x10a)];const _0x1414f6=_0x246ec5[_0xe8934b(0x105)]();_0x1bccac=_0x1414f6['left'],_0x1d9aab=_0x1414f6[_0xe8934b(0x10f)],_0x246ec5[_0xe8934b(0x158)][_0xe8934b(0x12e)]=_0x1bccac+'px',_0x246ec5[_0xe8934b(0x158)][_0xe8934b(0x10f)]=_0x1d9aab+'px',_0x246ec5[_0xe8934b(0x158)][_0xe8934b(0xff)]='none',_0x246ec5['style']['margin']='0';}}function _0x9ca2b9(_0x25a399){const _0x1c1872=_0x42f4f2;if(_0x337c3b){_0x25a399[_0x1c1872(0x119)]();const _0x3a748a=_0x25a399[_0x1c1872(0x127)]-_0x1aeffd,_0x5d3087=_0x25a399['clientY']-_0x5aff77;_0x246ec5['style']['left']=_0x1bccac+_0x3a748a+'px',_0x246ec5[_0x1c1872(0x158)][_0x1c1872(0x10f)]=_0x1d9aab+_0x5d3087+'px';}}function _0x4cb169(_0x3ac53a){const _0x410510=_0x42f4f2;_0x337c3b&&(_0x337c3b=![],_0x246ec5['style'][_0x410510(0x101)]=_0x410510(0xce));}}function _0x4e07(_0x265bb7,_0x50470a){const _0x132476=_0x1324();return _0x4e07=function(_0x4e07f4,_0x391b66){_0x4e07f4=_0x4e07f4-0xcd;let _0x237618=_0x132476[_0x4e07f4];return _0x237618;},_0x4e07(_0x265bb7,_0x50470a);}function setupEditorListeners(_0x4bac50,_0x3325e5,_0x1c673f,_0x543f32){const _0x28d899=_0x4e07,_0x52623e=_0x4bac50['querySelector'](_0x28d899(0x126)),_0x4e8693=_0x4bac50[_0x28d899(0x108)](_0x28d899(0x167)),_0x513155=_0x4bac50[_0x28d899(0x108)]('#softnessSlider'),_0x329b4b=_0x4bac50[_0x28d899(0x108)](_0x28d899(0x135)),_0x3c9b90=_0x4bac50['querySelector'](_0x28d899(0x14a)),_0x3bea26=_0x4bac50[_0x28d899(0x108)](_0x28d899(0x168)),_0x50c73c=_0x4bac50[_0x28d899(0x108)](_0x28d899(0xde)),_0x19d437=_0x4bac50[_0x28d899(0x108)](_0x28d899(0xf9)),_0x678f2b=_0x4bac50[_0x28d899(0x108)](_0x28d899(0x13b)),_0xd50781=_0x4bac50[_0x28d899(0x108)](_0x28d899(0x162)),_0x5335ba=_0x4bac50['querySelector'](_0x28d899(0x172));let _0x15e3a=null;if(_0x3325e5&&_0x1c673f){const _0x416a30=_0x1c673f[_0x28d899(0x133)]===_0x28d899(0x16a)?_0x28d899(0x16a):_0x1c673f['id'],_0x51a471=dynamicBrightEvents[_0x28d899(0x170)](_0x416a30)||autoEmitterEvents[_0x28d899(0x170)](_0x416a30)||brightEvents[_0x28d899(0x170)](_0x416a30);_0x51a471&&(_0x15e3a=JSON[_0x28d899(0x151)](JSON['stringify'](_0x51a471)));}_0x52623e['oninput']=()=>{const _0x779bb2=_0x28d899;_0x4bac50[_0x779bb2(0x108)](_0x779bb2(0xfe))[_0x779bb2(0x14f)]=_0x52623e['value'];if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x4e8693['oninput']=()=>{const _0x23ea65=_0x28d899;_0x4bac50['querySelector']('#intensityValue')[_0x23ea65(0x14f)]=parseFloat(_0x4e8693[_0x23ea65(0xeb)])[_0x23ea65(0x175)](0x1);if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x513155[_0x28d899(0x13a)]=()=>{const _0x32b962=_0x28d899;_0x4bac50['querySelector'](_0x32b962(0xe0))[_0x32b962(0x14f)]=parseFloat(_0x513155[_0x32b962(0xeb)])[_0x32b962(0x175)](0x1);if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x329b4b[_0x28d899(0x13a)]=()=>{if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x3c9b90[_0x28d899(0x13f)]=()=>{if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0xd50781['oninput']=()=>{const _0xaa0f04=_0x28d899;_0x4bac50[_0xaa0f04(0x108)](_0xaa0f04(0x159))[_0xaa0f04(0x14f)]=_0xd50781[_0xaa0f04(0xeb)];if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x5335ba['oninput']=()=>{const _0x1bc9dd=_0x28d899;_0x4bac50[_0x1bc9dd(0x108)](_0x1bc9dd(0x12a))[_0x1bc9dd(0x14f)]=_0x5335ba[_0x1bc9dd(0xeb)];if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x3bea26[_0x28d899(0x13f)]=()=>{const _0x452c38=_0x28d899;_0x678f2b['style'][_0x452c38(0x146)]=_0x3bea26['checked']?_0x452c38(0xf3):'none';if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x50c73c[_0x28d899(0x13a)]=()=>{const _0x33e3a4=_0x28d899;_0x4bac50[_0x33e3a4(0x108)](_0x33e3a4(0x10e))[_0x33e3a4(0x14f)]=parseFloat(_0x50c73c['value'])['toFixed'](0x1);if(_0x3325e5&&_0x1c673f)_0x3f1b73();},_0x19d437[_0x28d899(0x13a)]=()=>{const _0x504484=_0x28d899;_0x4bac50['querySelector']('#flickerIntensityValue')[_0x504484(0x14f)]=_0x19d437[_0x504484(0xeb)]+'%';if(_0x3325e5&&_0x1c673f)_0x3f1b73();};function _0x3f1b73(){const _0x1bcad1=_0x28d899;if(!_0x3325e5||!_0x1c673f)return;isPreviewActive=!![];const _0x56de59=_0x1c673f['type']==='player'?_0x1bcad1(0x16a):_0x1c673f['id'],_0x4a6416=dynamicBrightEvents[_0x1bcad1(0x174)](_0x56de59)||autoEmitterEvents[_0x1bcad1(0x174)](_0x56de59)||brightEvents[_0x1bcad1(0x174)](_0x56de59);if(!_0x4a6416)return;const _0x594fec=_0x329b4b[_0x1bcad1(0xeb)],_0x1acb26=hexColor(_0x594fec,_0x3325e5),_0x4a9a38={'radius':parseInt(_0x52623e[_0x1bcad1(0xeb)]),'intensity':parseFloat(_0x4e8693['value']),'softness':parseFloat(_0x513155[_0x1bcad1(0xeb)]),'color':_0x1acb26,'offsetX':parseInt(_0xd50781['value']),'offsetY':parseInt(_0x5335ba['value']),'spriteAsEmitter':_0x3c9b90[_0x1bcad1(0x145)],'flicker':{'enabled':_0x3bea26[_0x1bcad1(0x145)],'speed':parseFloat(_0x50c73c[_0x1bcad1(0xeb)]),'intensity':parseFloat(_0x19d437[_0x1bcad1(0xeb)])/0x64},'dynamic':!![],'persist':_0x543f32['persist']||![]};dynamicBrightEvents[_0x1bcad1(0xe2)](_0x56de59,_0x4a9a38);if(_0x1c673f[_0x1bcad1(0x133)]===_0x1bcad1(0x164)){const _0x473785=$dataMap[_0x1bcad1(0xe8)][_0x1c673f['id']]['name'];$gameMap[_0x1bcad1(0xe8)]()[_0x1bcad1(0x144)](_0x8be8ab=>{const _0x15f0fe=_0x1bcad1;if(!_0x8be8ab)return;const _0x237c8c=_0x8be8ab[_0x15f0fe(0x164)]();if(!_0x237c8c)return;const _0x1023bd=_0x237c8c[_0x15f0fe(0xf1)];if(_0x1023bd===_0x473785){const _0x2ca26f=brightComment(_0x8be8ab)!==null;if(!_0x2ca26f)return;const _0x5abf55=_0x8be8ab[_0x15f0fe(0x154)](),_0x4780d2={'radius':parseInt(_0x52623e['value']),'intensity':parseFloat(_0x4e8693[_0x15f0fe(0xeb)]),'softness':parseFloat(_0x513155['value']),'color':hexColor(_0x594fec,_0x8be8ab),'offsetX':parseInt(_0xd50781[_0x15f0fe(0xeb)]),'offsetY':parseInt(_0x5335ba[_0x15f0fe(0xeb)]),'spriteAsEmitter':_0x3c9b90[_0x15f0fe(0x145)],'flicker':{'enabled':_0x3bea26[_0x15f0fe(0x145)],'speed':parseFloat(_0x50c73c[_0x15f0fe(0xeb)]),'intensity':parseFloat(_0x19d437['value'])/0x64},'dynamic':!![],'persist':![]};dynamicBrightEvents[_0x15f0fe(0xe2)](_0x5abf55,_0x4780d2);}});}const _0x19aac2=SceneManager['_scene'];_0x19aac2&&_0x19aac2['updateBrightnessFilters']&&_0x19aac2['updateBrightnessFilters']();}_0x4bac50['querySelector'](_0x28d899(0xf2))['onclick']=()=>{const _0x2863ee=_0x28d899;if(_0x3325e5&&_0x1c673f){_0x3f1b73();if(_0x1c673f[_0x2863ee(0x133)]==='event'){const _0xbbe764={'radius':parseInt(_0x52623e[_0x2863ee(0xeb)]),'intensity':parseFloat(_0x4e8693[_0x2863ee(0xeb)]),'softness':parseFloat(_0x513155[_0x2863ee(0xeb)]),'color':_0x329b4b['value'],'offsetX':parseInt(_0xd50781[_0x2863ee(0xeb)]),'offsetY':parseInt(_0x5335ba['value']),'spriteAsEmitter':_0x3c9b90[_0x2863ee(0x145)],'flickerEnabled':_0x3bea26[_0x2863ee(0x145)],'flickerSpeed':parseFloat(_0x50c73c[_0x2863ee(0xeb)]),'flickerIntensity':parseFloat(_0x19d437['value'])/0x64};saveEventLightData(_0x1c673f['id'],_0x3325e5,_0xbbe764);const _0x5ae7bf=$dataMap[_0x2863ee(0xe8)][_0x1c673f['id']]?.['name']||'Event'+_0x1c673f['id'];$gameMap[_0x2863ee(0xe8)]()[_0x2863ee(0x144)](_0x16dfb9=>{const _0x4ea2bf=_0x2863ee;if(!_0x16dfb9)return;const _0x139cf0=_0x16dfb9[_0x4ea2bf(0x164)]();if(!_0x139cf0)return;const _0x5f0b4d=_0x139cf0[_0x4ea2bf(0xf1)];if(_0x5f0b4d===_0x5ae7bf){const _0x4bf126=brightComment(_0x16dfb9)!==null;if(!_0x4bf126)return;const _0x384327=_0x16dfb9[_0x4ea2bf(0x154)](),_0x477c4a={'radius':_0xbbe764[_0x4ea2bf(0xf4)],'intensity':_0xbbe764[_0x4ea2bf(0xd0)],'softness':_0xbbe764[_0x4ea2bf(0xd3)],'color':hexColor(_0xbbe764[_0x4ea2bf(0x112)],_0x16dfb9),'offsetX':_0xbbe764[_0x4ea2bf(0x166)],'offsetY':_0xbbe764[_0x4ea2bf(0x143)],'spriteAsEmitter':_0xbbe764['spriteAsEmitter'],'flicker':{'enabled':_0xbbe764[_0x4ea2bf(0x124)],'speed':_0xbbe764['flickerSpeed'],'intensity':_0xbbe764[_0x4ea2bf(0x15e)]},'dynamic':!![],'persist':![]};dynamicBrightEvents[_0x4ea2bf(0xe2)](_0x384327,_0x477c4a);}});}}isPreviewActive=![],_0x4bac50[_0x2863ee(0x109)]();},_0x4bac50[_0x28d899(0x108)]('#closeEditor')[_0x28d899(0x155)]=()=>{const _0x1098c3=_0x28d899;if(_0x15e3a&&_0x3325e5&&_0x1c673f){const _0x2b0ed3=_0x1c673f[_0x1098c3(0x133)]===_0x1098c3(0x16a)?'player':_0x1c673f['id'];dynamicBrightEvents[_0x1098c3(0xe2)](_0x2b0ed3,_0x15e3a);}isPreviewActive=![],_0x4bac50[_0x1098c3(0x109)]();},_0x3325e5&&_0x1c673f&&_0x3f1b73();}function saveEventLightData(_0x343249,_0x2b9e90,_0x18626a){const _0x464ece=_0x4e07;if(!Utils[_0x464ece(0x116)]())return null;const _0x284e0e=$dataMap[_0x464ece(0xe8)][_0x343249],_0x3aa161=_0x284e0e[_0x464ece(0xf1)],_0xb9052c={'radius':_0x18626a['radius'],'intensity':_0x18626a[_0x464ece(0xd0)],'softness':_0x18626a['softness'],'color':_0x18626a[_0x464ece(0x112)],'offsetX':_0x18626a['offsetX'],'offsetY':_0x18626a['offsetY'],'spriteAsEmitter':_0x18626a['spriteAsEmitter'],'flickerEnabled':_0x18626a['flickerEnabled'],'flickerSpeed':_0x18626a[_0x464ece(0x14c)],'flickerIntensity':_0x18626a[_0x464ece(0x15e)]};let _0x143bda={};try{const _0x44eb99=require('fs'),_0x2d005e=require(_0x464ece(0x113)),_0x2d7e99=_0x2d005e['join'](process[_0x464ece(0x140)](),'js',_0x464ece(0x10d));if(_0x44eb99[_0x464ece(0xdb)](_0x2d7e99)){const _0xe7fd74=_0x44eb99['readFileSync'](_0x2d7e99,_0x464ece(0x11a));_0x143bda=JSON[_0x464ece(0x151)](_0xe7fd74);}}catch(_0x3add54){console[_0x464ece(0x179)](_0x464ece(0x11c),_0x3add54),_0x143bda={};}_0x143bda[_0x3aa161]=_0xb9052c;try{const _0x371ac5=require('fs'),_0x44f4a1=require(_0x464ece(0x113)),_0x1d27f8=_0x44f4a1[_0x464ece(0x169)](process['cwd'](),'js','EmitterSettings.json'),_0x5d4b3b=_0x44f4a1[_0x464ece(0x169)](process[_0x464ece(0x140)](),'js');!_0x371ac5[_0x464ece(0xdb)](_0x5d4b3b)&&_0x371ac5['mkdirSync'](_0x5d4b3b,{'recursive':!![]}),_0x371ac5['writeFileSync'](_0x1d27f8,JSON[_0x464ece(0xef)](_0x143bda,null,0x2));}catch(_0x5e6a1b){console[_0x464ece(0x122)](_0x464ece(0x171),_0x5e6a1b);}}function _0x1324(){const _0x2e978f=['4189024tsGcEJ','delete','EmitterSettings.json','#flickerSpeedValue','top','</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22offsetYSlider\x22\x20min=\x22-100\x22\x20max=\x22100\x22\x20value=\x22','max','color','path','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transform:\x20translate(-50%,\x20-50%);\x0a\x20\x20\x20\x20\x20\x20\x20\x20','<emitterFlicker>','isNwjs','\x22\x20style=\x22width:\x20100%;\x20height:\x2018px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22flex:\x201;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Offset\x20Y:\x20<span\x20id=\x22offsetYValue\x22>','</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22radiusSlider\x22\x20min=\x2250\x22\x20max=\x22500\x22\x20value=\x22','preventDefault','utf8','code','Could\x20not\x20load\x20existing\x20emitter\x20settings:','appendChild','match','#ffffff','flicker','patternHeight','error','innerHTML','flickerEnabled','isReady','#radiusSlider','clientX','editorClickHandler','round','#offsetYValue','Player','\x22\x20style=\x22width:\x20100%;\x20height:\x2016px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2011px;\x22>Intensity:\x20<span\x20id=\x22flickerIntensityValue\x22>','pages','left','180275xegiiF','tileWidth','patternWidth','includes','type','toDataURL','#colorPicker','floor','abs','lightEditor','contains','oninput','#flickerControls','\x22\x20style=\x22width:\x20100%;\x20height:\x2016px;\x22>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22text-align:\x20center;\x20margin-top:\x2012px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22applyLight\x22\x20style=\x22padding:\x206px\x2012px;\x20margin:\x200\x208px;\x20background:\x20#4CAF50;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x203px;\x20cursor:\x20pointer;\x20font-size:\x2012px;\x22>Apply</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22closeEditor\x22\x20style=\x22padding:\x206px\x2012px;\x20margin:\x200\x208px;\x20background:\x20#666;\x20color:\x20white;\x20border:\x20none;\x20border-radius:\x203px;\x20cursor:\x20pointer;\x20font-size:\x2012px;\x22>Close</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22margin-top:\x208px;\x20font-size:\x2010px;\x20color:\x20#ccc;\x20line-height:\x201.3;\x20text-align:\x20center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Settings\x20will\x20apply\x20to\x20multiple\x20events\x20if\x20they\x20share\x20the\x20same\x20name\x20and\x20have\x20comment\x20&lt;emitter&gt;\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>\x0a','toString','231320mBCsiD','onchange','cwd','EmitterSettings','createElement','offsetY','forEach','checked','display','</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22intensitySlider\x22\x20min=\x220.1\x22\x20max=\x223.0\x22\x20step=\x220.1\x22\x20value=\x22','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20top:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x2050%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transform:\x20translate(-50%,\x20-50%);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(220,\x2053,\x2069,\x200.95);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x202px\x20solid\x20#dc3545;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x2010001;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-family:\x20Arial,\x20sans-serif;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20350px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x204px\x2020px\x20rgba(0,\x200,\x200,\x200.8);\x0a\x20\x20\x20\x20\x20\x20\x20\x20','6wjQjcX','#spriteAsEmitter','</h3>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20','flickerSpeed','enabled','20CTMIzx','textContent','</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22flickerSpeedSlider\x22\x20min=\x220.5\x22\x20max=\x2210.0\x22\x20step=\x220.1\x22\x20value=\x22','parse','\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x208px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Radius:\x20<span\x20id=\x22radiusValue\x22>','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22text-align:\x20center;\x20margin-bottom:\x2015px;\x20padding:\x2010px;\x20background:\x20rgba(255,255,255,0.1);\x20border-radius:\x205px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20src=\x22','eventId','onclick','speed','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin:\x200\x200\x2010px\x200;\x20color:\x20#fff;\x22>Visual\x20Editor\x20Not\x20Supported</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22margin:\x200\x200\x2015px\x200;\x20line-height:\x201.4;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Currently,\x20only\x20events\x20with\x20comment\x20&lt;emitter&gt;\x20support\x20visual\x20editor.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<br><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20This\x20event\x20either\x20uses\x20plugin\x20command,\x20notetag\x20method,\x20or\x20its\x20page\x20doesn\x27t\x20have\x20comment\x20&lt;emitter&gt;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22closeWarning\x22\x20style=\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x208px\x2016px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#dc3545;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x22>OK</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','style','#offsetXValue','1013424jQeorY','_characterIndex','getItem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x20','flickerIntensity','mousemove','body','_realY','#offsetXSlider','\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2011px;\x22>Speed:\x20<span\x20id=\x22flickerSpeedValue\x22>','event','readFileSync','offsetX','#intensitySlider','#flickerEnabled','join','player','list','div','%</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22flickerIntensitySlider\x22\x20min=\x220\x22\x20max=\x22100\x22\x20value=\x22','<emitterEventAsEmitter>','tileHeight','get','Could\x20not\x20save\x20emitter\x20settings:','#offsetYSlider','grabbing','has','toFixed','drawImage','#closeWarning','padStart','log','height','min','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(0,\x200,\x200,\x200.79);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x202px\x20solid\x20#444;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x2010000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-family:\x20Arial,\x20sans-serif;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2013px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20min-width:\x20250px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20320px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20move;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20user-select:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x204px\x2020px\x20rgba(0,\x200,\x200,\x200.7);\x0a\x20\x20\x20\x20\x20\x20\x20\x20','#editorHeader','move','\x22\x20style=\x22width:\x20100%;\x20height:\x2018px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x206px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22checkbox\x22\x20id=\x22spriteAsEmitter\x22\x20','intensity','551580jIupuJ','target','softness','_realX','spriteAsEmitter','2390ppPTmW','_displayY','width','toLowerCase','canvas','existsSync','No\x20Target','\x22\x20style=\x22image-rendering:\x20pixelated;\x20border:\x201px\x20solid\x20#666;\x20background:\x20rgba(255,255,255,0.1);\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','#flickerSpeedSlider','length','#softnessValue','_scene','set','_displayX','75087cKcnfc','mouseup','\x22\x20style=\x22width:\x20100%;\x20height:\x2018px;\x22>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x208px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Softness:\x20<span\x20id=\x22softnessValue\x22>','bitmap','events','_pageIndex','undefined','value','Could\x20not\x20load\x20emitter\x20settings\x20from\x20localStorage:','\x22\x20style=\x22width:\x20100%;\x20height:\x2018px;\x22>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x208px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Intensity:\x20<span\x20id=\x22intensityValue\x22>','editorOverlay','stringify','4376896lTnWLG','name','#applyLight','block','radius',';\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transform:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getElementById','_spriteset','addEventListener','#flickerIntensitySlider','>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Enable\x20Flicker\x0a\x20\x20\x20\x20\x20\x20\x20\x20</label>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20id=\x22flickerControls\x22\x20style=\x22margin-bottom:\x208px;\x20','removeEventListener','substring','findCharacterSprite','#radiusValue','transform','\x22\x20style=\x22width:\x20100%;\x20height:\x2018px;\x22>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20<div\x20style=\x22margin-bottom:\x208px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<label\x20style=\x22font-size:\x2012px;\x22>Color:</label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22color\x22\x20id=\x22colorPicker\x22\x20value=\x22','cursor','</span></label><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22range\x22\x20id=\x22offsetXSlider\x22\x20min=\x22-100\x22\x20max=\x22100\x22\x20value=\x22','cssText','click','getBoundingClientRect','getContext','editorWarning','querySelector','remove','clientY'];_0x1324=function(){return _0x2e978f;};return _0x1324();}function loadEventLightData(_0x54cf13){const _0xf7772d=_0x4e07;if(Utils[_0xf7772d(0x116)]())try{const _0x50f091=require('fs'),_0x4f82ca=require('path'),_0x25745a=_0x4f82ca[_0xf7772d(0x169)](process[_0xf7772d(0x140)](),'js','EmitterSettings.json');if(!_0x50f091[_0xf7772d(0xdb)](_0x25745a))return null;const _0x29dfb5=_0x50f091[_0xf7772d(0x165)](_0x25745a,_0xf7772d(0x11a)),_0xe693b5=JSON['parse'](_0x29dfb5),_0x53a5b0=_0xe693b5[_0x54cf13];if(!_0x53a5b0)return null;return{'radius':_0x53a5b0[_0xf7772d(0xf4)]||0x96,'intensity':_0x53a5b0['intensity']||0x1,'softness':_0x53a5b0[_0xf7772d(0xd3)]||0.7,'color':_0x53a5b0[_0xf7772d(0x112)]||_0xf7772d(0x11f),'offsetX':_0x53a5b0[_0xf7772d(0x166)]||0x0,'offsetY':_0x53a5b0['offsetY']||0x0,'spriteAsEmitter':_0x53a5b0[_0xf7772d(0xd5)]||![],'flickerEnabled':_0x53a5b0[_0xf7772d(0x124)]||![],'flickerSpeed':_0x53a5b0[_0xf7772d(0x14c)]||0x2,'flickerIntensity':_0x53a5b0[_0xf7772d(0x15e)]||0.3};}catch(_0x52d299){return console[_0xf7772d(0x179)]('Could\x20not\x20load\x20emitter\x20settings\x20from\x20file:',_0x52d299),null;}else try{const _0x5d1255=localStorage[_0xf7772d(0x15c)](_0xf7772d(0x141));if(!_0x5d1255)return null;const _0x52a472=JSON['parse'](_0x5d1255),_0x5e6816=_0x52a472[_0x54cf13];if(!_0x5e6816)return null;return{'radius':_0x5e6816[_0xf7772d(0xf4)]||0x96,'intensity':_0x5e6816[_0xf7772d(0xd0)]||0x1,'softness':_0x5e6816[_0xf7772d(0xd3)]||0.7,'color':_0x5e6816['color']||_0xf7772d(0x11f),'offsetX':_0x5e6816[_0xf7772d(0x166)]||0x0,'offsetY':_0x5e6816['offsetY']||0x0,'spriteAsEmitter':_0x5e6816['spriteAsEmitter']||![],'flickerEnabled':_0x5e6816['flickerEnabled']||![],'flickerSpeed':_0x5e6816[_0xf7772d(0x14c)]||0x2,'flickerIntensity':_0x5e6816[_0xf7772d(0x15e)]||0.3};}catch(_0x1a6285){return console[_0xf7772d(0x179)](_0xf7772d(0xec),_0x1a6285),null;}}function brightComment(_0x5d9ca2){const _0x216d79=_0x4e07;if(!_0x5d9ca2||!_0x5d9ca2['event']())return null;const _0x1adac1=_0x5d9ca2[_0x216d79(0x164)]();if(!_0x1adac1||!_0x1adac1[_0x216d79(0x12d)])return null;const _0x3750df=_0x5d9ca2[_0x216d79(0xe9)];if(_0x3750df<0x0||_0x3750df>=_0x1adac1[_0x216d79(0x12d)][_0x216d79(0xdf)])return null;const _0x401433=_0x1adac1[_0x216d79(0x12d)][_0x3750df];if(!_0x401433||!_0x401433[_0x216d79(0x16b)])return null;const _0x59c1c0=_0x401433[_0x216d79(0x16b)];let _0x4e164d=null,_0x45f689=null,_0x8fe894=null,_0x402ba5=null,_0x2f8bde=![];for(const _0x3f824e of _0x59c1c0){if(_0x3f824e[_0x216d79(0x11b)]===0x6c||_0x3f824e[_0x216d79(0x11b)]===0x198){const _0x23b0fd=_0x3f824e['parameters'][0x0],_0x1d941d=_0x23b0fd[_0x216d79(0x11e)](/<emitter(?::\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*)?>/);_0x1d941d&&(_0x1d941d[0x1]&&_0x1d941d[0x2]&&_0x1d941d[0x3]?_0x4e164d={'radius':parseFloat(_0x1d941d[0x1])||defaultRadius,'intensity':parseFloat(_0x1d941d[0x2])||defaultIntensity,'softness':parseFloat(_0x1d941d[0x3])||defaultSoftness}:_0x4e164d={'radius':defaultRadius,'intensity':defaultIntensity,'softness':defaultSoftness});_0x23b0fd[_0x216d79(0x132)](_0x216d79(0x16e))&&(_0x2f8bde=!![]);_0x23b0fd[_0x216d79(0x132)](_0x216d79(0x115))&&(_0x45f689={'enabled':!![],'speed':defaultFlickerSpeed,'intensity':defaultFlickerIntensity});const _0x4aef57=_0x23b0fd[_0x216d79(0x11e)](/<emitterFlicker:\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*>/);if(_0x4aef57){let _0x4be084=parseFloat(_0x4aef57[0x1])||defaultFlickerSpeed,_0x2bf96f=parseFloat(_0x4aef57[0x2])||defaultFlickerIntensity;_0x2bf96f>0x1&&(_0x2bf96f=_0x2bf96f/0x64),_0x4be084=Math[_0x216d79(0x111)](0.1,Math[_0x216d79(0x17b)](_0x4be084,0x64)),_0x2bf96f=Math[_0x216d79(0x111)](0x0,Math[_0x216d79(0x17b)](_0x2bf96f,0x1)),_0x45f689={'enabled':!![],'speed':_0x4be084,'intensity':_0x2bf96f};}const _0x46ff68=_0x23b0fd['match'](/<emitterColor:\s*(#[0-9a-fA-F]{6}|auto)\s*>/i);if(_0x46ff68){const _0x33b3d4=_0x46ff68[0x1][_0x216d79(0xd9)]();if(_0x33b3d4==='auto'){const _0x559046=getDominantColor(_0x5d9ca2),_0x4363ef=_0x559046[_0x216d79(0xfc)](0x1);_0x8fe894={'r':parseInt(_0x4363ef[_0x216d79(0xfc)](0x0,0x2),0x10)/0xff,'g':parseInt(_0x4363ef[_0x216d79(0xfc)](0x2,0x4),0x10)/0xff,'b':parseInt(_0x4363ef[_0x216d79(0xfc)](0x4,0x6),0x10)/0xff,'custom':!![]};}else{const _0xbd606a=_0x33b3d4[_0x216d79(0xfc)](0x1);_0x8fe894={'r':parseInt(_0xbd606a['substring'](0x0,0x2),0x10)/0xff,'g':parseInt(_0xbd606a['substring'](0x2,0x4),0x10)/0xff,'b':parseInt(_0xbd606a[_0x216d79(0xfc)](0x4,0x6),0x10)/0xff,'custom':!![]};}}const _0x50c758=_0x23b0fd[_0x216d79(0x11e)](/<emitterOffset:\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*>/);_0x50c758&&(_0x402ba5={'x':parseFloat(_0x50c758[0x1])||0x0,'y':parseFloat(_0x50c758[0x2])||0x0});}}if(!_0x4e164d){const _0x54ebc3=_0x5d9ca2[_0x216d79(0x154)]();return(brightEvents[_0x216d79(0x174)](_0x54ebc3)||dynamicBrightEvents['has'](_0x54ebc3))&&(brightEvents['delete'](_0x54ebc3),dynamicBrightEvents[_0x216d79(0x10c)](_0x54ebc3)),null;}const _0x2e234b=_0x1adac1[_0x216d79(0xf1)],_0xdea70d=loadEventLightData(_0x2e234b),_0x402e02=_0x5d9ca2[_0x216d79(0x154)]();if(isPreviewActive&&dynamicBrightEvents['has'](_0x402e02))return dynamicBrightEvents[_0x216d79(0x170)](_0x402e02);if(_0xdea70d){const _0x3774d6={'radius':_0xdea70d[_0x216d79(0xf4)],'intensity':_0xdea70d['intensity'],'softness':_0xdea70d[_0x216d79(0xd3)],'color':hexColor(_0xdea70d['color'],_0x5d9ca2),'offsetX':_0xdea70d[_0x216d79(0x166)],'offsetY':_0xdea70d[_0x216d79(0x143)],'spriteAsEmitter':_0xdea70d[_0x216d79(0xd5)],'flicker':{'enabled':_0xdea70d['flickerEnabled'],'speed':_0xdea70d[_0x216d79(0x14c)],'intensity':_0xdea70d[_0x216d79(0x15e)]},'dynamic':!![]};return dynamicBrightEvents['set'](_0x402e02,_0x3774d6),_0x3774d6;}else return _0x4e164d[_0x216d79(0x120)]=_0x45f689||{'enabled':![]},_0x4e164d[_0x216d79(0x112)]=_0x8fe894||{'custom':![]},_0x4e164d[_0x216d79(0x166)]=_0x402ba5?_0x402ba5['x']:0x0,_0x4e164d[_0x216d79(0x143)]=_0x402ba5?_0x402ba5['y']:0x0,_0x4e164d[_0x216d79(0xd5)]=_0x2f8bde,dynamicBrightEvents[_0x216d79(0xe2)](_0x402e02,_0x4e164d),_0x4e164d;}function rgbToHex(_0x5a96b4){const _0x53598b=_0x4e07;if(!_0x5a96b4||!_0x5a96b4['custom'])return _0x53598b(0x11f);const _0x284387=Math[_0x53598b(0x129)](_0x5a96b4['r']*0xff)[_0x53598b(0x13d)](0x10)[_0x53598b(0x178)](0x2,'0'),_0x4a1020=Math[_0x53598b(0x129)](_0x5a96b4['g']*0xff)[_0x53598b(0x13d)](0x10)[_0x53598b(0x178)](0x2,'0'),_0x2278af=Math[_0x53598b(0x129)](_0x5a96b4['b']*0xff)[_0x53598b(0x13d)](0x10)[_0x53598b(0x178)](0x2,'0');return'#'+_0x284387+_0x4a1020+_0x2278af;}

    setTimeout(loadEmitterSettingsFromFile, 500);
})();