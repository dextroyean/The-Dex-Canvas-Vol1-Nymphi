# Nymphi — Capítulo 0: Prólogo
## Guion implementable para RPG Maker MZ

---

> **Convenciones de este documento**
> - `[EVENTO AUTOMÁTICO]` → Evento que se ejecuta solo al entrar al mapa o por condición.
> - `[INTERACCIÓN]` → El jugador presiona acción sobre un objeto o NPC.
> - `[BATALLA]` → Evento de combate.
> - `[SW: NOMBRE]` → Activar interruptor.
> - `[VAR: NOMBRE = X]` → Asignar valor a variable.
> - `\n` → Salto de línea dentro del cuadro de diálogo.
> - Los nombres de personaje van en **negrita** antes del diálogo.
> - Las acotaciones de escena van en *cursiva*.

---

## ESCENA 0.1 — Pantalla de título / Texto narrativo introductorio

**Tipo:** Evento automático en el mapa de inicio (pantalla negra o fade-in lento sobre la aldea).

**Música sugerida:** Tema ambiental suave, cuerdas y viento, sin percusión.

---

*Pantalla en negro. Texto aparece línea por línea, al centro de la pantalla.*

> Existe un bosque que ningún mapa ha logrado dibujar completo.

*Pausa breve.*

> Sus raíces recuerdan nombres que los humanos olvidaron hace siglos.

*Pausa breve.*

> Sus flores conocen el peso del tiempo.

*Pausa larga.*

> Pero el bosque también puede olvidar.

*Pausa larga. Fade a la aldea de Sylverain, mañana temprana.*

`[SW: SW_PROLOGO_INICIADO → ON]`
`[VAR: VAR_PROGRESO_HISTORIA = 0]`

---

## ESCENA 0.2 — Aldea de Sylverain / Despertar de Nymphi

**Mapa:** Casa de Nymphi (interior) o calle principal de Sylverain.
**Tipo:** Evento automático al comenzar el juego.

---

*La cámara aparece sobre Nymphi, de pie frente a su casa o caminando por la aldea. Mañana tranquila.*

*Monólogo interno de Nymphi — texto en cursiva o color distinto para diferenciarlo del diálogo normal.*

**Nymphi** *(pensamiento)*
> Sylverain huele diferente esta mañana.
> No sé cómo explicarlo. Algo en el aire
> está… quieto. Demasiado quieto.

*Nymphi mira hacia el bosque al fondo del mapa.*

**Nymphi** *(pensamiento)*
> El bosque siempre tiene sonido. Siempre.
> Hoy no escucho nada.

*Control pasa al jugador.*

---

## ESCENA 0.3 — Exploración de Sylverain / NPCs

**Mapa:** Aldea de Sylverain (exterior).
**Condición:** SW_PROLOGO_INICIADO = ON, SW_MISION_MEDICINA_ACTIVA = OFF.

Los NPCs están distribuidos en la aldea. El jugador puede hablar con ellos libremente antes de activar la misión. Cada uno tiene una línea corta que establece el tono.

---

### NPC: Aldeana mayor (junto a las flores del camino)

**[INTERACCIÓN]**

**Aldeana mayor**
> Mira estas flores, Nymphi. Llevan tres días
> así. Sin color, sin aroma. Planté estas mismas
> semillas hace veinte años y nunca las había
> visto tan… apagadas.

*Si Nymphi interactúa de nuevo:*

**Aldeana mayor**
> Supongo que la tierra también tiene días malos.
> Aunque últimamente parece que son muchos seguidos.

---

### NPC: Niño del barril (jugando cerca de la entrada)

**[INTERACCIÓN]**

**Niño**
> Nymphi, Nymphi. ¿Sabes qué le pasó
> al pájaro azul que vivía en el árbol grande?
> Ayer estaba raro. Se fue volando muy rápido
> y no volvió.

*Si Nymphi interactúa de nuevo:*

