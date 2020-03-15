import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosMasterComponent } from './components/usuarios-master/usuarios-master.component';


const routes: Routes = [
  { path: '', component: UsuariosMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
