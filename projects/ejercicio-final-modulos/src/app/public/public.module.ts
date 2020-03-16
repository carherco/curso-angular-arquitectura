import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "projects/ejercicio-final/src/app/components/public/home/home.component";
import { LoginComponent } from "projects/ejercicio-final/src/app/components/public/login/login.component";
import { AboutComponent } from "projects/ejercicio-final/src/app/components/public/about/about.component";

@NgModule({
  declarations: [HomeComponent, LoginComponent, AboutComponent],
  exports: [HomeComponent, LoginComponent, AboutComponent],
  imports: [CommonModule, SharedModule]
})
export class PublicModule {}
