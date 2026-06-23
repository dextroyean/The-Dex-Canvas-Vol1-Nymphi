# Nymphi — Capítulo 2: Templo de Viento
## El primer Eco

---

> **Convenciones**
> - `[EVENTO AUTOMÁTICO]` → Se ejecuta solo al entrar al mapa o por condición.
> - `[INTERACCIÓN]` → El jugador presiona acción sobre un objeto o NPC.
> - `[BATALLA]` → Evento de combate.
> - `[SW: NOMBRE]` → Activar interruptor.
> - `[VAR: NOMBRE = X]` → Asignar valor a variable.
> - *Cursiva* → Acotación de escena o pensamiento interno.
> - **[GUARDIÁN] = Aelris** *(cambia el nombre si eliges otro)*

---

## ESCENA 2.1 — Sendero exterior al Templo de Viento (Área 1)

**Mapa:** Sendero al Templo de Viento — primera zona exterior.
**Tipo:** Evento automático al entrar al mapa.
**Música:** Ligera, mística, flautas y viento. Sin percusión pesada.

---

*Nymphi y Yoss caminan por un sendero elevado. Hojas sueltas flotan sin dirección clara. El viento tiene un sonido distinto aquí, más suave, casi intencionado.*

**[EVENTO AUTOMÁTICO al entrar al mapa]**

**Nymphi** *(pensamiento)*
> El viento aquí no es solo viento.
> Está diciendo algo. Algo que no termino
> de escuchar desde que salimos del Manantial.

**Yoss**
> El sendero sube bastante. Solo digo que si
> las ninfas eran tan sabias, podrían haber
> puesto el templo en un lugar más accesible.
> ¿Un campo? ¿Una plaza? ¿Cualquier sitio sin cuesta?

**Nymphi**
> Yoss.

**Yoss**
> Sí, sí. Ya voy.

---

*Control pasa al jugador. Objetos interactuables opcionales en el mapa.*

---

**[INTERACCIÓN — Ruinas con marcas borrosas]**

**Nymphi** *(pensamiento)*
> Hay marcas aquí. Muy antiguas.
> No puedo leerlas, pero el viento se mueve
> diferente cuando las toco. Como si
> respondiera.

---

**[INTERACCIÓN — Planta moviéndose sin viento visible]**

**Yoss**
> Oye. ¿Esa planta se está moviendo sola?

**Nymphi**
> Sí.

**Yoss**
> Y tú estás muy tranquila al respecto.

**Nymphi**
> Ya me acostumbré.

**Yoss**
> Qué envidia me da eso.

---

**[INTERACCIÓN — Campana de piedra colgante]**

*Nymphi toca la campana levemente. El sonido se expande más de lo normal, como si el aire lo llevara lejos.*

**Nymphi** *(pensamiento)*
> Hay algo resonando aquí.
> No en la campana. Debajo de ella.
> En el lugar mismo.

---

## ESCENA 2.2 — Sendero exterior (Área 2) / Entrada al Templo

**Mapa:** Sendero al Templo de Viento — segunda zona exterior, llegando a la entrada.
**Tipo:** Evento automático al entrar al mapa.

---

*La entrada del templo aparece al fondo. Piedra antigua, arcos naturales formados por raíces y roca. Corrientes de aire visibles como partículas o efectos de mapa.*

**[EVENTO AUTOMÁTICO al entrar al mapa]**

**Yoss**
> Buena arquitectura. Para ser un lugar
> corrompido, tiene su encanto.

**Nymphi**
> ¿Eso es lo que estás pensando ahora mismo?

**Yoss**
> Puedo apreciar la estética y estar
> asustada al mismo tiempo.
> Soy multitarea.

*Nymphi se detiene frente a la entrada. Cierra los ojos un momento.*

**Nymphi** *(pensamiento)*
> Hay algo adentro. Lo siento desde aquí.
> Algo que lleva mucho tiempo esperando
> que alguien llegue.

`[SW: SW_TEMPLO_VIENTO_ACCESO → ON]`
`[VAR: VAR_TEMPLO_ACTUAL = 1]`

*Entran. La música cambia: más cerrada, más antigua.*

**Yoss**
> Frío. Esperaba más viento.

**Nymphi**
> Está dentro. Moviéndose entre las paredes.

