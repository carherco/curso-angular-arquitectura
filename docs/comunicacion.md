# Comunicación entre componentes

## Comunicación entre componentes padre-hijo

La comunicación entre un componente padre y su hijo se realiza mediante las directivas @Input y @Output.

## Comunicación entre el resto de componentes

- Comunicación a través del _ancestro_ común.

Dos componentes que estén presentes al mismo tiempo en la pantalla, podrían comunicarse enviándole datos al padre mediante outputs y que el padre re-envíe esos datos al otro componente mediante inputs.

No es un método recomendable.

- Comunicación a través del routing

Cuando un componente ejecuta una navegación, puede enviar datos en la url. El componente asociado con dicha url puede leer dichos datos.

- Comunicación a través de servicios

Un componente podría utilizar un servicio como "almacén" de información. Otro componente podría leer esa información del servicio.

[Índice](index.md)
