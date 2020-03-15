# Módulos

## Root Module

Toda aplicación Angular tiene al menos una clase NgModule, **el módulo raíz**, convencionalmente llamado _AppModule_.

En aplicaciones pequeñas, solamente existirá el módulo raíz. En aplicaciones grandes, es recomendable separar la misma en diferentes módulos según funcionalidades, flujo de trabajo, o alguna otra característica.

Google nos recomienda crear los siguientes módulos:

- Shared Module
- Core Module
- Feature Modules

## SharedModule

Incluso en aplicaciones muy pequeñas es habitual tener "piezas" (componentes, directivas, pipes...) que se utilizan en muchos sitios de la aplicación.

Colocaremos estos elementos/utilidades en un módulo que comunmente se denomina **SharedModule**.

> ng g m shared

Let’s create some shared button components as an example in our SharedModule.

> ng g c shared/components/datepicker
> ng g d shared/directives/rotate
> ng g p shared/pipe/filterByName

En este módulo NO incluiremos ningún servicio. Los servicios "comunes" lo pondremos en el _Core Module_ que veremos en el siguiente apartado.

```ts
// src/app/shared/shared.module.ts
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { RotateDirective } from "./directives/rotate.directive";
import { filterByNamePipe } from "./pipes/filter-by-name.pipe";

@NgModule({
  declarations: [DatepickerComponent, RotateDirective, filterByNamePipe],
  imports: [CommonModule, FormsModule],
  exports: [DatepickerComponent, RotateDirective, filterByNamePipe]
})
export class SharedModule {}
```

En resumen, en el **Shared Module**:

- Declaramos componentes, pipes, directivas, y los exportamos.
- Importamos FormsModule, ReactiveFormsModule y cualquier módulo que necesitemos.
- Importamos el SharedModule en cualquier Feature Module que lo necesite.
- NO proveeremos servicios. Lo haremos en el CoreModule.
- NO importamos el SharedModule el el AppModule.

## Core Module

En el **Core Module** pondremos nuestros servicios _singleton_ y aquellos módulos que vayan a usarse por toda la aplicación pero que solamente necesiten importarse una única vez. Por ejemplo, el AuthService, el LocalStorageService..., pero también módulos como HttpClientModule, StoreModule.forRoot(…), TranslateModule.forRoot(…).

> ng g m core

> ng g s core/services/auth
> ng g s core/services/local-storage

```ts
// src/app/core/core.module.ts
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, HttpClientModule],
  exports: []
})
export class CoreModule {}
```

El Core Module se importa únicamente en el AppModule.

En resumen, en el Core Module:

- Importamos módulos que deben instanciarse una única vez en nuestra app.
- Colocamos (físicamente los servicios en el módulo, pero no los proveemos).
- NO declaramos componentes, pipes, directivas...
- NO importamos the CoreModule en ningún módulo que no sea el módulo raíz.

## Feature Modules

Los feature módules son módulos que agrupan elementos de angular referentes al mismo asunto/dominio...

Por ejemplo: UsersModule, InvoicesModule, ProductsModule...

Los Feature Modules normalmente importarán el SharedModule pero nunca el CoreModule.

Los Feature Modules son importados o bien en el módulo raíz (eager modules) o bien a través del routing (lazy modules).

```
ng g m User  --routing
installing module
  create src/app/user/user-routing.module.ts
  create src/app/user/user.module.ts
```

En user.module.ts

```typescript
@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserAddComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports:[
    UserCardComponent
  ]
  declarations: []
})
export class UserModule { }
```

Hace falta CommonModule, pero no BrowserModule. BrowserModule solamente es necesario en el raíz

[Índice](index.md)