**Yoss** *(en voz baja)*
> Eso es más inquietante, no menos.

---

## ESCENA 2.3 — Primer piso descendente

**Mapa:** Templo de Viento — Piso 1 (superior).
**Tipo:** Evento automático al bajar al primer nivel.

---

*El primer piso desciende levemente. Las paredes tienen ranuras por donde el aire circula con un sonido constante y suave. Algunas campanas cuelgan del techo, moviéndose solas.*

**[EVENTO AUTOMÁTICO al entrar al mapa]**

*Una voz. Difusa, como palabras que el viento arrastra desde lejos. Fragmentada.*

**VOZ DEL ECO**
> *…alguien… llegó…*

*Nymphi y Yoss se detienen.*

**Nymphi**
> ¿Escuchaste eso?

**Yoss**
> La voz que sonó de la nada en el templo oscuro, ¿esa?
> Sí. La escuché.

**Nymphi** *(pensamiento)*
> No es una voz humana. Pero tampoco
> es peligrosa. Es como cuando el bosque
> intenta decirme algo y yo tengo que
> quedarme quieta para oírlo.

---

*Control pasa al jugador. Objetos interactuables en el piso.*

---

**[INTERACCIÓN — Campanas del templo]**

*Nymphi toca una campana. El sonido se propaga de forma extraña, más lento de lo normal.*

**VOZ DEL ECO**
> *…el viento recuerda lo que el tiempo olvidó…*

**Nymphi** *(pensamiento)*
> Es un fragmento. Como si alguien hubiera
> dejado palabras dentro del aire mismo.
> No para todos. Para alguien que supiera escuchar.

---

**[INTERACCIÓN — Corriente de viento visible en el mapa]**

*Nymphi extiende la mano hacia la corriente. El aire rodea sus dedos.*

**VOZ DEL ECO**
> *…nosotras lo escuchábamos. Todo.
> Cada raíz. Cada nombre. Cada despedida…*

**Nymphi**
> ¿Nosotras?

*La corriente se disipa suavemente.*

**Yoss**
> ¿Quiénes son "nosotras"?

**Nymphi**
> No lo sé todavía.

---

**[INTERACCIÓN — Raíz oscura bloqueando un pasaje]**

*La corrupción llegó hasta aquí también. Una raíz oscura cierra parcialmente un pasillo.*

**Yoss**
> ¿Podemos pasar?

*Nymphi usa Eco Natural. La raíz se contrae lentamente, abriendo el camino.*

**Yoss**
> Muy práctica esa habilidad.
> ¿Tiene más usos? ¿Cafetería? ¿Lavandería?

**Nymphi**
> No.

**Yoss**
> Lástima.

---

## ESCENA 2.4 — Segundo piso descendente

**Mapa:** Templo de Viento — Piso 2 (intermedio).
**Tipo:** Evento automático al bajar al segundo nivel.

---

*El segundo piso es más oscuro. Las paredes tienen relieves de figuras que ya no se distinguen bien. El viento aquí es más constante, casi musical.*

**[EVENTO AUTOMÁTICO al entrar al mapa]**

**VOZ DEL ECO**
> *…protegíamos el Manantial.
> Era nuestro vínculo con el mundo.
> Nuestra razón…*

**Nymphi**
> ¿Quiénes eran?

**VOZ DEL ECO**
> *…ninfas. Guardianas del agua,
> de la memoria, del tiempo
> que fluye entre las raíces…*

*Pausa. Yoss mira a Nymphi.*

**Yoss**
> Espera. ¿Ninfas?
> ¿Como… Nymphi?

*Silencio. La voz no responde.*

**Nymphi** *(pensamiento)*
> Ninfas. La voz habla de ninfas.
> Y me habla a mí.
> No es una coincidencia.
> Nunca lo fue.

---

*Control pasa al jugador. Hay un mural semidestruido en el centro de la sala.*

---

**[INTERACCIÓN — Mural antiguo semidestruido]**

*Nymphi activa Eco Natural sobre el mural.*

`[SW: SW_ECO_NATURAL_ACTIVO → ON para activar animación breve]`

*Las figuras del mural cobran vida brevemente como una visión tenue: siluetas etéreas de mujeres moviéndose alrededor de algo que brilla. El Manantial, en su época de esplendor.*