**Niño**
> Mi mamá dice que no me preocupe.
> Pero era MI pájaro. Bueno… no era mío.
> Pero yo le daba migas todos los días.

---

### NPC: Herrero (en su taller, tono desconfiado)

**[INTERACCIÓN]**

**Herrero**
> Ah. Nymphi.

*Pausa. El herrero no detiene su trabajo.*

**Herrero**
> ¿Necesitas algo o solo pasas a que
> la gente se ponga nerviosa?

*Si Nymphi interactúa de nuevo:*

**Herrero**
> Tu magia puede ser útil, lo admito.
> Pero hay cosas que no deberían
> tocarse con ese tipo de poder.
> Solo digo eso.

---

### NPC: Mujer joven (cerca del pozo, amistosa)

**[INTERACCIÓN]**

**Mujer joven**
> ¡Buenos días, Nymphi! Oye, ¿tú
> sentiste algo raro anoche? Yo estaba
> durmiendo y de repente olvidé…
> no sé. Algo. No recuerdo qué era
> lo que olvidé, que es lo más extraño.

*Si Nymphi interactúa de nuevo:*

**Mujer joven**
> Debe ser el cansancio. O el clima.
> Igual no importa, ¿verdad?

---

### NPC: Anciano del banco (sentado, pensativo)

**[INTERACCIÓN]**

**Anciano**
> El camino del bosque cambió esta noche.
> Llevo cuarenta años tomando el mismo
> sendero al amanecer. Hoy no lo encontré.

*Pausa.*

**Anciano**
> Terminé en una parte que no reconocí.
> Y eso, muchacha, no me había pasado nunca.

*Si Nymphi interactúa de nuevo:*

**Anciano**
> No le digas nada a mi nieta.
> Ya bastante preocupada está con lo mío.

---

### NPC: Aldeano desconfiado (cruzado de brazos, esquina del mapa)

**[INTERACCIÓN]**

**Aldeano desconfiado**
> ¿Qué haces por aquí tan temprano?

*Si Nymphi responde (opción implícita, sin menú):*

**Aldeano desconfiado**
> Ajá. Mira, no tengo nada contra ti.
> Pero cada vez que hay algo raro en este
> pueblo, tú estás cerca. ¿No lo has notado?

*Si Nymphi interactúa de nuevo:*

**Aldeano desconfiado**
> No lo digo con mala intención.
> Bueno. Quizás sí un poco.
> Pero tú misma debes entender
> que tu magia no es… normal.

---

## ESCENA 0.4 — Casa del anciano enfermo / Activación de la misión

**Mapa:** Interior de la casa del anciano.
**Condición:** SW_MISION_MEDICINA_ACTIVA = OFF.
**Tipo:** Evento automático al entrar al mapa, o interacción con la nieta.

---

*Al entrar a la casa, Nymphi ve a la nieta junto a la cama del anciano. El anciano está acostado, con los ojos entreabiertos.*

**[EVENTO AUTOMÁTICO al acercarse a la nieta]**

**Nieta**
> Nymphi, qué bueno que pasaste.
> El abuelo lleva dos días así.
> El médico de la aldea dijo que era
> la medicina habitual, pero…

*La nieta señala un frasco sobre la mesa.*

**Nieta**
> Algo le pasa. No huele igual.
> No sé explicarlo. ¿Puedes verlo tú?
> Con tu magia, quiero decir.

---

**[INTERACCIÓN con el frasco de medicina]**

`[SW: SW_MEDICINA_REVISADA → ON]`

*Nymphi toma el frasco. Lo sostiene con cuidado.*

**Nymphi** *(pensamiento)*
> Las hierbas están secas por dentro.
> No es que sean viejas. Es como si…
> alguien les hubiera quitado algo.
> Su energía. Su pulso.
> Están vacías.

*Nymphi deja el frasco.*

**Nymphi**
> Las hierbas perdieron su fuerza natural.
> No sé cuándo pasó, pero ya no sirven.

