//=============================================================================
// Dex_RhythmBattleMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v0.3.8 Batalla rítmica Full HD por BPM, BGM boost, fade de carriles y celebración de victoria.
 * @author Dextroyean y Jaime
 *
 * @help
 * ============================================================================
 * Dex_RhythmBattleMZ v0.3.8
 * ============================================================================
 *
 * Rehecho visualmente desde cero:
 * - Sin imágenes obligatorias.
 * - Interfaz dibujada por código.
 * - Inspiración de batalla musical tipo Theatrhythm, sin copiar assets.
 * - Notas de izquierda a derecha.
 * - Escalado proporcional desde referencia 1920x1080.
 * - Ritmo por BPM.
 * - HP individual de party baja visualmente al fallar.
 * - Música BGM configurable por batalla.
 * - Duración por segundos o por canción completa cuando RPG Maker permite detectarla.
 * - Patrones variables con rests, notas entre pulsos y notas dobles/triples.
 * - Modo chart manual por archivo JSON en data/rhythm_charts/.
 * - Hotfix v0.3.5: corrige cleanDataFolder/chartName no definidos.
 * - v0.3.6: volumen de sonidos configurable.
 * - v0.3.6: actores atacan al acertar nota y boss ataca al fallar.
 * - v0.3.7: evita que performDamage reproduzca el SE fuerte de daño por defecto.
 * - v0.3.7: agrega parámetro para activar/desactivar sonidos RPG Maker de daño.
 * - v0.3.8: agrega boost de BGM para canciones que suenan bajas.
 * - v0.3.8: carriles con gradiente transparente hacia la derecha.
 * - v0.3.8: actores hacen motion victory al ganar.
 * - v0.3.8: BP se puede ocultar del HUD y queda apagado por defecto.
 * - Chart incluido para Runes of Stormhall.
 * - Party HUD permite faces, círculos o sólo nombres.
 *
 * Plugin Command:
 *   Dex_RhythmBattleMZ -> Iniciar Batalla Rítmica
 *
 * BPM recomendado:
 *   80-95    Fácil
 *   100-120  Normal
 *   130-150  Difícil
 *   160+     Muy difícil
 *
 * Controles:
 *   Teclado: Z/Enter, X/Esc, Flechas
 *   Control: OK, Cancel, D-Pad
 *
 * Secuencia manual:
 *   Z,X,UP,DOWN
 *   OK,CANCEL,UP,RIGHT,LEFT,DOWN
 *
 * Índices:
 *   0=Z/OK, 1=X/Cancel, 2=Up, 3=Right, 4=Left, 5=Down
 *
 * Música:
 *   - Si Música está vacía, usa la BGM de batalla del sistema.
 *   - Si Segundos de música > 0, termina al llegar a ese tiempo.
 *   - Si Segundos de música = 0, intenta usar la duración total del archivo BGM.
 *   - Si RPG Maker no expone la duración del audio, usa Cantidad de notas como fallback.
 *
 * Chart manual:
 *   Crea archivos JSON en data/rhythm_charts/.
 *   Ejemplo incluido: Runes_of_Stormhall_Normal.json
 *   En el comando usa Modo Chart = manual y Chart File = Runes_of_Stormhall_Normal
 *
 * @command IniciarBatallaRitmica
 * @text Iniciar Batalla Rítmica
 * @desc Abre una batalla rítmica usando BPM.
 *
 * @arg enemyID
 * @text Enemigo ID
 * @type enemy
 * @default 1
 *
 * @arg bpm
 * @text BPM
 * @type number
 * @min 20
 * @max 300
 * @default 120
 *
 * @arg beats
 * @text Cantidad de notas
 * @type number
 * @min 4
 * @max 256
 * @default 48
 *
 * @arg approachBeats
 * @text Beats de anticipación
 * @type number
 * @decimals 2
 * @min 1
 * @max 12
 * @default 4
 * @desc Cuántos beats tarda la nota desde aparecer hasta llegar al objetivo.
 *
 * @arg inputMode
 * @text Modo de controles
 * @type select
 * @option Simple 4 botones
 * @value simple4
 * @option Completo 6 botones
 * @value full6
 * @default simple4
 *
 * @arg sequence
 * @text Secuencia
 * @type string
 * @default
 * @desc Ejemplo: Z,X,UP,DOWN. Vacío genera aleatorio.
 *
 * @arg randomTempo
 * @text Variación de tempo
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 *
 * @arg animationID
 * @text Animación ataque enemigo
 * @type animation
 * @default 1
 *
 * @arg winSwitch
 * @text Switch al ganar
 * @type switch
 * @default 0
 *
 * @arg scoreVariable
 * @text Variable para resultado
 * @type variable
 * @default 0
 *
 * @arg musicName
 * @text Música BGM
 * @type file
 * @dir audio/bgm/
 * @default
 * @desc Archivo BGM para esta batalla. Vacío usa la música de batalla normal.
 *
 * @arg musicVolume
 * @text Volumen música
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @arg musicBoostPercent
 * @text Volumen extra BGM %
 * @type number
 * @min 50
 * @max 200
 * @default 120
 * @desc Multiplica la ganancia de la BGM. 100 = normal. Útil si la canción se oye baja.
 *
 * @arg musicPitch
 * @text Pitch música
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @arg musicPan
 * @text Pan música
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg musicSeconds
 * @text Segundos de música
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 * @desc 0 intenta usar la canción completa. Mayor a 0 usa sólo esa duración.
 *
 * @arg fadeOutSeconds
 * @text Fade out al salir
 * @type number
 * @decimals 2
 * @min 0
 * @default 0.75
 *
 * @arg chartMode
 * @text Modo Chart
 * @type select
 * @option Automático
 * @value auto
 * @option Manual JSON
 * @value manual
 * @default auto
 *
 * @arg chartFile
 * @text Chart File
 * @type file
 * @dir data/rhythm_charts/
 * @default
 * @desc Nombre del JSON sin extensión. Ejemplo: Runes_of_Stormhall_Normal
 *
 * @arg chartOffsetSeconds
 * @text Offset Chart segundos
 * @type number
 * @decimals 3
 * @min -10
 * @max 10
 * @default 0
 * @desc Ajuste fino. Positivo retrasa notas, negativo las adelanta.
 *
 * @arg chartUseBpm
 * @text Usar BPM del chart
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 *
 * @param General
 * @text General
 * @type struct<GeneralSettings>
 * @default {"ReferenceWidth":"1920","ReferenceHeight":"1080","DimBackground":"true","BackgroundOpacity":"128","ShowMapSnapshot":"true","ShowBattlers":"true","ReturnBgm":"true"}
 *
 * @param Gameplay
 * @text Gameplay
 * @type struct<GameplaySettings>
 * @default {"ComboDamageBonus":"5","PerfectMultiplier":"1.5","MissDamagePercent":"5","DamageRealActorHp":"false","GoodWindowFrames":"12","PerfectWindowFrames":"5","StartDelayBeats":"4","MinNoteGapFrames":"18","EndWhenEnemyDefeated":"false","TargetAccuracyWin":"0.65"}
 *
 * @param Music
 * @text Música
 * @type struct<MusicSettings>
 * @default {"DefaultBgm":"","Volume":"90","BgmBoostPercent":"120","Pitch":"100","Pan":"0","Seconds":"0","FadeOutSeconds":"0.75","TryDetectFullLength":"true"}
 *
 * @param Chart
 * @text Chart Manual
 * @type struct<ChartSettings>
 * @default {"Folder":"data/rhythm_charts/","DefaultChartMode":"auto","DefaultChartFile":"","ChartOffsetSeconds":"0","UseChartBpm":"true"}
 *
 * @param Rhythm
 * @text Ritmo / Chart
 * @type struct<RhythmSettings>
 * @default {"NoteDensity":"82","RestChance":"8","SubBeatChance":"28","DoubleNoteChance":"16","TripleNoteChance":"3","MaxSimultaneous":"2","RandomOffsetFrames":"4","UseDoubleNotes":"true","UseSubBeatNotes":"true"}
 *
 * @param Layout
 * @text Layout Full HD
 * @type struct<LayoutSettings>
 * @default {"LaneStartX":"260","TargetX":"1450","LaneY":"360","LaneSpacing":"115","LaneWidth":"1100","LaneHeight":"34","LaneLeftFadeWidth":"0","LaneRightFadeWidth":"260","NoteSize":"86","TargetSize":"108","EnemyX":"360","EnemyY":"650","ActorX":"1680","ActorY":"370","ActorSpacing":"112","PhaseX":"960","PhaseY":"392"}
 *
 * @param HUD
 * @text HUD
 * @type struct<HudSettings>
 * @default {"EnemyHudX":"70","EnemyHudY":"900","PartyHudX":"1480","PartyHudY":"830","PartyIconMode":"face","PartyFaceSize":"42","ComboX":"1460","ComboY":"70","JudgeX":"960","JudgeY":"245","PanelOpacity":"185","GoldColor":"#E8C16A","TextColor":"#FFF6D6","ShowBattlePower":"false","ShowTimer":"true"}
 *
 * @param Style
 * @text Estilo
 * @type struct<StyleSettings>
 * @default {"LaneColors":"#B65CFF,#FF5CA8,#39F07A,#25D6FF","UseGlow":"true","GlowStrength":"0.55","PulseTargets":"true","NoteBorderColor":"#E8C16A","NoteFillColor":"#071521","PerfectText":"PERFECT","GoodText":"GOOD","MissText":"MISS"}
 *
 * @param CharacterColors
 * @text Colores por personaje
 * @type struct<CharacterColorSettings>
 * @default {"Actor1Color":"#B65CFF","Actor1Variable":"0","Actor2Color":"#FF5CA8","Actor2Variable":"0","Actor3Color":"#39F07A","Actor3Variable":"0","Actor4Color":"#25D6FF","Actor4Variable":"0"}
 *
 * @param Audio
 * @text Sonidos
 * @type struct<AudioSettings>
 * @default {"HitSeName":"","HitSeVolume":"42","HitSePitch":"100","MissSeName":"","MissSeVolume":"35","MissSePitch":"100","StartSeVolume":"70","ConfirmSeVolume":"70","UseRpgDamageSe":"false","UseRpgAttackSe":"false"}
 *
 * @param BattleMotion
 * @text Acciones de batalla
 * @type struct<BattleMotionSettings>
 * @default {"EnableBattleMotion":"true","ActorAttackOnHit":"true","EnemyAttackOnMiss":"true","ActorMoveX":"-46","EnemyMoveX":"54","MoveY":"0","MotionFrames":"18","EnemyDamageFlash":"true","ActorDamageFlash":"true","EnemyAttackCooldown":"12","UseSvAttackMotion":"true","PartyVictoryMotion":"true"}
 *
 * @param Text
 * @text Textos
 * @type struct<TextSettings>
 * @default {"Ready":"¿Lista la resonancia?","Victory":"Victoria","Defeat":"Derrota","Result":"Resultado","Press":"Presiona OK","Chain":"CHAIN","EnemyHp":"ENEMY HP","PartyHp":"PARTY HP","BattlePower":"BATTLE POWER","Accuracy":"PRECISIÓN","Perfect":"PERFECT","Good":"GOOD","Miss":"MISS"}
 */

/*~struct~GeneralSettings:
 * @param ReferenceWidth
 * @text Ancho referencia
 * @type number
 * @default 1920
 *
 * @param ReferenceHeight
 * @text Alto referencia
 * @type number
 * @default 1080
 *
 * @param DimBackground
 * @text Oscurecer fondo
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param BackgroundOpacity
 * @text Opacidad fondo oscuro
 * @type number
 * @min 0
 * @max 255
 * @default 128
 *
 * @param ShowMapSnapshot
 * @text Mostrar fondo del mapa
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ShowBattlers
 * @text Mostrar battlers
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ReturnBgm
 * @text Restaurar música al salir
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 */