**Nymphi** *(pensamiento)*
> No solo conocían el Manantial.
> Lo cuidaban. Era su función.
> Su propósito dentro del mundo.

*La visión se apaga.*

**Yoss** *(en voz baja)*
> Nymphi. ¿Estás bien?

**Nymphi**
> Sí. Solo estoy… entendiendo algo.

**Yoss**
> ¿Algo bueno o algo del tipo
> "voy a necesitar un momento"?

**Nymphi**
> Aún no sé cuál de las dos.

---

**[INTERACCIÓN — Símbolo de viento grabado en el suelo]**

**Nymphi** *(pensamiento)*
> Este símbolo es el mismo que vi
> en el mural. Es la marca del templo.
> Del primer Eco.

---

## ESCENA 2.5 — Tercer piso descendente

**Mapa:** Templo de Viento — Piso 3 (profundo).
**Tipo:** Evento automático al bajar al tercer nivel.

---

*El piso más profundo antes de la sala del Eco. El viento aquí es intenso, casi visible. Las paredes vibran levemente. La voz es más clara.*

**[EVENTO AUTOMÁTICO al entrar al mapa]**

**VOZ DEL ECO**
> *…tú también lo escuchas.
> El bosque. El agua.
> El pulso de lo que vive…*

**Nymphi**
> Sí.

**VOZ DEL ECO**
> *…eso no es magia humana.
> Nunca lo fue…*

*Silencio largo. Nymphi no responde de inmediato.*

**Nymphi** *(pensamiento)*
> Lo sabía. Desde niña lo sabía.
> Que lo que siento no es igual a
> lo que sienten los demás.
> Escucharlo así en voz alta es diferente.
> Duele de una forma que no esperaba.

*Yoss camina a su lado en silencio un momento.*

**Yoss** *(sin broma, tranquila)*
> Oye. Sea lo que sea que esa voz
> está intentando decirte…
> no tienes que procesarlo todo ahora mismo.
> Aquí estoy.

*Nymphi la mira.*

**Nymphi**
> Gracias, Yoss.

**Yoss**
> Además, si resulta que eres algo
> especial, antiguo y misterioso…
> yo lo sabía desde antes.
> Solo digo eso.

**Nymphi** *(pequeña sonrisa)*
> Claro que sí.

---

*Control pasa al jugador. Hay una piedra central en la sala con un símbolo pulsante.*

---

**[INTERACCIÓN — Piedra con símbolo de viento pulsante]**

*Nymphi toca la piedra. El viento en la sala se concentra.*

**VOZ DEL ECO**
> *…el Eco del Viento espera.
> Ha esperado mucho tiempo.
> Ven…*

*La puerta al fondo se abre lentamente.*

`[SW: SW_SALA_ECO_VIENTO_ABIERTA → ON]`

**Yoss**
> ¿Una puerta que se abre sola?
> Clásico.

**Nymphi**
> ¿Entramos?

**Yoss**
> Como si hubiera otra opción.

---

## ESCENA 2.6 — Sala del Eco del Viento / Pre-jefe

**Mapa:** Sala del Eco del Viento.
**Tipo:** Evento automático al entrar.

---

*La sala final es circular. En el centro flota una esfera de energía de viento, hermosa y antigua. En sus bordes exteriores, raíces oscuras la rodean sin poder penetrarla del todo. La sala tiembla ligeramente.*

**[EVENTO AUTOMÁTICO al entrar]**

**Yoss**
> Eso es… bonito y aterrador al mismo tiempo.

**Nymphi**
> Es el Eco del Viento.

*Nymphi se acerca despacio. Cuando está a mitad de camino…*

*Algo desciende desde el techo. Grande. Hecho de viento y piedra corrompida. Sus ojos brillan con una luz apagada, casi sin color.*

*El Guardián del Viento: Aelris.*

**VOZ DEL ECO** *(fragmentada, asustada)*
> *…guardián… no… todavía no recuerda…*

**Nymphi**
> Está corrompido. Igual que el lobo.

**Yoss**
> ¿Plan?

**Nymphi**
> Liberar sin dañar permanentemente.

**Yoss**
> Ese es el plan "no tenemos plan" disfrazado.
> Bien. Vamos.

