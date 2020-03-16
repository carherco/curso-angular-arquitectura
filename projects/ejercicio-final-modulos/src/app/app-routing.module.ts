import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./public/home/home.component";
import { LoginComponent } from "./public/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { CustomersListComponent } from "./customers/customers-list/customers-list.component";
import { ProvidersListComponent } from "./providers/providers-list/providers-list.component";
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { AboutComponent } from "./public/about/about.component";
import { UserCrudBasicComponent } from "./users/user-crud-basic/user-crud-basic.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "users/list", component: UserCrudBasicComponent },
  { path: "customers/list", component: CustomersListComponent },
  { path: "providers/list", component: ProvidersListComponent },
  { path: "profile/edit", component: ProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