**Nieta**
> ¿Hay algo que puedas hacer?

**Nymphi**
> Puedo ir al bosque por hierbas frescas.
> Las de allá adentro todavía deberían tener
> lo que necesitamos.

**Nieta**
> Pero el bosque está raro últimamente.
> Todo el mundo lo dice.

**Nymphi**
> Lo sé. Pero soy yo. Estaré bien.

*Pausa.*

**Nieta**
> Ten cuidado, por favor.

---

*Antes de salir, si Nymphi interactúa con el anciano:*

**[INTERACCIÓN con el anciano en la cama]**

**Anciano** *(voz débil)*
> ¿Nymphi?

*Pausa.*

**Anciano**
> Tuve un sueño extraño. Había mujeres
> cerca del agua. Cantaban algo.
> No recuerdo la canción, pero era…
> muy antigua. Muy bonita.

*Pausa.*

**Anciano**
> Ya no importa. Los sueños son solo sueños.

---

`[SW: SW_MISION_MEDICINA_ACTIVA → ON]`
`[VAR: VAR_PROGRESO_HISTORIA = 1]`
`[VAR: VAR_HIERBAS_RECOLECTADAS = 0]`

**Objetivo activo:** *Recolectar 3 hierbas frescas en el bosque.*

---

## ESCENA 0.5 — Entrada al bosque

**Mapa:** Entrada al bosque de Sylverain.
**Condición:** SW_MISION_MEDICINA_ACTIVA = ON.
**Tipo:** Evento automático al entrar al mapa.

`[SW: SW_BOSQUE_ACCESO_INICIAL → ON]`

---

*Nymphi se detiene en el umbral del bosque. La música cambia: más tensa, más grave.*

**Nymphi** *(pensamiento)*
> El bosque huele diferente.
> No es peligro exactamente.
> Es más como… ausencia.
> Como si algo que siempre estuvo
> aquí ya no estuviera.

*Nymphi entra.*

---

## ESCENA 0.6 — Bosque / Recolección de hierbas

**Mapa:** Bosque inicial (zona de hierbas).
**Objetivo:** Recolectar 3 hierbas frescas.

Las hierbas son objetos interactuables distribuidos en el mapa. Al recolectar cada una, `VAR_HIERBAS_RECOLECTADAS` aumenta en 1.

---

### Hierba 1

**[INTERACCIÓN]**

**Nymphi** *(pensamiento)*
> Esta todavía tiene algo de vida.
> Apenas, pero suficiente.

`[VAR: VAR_HIERBAS_RECOLECTADAS = 1]`

---

### Hierba 2

**[INTERACCIÓN]**

**Nymphi** *(pensamiento)*
> Las raíces están bien. Las hojas
> están un poco apagadas, pero sirven.

`[VAR: VAR_HIERBAS_RECOLECTADAS = 2]`

---

### Hierba 3

**[INTERACCIÓN]**

*Al acercarse a la tercera hierba, Nymphi escucha algo.*

**Nymphi** *(pensamiento)*
> Espera.

*Sonido ambiental: algo se mueve entre los árboles. La música se vuelve más tensa.*

**Nymphi** *(pensamiento)*
> Hay algo ahí.

*Nymphi recoge la hierba de todas formas.*

`[VAR: VAR_HIERBAS_RECOLECTADAS = 3]`

**Objetivo cumplido:** *Hierbas recolectadas.*

---

## ESCENA 0.7 — Claro del lobo / Encuentro con el jefe

**Mapa:** Claro del lobo (zona más profunda del bosque inicial).
**Tipo:** Evento automático al entrar al claro.

---

*Nymphi entra al claro. La música se detiene abruptamente.*

*En el centro del claro hay un lobo enorme. Su pelaje está cubierto de raíces oscuras que se mueven lentamente. Sus ojos brillan con una luz apagada, casi sin color.*