---

## ESCENA 2.7 — Batalla: Aelris, Guardián del Viento Corrompido

**[BATALLA]**

**Enemigo:** Aelris — Guardián del Viento Corrompido
**BGM:** Tema de jefe tenso, cuerdas y viento distorsionado.

**Mecánica de combate:**
- Ataques rápidos de ráfaga: daño moderado al grupo.
- Ventisca: aplica estado *Silencio del Bosque* a Nymphi.
- Evasión alta en turnos pares.
- Regeneración baja sostenida por las raíces oscuras.

**Condición especial:** Cuando Aelris llega al 25% de HP, se activa el evento narrativo de la voz.

---

**[EVENTO AUTOMÁTICO al llegar Aelris al 25% de HP]**

*La batalla se pausa. Aelris retrocede un paso.*

**VOZ DEL ECO** *(más clara que antes)*
> *…recuerda. Recuerda para qué fuiste creado.
> No para guardar. Para proteger.
> Hay diferencia…*

*Aelris vacila. Las raíces oscuras que lo cubren se contraen ligeramente.*

**Nymphi**
> Escucha la voz. Todavía está ahí.

*Yoss cura al grupo en silencio, mirando a Aelris.*

**Yoss** *(en voz baja)*
> Dale un segundo.

*Un momento de quietud. Aelris baja levemente la cabeza.*

**Nymphi**
> Ahora.

*La batalla continúa. Un turno de apertura para el golpe final.*

---

## ESCENA 2.8 — Post-batalla / Obtención del Eco del Viento

**[EVENTO AUTOMÁTICO al terminar la batalla]**

`[SW: SW_VAELORN_LIBERADO → ON]`

*Aelris cae de rodillas. Las raíces oscuras se disuelven lentamente desde su interior hacia afuera. Su forma se vuelve más ligera, casi translúcida.*

*El Eco del Viento en el centro de la sala deja de temblar. Se estabiliza.*

**VOZ DEL ECO** *(serena)*
> *…gracias. Por no olvidarnos.*

*Aelris mira a Nymphi un momento. Luego se disuelve en viento y desaparece hacia arriba.*

*Silencio.*

**Yoss**
> ¿Está bien? ¿Lo… matamos?

**Nymphi**
> No. Regresó a lo que era.
> El guardián vuelve cuando el Eco esté sano.

*Nymphi camina hacia el Eco del Viento. Lo toca con ambas manos.*

---

**[VISIÓN — Fragmento del pasado]**

*Pantalla con efecto de luz suave. Imágenes fugaces:*

- *El Manantial Sagrado en su esplendor: agua clara, corrientes vivas, flores de colores intensos.*
- *Ninfas moviéndose alrededor del Manantial. Voces mezcladas con el viento, indistinguibles pero cálidas.*
- *Una ninfa que se detiene. Mira hacia adelante. Mira hacia donde está Nymphi.*
- *Sonríe.*

*La visión se apaga.*

---

*Nymphi abre los ojos. Tiene el Eco del Viento en las manos. Brilla limpiamente.*

`[SW: SW_ECO_VIENTO_OBTENIDO → ON]`
`[SW: SW_CORRIENTE_VIENTO_RESTAURADA → ON]`
`[VAR: VAR_ECOS_RECUPERADOS = 1]`
`[VAR: VAR_PROGRESO_HISTORIA = 5]`

*Notificación: Eco Natural mejora — nueva habilidad o poder ampliado.*

---

**Yoss**
> ¿Qué viste?

**Nymphi**
> Las ninfas. Muchas. Juntas alrededor
> del Manantial. Era… era hermoso, Yoss.
> No como algo perdido. Como algo
> que realmente existió.

**Yoss**
> ¿Y?

**Nymphi**
> Me vio una. Solo por un segundo.
> Me miró directo.

**Yoss**
> ¿Qué hizo?

**Nymphi**
> Sonrió.

*Silencio entre las dos. La sala está quieta ahora. El Eco brilla suavemente en las manos de Nymphi.*

**Yoss** *(suave)*
> Para ser un templo oscuro y corrompido…
> no terminó tan mal.

**Nymphi**
> No.

---

## ESCENA 2.9 — Salida del Templo / Cierre del Capítulo 2