/*~struct~GameplaySettings:
 * @param ComboDamageBonus
 * @text Bonus de daño por Chain
 * @type number
 * @default 5
 *
 * @param PerfectMultiplier
 * @text Multiplicador Perfect
 * @type number
 * @decimals 2
 * @default 1.5
 *
 * @param MissDamagePercent
 * @text Daño por fallo %
 * @type number
 * @decimals 2
 * @default 5
 *
 * @param DamageRealActorHp
 * @text Aplicar daño real a actores
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 * @desc OFF sólo afecta el HUD de esta escena. ON también baja el HP real de los actores.
 *
 * @param GoodWindowFrames
 * @text Ventana Good
 * @type number
 * @min 1
 * @default 12
 *
 * @param PerfectWindowFrames
 * @text Ventana Perfect
 * @type number
 * @min 1
 * @default 5
 *
 * @param StartDelayBeats
 * @text Beats antes de iniciar
 * @type number
 * @min 0
 * @default 4
 *
 * @param MinNoteGapFrames
 * @text Separación mínima notas
 * @type number
 * @min 0
 * @default 18
 *
 * @param EndWhenEnemyDefeated
 * @text Terminar al derrotar enemigo
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 * @desc Si está OFF, la canción termina al acabar las notas para evitar victoria inmediata.
 *
 * @param TargetAccuracyWin
 * @text Precisión mínima para ganar
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.65
 * @desc Si el enemigo no cae, esta precisión permite ganar por desempeño.
 */


/*~struct~MusicSettings:
 * @param DefaultBgm
 * @text Música BGM por defecto
 * @type file
 * @dir audio/bgm/
 * @default
 * @desc Si el comando no indica música, se usa esta. Si también está vacío, usa la música de batalla del sistema.
 *
 * @param Volume
 * @text Volumen
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param BgmBoostPercent
 * @text Volumen extra BGM %
 * @type number
 * @min 50
 * @max 200
 * @default 120
 * @desc 100 = normal. Sube la ganancia real de la BGM después de reproducirla. Si distorsiona, bájalo.
 *
 * @param Pitch
 * @text Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param Pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param Seconds
 * @text Segundos por defecto
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 * @desc 0 intenta usar canción completa. Mayor a 0 usa sólo esa duración.
 *
 * @param FadeOutSeconds
 * @text Fade out al salir
 * @type number
 * @decimals 2
 * @min 0
 * @default 0.75
 *
 * @param TryDetectFullLength
 * @text Detectar duración completa
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 * @desc Si está ON y Seconds=0, intenta leer la duración total del BGM.
 */


/*~struct~ChartSettings:
 * @param Folder
 * @text Carpeta de charts
 * @type string
 * @default data/rhythm_charts/
 * @desc Carpeta relativa al proyecto.
 *
 * @param DefaultChartMode
 * @text Modo Chart por defecto
 * @type select
 * @option Automático
 * @value auto
 * @option Manual JSON
 * @value manual
 * @default auto
 *
 * @param DefaultChartFile
 * @text Chart por defecto
 * @type file
 * @dir data/rhythm_charts/
 * @default
 *
 * @param ChartOffsetSeconds
 * @text Offset Chart segundos
 * @type number
 * @decimals 3
 * @min -10
 * @max 10
 * @default 0
 *
 * @param UseChartBpm
 * @text Usar BPM del chart
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 */

/*~struct~RhythmSettings:
 * @param NoteDensity
 * @text Densidad de notas %
 * @type number
 * @min 1
 * @max 100
 * @default 82
 * @desc Probabilidad de poner nota en cada pulso base.
 *
 * @param RestChance
 * @text Chance de silencio %
 * @type number
 * @min 0
 * @max 100
 * @default 8
 * @desc Probabilidad de dejar un pulso vacío.
 *
 * @param SubBeatChance
 * @text Chance de nota intermedia %
 * @type number
 * @min 0
 * @max 100
 * @default 28
 * @desc Probabilidad de agregar nota entre pulsos, tipo corchea.
 *
 * @param DoubleNoteChance
 * @text Chance de nota doble %
 * @type number
 * @min 0
 * @max 100
 * @default 16
 * @desc Probabilidad de poner dos notas simultáneas en carriles distintos.
 *
 * @param TripleNoteChance
 * @text Chance de nota triple %
 * @type number
 * @min 0
 * @max 100
 * @default 3
 * @desc Probabilidad de poner tres notas simultáneas si hay suficientes carriles.
 *
 * @param MaxSimultaneous
 * @text Máximo simultáneas
 * @type number
 * @min 1
 * @max 4
 * @default 2
 *
 * @param RandomOffsetFrames
 * @text Desfase aleatorio frames
 * @type number
 * @min 0
 * @max 30
 * @default 4
 * @desc Pequeño desplazamiento para que el chart no sea demasiado mecánico.
 *
 * @param UseDoubleNotes
 * @text Usar notas dobles
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param UseSubBeatNotes
 * @text Usar notas intermedias
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 */

/*~struct~LayoutSettings:
 * @param LaneStartX
 * @text Inicio carril X
 * @type number
 * @default 260
 *
 * @param TargetX
 * @text Objetivo X
 * @type number
 * @default 1450
 *
 * @param LaneY
 * @text Carril Y inicial
 * @type number
 * @default 360
 *
 * @param LaneSpacing
 * @text Separación carriles
 * @type number
 * @default 115
 *
 * @param LaneWidth
 * @text Ancho carril
 * @type number
 * @default 1100
 *
 * @param LaneHeight
 * @text Alto carril
 * @type number
 * @default 34
 *
 * @param LaneLeftFadeWidth
 * @text Fade izquierdo carril
 * @type number
 * @min 0
 * @max 800
 * @default 0
 *
 * @param LaneRightFadeWidth
 * @text Fade derecho carril
 * @type number
 * @min 0
 * @max 800
 * @default 260
 * @desc Ancho del degradado transparente antes de llegar al objetivo.
 *
 * @param NoteSize
 * @text Tamaño notas
 * @type number
 * @default 86
 *
 * @param TargetSize
 * @text Tamaño objetivos
 * @type number
 * @default 108
 *
 * @param EnemyX
 * @text Enemigo X
 * @type number
 * @default 360
 *
 * @param EnemyY
 * @text Enemigo Y
 * @type number
 * @default 650
 *
 * @param ActorX
 * @text Actor X
 * @type number
 * @default 1680
 *
 * @param ActorY
 * @text Actor Y
 * @type number
 * @default 370
 *
 * @param ActorSpacing
 * @text Separación actores
 * @type number
 * @default 112
 *
 * @param PhaseX
 * @text Fase X
 * @type number
 * @default 960
 *
 * @param PhaseY
 * @text Fase Y
 * @type number
 * @default 392
 */

/*~struct~HudSettings:
 *
 * @param EnemyHudX
 * @text Enemy HUD X
 * @type number
 * @default 70
 *
 * @param EnemyHudY
 * @text Enemy HUD Y
 * @type number
 * @default 900
 *
 * @param PartyHudX
 * @text Party HUD X
 * @type number
 * @default 1480
 *
 * @param PartyHudY
 * @text Party HUD Y
 * @type number
 * @default 830
 *
 * @param PartyIconMode
 * @text Icono Party HUD
 * @type select
 * @option Faces de actores
 * @value face
 * @option Sin icono
 * @value none
 * @option Círculo de color
 * @value circle
 * @default face
 * @desc Elige si el panel de party muestra faces, nada o los círculos de color anteriores.
 *
 * @param PartyFaceSize
 * @text Tamaño face Party
 * @type number
 * @min 24
 * @max 72
 * @default 42
 *
 * @param ComboX
 * @text Chain X
 * @type number
 * @default 1460
 *
 * @param ComboY
 * @text Chain Y
 * @type number
 * @default 70
 *
 * @param JudgeX
 * @text Juicio X
 * @type number
 * @default 960
 *
 * @param JudgeY
 * @text Juicio Y
 * @type number
 * @default 250
 *
 * @param PanelOpacity
 * @text Opacidad paneles
 * @type number
 * @min 0
 * @max 255
 * @default 185
 *
 * @param GoldColor
 * @text Color dorado
 * @type string
 * @default #E8C16A
 *
 * @param TextColor
 * @text Color texto
 * @type string
 * @default #FFF6D6
 *
 * @param ShowBattlePower
 * @text Mostrar BP en Chain
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 * @desc BP es Battle Power, un puntaje interno. Por defecto se oculta para limpiar el HUD.
 *
 * @param ShowTimer
 * @text Mostrar tiempo restante
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 */

/*~struct~StyleSettings:
 * @param LaneColors
 * @text Colores carriles
 * @type string
 * @default #B65CFF,#FF5CA8,#39F07A,#25D6FF
 *
 * @param UseGlow
 * @text Usar glow
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param GlowStrength
 * @text Fuerza glow
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.55
 *
 * @param PulseTargets
 * @text Pulso en objetivos
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param NoteBorderColor
 * @text Borde de nota
 * @type string
 * @default #E8C16A
 *
 * @param NoteFillColor
 * @text Fondo de nota
 * @type string
 * @default #071521
 *
 * @param PerfectText
 * @text Texto Perfect
 * @type string
 * @default PERFECT
 *
 * @param GoodText
 * @text Texto Good
 * @type string
 * @default GOOD
 *
 * @param MissText
 * @text Texto Miss
 * @type string
 * @default MISS
 */


/*~struct~CharacterColorSettings:
 * @param Actor1Color
 * @text Color personaje 1
 * @type string
 * @default #B65CFF
 * @desc Nymphi recomendado: morado.
 *
 * @param Actor1Variable
 * @text Variable color personaje 1
 * @type variable
 * @default 0
 * @desc Si la variable contiene un color #RRGGBB, reemplaza el color fijo.
 *
 * @param Actor2Color
 * @text Color personaje 2
 * @type string
 * @default #FF5CA8
 * @desc Yoss recomendado: rosa.
 *
 * @param Actor2Variable
 * @text Variable color personaje 2
 * @type variable
 * @default 0
 * @desc Si la variable contiene un color #RRGGBB, reemplaza el color fijo.
 *
 * @param Actor3Color
 * @text Color personaje 3
 * @type string
 * @default #39F07A
 *
 * @param Actor3Variable
 * @text Variable color personaje 3
 * @type variable
 * @default 0
 *
 * @param Actor4Color
 * @text Color personaje 4
 * @type string
 * @default #25D6FF
 *
 * @param Actor4Variable
 * @text Variable color personaje 4
 * @type variable
 * @default 0
 */


/*~struct~AudioSettings:
 * @param HitSeName
 * @text SE acierto
 * @type file
 * @dir audio/se/
 * @default
 * @desc Vacío usa el sonido Cursor del sistema con el volumen indicado.
 *
 * @param HitSeVolume
 * @text Volumen SE acierto
 * @type number
 * @min 0
 * @max 100
 * @default 42
 *
 * @param HitSePitch
 * @text Pitch SE acierto
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param MissSeName
 * @text SE fallo
 * @type file
 * @dir audio/se/
 * @default
 * @desc Vacío usa el sonido Buzzer del sistema con el volumen indicado.
 *
 * @param MissSeVolume
 * @text Volumen SE fallo
 * @type number
 * @min 0
 * @max 100
 * @default 35
 *
 * @param MissSePitch
 * @text Pitch SE fallo
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param StartSeVolume
 * @text Volumen SE inicio
 * @type number
 * @min 0
 * @max 100
 * @default 70
 *
 * @param ConfirmSeVolume
 * @text Volumen SE confirmar
 * @type number
 * @min 0
 * @max 100
 * @default 70
 *
 * @param UseRpgDamageSe
 * @text Usar SE daño RPG Maker
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 * @desc Si está ON, performDamage reproduce el sonido de daño normal. Déjalo OFF si el golpe suena muy fuerte.
 *
 * @param UseRpgAttackSe
 * @text Usar SE ataque RPG Maker
 * @type boolean
 * @on Sí
 * @off No
 * @default false
 * @desc Reserva para sonidos de ataque del sistema. Por defecto OFF para que no duplique sonidos.
 */