*Nymphi y el lobo se miran.*

**Nymphi** *(pensamiento)*
> No es un lobo normal.
> Puedo sentirlo. Hay algo debajo
> de esas raíces. Algo que antes
> era distinto.

*El lobo gruñe. Las raíces oscuras se extienden ligeramente hacia Nymphi.*

**Nymphi**
> Espera. No quiero hacerte daño.

*El lobo ataca.*

---

### FASE 1 — Batalla: Nymphi sola

**[BATALLA]**

**Enemigo:** Lobo del bosque corrompido
**Condición especial:** Cuando el lobo llega al 40% de HP, se activa el evento de Yoss.

*El lobo usa ataques de mordida, estado Enredado y regeneración lenta por las raíces.*
*Nymphi pelea sola. No hay curación disponible en esta fase.*

---

### EVENTO — Nymphi en peligro / Entrada de Yoss

**[EVENTO AUTOMÁTICO cuando el lobo llega al 40% de HP]**

*La batalla se pausa. Nymphi está de rodillas, agotada.*

**Nymphi** *(pensamiento)*
> Es demasiado. No puedo sola.

*Sonido de pasos rápidos entre los arbustos.*

**Yoss** *(fuera de cámara, antes de aparecer)*
> ¡YA VOY, YA VOY, NO TE MUERAS!

*Yoss entra corriendo al claro, tropeza ligeramente con una raíz, se recupera con dignidad cuestionable.*

**Yoss**
> ¡Bien! Situación controlada. O sea…
> casi controlada. ¿Estás bien?

**Nymphi**
> ¿De dónde saliste?

**Yoss**
> Te seguí. Lo sé, lo sé. Pero
> tenía un presentimiento muy fuerte
> de que ibas a necesitar una healer hoy.

*Yoss lanza un hechizo de curación sobre Nymphi.*

**Yoss**
> ¿Mejor?

**Nymphi**
> … Sí. Gracias.

**Yoss**
> Increíble. "Gracias" después de salvarte
> la vida. Eres la persona más tranquila
> del mundo, Nymphi.

`[SW: SW_YOSS_UNIDA → ON]`
*Yoss se une al grupo.*

---

### FASE 2 — Batalla: Nymphi y Yoss

**[BATALLA continúa]**

*El lobo ataca a ambas. Yoss cura y apoya. Nymphi ataca.*

---

### EVENTO — El lobo cae / Apertura del camino

**[EVENTO AUTOMÁTICO al terminar la batalla]**

`[SW: SW_LOBO_DERROTADO → ON]`

*El lobo retrocede. Las raíces oscuras se contraen ligeramente. El lobo no cae muerto: se sienta en el suelo, agotado.*

*Sus ojos cambian. Por un momento, el color vuelve a ellos.*

**Nymphi** *(pensamiento)*
> Está… calmado. Fue el esfuerzo.
> O algo más.

*El lobo emite un sonido bajo, casi como un lamento. Luego se levanta lentamente y camina hacia el fondo del claro.*

*Detrás de él, la vegetación se abre. Hay un camino que no estaba ahí antes.*

**Yoss**
> ¿Acabas de ver lo que yo vi?

**Nymphi**
> Sí.

**Yoss**
> Un lobo gigante corrompido nos atacó,
> lo derrotamos, y ahora nos está…
> ¿mostrando un camino secreto?

**Nymphi**
> Parece que sí.

**Yoss**
> ¿Y vamos a seguirlo?

*Pausa. Nymphi ya está caminando hacia el camino.*

**Yoss**
> Claro que sí. Por supuesto que sí.

*Yoss la sigue.*

`[SW: SW_CAMINO_MANANTIAL_ABIERTO → ON]`
`[VAR: VAR_PROGRESO_HISTORIA = 2]`

---

## ESCENA 0.8 — Visión del Manantial

**Mapa:** Sendero secreto (transición hacia el Manantial).
**Tipo:** Evento automático al entrar al sendero.