**Mapa:** Sendero exterior al Templo de Viento — regreso.
**Tipo:** Evento automático al salir del templo.

---

*El cielo fuera del templo se ve levemente diferente. El viento se mueve de otra forma: más limpio, más abierto.*

**[EVENTO AUTOMÁTICO al entrar al sendero exterior]**

*Nymphi se detiene y mira hacia arriba.*

**Nymphi** *(pensamiento)*
> Las ninfas protegían el Manantial.
> Era su función. Su razón dentro del mundo.
> Y yo puedo escuchar lo mismo que ellas escuchaban.
> Siempre pude.
> Solo no sabía qué significaba.

*Yoss camina a su lado.*

**Yoss**
> ¿Adónde sigue?

**Nymphi**
> El Eco del Hielo.

**Yoss**
> ¿Frío?

**Nymphi**
> Probablemente.

**Yoss**
> Genial. Odio el frío.

**Nymphi**
> Lo sé.

**Yoss**
> ¿Y vas a hacer algo al respecto?

**Nymphi**
> No.

**Yoss**
> Esperaba esa respuesta.

*Caminan juntas hacia el sendero de bajada. El viento las acompaña.*

`[SW: SW_RUTA_TEMPLO_HIELO_DISPONIBLE → ON]`
`[VAR: VAR_TEMPLO_ACTUAL = 2]`

*Fade a negro.*

**Fin del Capítulo 2 — El primer Eco**

---

## RESUMEN DE INTERRUPTORES Y VARIABLES — Capítulo 2

| Interruptor / Variable | Momento de activación |
|---|---|
| SW_TEMPLO_VIENTO_ACCESO = ON | Al entrar al templo |
| VAR_TEMPLO_ACTUAL = 1 | Al entrar al templo |
| SW_ECO_NATURAL_ACTIVO = ON | Al activar mural del piso 2 |
| SW_SALA_ECO_VIENTO_ABIERTA = ON | Al tocar la piedra del piso 3 |
| SW_VAELORN_LIBERADO = ON | Al terminar la batalla |
| SW_ECO_VIENTO_OBTENIDO = ON | Al tomar el Eco |
| SW_CORRIENTE_VIENTO_RESTAURADA = ON | Al tomar el Eco |
| VAR_ECOS_RECUPERADOS = 1 | Al tomar el Eco |
| VAR_PROGRESO_HISTORIA = 5 | Al tomar el Eco |
| SW_RUTA_TEMPLO_HIELO_DISPONIBLE = ON | Al salir del templo |
| VAR_TEMPLO_ACTUAL = 2 | Al salir del templo |

---

## NOTAS DE IMPLEMENTACIÓN EN RPG MAKER MZ

### Voz del Eco
- Usar texto sin ventana de personaje visible, o con nombre en gris/cursiva tipo *Eco del Viento*.
- Color de texto diferente al diálogo normal para distinguirla (sugerido: blanco o azul claro).
- Agregar efecto de sonido de viento suave antes de cada línea de la voz.

### Mural con visión (Piso 2)
- Crear evento de página doble: página 1 sin condición (antes de la interacción), página 2 con SW_ECO_NATURAL_ACTIVO = ON.
- La visión puede implementarse con un flash de pantalla blanco + imagen de fondo temporal (Picture) de 2 a 3 segundos.

### Aelris — Batalla en dos fases
- La condición del 25% de HP activa un Evento Común.
- El Evento Común pausa la batalla, ejecuta la escena narrativa y luego termina dejando que el jugador dé el golpe final.
- En RPG Maker MZ esto se puede lograr con una habilidad de Aelris que al llegar a cierto HP ejecuta un estado que detiene sus acciones por 1 turno y activa el evento paralelo.

### Visión post-batalla
- Implementar con `Mostrar imagen` (Picture) + `Tono de pantalla` claro + texto narrativo + `Borrar imagen` gradual.
- La música puede bajar o cambiar a un tema suave durante la visión.

### Mejora de Eco Natural
- Mostrar notificación de nueva habilidad aprendida después de la visión, no antes.
- Sugerido: una habilidad nueva o el incremento de poder de una existente.

---

*Fin del guion del Capítulo 2 — Templo de Viento.*
