# Sintaxis de plantillas y data binding

El componente se "comunica" con su plantilla a través de lo que se denomina _data-binding_.

Desde la plantilla se puede acceder a cualquier propiedad pública del componente. (Recordemos que por defecto las propiedades de una clase son públicas)

## One way data binding (del componente a la template)

Se utiliza para:

- Interpolación
- Propiedades
- Atributos
- Clases
- Estilos

```jinja+html
  <h1>{{expression}}</h1>
  <img src="{{expression}}" />
  <img [src]="expression" />
  <img bind-src="expression" />
```

Las expresiones pueden ser una variable a secas, una operación, una llamada a una función...

La interpolación se indica con {{}}:

```jinja+html
  <div>El resultado de {{varA}} + {{varB}} es {{varA + varB}}</div>
  <div>El resultado de {{varA}} + {{varB}} es {{suma1(varA,varB)}}</div>
  <div>La persona se llama {{persona.nombre}}</div>
```

El binding en propiedades, atributos, clases, estilos... se realiza con [] o con el prefijo bind-:

```jinja+html
  <!-- Atributo (HTML) -->
  <option [selected]="isCarSelected" value="BMW">BMW</option>
  <div [class]="miClase">Elemento con una clase dinámica</div>

  <!-- Propiedad (DOM) -->
  <div [hidden]="isHidden">Este elemento puede estar o no estar</div>

  <!-- Clase -->
  <div [class.special]="isSpecial">Special</div>

  <!-- Estilos -->
  <p [style.color]=”miColor”>Párrafo de color dinámico</p>
```

NOTA: Atributos vs. Propiedades: https://angular.io/guide/template-syntax#html-attribute-vs-dom-property

Las expresiones que tienen _efectos colaterales_ están prohibidas como expresiones en las plantillas de angular:

- asignaciones (=, +=, -=, ...)
- new
- encadenar expresiones con ; or ,
- operadores de incremento o decremento (++ y --)

Tampoco son válidos en expresiones de plantilla de angular los operadores | y &.

Por otro lado, angular tiene algunos operadores que no existen en JavaScript/TypeScript: |, ?, y !.

Las expresiones en las plantillas pueden crear una gran aplicación, o romperla. LAs recomendaciones para generar expresiones son:
  
- No provoquen efectos colaterales
- Rápidas de evaluar
- Simples
- Idempotentes

La sintaxis de la interpolación {{ }} se puede cambiar con la propiedad **interpolation** de los metadatos del componente:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  interpolation: ['%%','%%']
})
```

https://angular.io/api/core/Component#interpolation

## One way data binding (de la template al componente)

Se utiliza para:

- Eventos

```jinja+html
  <button (click)="statement">Hello</button>
  <button on-click="statement">Hello</button>
```

Un statement puede ser una llamada a una función, una asignación...

```jinja+html
  <button (click)="enviar()">Hello</button>
  <button (click)="resultado = var1 + var2; mostrarResultado();">Hello</button>
```

En el contexto del evento, se crea una variable $event con información del mismo.

```jinja+html
  <input (keyUp)="onKeyUp($event)">
```

## One way data binding (de la template al componente y viceversa)

En ocasiones necesitamos que la vinculación de datos se produzca simultaneamente
desde el componente a la template y viceversa. El caso típico es el de los elementos de formularios.

En este código, cuando el usuario escribe en el input, aunque se actualiza la
variable persona.nombre, no se actualiza su valor interpolado.

```jinja+html
  <input  [value]="persona.nombre"/>
  <p>{{persona.nombre}}</p>
```

Una solución para que también se actualize la variable interpolada sería la siguiente:

```jinja+html
  <input [value]="persona.nombre" (keyup)="persona.nombre = $event.target.value"/>
  <p>{{persona.nombre}}</p>
```

Pero, esta operación en doble sentido (two-way binding) es muy frecuente, angular tiene una forma más sencilla de realizarlo.

## Two way data binding

Se utiliza en formularios template-driven

```jinja+html
  <input [(ngModel)]="variable" />
  <input bindon-ngModel="variable" />
```

[()] es una "abreviatura" de:

```jinja+html
  <input [ngModel]="variable" (ngModel)="variable=$event.target.value"/>
```

que internamente equivaldría más o menos a:

```jinja+html
  <input [value]="variable" (keyup)="variable=$event.target.value"/>
```

Nota: Para utilizar _ngModel_ necesitamos importar FormsModule.

```typescript
//src/app/app.moudle.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
...

@NgModule({

  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ...
  ],
  providers: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ejemplos:

- click-me
- incluir componente *click-me* varias veces

https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/

[Índice](index.md)