/*~struct~BattleMotionSettings:
 * @param EnableBattleMotion
 * @text Usar acciones visuales
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ActorAttackOnHit
 * @text Actor ataca al acertar
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param EnemyAttackOnMiss
 * @text Boss ataca al fallar
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ActorMoveX
 * @text Movimiento actor X
 * @type number
 * @min -200
 * @max 200
 * @default -46
 * @desc Negativo mueve al actor hacia la izquierda, útil si la party está a la derecha.
 *
 * @param EnemyMoveX
 * @text Movimiento boss X
 * @type number
 * @min -200
 * @max 200
 * @default 54
 * @desc Positivo mueve al boss hacia la derecha, útil si el boss está a la izquierda.
 *
 * @param MoveY
 * @text Movimiento Y
 * @type number
 * @min -120
 * @max 120
 * @default 0
 *
 * @param MotionFrames
 * @text Frames de acción
 * @type number
 * @min 4
 * @max 60
 * @default 18
 *
 * @param EnemyDamageFlash
 * @text Flash daño boss
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param ActorDamageFlash
 * @text Flash daño actor
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 *
 * @param EnemyAttackCooldown
 * @text Cooldown ataque boss
 * @type number
 * @min 0
 * @max 60
 * @default 12
 * @desc Evita que el boss ataque demasiadas veces en el mismo instante si fallas dobles.
 *
 * @param UseSvAttackMotion
 * @text Usar motion SV actor
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 * @desc Si el actor usa battler lateral, solicita motion attack al acertar.
 *
 * @param PartyVictoryMotion
 * @text Party celebra al ganar
 * @type boolean
 * @on Sí
 * @off No
 * @default true
 * @desc Al ganar solicita motion victory como una batalla normal.
 */

/*~struct~TextSettings:
 * @param Ready
 * @text Ready
 * @type string
 * @default ¿Lista la resonancia?
 *
 * @param Victory
 * @text Victoria
 * @type string
 * @default Victoria
 *
 * @param Defeat
 * @text Derrota
 * @type string
 * @default Derrota
 *
 * @param Result
 * @text Resultado
 * @type string
 * @default Resultado
 *
 * @param Press
 * @text Presionar
 * @type string
 * @default Presiona OK
 *
 *
 * @param Chain
 * @text Chain
 * @type string
 * @default CHAIN
 *
 * @param EnemyHp
 * @text Enemy HP
 * @type string
 * @default ENEMY HP
 *
 * @param PartyHp
 * @text Party HP
 * @type string
 * @default PARTY HP
 *
 * @param BattlePower
 * @text Battle Power
 * @type string
 * @default BATTLE POWER
 *
 *
 * @param Accuracy
 * @text Precisión
 * @type string
 * @default PRECISIÓN
 *
 * @param Perfect
 * @text Perfect
 * @type string
 * @default PERFECT
 *
 * @param Good
 * @text Good
 * @type string
 * @default GOOD
 *
 * @param Miss
 * @text Miss
 * @type string
 * @default MISS
 */