---

*El sendero es estrecho, con raíces que forman arcos naturales sobre el camino. La luz cambia: más suave, más verde.*

**Yoss**
> Oye. ¿Sientes eso?

**Nymphi**
> Sí.

**Yoss**
> ¿Qué es?

**Nymphi**
> No sé todavía.

*Silencio. Caminan unos pasos más.*

*De repente, Nymphi se detiene.*

**Nymphi** *(pensamiento)*
> Hay algo al final de este camino.
> Lo estoy escuchando.
> O lo estoy sintiendo.
> No sé cuál es la diferencia.

*Fade a negro. Fin del Capítulo 0.*

---

## RESUMEN DE INTERRUPTORES Y VARIABLES — Capítulo 0

| Interruptor / Variable | Momento de activación |
|---|---|
| SW_PROLOGO_INICIADO = ON | Inicio del juego |
| VAR_PROGRESO_HISTORIA = 0 | Inicio del juego |
| SW_MEDICINA_REVISADA = ON | Al revisar el frasco |
| SW_MISION_MEDICINA_ACTIVA = ON | Al aceptar ir al bosque |
| VAR_PROGRESO_HISTORIA = 1 | Al activar la misión |
| VAR_HIERBAS_RECOLECTADAS = 0→3 | Al recolectar cada hierba |
| SW_BOSQUE_ACCESO_INICIAL = ON | Al entrar al bosque |
| SW_YOSS_UNIDA = ON | Durante la batalla del lobo |
| SW_LOBO_DERROTADO = ON | Al terminar la batalla |
| SW_CAMINO_MANANTIAL_ABIERTO = ON | Tras la escena del lobo |
| VAR_PROGRESO_HISTORIA = 2 | Al abrir el camino secreto |

---

## NOTAS DE IMPLEMENTACIÓN EN RPG MAKER MZ

### Texto narrativo introductorio (Escena 0.1)
- Usar evento en mapa vacío o pantalla negra.
- Comando `Mostrar texto` con opción de ventana transparente o sin ventana para el texto literario.
- Usar `Tono de pantalla` + `Esperar` para el fade-in hacia la aldea.

### Monólogos internos de Nymphi
- Diferenciar visualmente del diálogo normal: color de texto distinto, sin nombre de personaje visible, o usando un nombre en cursiva como *Nymphi* con color gris.

### Diálogos de NPCs reactivos
- Usar condiciones de interruptor/variable para que los NPCs cambien sus líneas según el progreso:
  - Antes de SW_MISION_MEDICINA_ACTIVA: líneas de prólogo.
  - Después: líneas que comentan que Nymphi fue al bosque.

### Batalla del lobo en dos fases
- Crear dos eventos de batalla separados, o usar variables de enemigo condicionales.
- Al llegar el lobo al 40% de HP: activar `Escape del evento de batalla`, ejecutar la escena de Yoss y retomar la batalla con Yoss en el grupo.
- Alternativa más sencilla: preestablece el HP del lobo para la fase 2 y crea una tropa diferente con Yoss ya incluida.

### Objeto interactuable: frasco de medicina
- Evento de página única con condición: SW_MEDICINA_REVISADA = OFF.
- Tras la interacción: cambiar la página del evento (imagen del frasco vacío o sin brillo).

### Hierbas recolectables
- Tres eventos en el mapa de bosque, cada uno con condición de visibilidad según VAR_HIERBAS_RECOLECTADAS.
- Al recolectar la tercera: activar el evento de transición hacia el claro del lobo.

### Entrada de Yoss durante la batalla
- La forma más limpia en RPG Maker MZ es mediante un `Evento común` con condición de HP del enemigo, que interrumpe la batalla, ejecuta la cutscene de Yoss y reanuda el combate con la tropa actualizada.

---

*Fin del guion del Capítulo 0 — La aldea en la frontera.*
