import { ReduxEffectsHeroesContainerComponent } from './redux-effects/components/redux-heroes-container/redux-heroes-container.component';
import { AnimationQueryStagerComponent } from './components/animation-query-stager/animation-query-stager.component';
import { CrudBasicoComponent } from './components/crud-basico/crud-basico.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ClickMeComponent } from './components/click-me/click-me.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { KeyUpComponent } from './components/key-up/key-up.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { ChildCompComponent } from './components/child-comp/child-comp.component';
import { ParentCompComponent } from './components/parent-comp/parent-comp.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { RotateComponent } from './components/rotate/rotate.component';
import { CronoComponent } from './components/crono/crono.component';
import { AnimationComponent } from 'app/components/animation/animation.component';
import { AnimationSearchComponent } from 'app/components/animation-search/animation-search.component';
import { ReduxHeroesContainerComponent } from './redux/components/redux-heroes-container/redux-heroes-container.component';
import { ReduxNgrxHeroesContainerComponent } from './redux-ng-rx/components/redux-heroes-container/redux-heroes-container.component';
import { DynamicFormExampleComponent } from './components/dynamic-form-example/dynamic-form-example.component';
import { DynamicComponentsExampleComponent } from 'app/components/dynamic-components-example/dynamic-components-example.component';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { UserFormReactiveComponent } from 'app/components/user-form-reactive/user-form-reactive.component';
import { UserCrudBasicComponent } from 'app/components/user-crud-basic/user-crud-basic.component';
import { NestedComponent } from 'app/components/nested/nested.component';
import { NestedChildComponent } from 'app/components/nested-child/nested-child.component';
import { NestedChild2Component } from 'app/components/nested-child2/nested-child2.component';
import { NestedChild3Component } from 'app/components/nested-child3/nested-child3.component';
import { CustomControlsComponent } from 'app/components/custom-controls/custom-controls.component';
import { ChangeDetectionParentComponent } from './deteccion-cambios/components/change-detection-parent/change-detection-parent.component';
import { ImpurePipeComponent } from 'app/components/impure-pipe/impure-pipe.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { IbanValidatorExampleComponent } from './components/iban-validator-example/iban-validator-example.component';


const appRoutes: Routes = [
      { path: 'click-me', component: ClickMeComponent },
      { path: 'calculadora', component: CalculadoraComponent },
      { path: 'highlight', component: HighlightComponent },
      { path: 'pipes', component: PipesComponent },
      { path: 'pipes/impure', component: ImpurePipeComponent },
      { path: 'galeria', component: GaleriaComponent },
      { path: 'crud-basico-users', component: UserCrudBasicComponent },
      { path: 'crud-basico-heroes', component: CrudBasicoComponent },
      { path: 'parent-child', component: ParentCompComponent },
      { path: 'key-up', component: KeyUpComponent },
      { path: 'forms/template-driven', component: HeroFormComponent },
      { path: 'user/form', component: UserFormComponent },
      { path: 'user/form-reactive', component: UserFormReactiveComponent },
      { path: 'observables', component: ColdObservablesComponent },
      { path: 'forms/model-driven', component: ReactiveFormComponent },
      { path: 'heroes-api', component: HeroListComponent },
      { path: 'lifecycle', component: LifecycleComponent },
      { path: 'search', component: SearchComponent },
      { path: 'hero/:id', component: ChildCompComponent },
      { path: 'heroes', component: ParentCompComponent, data: { title: 'Heroes List' } },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'nested', component: NestedComponent, children: [
        { path: '', component: NestedChildComponent },
        { path: 'child2', component: NestedChild2Component },
        { path: 'child3', component: NestedChild3Component }
      ]},
      // { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'}, // Antes de Angular 8
      { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(mod => mod.AdminModule) }, // A paritr de Angular 8
      { path: 'fractal', loadChildren: () => import('app/fractal/fractal.module').then(mod => mod.FractalModule) },
      { path: 'rotate', component: RotateComponent },
      { path: 'crono', component: CronoComponent },
      { path: 'animation', component: AnimationComponent },
      { path: 'animation2', component: AnimationQueryStagerComponent },
      { path: 'animation-search', component: AnimationSearchComponent },
    //   { path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
    //   { path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
    //  // { path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module', data: {preload: true}},
    //   { path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module'},
    //   { path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
      { path: 'lazy1', loadChildren: () => import('app/lazy1/lazy1.module').then(mod => mod.Lazy1Module) },
      { path: 'lazy2', loadChildren: () => import('app/lazy2/lazy2.module').then(mod => mod.Lazy2Module) },
      { path: 'lazy3', loadChildren: () => import('app/lazy3/lazy3.module').then(mod => mod.Lazy3Module) },
      { path: 'lazy4', loadChildren: () => import('app/lazy4/lazy4.module').then(mod => mod.Lazy4Module) },
      { path: 'lazy5', loadChildren: () => import('app/lazy5/lazy5.module').then(mod => mod.Lazy5Module) },
      { path: 'changedetection', component: ChangeDetectionParentComponent },
      { path: 'redux', component: ReduxHeroesContainerComponent },
      { path: 'redux-ngrx', component: ReduxNgrxHeroesContainerComponent },
      { path: 'redux-effects', component: ReduxEffectsHeroesContainerComponent },
      { path: 'dynamic-form', component: DynamicFormExampleComponent },
      { path: 'dynamic-components', component: DynamicComponentsExampleComponent },
      { path: 'custom-controls', component: CustomControlsComponent },
      { path: 'iban-validator', component: IbanValidatorExampleComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    enableTracing: false, // <-- debugging purposes only
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