(() => {
    "use strict";

    const pluginName = "Dex_RhythmBattleMZ";
    const raw = PluginManager.parameters(pluginName);

    const parseStruct = (value, fallback = {}) => {
        try { return value ? JSON.parse(value) : fallback; }
        catch (e) { console.warn(`[${pluginName}] Struct inválido`, e); return fallback; }
    };

    const num = (v, f = 0) => Number.isFinite(Number(v)) ? Number(v) : f;
    const str = (v, f = "") => v !== undefined && v !== null ? String(v) : f;
    const bool = (v, f = false) => v === undefined || v === null || v === "" ? f : String(v).toLowerCase() === "true";
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const audioName = value => str(value, "").replace(/^.*[\\\/]/, "").replace(/\.(ogg|m4a|mp3|wav)$/i, "");
    const cleanDataFolder = value => str(value, "data/rhythm_charts/")
        .replace(/\\/g, "/")
        .replace(/^\/?/, "")
        .replace(/\/?$/, "/");
    const chartName = value => str(value, "")
        .replace(/^.*[\\\/]/, "")
        .replace(/\.json$/i, "");

    const Gen = parseStruct(raw.General);
    const Game = parseStruct(raw.Gameplay);
    const Music = parseStruct(raw.Music);
    const Chart = parseStruct(raw.Chart);
    const Rhythm = parseStruct(raw.Rhythm);
    const Lay = parseStruct(raw.Layout);
    const Hud = parseStruct(raw.HUD);
    const Sty = parseStruct(raw.Style);
    const Col = parseStruct(raw.CharacterColors);
    const Aud = parseStruct(raw.Audio);
    const Mot = parseStruct(raw.BattleMotion);
    const Txt = parseStruct(raw.Text);

    const P = {
        refW: num(Gen.ReferenceWidth, 1920),
        refH: num(Gen.ReferenceHeight, 1080),
        dimBackground: bool(Gen.DimBackground, true),
        bgOpacity: clamp(num(Gen.BackgroundOpacity, 128), 0, 255),
        showMapSnapshot: bool(Gen.ShowMapSnapshot, true),
        showBattlers: bool(Gen.ShowBattlers, true),
        returnBgm: bool(Gen.ReturnBgm, true),

        musicName: audioName(Music.DefaultBgm || ""),
        musicVolume: clamp(num(Music.Volume, 90), 0, 100),
        bgmBoostPercent: clamp(num(Music.BgmBoostPercent, 120), 50, 200),
        musicPitch: clamp(num(Music.Pitch, 100), 50, 150),
        musicPan: clamp(num(Music.Pan, 0), -100, 100),
        musicSeconds: Math.max(0, num(Music.Seconds, 0)),
        fadeOutSeconds: Math.max(0, num(Music.FadeOutSeconds, 0.75)),
        tryDetectFullLength: bool(Music.TryDetectFullLength, true),

        chartFolder: cleanDataFolder(Chart.Folder),
        defaultChartMode: str(Chart.DefaultChartMode, "auto"),
        defaultChartFile: chartName(Chart.DefaultChartFile || ""),
        chartOffsetSeconds: num(Chart.ChartOffsetSeconds, 0),
        useChartBpm: bool(Chart.UseChartBpm, true),

        noteDensity: clamp(num(Rhythm.NoteDensity, 82), 1, 100) / 100,
        restChance: clamp(num(Rhythm.RestChance, 8), 0, 100) / 100,
        subBeatChance: clamp(num(Rhythm.SubBeatChance, 28), 0, 100) / 100,
        doubleNoteChance: clamp(num(Rhythm.DoubleNoteChance, 16), 0, 100) / 100,
        tripleNoteChance: clamp(num(Rhythm.TripleNoteChance, 3), 0, 100) / 100,
        maxSimultaneous: clamp(num(Rhythm.MaxSimultaneous, 2), 1, 4),
        randomOffsetFrames: clamp(num(Rhythm.RandomOffsetFrames, 4), 0, 30),
        useDoubleNotes: bool(Rhythm.UseDoubleNotes, true),
        useSubBeatNotes: bool(Rhythm.UseSubBeatNotes, true),

        comboDamageBonus: num(Game.ComboDamageBonus, num(Game.ChainBonus, 5)),
        perfectMultiplier: num(Game.PerfectMultiplier, num(Game.CriticalMultiplier, 1.5)),
        missDamagePercent: num(Game.MissDamagePercent, 5),
        damageRealActorHp: bool(Game.DamageRealActorHp, false),
        goodWindow: Math.max(1, num(Game.GoodWindowFrames, 12)),
        perfectWindow: Math.max(1, num(Game.PerfectWindowFrames, num(Game.CriticalWindowFrames, 5))),
        startDelayBeats: Math.max(0, num(Game.StartDelayBeats, 4)),
        minNoteGap: Math.max(0, num(Game.MinNoteGapFrames, 18)),
        endWhenEnemyDefeated: bool(Game.EndWhenEnemyDefeated, false),
        targetAccuracyWin: clamp(num(Game.TargetAccuracyWin, 0.65), 0, 1),

        laneStartX: num(Lay.LaneStartX, 260),
        targetX: num(Lay.TargetX, 1450),
        laneY: num(Lay.LaneY, 360),
        laneSpacing: num(Lay.LaneSpacing, 115),
        laneWidth: num(Lay.LaneWidth, 1100),
        laneHeight: num(Lay.LaneHeight, 34),
        laneLeftFadeWidth: clamp(num(Lay.LaneLeftFadeWidth, 0), 0, 800),
        laneRightFadeWidth: clamp(num(Lay.LaneRightFadeWidth, 260), 0, 800),
        noteSize: num(Lay.NoteSize, 86),
        targetSize: num(Lay.TargetSize, 108),
        enemyX: num(Lay.EnemyX, 360),
        enemyY: num(Lay.EnemyY, 650),
        actorX: num(Lay.ActorX, 1680),
        actorY: num(Lay.ActorY, 370),
        actorSpacing: num(Lay.ActorSpacing, 112),
        phaseX: num(Lay.PhaseX, 960),
        phaseY: num(Lay.PhaseY, 392),

        enemyHudX: num(Hud.EnemyHudX, 70),
        enemyHudY: num(Hud.EnemyHudY, 900),
        partyHudX: num(Hud.PartyHudX, 1480),
        partyHudY: num(Hud.PartyHudY, 830),
        partyIconMode: str(Hud.PartyIconMode, "face"),
        partyFaceSize: clamp(num(Hud.PartyFaceSize, 42), 24, 72),
        comboX: num(Hud.ComboX, 1460),
        comboY: num(Hud.ComboY, 70),
        judgeX: num(Hud.JudgeX, 960),
        judgeY: num(Hud.JudgeY, 250),
        panelOpacity: clamp(num(Hud.PanelOpacity, 185), 0, 255),
        goldColor: str(Hud.GoldColor, "#E8C16A"),
        textColor: str(Hud.TextColor, "#FFF6D6"),
        showBattlePower: bool(Hud.ShowBattlePower, false),
        showTimer: bool(Hud.ShowTimer, true),

        laneColors: str(Sty.LaneColors, "#B65CFF,#FF5CA8,#39F07A,#25D6FF").split(/[,;|]/).map(s => s.trim()).filter(Boolean),
        actorColors: [
            str(Col.Actor1Color, "#B65CFF"),
            str(Col.Actor2Color, "#FF5CA8"),
            str(Col.Actor3Color, "#39F07A"),
            str(Col.Actor4Color, "#25D6FF")
        ],
        actorColorVariables: [
            num(Col.Actor1Variable, 0),
            num(Col.Actor2Variable, 0),
            num(Col.Actor3Variable, 0),
            num(Col.Actor4Variable, 0)
        ],

        hitSeName: audioName(Aud.HitSeName || ""),
        hitSeVolume: clamp(num(Aud.HitSeVolume, 42), 0, 100),
        hitSePitch: clamp(num(Aud.HitSePitch, 100), 50, 150),
        missSeName: audioName(Aud.MissSeName || ""),
        missSeVolume: clamp(num(Aud.MissSeVolume, 35), 0, 100),
        missSePitch: clamp(num(Aud.MissSePitch, 100), 50, 150),
        startSeVolume: clamp(num(Aud.StartSeVolume, 70), 0, 100),
        confirmSeVolume: clamp(num(Aud.ConfirmSeVolume, 70), 0, 100),
        useRpgDamageSe: bool(Aud.UseRpgDamageSe, false),
        useRpgAttackSe: bool(Aud.UseRpgAttackSe, false),

        enableBattleMotion: bool(Mot.EnableBattleMotion, true),
        actorAttackOnHit: bool(Mot.ActorAttackOnHit, true),
        enemyAttackOnMiss: bool(Mot.EnemyAttackOnMiss, true),
        actorMoveX: num(Mot.ActorMoveX, -46),
        enemyMoveX: num(Mot.EnemyMoveX, 54),
        battleMoveY: num(Mot.MoveY, 0),
        battleMotionFrames: clamp(num(Mot.MotionFrames, 18), 4, 60),
        enemyDamageFlash: bool(Mot.EnemyDamageFlash, true),
        actorDamageFlash: bool(Mot.ActorDamageFlash, true),
        enemyAttackCooldown: clamp(num(Mot.EnemyAttackCooldown, 12), 0, 60),
        useSvAttackMotion: bool(Mot.UseSvAttackMotion, true),
        partyVictoryMotion: bool(Mot.PartyVictoryMotion, true),
        useGlow: bool(Sty.UseGlow, true),
        glowStrength: clamp(num(Sty.GlowStrength, 0.55), 0, 1),
        pulseTargets: bool(Sty.PulseTargets, true),
        noteBorderColor: str(Sty.NoteBorderColor, "#E8C16A"),
        noteFillColor: str(Sty.NoteFillColor, "#071521"),
        perfectText: str(Sty.PerfectText, str(Sty.CriticalText, "PERFECT")),
        goodText: str(Sty.GoodText, "GOOD"),
        missText: str(Sty.MissText, "MISS"),

        ready: str(Txt.Ready, "¿Lista la resonancia?"),
        victory: str(Txt.Victory, "Victoria"),
        defeat: str(Txt.Defeat, "Derrota"),
        result: str(Txt.Result, "Resultado"),
        press: str(Txt.Press, "Presiona OK"),
        chain: str(Txt.Chain, "CHAIN"),
        enemyHp: str(Txt.EnemyHp, "ENEMY HP"),
        partyHp: str(Txt.PartyHp, "PARTY HP"),
        battlePower: str(Txt.BattlePower, "BATTLE POWER"),
        accuracy: str(Txt.Accuracy, "PRECISIÓN"),
        perfectLabel: str(Txt.Perfect, "PERFECT"),
        goodLabel: str(Txt.Good, "GOOD"),
        missLabel: str(Txt.Miss, "MISS")
    };

    const KEY_TYPES = [
        { label: "Z", symbol: "Z", aliases: ["OK", "ENTER"], inputs: ["ok"] },
        { label: "X", symbol: "X", aliases: ["CANCEL", "ESC"], inputs: ["cancel"] },
        { label: "UP", symbol: "▲", aliases: ["ARRIBA"], inputs: ["up"] },
        { label: "RIGHT", symbol: "▶", aliases: ["DERECHA"], inputs: ["right"] },
        { label: "LEFT", symbol: "◀", aliases: ["IZQUIERDA"], inputs: ["left"] },
        { label: "DOWN", symbol: "▼", aliases: ["ABAJO"], inputs: ["down"] }
    ];

    const modePool = mode => {
        switch (String(mode || "simple4")) {
            case "simple4": return [0, 1, 2, 5];
            default: return [0, 1, 2, 3, 4, 5];
        }
    };

    const parseSequence = (sequence, pool) => {
        const text = String(sequence || "").trim();
        if (!text) return [];
        const out = [];
        for (const part of text.split(/[,;|\s]+/).filter(Boolean)) {
            const upper = part.toUpperCase();
            let index = KEY_TYPES.findIndex(k => k.label === upper || k.symbol === upper || (k.aliases && k.aliases.includes(upper)));
            if (index < 0 && /^\d+$/.test(part)) index = Number(part);
            if (index >= 0 && index < KEY_TYPES.length) out.push(index);
        }
        return out;
    };

    const triggeredForType = type => {
        const data = KEY_TYPES[type];
        return !!data && data.inputs.some(symbol => Input.isTriggered(symbol));
    };

    const anyStartTriggered = () => {
        return Input.isTriggered("ok") || Input.isTriggered("cancel") ||
            Input.isTriggered("up") || Input.isTriggered("down") ||
            Input.isTriggered("left") || Input.isTriggered("right") ||
            TouchInput.isTriggered();
    };

    const hexToRgb = color => {
        const c = String(color || "#FFFFFF").trim();
        const m = /^#?([0-9a-f]{6})$/i.exec(c);
        if (!m) return [255, 255, 255];
        const n = parseInt(m[1], 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const rgba = (color, alpha) => {
        const [r, g, b] = hexToRgb(color);
        return `rgba(${r},${g},${b},${alpha})`;
    };

    const normalizeHexColor = value => {
        const text = String(value || "").trim();
        const m = /^#?([0-9a-f]{6})$/i.exec(text);
        return m ? `#${m[1].toUpperCase()}` : "";
    };

    const variableColor = (variableId, fallback) => {
        const id = Number(variableId || 0);
        if (!id || !$gameVariables) return fallback;
        const value = $gameVariables.value(id);
        const fromString = normalizeHexColor(value);
        if (fromString) return fromString;
        if (Number.isFinite(Number(value)) && Number(value) > 0) {
            const n = Math.floor(Number(value));
            if (n >= 0 && n <= 0xFFFFFF) return `#${n.toString(16).padStart(6, "0").toUpperCase()}`;
        }
        return fallback;
    };

    const touchBitmap = bitmap => {
        if (bitmap && bitmap.baseTexture && bitmap.baseTexture.update) bitmap.baseTexture.update();
        else if (bitmap && bitmap._baseTexture && bitmap._baseTexture.update) bitmap._baseTexture.update();
    };

    const rr = (ctx, x, y, w, h, r) => {
        const radius = Math.max(0, Math.min(r, w / 2, h / 2));
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };

    const fillRound = (bitmap, x, y, w, h, r, fill, stroke = null, lineWidth = 1) => {
        const ctx = bitmap.context;
        ctx.save();
        rr(ctx, x, y, w, h, r);
        ctx.fillStyle = fill;
        ctx.fill();
        if (stroke) {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }
        ctx.restore();
        touchBitmap(bitmap);
    };

    const drawCircle = (bitmap, x, y, r, fill, stroke = null, lineWidth = 1) => {
        const ctx = bitmap.context;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        }
        if (stroke) {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }
        ctx.restore();
        touchBitmap(bitmap);
    };

    const drawActorFace = (bitmap, actor, x, y, size, color) => {
        fillRound(bitmap, x - 2, y - 2, size + 4, size + 4, 10, rgba(color, 0.24), rgba(color, 0.95), 2);

        if (actor && actor.faceName && actor.faceName()) {
            const face = ImageManager.loadFace(actor.faceName());
            if (face && face.isReady()) {
                const fw = ImageManager.faceWidth || 144;
                const fh = ImageManager.faceHeight || 144;
                const index = actor.faceIndex ? actor.faceIndex() : 0;
                const sx = (index % 4) * fw;
                const sy = Math.floor(index / 4) * fh;
                bitmap.blt(face, sx, sy, fw, fh, x, y, size, size);
            } else {
                fillRound(bitmap, x, y, size, size, 8, "rgba(0,0,0,0.35)", rgba(color, 0.55), 1);
            }
        } else {
            fillRound(bitmap, x, y, size, size, 8, "rgba(0,0,0,0.35)", rgba(color, 0.55), 1);
        }

        fillRound(bitmap, x - 2, y - 2, size + 4, size + 4, 10, "rgba(0,0,0,0)", rgba(color, 0.95), 2);
    };

    const drawLine = (bitmap, x1, y1, x2, y2, color, width) => {
        const ctx = bitmap.context;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
        touchBitmap(bitmap);
    };

    const drawGradientLine = (bitmap, x1, y1, x2, y2, color, width, alpha, leftFade, rightFade) => {
        const ctx = bitmap.context;
        const len = Math.max(1, Math.abs(x2 - x1));
        const leftStop = clamp((leftFade || 0) / len, 0, 0.95);
        const rightStop = clamp(1 - (rightFade || 0) / len, 0.05, 1);
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);

        if (leftFade > 0) {
            grad.addColorStop(0, rgba(color, 0));
            grad.addColorStop(leftStop, rgba(color, alpha));
        } else {
            grad.addColorStop(0, rgba(color, alpha));
        }

        if (rightFade > 0) {
            grad.addColorStop(Math.max(leftStop, rightStop), rgba(color, alpha));
            grad.addColorStop(1, rgba(color, 0));
        } else {
            grad.addColorStop(1, rgba(color, alpha));
        }

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
        touchBitmap(bitmap);
    };

    const systemSe = index => {
        const se = $dataSystem && $dataSystem.sounds ? $dataSystem.sounds[index] : null;
        return se ? Object.assign({}, se) : null;
    };

    const playSeConfigured = (name, volume, pitch, fallbackIndex) => {
        const cleanName = audioName(name || "");
        let se = cleanName ? { name: cleanName, volume: volume, pitch: pitch, pan: 0 } : systemSe(fallbackIndex);
        if (!se || !se.name) return;
        se = Object.assign({}, se);
        se.volume = clamp(volume, 0, 100);
        se.pitch = clamp(pitch || se.pitch || 100, 50, 150);
        se.pan = num(se.pan, 0);
        AudioManager.playSe(se);
    };

    const withMutedSystemSe = fn => {
        if (!fn) return;
        const oldPlaySe = AudioManager.playSe;
        AudioManager.playSe = function(se) {
            if (!P.useRpgDamageSe && se && se.name) return;
            oldPlaySe.call(this, se);
        };
        try {
            fn();
        } finally {
            AudioManager.playSe = oldPlaySe;
        }
    };

    const drawDiamond = (bitmap, x, y, r, fill, stroke, lineWidth) => {
        const ctx = bitmap.context;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y - r);
        ctx.lineTo(x + r, y);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x - r, y);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.restore();
        touchBitmap(bitmap);
    };

    PluginManager.registerCommand(pluginName, "IniciarBatallaRitmica", args => {
        $gameSystem._dexRhythmBattle = {
            enemyId: clamp(num(args.enemyID, 1), 1, $dataEnemies.length - 1),
            bpm: clamp(num(args.bpm, 120), 20, 300),
            beats: clamp(num(args.beats, 48), 4, 256),
            approachBeats: clamp(num(args.approachBeats, 4), 1, 12),
            inputMode: str(args.inputMode, "simple4"),
            sequence: str(args.sequence, ""),
            randomTempo: bool(args.randomTempo, false),
            animationId: clamp(num(args.animationID, 1), 1, $dataAnimations.length - 1),
            winSwitch: num(args.winSwitch, 0),
            scoreVariable: num(args.scoreVariable, 0),
            musicName: audioName(args.musicName || P.musicName),
            musicVolume: clamp(num(args.musicVolume, P.musicVolume), 0, 100),
            musicBoostPercent: clamp(num(args.musicBoostPercent, P.bgmBoostPercent), 50, 200),
            musicPitch: clamp(num(args.musicPitch, P.musicPitch), 50, 150),
            musicPan: clamp(num(args.musicPan, P.musicPan), -100, 100),
            musicSeconds: Math.max(0, num(args.musicSeconds, P.musicSeconds)),
            fadeOutSeconds: Math.max(0, num(args.fadeOutSeconds, P.fadeOutSeconds)),
            chartMode: str(args.chartMode || P.defaultChartMode, "auto"),
            chartFile: chartName(args.chartFile || P.defaultChartFile),
            chartOffsetSeconds: num(args.chartOffsetSeconds, P.chartOffsetSeconds),
            chartUseBpm: bool(args.chartUseBpm, P.useChartBpm)
        };
        SceneManager.push(Scene_DexRhythmBattle);
    });

    function Sprite_DexRhythmNote() {
        this.initialize(...arguments);
    }

    Sprite_DexRhythmNote.prototype = Object.create(Sprite.prototype);
    Sprite_DexRhythmNote.prototype.constructor = Sprite_DexRhythmNote;

    Sprite_DexRhythmNote.prototype.initialize = function(type, color, size, spawnFrame, hitFrame, x1, x2, y) {
        Sprite.prototype.initialize.call(this, this.makeBitmap(type, color, size));
        this.type = type;
        this.spawnFrame = spawnFrame;
        this.hitFrame = hitFrame;
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
        this.hit = false;
        this.missed = false;
        this.anchor.set(0.5);
        this.visible = false;
        this.opacity = 0;
        this._baseScale = 1;
    };

    Sprite_DexRhythmNote.prototype.makeBitmap = function(type, color, size) {
        const pad = Math.round(size * 0.25);
        const w = size + pad * 2;
        const b = new Bitmap(w, w);
        const c = w / 2;
        const r = size / 2;
        const glowAlpha = P.useGlow ? 0.22 + P.glowStrength * 0.24 : 0.08;

        drawCircle(b, c, c, r + 17, rgba(color, glowAlpha), null, 0);
        drawCircle(b, c, c, r + 5, rgba(P.noteBorderColor, 0.96), rgba(P.noteBorderColor, 1), 3);
        drawCircle(b, c, c, r - 7, rgba(P.noteFillColor, 0.93), rgba(color, 1), 4);
        drawDiamond(b, c, c, r * 0.86, rgba(color, 0.10), rgba(color, 0.50), 2);

        b.fontFace = $gameSystem ? $gameSystem.mainFontFace() : "serif";
        b.fontSize = type >= 4 ? Math.round(size * 0.50) : Math.round(size * 0.46);
        b.textColor = "#FFFFFF";
        b.outlineColor = rgba(color, 1);
        b.outlineWidth = 5;
        b.drawText(KEY_TYPES[type].symbol, 0, Math.round(w * 0.25), w, Math.round(w * 0.55), "center");
        return b;
    };

    Sprite_DexRhythmNote.prototype.updateNote = function(frame) {
        const total = Math.max(1, this.hitFrame - this.spawnFrame);
        const rate = clamp((frame - this.spawnFrame) / total, 0, 1);
        this.x = this.x1 + (this.x2 - this.x1) * rate;
        this.visible = true;
        this.opacity = 255;
        const near = 1 - Math.min(1, Math.abs(frame - this.hitFrame) / 22);
        this.scale.set(this._baseScale + near * 0.08);
    };

    function Sprite_DexRhythmTarget() {
        this.initialize(...arguments);
    }

    Sprite_DexRhythmTarget.prototype = Object.create(Sprite.prototype);
    Sprite_DexRhythmTarget.prototype.constructor = Sprite_DexRhythmTarget;

    Sprite_DexRhythmTarget.prototype.initialize = function(color, size) {
        Sprite.prototype.initialize.call(this, new Bitmap(size + 64, size + 64));
        this._color = color;
        this._size = size;
        this._flash = 0;
        this.anchor.set(0.5);
        this.redraw();
    };

    Sprite_DexRhythmTarget.prototype.redraw = function() {
        const b = this.bitmap;
        b.clear();
        const c = b.width / 2;
        const r = this._size / 2;
        const pulse = this._flash / 20;
        drawCircle(b, c, c, r + 22, rgba(this._color, 0.12 + pulse * 0.18), null, 0);
        drawCircle(b, c, c, r + 7, "rgba(3,14,24,0.74)", rgba(P.goldColor, 0.95), 4);
        drawCircle(b, c, c, r - 7, "rgba(1,9,18,0.80)", rgba(this._color, 0.95), 5);
        drawCircle(b, c, c, r - 25, "rgba(0,0,0,0.05)", "rgba(255,255,255,0.40)", 2);
        drawDiamond(b, c, c, r * 0.22, "rgba(255,255,255,0.98)", rgba(this._color, 1), 3);
    };

    Sprite_DexRhythmTarget.prototype.hitFlash = function() {
        this._flash = 20;
        this.redraw();
    };

    Sprite_DexRhythmTarget.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (P.pulseTargets) {
            const s = 1 + Math.sin(Graphics.frameCount * 0.06) * 0.025;
            this.scale.set(s);
        }
        if (this._flash > 0) {
            this._flash--;
            this.redraw();
        }
    };

    function Scene_DexRhythmBattle() {
        this.initialize(...arguments);
    }

    Scene_DexRhythmBattle.prototype = Object.create(Scene_Base.prototype);
    Scene_DexRhythmBattle.prototype.constructor = Scene_DexRhythmBattle;

    Scene_DexRhythmBattle.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
        this._data = Object.assign({
            enemyId: 1,
            bpm: 120,
            beats: 48,
            approachBeats: 4,
            inputMode: "simple4",
            sequence: "",
            randomTempo: false,
            animationId: 1,
            winSwitch: 0,
            scoreVariable: 0,
            musicName: P.musicName,
            musicVolume: P.musicVolume,
            musicBoostPercent: P.bgmBoostPercent,
            musicPitch: P.musicPitch,
            musicPan: P.musicPan,
            musicSeconds: P.musicSeconds,
            fadeOutSeconds: P.fadeOutSeconds,
            chartMode: P.defaultChartMode,
            chartFile: P.defaultChartFile,
            chartOffsetSeconds: P.chartOffsetSeconds,
            chartUseBpm: P.useChartBpm
        }, $gameSystem._dexRhythmBattle || {});

        this._scale = Math.min(Graphics.width / P.refW, Graphics.height / P.refH);
        this._ox = Math.round((Graphics.width - P.refW * this._scale) / 2);
        this._oy = Math.round((Graphics.height - P.refH * this._scale) / 2);

        this._phase = "ready";
        this._frame = 0;
        this._score = 0;
        this._chain = 0;
        this._maxChain = 0;
        this._hits = 0;
        this._perfectHits = 0;
        this._goodHits = 0;
        this._misses = 0;
        this._judge = "";
        this._judgeTimer = 0;
        this._notes = [];
        this._chartBuilt = false;
        this._manualChartData = null;
        this._chartLoading = false;
        this._chartLoadError = "";
        this._musicStarted = false;
        this._playLimitFrames = 0;
        this._resultDone = false;
        this._enemyAttackCooldown = 0;
        this._missLaneCursor = 0;

        this._members = $gameParty.battleMembers();
        this._enemy = new Game_Enemy(this._data.enemyId, P.enemyX, P.enemyY);
        this._enemyHpMax = Math.max(1, this._enemy.mhp);
        this._enemyHp = this._enemyHpMax;
        this._memberHpMax = this._members.map(a => Math.max(1, a.mhp));
        this._memberHp = this._members.map(a => Math.max(0, a.hp));
        this._partyHpMax = Math.max(1, this._memberHpMax.reduce((s, value) => s + value, 0));
        this._partyHp = Math.max(1, this._memberHp.reduce((s, value) => s + value, 0));
        this._enemyBp = Math.floor((this._enemy.mhp / 20 + this._enemy.atk + this._enemy.mat + this._enemy.def + this._enemy.mdf) * 10);
        this._approachFrames = this.framesPerBeat() * this._data.approachBeats;
        this._startFrame = Math.round(this.framesPerBeat() * P.startDelayBeats);
        BattleManager.saveBgmAndBgs();
    };

    Scene_DexRhythmBattle.prototype.framesPerBeat = function() {
        return 3600 / Math.max(20, this._data.bpm);
    };

    Scene_DexRhythmBattle.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createRoot();
        if (P.showBattlers) this.createBattlers();
        this.createLanes();
        this.createNotesLayer();
        this.createTargets();
        this.createHudLayers();
        this.refreshHud();
        this.drawPhase(P.ready, P.press);
        this.startFadeIn(30, false);
    };

    Scene_DexRhythmBattle.prototype.createBackground = function() {
        if (P.showMapSnapshot) {
            this._back = new Sprite(SceneManager.backgroundBitmap());
            this.addChild(this._back);
        }
        if (P.dimBackground) {
            const b = new Bitmap(Graphics.width, Graphics.height);
            b.fillAll(`rgba(0,0,0,${P.bgOpacity / 255})`);
            this.addChild(new Sprite(b));
        }
    };

    Scene_DexRhythmBattle.prototype.createRoot = function() {
        this._root = new Sprite();
        this._root.x = this._ox;
        this._root.y = this._oy;
        this._root.scale.set(this._scale);
        this.addChild(this._root);
        this._fieldLayer = new Sprite();
        this._laneLayer = new Sprite();
        this._noteLayer = new Sprite();
        this._targetLayer = new Sprite();
        this._hudLayer = new Sprite();
        this._phaseLayer = new Sprite();
        this._root.addChild(this._fieldLayer);
        this._root.addChild(this._laneLayer);
        this._root.addChild(this._noteLayer);
        this._root.addChild(this._targetLayer);
        this._root.addChild(this._hudLayer);
        this._root.addChild(this._phaseLayer);
    };

    Scene_DexRhythmBattle.prototype.createBattlers = function() {
        this._enemySprite = new Sprite_Enemy(this._enemy);
        this._enemySprite.x = P.enemyX;
        this._enemySprite.y = P.enemyY;
        this.setupActionSprite(this._enemySprite, P.enemyX, P.enemyY);
        this._fieldLayer.addChild(this._enemySprite);
        this._actorSprites = [];
        for (let i = 0; i < this._members.length; i++) {
            const sp = new Sprite_Actor();
            sp.setBattler(this._members[i]);
            sp.setHome(P.actorX, P.actorY + P.actorSpacing * i);
            sp.x = P.actorX;
            sp.y = P.actorY + P.actorSpacing * i;
            this.setupActionSprite(sp, sp.x, sp.y);
            this._fieldLayer.addChild(sp);
            this._actorSprites.push(sp);
        }
    };

    Scene_DexRhythmBattle.prototype.setupActionSprite = function(sprite, x, y) {
        if (!sprite) return;
        sprite._dexBaseX = x;
        sprite._dexBaseY = y;
        sprite._dexActionTimer = 0;
        sprite._dexActionDuration = 0;
        sprite._dexMoveX = 0;
        sprite._dexMoveY = 0;
        sprite._dexFlashTimer = 0;
        sprite._dexFlashColor = [255, 255, 255, 0];
    };

    Scene_DexRhythmBattle.prototype.startActionMotion = function(sprite, dx, dy, frames, flashColor) {
        if (!P.enableBattleMotion || !sprite) return;
        if (sprite._dexBaseX === undefined) this.setupActionSprite(sprite, sprite.x, sprite.y);
        sprite._dexActionTimer = Math.max(1, frames || P.battleMotionFrames);
        sprite._dexActionDuration = sprite._dexActionTimer;
        sprite._dexMoveX = dx || 0;
        sprite._dexMoveY = dy || 0;

        if (flashColor && sprite.setBlendColor) {
            sprite._dexFlashTimer = Math.max(sprite._dexFlashTimer || 0, Math.floor((frames || P.battleMotionFrames) * 0.75));
            sprite._dexFlashColor = flashColor;
        }
    };

    Scene_DexRhythmBattle.prototype.updateActionSprite = function(sprite) {
        if (!sprite || sprite._dexBaseX === undefined) return;

        if (sprite._dexActionTimer > 0) {
            const duration = Math.max(1, sprite._dexActionDuration || P.battleMotionFrames);
            const passed = duration - sprite._dexActionTimer;
            const wave = Math.sin(Math.PI * clamp(passed / duration, 0, 1));
            sprite.x = sprite._dexBaseX + sprite._dexMoveX * wave;
            sprite.y = sprite._dexBaseY + sprite._dexMoveY * wave;
            sprite._dexActionTimer--;

            if (sprite._dexActionTimer <= 0) {
                sprite.x = sprite._dexBaseX;
                sprite.y = sprite._dexBaseY;
            }
        }

        if (sprite._dexFlashTimer > 0) {
            sprite._dexFlashTimer--;
            const a = Math.floor(160 * clamp(sprite._dexFlashTimer / Math.max(1, P.battleMotionFrames), 0, 1));
            const c = sprite._dexFlashColor || [255, 255, 255, 0];
            if (sprite.setBlendColor) sprite.setBlendColor([c[0], c[1], c[2], a]);
        } else if (sprite.setBlendColor) {
            sprite.setBlendColor([0, 0, 0, 0]);
        }
    };

    Scene_DexRhythmBattle.prototype.actorSpriteForLane = function(lane) {
        if (!this._actorSprites || this._actorSprites.length === 0) return null;
        return this._actorSprites[clamp(num(lane, 0), 0, this._actorSprites.length - 1)];
    };

    Scene_DexRhythmBattle.prototype.actorForLane = function(lane) {
        if (!this._members || this._members.length === 0) return null;
        return this._members[clamp(num(lane, 0), 0, this._members.length - 1)];
    };

    Scene_DexRhythmBattle.prototype.actorAttack = function(lane, perfect) {
        if (!P.enableBattleMotion || !P.actorAttackOnHit) return;
        const actor = this.actorForLane(lane);
        const sprite = this.actorSpriteForLane(lane);

        if (P.useSvAttackMotion && actor && actor.requestMotion) {
            actor.requestMotion("attack");
        }

        this.startActionMotion(sprite, P.actorMoveX, P.battleMoveY, P.battleMotionFrames, null);

        if (P.enemyDamageFlash && this._enemySprite) {
            const color = perfect ? [255, 236, 120, 255] : [255, 255, 255, 255];
            this.startActionMotion(this._enemySprite, 0, 0, Math.max(8, Math.floor(P.battleMotionFrames * 0.7)), color);
        }
    };

    Scene_DexRhythmBattle.prototype.pickMissLane = function() {
        const alive = [];
        for (let i = 0; i < this._memberHp.length; i++) {
            if ((this._memberHp[i] || 0) > 0) alive.push(i);
        }
        if (alive.length === 0) return 0;
        const lane = alive[this._missLaneCursor % alive.length];
        this._missLaneCursor++;
        return lane;
    };

    Scene_DexRhythmBattle.prototype.nearestPendingLane = function() {
        let best = null;
        let bestAbs = Infinity;
        for (const n of this._notes) {
            if (n.hit || n.missed || !n.visible) continue;
            const abs = Math.abs(this._frame - n.hitFrame);
            if (abs < bestAbs) {
                best = n;
                bestAbs = abs;
            }
        }
        return best ? clamp(num(best.lane, 0), 0, this.laneCount() - 1) : this.pickMissLane();
    };

    Scene_DexRhythmBattle.prototype.enemyAttack = function(lane) {
        if (!P.enableBattleMotion || !P.enemyAttackOnMiss) return;
        if (this._enemyAttackCooldown > 0) return;
        this._enemyAttackCooldown = P.enemyAttackCooldown;

        this.startActionMotion(this._enemySprite, P.enemyMoveX, P.battleMoveY, P.battleMotionFrames, null);

        const actorSprite = this.actorSpriteForLane(lane);
        if (P.actorDamageFlash && actorSprite) {
            this.startActionMotion(actorSprite, 0, 0, Math.max(8, Math.floor(P.battleMotionFrames * 0.8)), [255, 80, 90, 255]);
        }

        if (P.useRpgAttackSe && this._enemySprite && this._enemySprite._enemy && this._enemySprite._enemy.performAction) {
            withMutedSystemSe(() => this._enemySprite._enemy.performAction({ isAttack: () => true }));
        }
    };

    Scene_DexRhythmBattle.prototype.laneCount = function() {
        return Math.max(1, Math.min(4, this._members.length || 1));
    };

    Scene_DexRhythmBattle.prototype.laneY = function(index) {
        return P.laneY + P.laneSpacing * index;
    };

    Scene_DexRhythmBattle.prototype.laneColor = function(index) {
        const actor = this._members && this._members[index];
        if (actor && actor.actor && actor.actor().meta && actor.actor().meta.RhythmColor) {
            const noteColor = normalizeHexColor(actor.actor().meta.RhythmColor);
            if (noteColor) return noteColor;
        }

        const fixed = P.actorColors[index] || P.laneColors[index % P.laneColors.length] || "#FFFFFF";
        return variableColor(P.actorColorVariables[index], fixed);
    };

    Scene_DexRhythmBattle.prototype.createLanes = function() {
        const b = new Bitmap(P.refW, P.refH);
        for (let i = 0; i < this.laneCount(); i++) {
            const y = this.laneY(i);
            const color = this.laneColor(i);
            const leftFade = P.laneLeftFadeWidth;
            const rightFade = P.laneRightFadeWidth;
            if (P.useGlow) drawGradientLine(b, P.laneStartX, y, P.targetX, y, color, P.laneHeight + 22, 0.13 + P.glowStrength * 0.16, leftFade, rightFade);
            drawGradientLine(b, P.laneStartX, y, P.targetX, y, color, P.laneHeight, 0.34, leftFade, rightFade);
            drawGradientLine(b, P.laneStartX, y, P.targetX, y, color, 5, 0.96, leftFade, rightFade);
            drawGradientLine(b, P.laneStartX, y - P.laneHeight / 2, P.targetX, y - P.laneHeight / 2, color, 2, 0.28, leftFade, rightFade);
            drawGradientLine(b, P.laneStartX, y + P.laneHeight / 2, P.targetX, y + P.laneHeight / 2, color, 2, 0.28, leftFade, rightFade);
            this.drawLaneChevrons(b, y, color);
        }
        this._laneSprite = new Sprite(b);
        this._laneLayer.addChild(this._laneSprite);
    };

    Scene_DexRhythmBattle.prototype.drawLaneChevrons = function(bitmap, y, color) {
        const ctx = bitmap.context;
        ctx.save();
        const fadeStart = P.targetX - P.laneRightFadeWidth;
        for (let x = P.laneStartX + 260; x < P.targetX - 140; x += 260) {
            const fade = P.laneRightFadeWidth > 0 && x > fadeStart
                ? clamp((P.targetX - x) / P.laneRightFadeWidth, 0, 1)
                : 1;
            ctx.fillStyle = rgba(color, 0.38 * fade);
            ctx.beginPath();
            ctx.moveTo(x, y - 15);
            ctx.lineTo(x + 34, y);
            ctx.lineTo(x, y + 15);
            ctx.lineTo(x + 9, y);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
        touchBitmap(bitmap);
    };

    Scene_DexRhythmBattle.prototype.createNotesLayer = function() {
        // Created for ordering clarity: lanes below, notes here, targets above.
    };

    Scene_DexRhythmBattle.prototype.createTargets = function() {
        this._targets = [];
        for (let i = 0; i < this.laneCount(); i++) {
            const t = new Sprite_DexRhythmTarget(this.laneColor(i), P.targetSize);
            t.x = P.targetX;
            t.y = this.laneY(i);
            this._targetLayer.addChild(t);
            this._targets.push(t);
        }
    };

    Scene_DexRhythmBattle.prototype.createHudLayers = function() {
        this._staticHud = new Sprite(new Bitmap(P.refW, P.refH));
        this._dynamicHud = new Sprite(new Bitmap(P.refW, P.refH));
        this._phaseText = new Sprite(new Bitmap(900, 190));
        this._phaseText.anchor.set(0.5);
        this._phaseText.x = P.phaseX;
        this._phaseText.y = P.phaseY;
        this._hudLayer.addChild(this._staticHud);
        this._hudLayer.addChild(this._dynamicHud);
        this._phaseLayer.addChild(this._phaseText);
        this.drawStaticHud();
    };

    Scene_DexRhythmBattle.prototype.drawStaticHud = function() {
        const b = this._staticHud.bitmap;
        b.clear();
        this.drawPanel(b, P.enemyHudX - 25, P.enemyHudY - 34, 580, 130, 24);
        this.drawPanel(b, P.partyHudX - 30, P.partyHudY - 30, 385, 210, 24);

        b.fontFace = $gameSystem.mainFontFace();
        b.outlineColor = "rgba(0,0,0,0.96)";
        b.outlineWidth = 4;
        b.fontSize = 26;
        b.textColor = P.textColor;
        b.drawText(P.enemyHp, P.enemyHudX, P.enemyHudY, 300, 34, "left");
        b.drawText(P.partyHp, P.partyHudX, P.partyHudY, 300, 34, "left");
        b.drawText(P.chain, P.comboX, P.comboY, 310, 34, "center");
    };

    Scene_DexRhythmBattle.prototype.drawPanel = function(bitmap, x, y, w, h, r) {
        fillRound(bitmap, x, y, w, h, r, `rgba(4,15,24,${P.panelOpacity / 255})`, rgba(P.goldColor, 0.95), 3);
        fillRound(bitmap, x + 8, y + 8, w - 16, h - 16, Math.max(0, r - 6), "rgba(0,0,0,0.10)", rgba("#FFFFFF", 0.10), 1);
    };

    Scene_DexRhythmBattle.prototype.buildChart = function() {
        if (this._manualChartData) return this.buildManualChart();
        return this.buildAutoChart();
    };

    Scene_DexRhythmBattle.prototype.chartUrl = function() {
        const name = chartName(this._data.chartFile);
        return name ? P.chartFolder + name + ".json" : "";
    };

    Scene_DexRhythmBattle.prototype.shouldUseManualChart = function() {
        return String(this._data.chartMode || "auto").toLowerCase() === "manual" && !!chartName(this._data.chartFile);
    };

    Scene_DexRhythmBattle.prototype.loadManualChart = function() {
        if (!this.shouldUseManualChart()) return Promise.resolve(null);
        if (this._manualChartData) return Promise.resolve(this._manualChartData);
        const url = this.chartUrl();
        this._chartLoading = true;
        this._chartLoadError = "";
        this.drawPhase("Cargando chart", chartName(this._data.chartFile));
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
                return response.json();
            })
            .then(data => {
                this._manualChartData = data;
                this._chartLoading = false;
                return data;
            })
            .catch(error => {
                this._chartLoading = false;
                this._chartLoadError = String(error && error.message ? error.message : error);
                console.warn(`[${pluginName}] Chart manual no cargó. Usando chart automático.`, error);
                this._manualChartData = null;
                return null;
            });
    };

    Scene_DexRhythmBattle.prototype.buttonTypeFromName = function(name) {
        const text = String(name || "").toUpperCase().trim();
        const index = KEY_TYPES.findIndex(k => k.label === text || k.symbol === text || (k.aliases && k.aliases.includes(text)));
        if (index >= 0) return index;
        if (/^\d+$/.test(text)) return clamp(Number(text), 0, KEY_TYPES.length - 1);
        return 0;
    };

    Scene_DexRhythmBattle.prototype.noteEntriesFromChartEvent = function(event) {
        if (!event) return [];
        if (Array.isArray(event.notes)) {
            return event.notes.map(n => ({
                lane: clamp(num(n.lane, num(event.lane, 0)), 0, this.laneCount() - 1),
                type: this.buttonTypeFromName(n.button || n.key || n.type || event.button || event.key || event.type)
            }));
        }

        if (Array.isArray(event.keys) || Array.isArray(event.buttons)) {
            const list = event.keys || event.buttons;
            return list.map((button, i) => ({
                lane: clamp(num(Array.isArray(event.lanes) ? event.lanes[i] : i, i), 0, this.laneCount() - 1),
                type: this.buttonTypeFromName(button)
            }));
        }

        return [{
            lane: clamp(num(event.lane, 0), 0, this.laneCount() - 1),
            type: this.buttonTypeFromName(event.button || event.key || event.type)
        }];
    };

    Scene_DexRhythmBattle.prototype.chartEventTimeSeconds = function(event, bpm) {
        if (event.time !== undefined) return num(event.time, 0);
        if (event.seconds !== undefined) return num(event.seconds, 0);
        if (event.beat !== undefined) return num(event.beat, 0) * 60 / Math.max(1, bpm);
        return 0;
    };

    Scene_DexRhythmBattle.prototype.buildManualChart = function() {
        const chart = this._manualChartData || {};
        const chartBpm = Math.max(1, num(chart.bpm, this._data.bpm));
        const source = Array.isArray(chart.events) ? chart.events : Array.isArray(chart.notes) ? chart.notes : [];
        const chartOffset = num(chart.offsetSeconds, 0) + num(this._data.chartOffsetSeconds, 0);
        let maxHitFrame = 0;

        for (const event of source) {
            const time = this.chartEventTimeSeconds(event, chartBpm) + chartOffset;
            if (time < 0) continue;
            if (this._data.musicSeconds > 0 && time > this._data.musicSeconds) continue;
            const hitFrame = Math.round(time * 60);
            const notes = this.noteEntriesFromChartEvent(event);

            for (const n of notes) {
                const lane = clamp(num(n.lane, 0), 0, this.laneCount() - 1);
                const type = clamp(num(n.type, 0), 0, KEY_TYPES.length - 1);
                const note = new Sprite_DexRhythmNote(
                    type,
                    this.laneColor(lane),
                    P.noteSize,
                    Math.round(hitFrame - this._approachFrames),
                    hitFrame,
                    P.laneStartX,
                    P.targetX,
                    this.laneY(lane)
                );
                note.lane = lane;
                this._noteLayer.addChild(note);
                this._notes.push(note);
            }
            maxHitFrame = Math.max(maxHitFrame, hitFrame);
        }

        if (this._notes.length === 0) {
            console.warn(`[${pluginName}] Chart manual vacío. Generando chart automático.`);
            return this.buildAutoChart();
        }

        this._lastFrame = Math.max(this._playLimitFrames || 0, maxHitFrame + P.goodWindow + 90);
    };

    Scene_DexRhythmBattle.prototype.buildAutoChart = function() {
        const pool = modePool(this._data.inputMode);
        const seq = parseSequence(this._data.sequence, pool);
        const useSeq = seq.length > 0;
        const fpb = this.framesPerBeat();
        const lastLane = [];
        let sequenceIndex = 0;
        let totalNotes = 0;

        const start = this._startFrame;
        const end = Math.max(start + fpb, (this._playLimitFrames || this.fallbackChartFrames()) - P.goodWindow - 18);
        const maxBasePulses = Math.max(1, Math.floor((end - start) / fpb));

        const pickType = () => {
            if (useSeq) {
                const type = seq[sequenceIndex % seq.length];
                sequenceIndex++;
                return type;
            }
            return pool[Math.randomInt(pool.length)];
        };

        const pickLanes = (hitFrame, count) => {
            const lanes = [];
            const laneCount = this.laneCount();
            let startLane = Math.randomInt(laneCount);

            for (let tries = 0; tries < laneCount * 3 && lanes.length < count; tries++) {
                const lane = (startLane + tries) % laneCount;
                if (lanes.includes(lane)) continue;
                if (lastLane[lane] && Math.abs(hitFrame - lastLane[lane]) < P.minNoteGap) continue;
                lanes.push(lane);
            }

            while (lanes.length < count && lanes.length < laneCount) {
                const lane = lanes.length % laneCount;
                if (!lanes.includes(lane)) lanes.push(lane);
                else break;
            }

            return lanes;
        };

        const simultaneousCount = () => {
            if (!P.useDoubleNotes || this.laneCount() <= 1) return 1;
            let count = 1;

            if (Math.random() < P.doubleNoteChance) count = 2;
            if (this.laneCount() >= 3 && Math.random() < P.tripleNoteChance) count = 3;

            return clamp(count, 1, Math.min(P.maxSimultaneous, this.laneCount()));
        };

        const addNoteSet = hitFrameRaw => {
            if (hitFrameRaw < start || hitFrameRaw > end) return;
            if (!useSeq && Math.random() > P.noteDensity) return;
            if (!useSeq && Math.random() < P.restChance) return;

            const offset = P.randomOffsetFrames > 0
                ? Math.randomInt(P.randomOffsetFrames * 2 + 1) - P.randomOffsetFrames
                : 0;

            const hitFrame = Math.round(hitFrameRaw + offset);
            const count = simultaneousCount();
            const lanes = pickLanes(hitFrame, count);

            for (const lane of lanes) {
                const type = pickType();
                const note = new Sprite_DexRhythmNote(
                    type,
                    this.laneColor(lane),
                    P.noteSize,
                    Math.round(hitFrame - this._approachFrames),
                    hitFrame,
                    P.laneStartX,
                    P.targetX,
                    this.laneY(lane)
                );
                note.lane = lane;

                this._noteLayer.addChild(note);
                this._notes.push(note);
                lastLane[lane] = hitFrame;
                totalNotes++;
            }
        };

        for (let i = 0; i < maxBasePulses; i++) {
            const baseFrame = Math.round(start + i * fpb);
            addNoteSet(baseFrame);

            if (P.useSubBeatNotes && Math.random() < P.subBeatChance) {
                addNoteSet(baseFrame + fpb / 2);
            }
        }

        if (this._notes.length === 0) {
            addNoteSet(start + fpb);
        }

        this._lastFrame = this._playLimitFrames || this.fallbackChartFrames();
    };

    Scene_DexRhythmBattle.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this._frame++;
        this.updateSprites();
        if (this._phase === "ready") this.updateReady();
        else if (this._phase === "play") this.updatePlay();
        else if (this._phase === "victory" || this._phase === "defeat") this.updateEnd();
        else if (this._phase === "result") this.updateResult();
    };

    Scene_DexRhythmBattle.prototype.updateSprites = function() {
        if (this._enemyAttackCooldown > 0) this._enemyAttackCooldown--;
        if (this._enemySprite) {
            this._enemySprite.update();
            this.updateActionSprite(this._enemySprite);
        }
        if (this._actorSprites) {
            this._actorSprites.forEach(s => {
                s.update();
                this.updateActionSprite(s);
            });
        }
        if (this._targets) this._targets.forEach(s => s.update());
        if (this._judgeTimer > 0) this._judgeTimer--;
    };

    Scene_DexRhythmBattle.prototype.updateReady = function() {
        if (this._chartLoading) return;

        if (anyStartTriggered()) {
            playSeConfigured("", P.startSeVolume, 100, 1);
            this.loadManualChart().then(() => this.beginPerformance());
        }
    };

    Scene_DexRhythmBattle.prototype.beginPerformance = function() {
        if (this._phase !== "ready") return;
        if (this._manualChartData && this._data.chartUseBpm && this._manualChartData.bpm) {
            this._data.bpm = clamp(num(this._manualChartData.bpm, this._data.bpm), 20, 300);
            this._approachFrames = this.framesPerBeat() * this._data.approachBeats;
            this._startFrame = Math.round(this.framesPerBeat() * P.startDelayBeats);
        }
        this.startRhythmMusic();
        this.prepareChartForMusic();
        this._phase = "play";
        this._frame = 0;
        this._phaseText.bitmap.clear();
    };

    Scene_DexRhythmBattle.prototype.startRhythmMusic = function() {
        if (this._musicStarted) return;
        this._musicStarted = true;

        if (this._data.musicName) {
            AudioManager.playBgm({
                name: this._data.musicName,
                volume: this._data.musicVolume,
                pitch: this._data.musicPitch,
                pan: this._data.musicPan
            });
        } else {
            BattleManager.playBattleBgm();
        }

        this.applyRhythmBgmBoost();
    };

    Scene_DexRhythmBattle.prototype.applyRhythmBgmBoost = function() {
        const buffer = AudioManager._bgmBuffer;
        const boost = clamp(num(this._data.musicBoostPercent, P.bgmBoostPercent), 50, 200) / 100;
        if (!buffer || boost === 1) return;

        // RPG Maker aplica su volumen normal primero. Esto sólo multiplica la ganancia final.
        const base = Number(buffer.volume);
        if (Number.isFinite(base)) {
            buffer.volume = Math.min(2.0, base * boost);
        }
    };

    Scene_DexRhythmBattle.prototype.detectBgmDurationSeconds = function() {
        if (!P.tryDetectFullLength) return 0;

        const buffer = AudioManager._bgmBuffer;
        if (!buffer) return 0;

        const candidates = [
            buffer._totalTime,
            buffer._duration,
            buffer._source && buffer._source.buffer && buffer._source.buffer.duration,
            buffer._buffer && buffer._buffer.duration,
            buffer._audioElement && buffer._audioElement.duration
        ];

        for (const value of candidates) {
            const n = Number(value);
            if (Number.isFinite(n) && n > 0) return n;
        }

        return 0;
    };

    Scene_DexRhythmBattle.prototype.fallbackChartFrames = function() {
        return Math.round(this._startFrame + this._data.beats * this.framesPerBeat() + P.goodWindow + 60);
    };

    Scene_DexRhythmBattle.prototype.resolvePlayLimitFrames = function() {
        if (this._data.musicSeconds > 0) {
            return Math.max(60, Math.round(this._data.musicSeconds * 60));
        }

        if (this._manualChartData) {
            const chartDuration = num(this._manualChartData.durationSeconds, 0);
            if (chartDuration > 0) return Math.max(60, Math.round(chartDuration * 60));

            const events = Array.isArray(this._manualChartData.events) ? this._manualChartData.events : Array.isArray(this._manualChartData.notes) ? this._manualChartData.notes : [];
            const chartBpm = Math.max(1, num(this._manualChartData.bpm, this._data.bpm));
            const maxTime = events.reduce((max, event) => Math.max(max, this.chartEventTimeSeconds(event, chartBpm)), 0);
            if (maxTime > 0) return Math.max(60, Math.round((maxTime + 2) * 60));
        }

        const detected = this.detectBgmDurationSeconds();
        if (detected > 0) {
            return Math.max(60, Math.round(detected * 60));
        }

        console.warn(`[${pluginName}] No pude detectar duración completa de BGM. Usando Cantidad de notas como fallback.`);
        return this.fallbackChartFrames();
    };

    Scene_DexRhythmBattle.prototype.prepareChartForMusic = function() {
        if (this._chartBuilt) return;
        this._chartBuilt = true;
        this._playLimitFrames = this.resolvePlayLimitFrames();
        this.buildChart();
    };

    Scene_DexRhythmBattle.prototype.updatePlay = function() {
        this.updateNotes();
        this.updateInput();
        this.refreshHud();

        if (P.endWhenEnemyDefeated && this._enemyHp <= 0) return this.startVictory();
        if (this._partyHp <= 0) return this.startDefeat();

        if (this._playLimitFrames > 0 && this._frame >= this._playLimitFrames) {
            return this.finishPerformance();
        }

        if (this._frame > this._lastFrame && !this._notes.some(n => !n.hit && !n.missed)) {
            this.finishPerformance();
        }
    };

    Scene_DexRhythmBattle.prototype.finishPerformance = function() {
        if (this._enemyHp <= 0 || this.accuracy() >= P.targetAccuracyWin) this.startVictory();
        else this.startDefeat();
    };

    Scene_DexRhythmBattle.prototype.updateNotes = function() {
        for (const n of this._notes) {
            if (n.hit || n.missed) continue;
            if (this._frame >= n.spawnFrame) n.updateNote(this._frame);
            if (this._frame - n.hitFrame > P.goodWindow) {
                n.missed = true;
                n.visible = false;
                this.applyMiss(n.lane);
            }
        }
    };

    Scene_DexRhythmBattle.prototype.updateInput = function() {
        let pressed = false;

        for (let i = 0; i < KEY_TYPES.length; i++) {
            if (triggeredForType(i)) {
                this.checkInput(i);
                pressed = true;
            }
        }

        return pressed;
    };

    Scene_DexRhythmBattle.prototype.nearest = function(type) {
        let best = null;
        let bestAbs = Infinity;
        for (const n of this._notes) {
            if (n.hit || n.missed || !n.visible || n.type !== type) continue;
            const abs = Math.abs(this._frame - n.hitFrame);
            if (abs <= P.goodWindow && abs < bestAbs) {
                best = n;
                bestAbs = abs;
            }
        }
        return best;
    };

    Scene_DexRhythmBattle.prototype.checkInput = function(type) {
        const note = this.nearest(type);
        if (!note) return this.applyWrong(type);
        const perfect = Math.abs(this._frame - note.hitFrame) <= P.perfectWindow;
        this.applyHit(note, perfect);
    };

    Scene_DexRhythmBattle.prototype.applyHit = function(note, perfect) {
        note.hit = true;
        note.visible = false;
        const lane = clamp(num(note.lane, 0), 0, this.laneCount() - 1);
        this._hits++;
        if (perfect) this._perfectHits++;
        else this._goodHits++;
        if (this._targets[lane]) this._targets[lane].hitFlash();
        this._chain++;
        this._maxChain = Math.max(this._maxChain, this._chain);
        this._score += Math.floor((10 + P.comboDamageBonus * this._chain) * (perfect ? P.perfectMultiplier : 1));
        this._enemyHp = Math.max(0, this._enemyHp - this.damagePerHit(perfect));
        this._judge = perfect ? P.perfectText : P.goodText;
        this._judgeTimer = 42;
        playSeConfigured(P.hitSeName, P.hitSeVolume, P.hitSePitch, 0);
        this.actorAttack(lane, perfect);
        if (this._enemySprite && this._enemySprite._enemy) {
            if (P.useRpgDamageSe) {
                this._enemySprite._enemy.performDamage();
            } else if (this._enemySprite._enemy.requestEffect) {
                this._enemySprite._enemy.requestEffect("blink");
            }
        }
    };

    Scene_DexRhythmBattle.prototype.damagePerHit = function(perfect) {
        const expectedNotes = Math.max(1, this._notes ? this._notes.length : this._data.beats);
        const base = this._enemyHpMax / Math.max(1, expectedNotes * 0.68);
        return Math.max(1, Math.floor(base * (perfect ? P.perfectMultiplier : 1)));
    };

    Scene_DexRhythmBattle.prototype.applyWrong = function(type) {
        const lane = this.nearestPendingLane();
        this._misses++;
        this._judge = P.missText;
        this._judgeTimer = 42;
        this._chain = 0;
        this.damageParty(lane);
        playSeConfigured(P.missSeName, P.missSeVolume, P.missSePitch, 2);
        this.enemyAttack(lane);
    };

    Scene_DexRhythmBattle.prototype.applyMiss = function(lane) {
        const targetLane = clamp(num(lane, this.pickMissLane()), 0, this.laneCount() - 1);
        this._misses++;
        this._judge = P.missText;
        this._judgeTimer = 42;
        this._chain = 0;
        this.damageParty(targetLane);
        playSeConfigured(P.missSeName, P.missSeVolume, P.missSePitch, 2);
        this.enemyAttack(targetLane);
    };

    Scene_DexRhythmBattle.prototype.refreshVisualPartyHp = function() {
        this._partyHp = Math.max(0, this._memberHp.reduce((s, value) => s + Math.max(0, value), 0));
    };

    Scene_DexRhythmBattle.prototype.memberHpRate = function(index) {
        const max = Math.max(1, this._memberHpMax[index] || 1);
        const value = Math.max(0, this._memberHp[index] || 0);
        return clamp(value / max, 0, 1);
    };

    Scene_DexRhythmBattle.prototype.damageParty = function(targetLane) {
        const percent = Math.max(0, P.missDamagePercent) / 100;
        const lane = clamp(num(targetLane, this.pickMissLane()), 0, Math.max(0, this._members.length - 1));
        let damagedIndex = -1;

        const tryDamage = index => {
            const actor = this._members[index];
            const max = Math.max(1, this._memberHpMax[index] || (actor ? actor.mhp : 1));
            const current = Math.max(0, this._memberHp[index] || 0);
            if (current <= 0) return false;

            const damage = Math.max(1, Math.floor(max * percent));
            const next = Math.max(0, current - damage);
            const actualLoss = current - next;
            this._memberHp[index] = next;
            damagedIndex = index;

            if (P.damageRealActorHp && actor && actualLoss > 0) {
                actor.gainHp(-actualLoss);
                actor.refresh();
            }
            return actualLoss > 0;
        };

        let anyDamage = tryDamage(lane);

        if (!anyDamage) {
            for (let i = 0; i < this._members.length; i++) {
                if (tryDamage(i)) {
                    anyDamage = true;
                    break;
                }
            }
        }

        if (!anyDamage && this._members.length > 0) {
            damagedIndex = 0;
            this._memberHp[0] = Math.max(0, (this._memberHp[0] || 0) - 1);
        }

        this.refreshVisualPartyHp();
        return damagedIndex;
    };

    Scene_DexRhythmBattle.prototype.accuracy = function() {
        const total = Math.max(1, this._hits + this._misses);
        return this._hits / total;
    };

    Scene_DexRhythmBattle.prototype.playPartyVictoryMotion = function() {
        if (!P.enableBattleMotion || !P.partyVictoryMotion) return;
        for (const actor of this._members) {
            if (!actor) continue;
            if (actor.performVictory) actor.performVictory();
            else if (actor.requestMotion) actor.requestMotion("victory");
        }
    };

    Scene_DexRhythmBattle.prototype.startVictory = function() {
        if (this._phase !== "play") return;
        this._phase = "victory";
        this._endWait = 0;
        this._notes.forEach(n => n.visible = false);
        this.gainRewards();
        this.playPartyVictoryMotion();
        this.drawPhase(P.victory, P.press);
        BattleManager.playVictoryMe();
        this.refreshHud();
    };

    Scene_DexRhythmBattle.prototype.startDefeat = function() {
        if (this._phase !== "play") return;
        this._phase = "defeat";
        this._endWait = 0;
        this._notes.forEach(n => n.visible = false);
        this.drawPhase(P.defeat, P.press);
        AudioManager.playMe($dataSystem.gameoverMe);
        this.refreshHud();
    };

    Scene_DexRhythmBattle.prototype.gainRewards = function() {
        if (this._resultDone) return;
        this._resultDone = true;
        if (this._data.winSwitch > 0) $gameSwitches.setValue(this._data.winSwitch, true);
        if (this._data.scoreVariable > 0) $gameVariables.setValue(this._data.scoreVariable, this.totalScore());
        $gameMap.requestRefresh();
    };

    Scene_DexRhythmBattle.prototype.totalScore = function() {
        return Math.max(0, Math.floor(this._enemyBp + this._maxChain * 10 + this._perfectHits * 25 + this._goodHits * 10 - this._misses * 5));
    };

    Scene_DexRhythmBattle.prototype.updateEnd = function() {
        this._endWait++;
        if (this._endWait > 20 && anyStartTriggered()) {
            playSeConfigured("", P.confirmSeVolume, 100, 1);
            this._phase === "victory" ? this.showResult() : this.exitScene();
        }
    };

    Scene_DexRhythmBattle.prototype.showResult = function() {
        this._phase = "result";
        this._phaseText.bitmap.clear();
        this.refreshHud(true);
    };

    Scene_DexRhythmBattle.prototype.updateResult = function() {
        if (anyStartTriggered()) {
            playSeConfigured("", P.confirmSeVolume, 100, 1);
            this.exitScene();
        }
    };

    Scene_DexRhythmBattle.prototype.exitScene = function() {
        if (this._data.musicName && this._data.fadeOutSeconds > 0 && AudioManager.fadeOutBgm) {
            AudioManager.fadeOutBgm(this._data.fadeOutSeconds);
        }

        this.fadeOutAll();
        SceneManager.pop();
    };

    Scene_DexRhythmBattle.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);
        if (P.returnBgm) BattleManager.replayBgmAndBgs();
    };

    Scene_DexRhythmBattle.prototype.refreshHud = function(result = false) {
        const b = this._dynamicHud.bitmap;
        b.clear();
        b.fontFace = $gameSystem.mainFontFace();
        b.outlineColor = "rgba(0,0,0,0.96)";
        b.outlineWidth = 4;

        if (result) return this.drawResult(b);

        this.drawGauge(b, P.enemyHudX + 150, P.enemyHudY + 44, 350, 18, this._enemyHp, this._enemyHpMax, "#FF4E86", "#FFD36B");
        b.fontSize = 20;
        b.textColor = "#FFFFFF";
        b.drawText(`${Math.floor(this._enemyHp)}/${Math.floor(this._enemyHpMax)}`, P.enemyHudX + 150, P.enemyHudY + 65, 350, 26, "left");

        this.drawPartyHud(b);
        this.drawComboHud(b);
        this.drawJudge(b);
    };

    Scene_DexRhythmBattle.prototype.drawGauge = function(b, x, y, w, h, value, max, c1, c2) {
        const rate = clamp(value / Math.max(1, max), 0, 1);
        fillRound(b, x, y, w, h, h / 2, "rgba(0,0,0,0.58)", "rgba(255,255,255,0.45)", 1);
        b.gradientFillRect(x + 3, y + 3, Math.floor((w - 6) * rate), h - 6, c1, c2, false);
    };

    Scene_DexRhythmBattle.prototype.drawPartyHud = function(b) {
        const count = Math.max(1, Math.min(4, this._members.length || 1));
        const mode = String(P.partyIconMode || "face").toLowerCase();

        for (let i = 0; i < count; i++) {
            const x = P.partyHudX;
            const y = P.partyHudY + 45 + i * 54;
            const color = this.laneColor(i);
            const actor = this._members[i];
            const faceSize = P.partyFaceSize;
            let textX = x;
            let gaugeX = x;
            let gaugeWidth = 296;

            if (mode === "face") {
                drawActorFace(b, actor, x, y - 10, faceSize, color);
                textX = x + faceSize + 12;
                gaugeX = textX;
                gaugeWidth = Math.max(190, 300 - faceSize);
            } else if (mode === "circle") {
                drawCircle(b, x + 18, y + 12, 18, "rgba(0,0,0,0.35)", rgba(color, 1), 3);
                textX = x + 46;
                gaugeX = textX;
                gaugeWidth = 250;
            }

            b.fontSize = 17;
            b.textColor = "#FFFFFF";
            b.drawText(actor ? actor.name() : "---", textX, y - 10, 190, 24, "left");
            this.drawGauge(b, gaugeX, y + 15, gaugeWidth, 13, this.memberHpRate(i), 1, color, "#FFFFFF");
        }
    };

    Scene_DexRhythmBattle.prototype.drawComboHud = function(b) {
        b.fontSize = 68;
        b.textColor = "#FFFFFF";
        b.drawText(String(this._chain).padStart(3, "0") + " x", P.comboX, P.comboY + 36, 310, 78, "center");

        let y = P.comboY + 108;

        if (P.showBattlePower) {
            b.fontSize = 19;
            b.textColor = "#A8FFF4";
            b.drawText(`BP ${this._enemyBp}`, P.comboX, y, 310, 28, "center");
            y += 24;
        }

        if (P.showTimer && this._phase === "play" && this._playLimitFrames > 0) {
            const remaining = Math.max(0, Math.ceil((this._playLimitFrames - this._frame) / 60));
            b.fontSize = 17;
            b.textColor = "#DFFFF8";
            b.drawText(`${remaining}s`, P.comboX, y, 310, 24, "center");
        }
    };

    Scene_DexRhythmBattle.prototype.drawJudge = function(b) {
        if (this._judgeTimer <= 0 || !this._judge) return;
        const isPerfect = this._judge === P.perfectText;
        const isMiss = this._judge === P.missText;
        b.fontSize = isPerfect ? 48 : 42;
        b.textColor = isPerfect ? "#FFD86B" : isMiss ? "#FFFFFF" : "#A6FF8A";
        b.drawText(this._judge, P.judgeX - 230, P.judgeY, 460, 58, "center");
    };

    Scene_DexRhythmBattle.prototype.drawPhase = function(title, subtitle) {
        const b = this._phaseText.bitmap;
        b.clear();
        b.fontFace = $gameSystem.mainFontFace();
        b.outlineColor = "rgba(0,0,0,0.96)";
        b.outlineWidth = 7;
        b.fontSize = 62;
        b.textColor = "#FFF6B4";
        b.drawText(title, 0, 18, 900, 78, "center");
        b.fontSize = 26;
        b.textColor = "#FFFFFF";
        b.drawText(subtitle, 0, 105, 900, 42, "center");
    };

    Scene_DexRhythmBattle.prototype.drawResult = function(b) {
        b.fontFace = $gameSystem.mainFontFace();
        b.outlineColor = "rgba(0,0,0,0.96)";
        b.outlineWidth = 5;
        this.drawPanel(b, 610, 260, 700, 470, 28);
        b.fontSize = 64;
        b.textColor = "#FFF6B4";
        b.drawText(P.result, 0, 295, P.refW, 80, "center");
        const x = 735;
        let y = 410;
        b.fontSize = 30;
        b.textColor = "#A7FFCF";
        b.drawText(`Max ${P.chain}: ${this._maxChain}`, x, y, 500, 42, "left"); y += 46;
        b.drawText(`${P.perfectLabel}: ${this._perfectHits}`, x, y, 500, 42, "left"); y += 46;
        b.drawText(`${P.goodLabel}: ${this._goodHits}`, x, y, 500, 42, "left"); y += 46;
        b.drawText(`${P.missLabel}: ${this._misses}`, x, y, 500, 42, "left"); y += 46;
        b.drawText(`${P.accuracy}: ${Math.round(this.accuracy() * 100)}%`, x, y, 500, 42, "left"); y += 62;
        b.fontSize = 46;
        b.textColor = "#FFFFFF";
        b.drawText(`${P.battlePower}: ${this.totalScore()}`, x, y, 500, 58, "left");
        b.fontSize = 24;
        b.textColor = "#DFFFF8";
        b.drawText(P.press, 0, y + 105, P.refW, 40, "center");
    };

    window.Scene_DexRhythmBattle = Scene_DexRhythmBattle;
})();
