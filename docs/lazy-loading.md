# Estrategias de carga de módulos

- Eager Loading: utilizada normalmente para cargar el core module y aquellos feature modules que se requieran justo al inicio de la aplicación.
- Pre-Loading: utilizada normalmente para cargar aquellos feature modules que tienen una alta probabilidad de necesitarse "pronto" una vez la aplicación se ha inicializado.
- Lazy Loading: utilizada normalmente para cargar módulos bajo demanda.

## Eager Loading

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

En user-routing.module.ts

```typescript
const routes: Routes = [
  { path: "", component: AdminHomeComponent },
  { path: "users/list", component: UsersListComponent },
  { path: "users/edit/:id", component: UsersEditComponent },
  { path: "users/new", component: UsersAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
```

Y en nuestro módulo raíz

```typescript
@NgModule({
  imports: [
    ...
    UserModule
    ...
  ],
})
export class AppModule { }
```

Y en el routing padre

```typescript
{
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule' // Antes de Angular 8
    loadChildren: () => import('app/user/user.module').then(mod => mod.UserModule) }, // A partir de Angular 8
},
```

Por ejemplo, en app.component.html añadimos un enlace al componente exportado (UserHomeComponent)

```typescript
<li>
  <a class="nav-link" routerLink="/user" routerLinkActive="active">
    Admin Home
  </a>
</li>
```

Nota: Angular-cli integra por defecto los elementos que genera en el módulo más "cercano" que encuentre.
Si queremos que estén integrados en otro módulo distinto, debemos ejecutar el comando de la siguiente manera:

> ng g component nombre-componente --module=nombre-modulo

## Lazy loading

### Lazy loading bajo demanda

Para activar lazy loading en un módulo necesitamos:

- Cargar un módulo en el path del routing padre
- Definir una ruta por defecto en el módulo lazy
- Configurar el routerModule del módulo lazy con .forChild()
- NO incluir el módulo lazy en el módulo raíz

Ejemplo: Vamos a unos cuantos módulos y componentes

```
ng g m lazy1
ng g m lazy2
ng g m lazy3
ng g m lazy4
ng g m lazy5
ng g c lazy1 --module=lazy1
ng g c lazy2 --module=lazy2
ng g c lazy3 --module=lazy3
ng g c lazy4 --module=lazy4
ng g c lazy5 --module=lazy5
```

Y a configurar el routing

```typescript
{ path: 'user', loadChildren: () => import('app/user/user.module').then(mod => mod.UserModule) },
{ path: 'lazy1', loadChildren: () => import('app/lazy1/lazy1.module').then(mod => mod.Lazy1Module) },
{ path: 'lazy2', loadChildren: () => import('app/lazy2/lazy2.module').then(mod => mod.Lazy2Module) },
{ path: 'lazy3', loadChildren: () => import('app/lazy3/lazy3.module').then(mod => mod.Lazy3Module) },
{ path: 'lazy4', loadChildren: () => import('app/lazy4/lazy4.module').then(mod => mod.Lazy4Module) },
{ path: 'lazy5', loadChildren: () => import('app/lazy5/lazy5.module').then(mod => mod.Lazy5Module) },
```

### Lazy loading con preloading

La librería de routing ofrece dos estrategias de preloading:

- No preloading (por defecto). Los módulos se cargan bajo demanda.
- Preloading de TODOS los módulos.

Para activar el preloading basta configurar el método .forRoot() con la propiedad _preloadingStrategy_:

```typescript
RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});
```

Si recargamos la aplicación, veremos cómo empiezan a descargarse los módulos de forma lazy justo inmediatamente después de que el componente actual haya sido renderizado completamente en la pantalla.

> Nota: Los Guards de tipo canLoad pueden impedir que se cargue un módulo lazy.

## Custom preloading

También es posible programar estrategias de preloading personalizadas.

Para este ejemplo, vamos a poner una propiedad preload en el data de las rutas de un par de módulos:

```typescript
{ path: 'user', loadChildren: 'app/user/user.module#UserModule', data: { preload: true } },
{ path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
{ path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
{ path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module'},
{ path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module', data: { preload: true } },
{ path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
```

Y vamos a crear un servicio que implemente un preloading selectivo:

> ng g s selective-preloading-strategy --module=app-routing

Debemos implementar el interfaz PreloadingStrategy, que nos obliga a implementar la función preload().

```typescript
import "rxjs/add/observable/of";
import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      console.log("Preloaded: " + route.path);
      return load();
    } else {
      return Observable.of(null);
    }
  }
}
```

En este ejemplo, solo se cargarán los módulos que tengan una propiedad preload con valor true.

Ahora cambiamos el preloadingStrategy del módulo de routing por el nuestro.

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
```

https://angular.io/guide/router#preloading-background-loading-of-feature-areas

https://angular.io/guide/router#custom-preloading

[Índice](index.md)
