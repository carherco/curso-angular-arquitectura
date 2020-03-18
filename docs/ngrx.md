# NgRx

La librería NgRx nos ayuda a utilizar Redux en nuestro proyecto de Angular.

## Instalación

Para utilizar NgRx, necesitamos isntalar las propias librerías más algunas herramientas de desarrollo que añaden potencia al CLI de Angular.

El comando add del CLI nos facilita la tarea.

> ng add @ngrx/store

## Comandos

Ahora con el CLI de Angular podemos hacer más cosas: 

- Generar el store raíz:

> ng g st RootState

- Generar el reductor y las acciones y el interface para una funcionalidad concreta: 

> cd .\src\app\reducers\

> ng g r user

> ng g a user 

## Adaptación a la librería

### En el módulo

```ts
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store‐devtools';
import { metaReducers, reducers } from './reducers';
@NgModule({
  imports: [
     StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal })
  ]
})
```

### State

Lo primero que haremos será definir un interfaz para nuestro state. Se suele llamar State pero lo llamaré RootState en este documento.

```ts
// En el fichero reducers/index.ts
export interface RootState {
  users: UsersState;
  invoices: InvoicesState;
  ...
}
```

### reducers

La librería necesita un mapeo entre cada propiedad del state y la función reductora asociada:

```ts
// En el fichero reducers/index.ts
export const rootReducers: ActionReducerMap<RootState> = {
  users: usersReducer;
  invoices: invoicesReducer;
};
```

Las funciones reductoras estarán en un fichero a parte. No deben estar incluidas en ninguna clase.

```ts
export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
```

### Actions

```ts
export enum UserActionTypes {
  LoadUsers = '[USER]_Load',
  SelectUser = '[USER]_Select',
  AddUser = '[USER]_Add',
  UpdateUser = '[USER]_Update',
  DeleteUser = '[USER]_Delete',
  CloseMessageUser = '[USER]_CloseMessage'
}
```

```ts
export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
  constructor(public readonly payload: User[]) {}
}
```

```ts
export type UserActions = LoadUsers | SelectUser | AddUser | UpdateUser | DeleteUser | CloseMessageUser;

```

### Index y reducers

```ts
import * as fromUser from './user.reducer';
import * as fromInvoice from './user.reducer';


export const rootStateFeatureKey = 'rootState';

export interface RootState {
  users: fromUser.State;
  invoices: fromInvoice.State;
}

export const reducers: ActionReducerMap<RootState> = {
  users: fromUser.reducer,
  invoices: fromInvoice.reducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
```

## Dispatch y select

```ts
export class CarContainerComponent implements OnInit {

  public motor = { speed: 5 };

  constructor(private store: Store<State>) {}

  ngOnInit = () => this.store.select('car').subscribe(value => (this.motor = value));

  onBrake = () => this.store.dispatch(new Brake());

  onThrottle = () => this.store.dispatch(new Throttle());
}
```

### Redux DevTools

http://extension.remotedev.io/

```ts
StoreDevtoolsModule.instrument()
```



Ejercicio resuelto en el proyecto *ngrx*.