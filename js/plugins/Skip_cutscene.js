/*:
 * @target MZ
 * @plugindesc [v1.0] Permite saltar escenas manteniendo presionado el botón de Cancelar (X / Esc).
 * @author Dextroyean
 *
 * @help
 * ============================================================================
 * MODO DE USO:
 * ============================================================================
 * 1. En tu evento del Prólogo, activa el Interruptor que elijas en este plugin.
 * 2. El plugin vigilará si el jugador mantiene presionado el botón Cancelar.
 * 3. Si lo mantiene presionado por 1.5 segundos (90 frames), el interruptor
 * de salto se encenderá automáticamente.
 * * Al final de tus diálogos largos, solo pon una condición: "Si Interruptor X
 * está encendido, haz el fundido a negro y teletransporta al jugador".
 *
 * @param skipSwitch
 * @text Interruptor de Salto
 * @desc El número del interruptor (Switch) que se activará cuando el jugador se salte la escena.
 * @type switch
 * @default 3
 */

(() => {
    const pluginName = "Dex_SkipCutscene";
    const parameters = PluginManager.parameters(pluginName);
    const skipSwitchId = Number(parameters['skipSwitch'] || 3);
    
    let pressCounter = 0;
    const FRAMES_REQUIRED = 90; // 90 frames = 1.5 segundos a 60fps

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updateSkipCheck();
    };

    Scene_Map.prototype.updateSkipCheck = function() {
        // Solo vigilar si estamos en el mapa y el interruptor de salto NO está activo todavía
        if ($gameSwitches && !$gameSwitches.value(skipSwitchId)) {
            
            // Si el jugador mantiene presionado el botón "cancel" (X, Esc o Click Derecho sostenido)
            if (Input.isPressed('cancel') || TouchInput.isLongPressed()) {
                pressCounter++;
                
                // Efecto visual opcional en la consola para desarrollo
                if (pressCounter % 30 === 0) {
                    console.log("Saltando escena en... " + Math.ceil((FRAMES_REQUIRED - pressCounter) / 60) + "s");
                }

                if (pressCounter >= FRAMES_REQUIRED) {
                    $gameSwitches.setValue(skipSwitchId, true);
                    pressCounter = 0; // Reiniciar contador
                    SoundManager.playRecovery(); // Sonido de confirmación
                    console.log("¡Escena Saltada!");
                }
            } else {
                pressCounter = 0; // Si suelta el botón, el contador se pone a cero
            }
        }
    };
})();