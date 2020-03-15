# Routing

El _Angular Router_ es un servicio que presenta una vista de componente particular para una url dada.

No es parte del core de Angular, es una librería independiente (@angular/router).

## Rutas

Una ruta es un objeto que asocia un path con un componente:

```typescript
const appRoutes: Routes = [
  { path: "click-me", component: ClickMeComponent },
  { path: "galeria", component: GaleriaComponent },
  { path: "heroes", component: HeroListComponent },
  { path: "hero/:id", component: ChildCompComponent },
  {
    path: "heroes/marvel",
    component: HeroListComponent,
    data: { title: "Lista de héroes de Marvel", company: "marvel" }
  },
  {
    path: "heroes/dc",
    component: HeroListComponent,
    data: { title: "Lista de héroes de DC", company: "dc" }
  },
  { path: "", redirectTo: "/heroes", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];
```

- Cada elemento del array (ruta) mapea una URL a un componente.

- El _:id_ de la cuarta ruta indica un parámetro. Si la URL es /hero/42, "42" es el valor del parámetro _id_. El componente podrá utilizar este parámetro para encontrar y presentar el héroe cuyo id sea el 42. Más adelante aprenderemos más sobre los parámetros de ruta.

- La propiedad _data_ es un lugar para almacenar información asociada a la ruta.

- Con el _redirectTo_ del path vacío, conseguimos establecer cuál será la página incial. Si se usa redirectTo, es obligado utilizar _pathMatch_.

- pathMatch puede ser 'full' o 'prefix'. Si se pone 'prefix' se considerará coincidencia si la url comienza con lo indicado en path.

- El \*\* en la última ruta es un wildcard. Cualquier URL coincide con esta ruta.

- **El orden de las rutas en el array importa.** El router utiliza una estrategia "first-match wins". Si pusiéramos la ruta con path \*\* la primera de todas, siempre sería esa ruta la que se ejecutaría.

- Existe una opción **enableTracing** que se le puede pasar como segundo parámetro al método _RouterModule.forRoot()_ para activar debugging en las rutas en caso de que lo necesitemos.

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true })
    ...
  ],
  ...
})
export class AppModule { }
```

## Router outlet

Dada la configuración anterior, cuando la url del navegador se convierta en /heroes, el router encontrará la coincidencia con la ruta cuyo path es /heroes y mostrará el componente HeroListComponent después de la etiqueta &lt;router-outlet>

```html
<router-outlet></router-outlet>
```

## Router links

Para navegar a un link cualquiera, se utiliza la directiva _routerLink_

```html
<a routerLink="/heroes" routerLinkActive="active">Heroes</a>
<a [routerLink]="['/hero', hero.id]">Ver héroe {{hero.name}}</a>
```

La directiva RouterLinkActive coloca una clase "active" al elemento cuyo link es el activo. Se puede utilizar esta directiva con el elemento padre de routerLink.

RouterLink, RouterLinkActive and RouterOutlet son directivas incluidas en el paquete RouterModule. Están listas para utilizar en las plantillas.

## Router state

Se puede acceder a un objeto RouterState desde cualquier lugar de la aplicación utilizando el servicio Router service y la propiedad routerState.

Cada ActivatedRoute en el RouterState proporciona métodos para navegar por el árbol de rutas y obtener información sobre la ruta _padre_, la ruta _hija_ y las rutas \*hermanas".

## Activated route

El path de la ruta y los parámetros están disponibles a través del servicio ActivatedRoute. Este servicio proporciona información muy útil:

- **url:** Un Observable del path (o paths) de la ruta, representado como un array de strings para cada parte del path.
- **data:** Un Observable que contiene el objeto data proporcionado por la ruta.
- **paramMap:** Un Observable que contiene un Map de los parámetros opcionales y obligatorios de la ruta.
- **queryParamMap:** Un Observable que contiene un Map de todos los query param disponibles para todas las rutas.
- **fragment:** Un Observable del URL fragment disponible para todas las rutas.
- **outlet:** El nombre del RouterOutlet utilizado para renderizar la ruta. A un outlet sin nombre, se le asigna el nombre \*primary.
- **routeConfig:** La configuración utilizada para la ruta.
- **parent:** El objeto ActivatedRoute del "padre" cuando la ruta actual es una ruta "hija".
- **firstChild:** El objeto ActivatedRoute de la primera de las rutas "hijas" de la ruta actual.
- **children:** Contiene todas las rutas "hijas" activadas por la ruta actual.

## Router events

Durante cada navegación, el router emite eventos. Los eventos son Observables, así que podemos suscribirnos a ellos, filtrarlos, etc.

La lista de eventos es la siguiente:

(https://angular.io/guide/router#router-events)

- NavigationStart: Se lanza cuando comienza la navegación.
- NavigationEnd: Se lanza cuando la navegación termina satisfactoriamente.
- NavigationCancel: Se lanza cuandlo la navegación se cancel. Esto ocurre cuando el Route Guard devuelve un valor "false" durante la navegación.
- NavigationError: Se lanza cuando la navegación falla.
- RoutesRecognized: Se lanza cuando el Router parsea la URL y la ruta es reconocida.
- RouteConfigLoadStart: Se lanza antes de que el Router cargue de forma _lazy_ una configuración de rutas.
- RouteConfigLoadEnd: Se lanza después de que una configuración de rutas se haya cargado de forma _lazy_.

### Cómo suscribirnos a un evento

```typescript
constructor(router:Router) {
  router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
    }
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
  }
});
```

https://blog.angularindepth.com/angular-router-series-pillar-2-navigation-d050286bf4fa

## Route Guard

En principio cualquier usuario puede navegar a cualquier lugar en cualquier momento. Pero ese no es siempre el comportamiento deseado:

- Quizás el usuario no está autorizado para acceder a un componente concreto.
- Quizás el usuario tiene que hacer login primero.
- Quizás necesitas ciertos datos antes de poder renderizar el componente.
- Quizás necesites guardar cambios pendientes antes de salir de un componente.
- Quizás haya que preguntar al usuario si le parece bien descartar los cambios pendientes en lugar de guardarlos.

Se pueden añadir _guards_ a la configuración de las rutas para manejar estos escenarios.

Un _guard_ devuelve un valor que controla el comportamiento del router

- Si devuelve _true_ la navegación continúa su curso.
- Si devuelve false, el proceso se cancela y el usuario se queda donde está.

## Acceso a Router

```typescript
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

constructor(
  private router: Router
) {}

gotoHeroes() {
  this.router.navigate(['/heroes']);
  //Parámetros opcionales
  //this.router.navigate(['/heroes', { id: heroId, otro: 'otro' }]);
}
```

```
localhost:3000/heroes;id=15;otro=otro
```

Esa URL es muy rara y quizás no la hayamos visto nunca. Se llama notación _Matrix URL_. Esta idea se introdujo en en una propuesta de 1996 por el fundador de la web, Tim Berners-Lee. Y aunque nunca se llegó a convertir en un estándar de HTML, es legal (válido) y está adoptado por todos los navegadores

## Acceso a ActivatedRoute y ParamMap

Para obtener el valor de los parámetros, accedemos al paramMap de ActivatedRoute.

```typescript
export class UserEditComponent implements OnInit {
  user: User;

  private selectedId: number;

  constructor(private service: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          // (+) before `params.get()` turns the string into a number
          this.selectedId = +params.get("id");
          return this.service.getUser(this.selectedId);
        })
      )
      .subscribe(u => (this.user = u));
  }
}
```

O el equivalente sin switchMap

```typescript
  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        this.service.getUser(this.selectedId).subscribe(
          u => this.user = u
        );
      });
  }
```

Recordemos que ParamMap es un Observable. Todavía no sabemos qué son ni cómo utilizarlos, pero ya llegaremos a ellos en futuras lecciones.

### API de ParamMap

- has(name): Devuleve true si el parámetro _name_ existe
- get(name): Devuelve el valor (siempre un string) del parámetro _name_ o _null_ si el parámetro no existe. Si el parámetro es un array de valores, devuelve solamente el primer elemento.
- getAll(name): Devuelve un array de strings con los valores del parámetro _name_ o un array vacío si el parámetro no existe. Se usa getAll cuando un único parámetro puede tener múltiples valores.
- keys: Devuelve un array de strings con todos los nombres de los parámetros.

NOTA: se puede obtener también el parámetro sin utilizar observables:

```typescript
ngOnInit() {
  let id = this.route.snapshot.paramMap.get('id');
  this.hero$ = this.service.getHero(id);
}
```

## Cómo obtener los parámetros extra

```typescript
ngOnInit() {
  this.route.data
    .subscribe((data) => {
      this.title = data.title;
    });
}
```

## Rutas anidadas

Las rutas se pueden anidar con la propiedad **children**:

```typescript
{ path: 'nested', component: NestedComponent, children: [
  { path: '', component: NestedChildComponent },
  { path: 'child2', component: NestedChild2Component },
  { path: 'child3', component: NestedChild3Component }
]},
```

Con la configuración anterior, el componente _NestedComponent_ puede tener su propio _router-outlet_ y cargar componentes en él.

La ruta /nested cargaría el componente NestedComponent en el router-outlet de AppComponent y cargaría NestedChildComponent en el router outlet de NestedComponent.

La ruta /nested/child2 cargaría el componente NestedComponent en el router-outlet de AppComponent y cargaría NestedChild2Component en el router outlet de NestedComponent.

La ruta /nested/child3 cargaría el componente NestedComponent en el router-outlet de AppComponent y cargaría NestedChild2Component en el router outlet de NestedComponent.

```html
<h2>Componente Nested</h2>

<a routerLink="./" routerLinkActive="active">Child</a>
<a routerLink="./child2" routerLinkActive="active">Child2</a>
<a routerLink="./child3" routerLinkActive="active">Child3</a>

<router-outlet></router-outlet>
```

## Outlets

```
<router-outlet></router-outlet>
<router-outlet name='left'></router-outlet>
<router-outlet name='right'></router-outlet>

<div class="columns">
  <md-card>
    <router-outlet name="list"></router-outlet>
  </md-card>
  <md-card>
    <router-outlet name="bio"></router-outlet>
  </md-card>
</div>

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'speakers', component: SpeakersComponent, children: [
    { path: 'speakersList', component: SpeakersListComponent, outlet: 'list' },
    { path: ':id', component: BioComponent, outlet: 'bio' }
  ] }
];


<button md-button
  [routerLink]="['/speakers', {outlets: {'list': ['speakersList'], 'bio': ['none']}}]">
  Speakers
</button>


<router-outlet
  (activate)='onActivate($event)'
  (deactivate)='onDeactivate($event)'></router-outlet>

```

https://blog.angularindepth.com/angular-router-series-secondary-outlets-primer-139206595e2

[Índice](index.md)
