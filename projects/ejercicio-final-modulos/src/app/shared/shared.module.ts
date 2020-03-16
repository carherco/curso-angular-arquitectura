import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PrivateHeaderComponent } from "projects/ejercicio-final/src/app/components/layout/private-header/private-header.component";
import { PublicHeaderComponent } from "projects/ejercicio-final/src/app/components/layout/public-header/public-header.component";
import { PublicMenuComponent } from "projects/ejercicio-final/src/app/components/layout/public-menu/public-menu.component";
import { PrivateMenuComponent } from "projects/ejercicio-final/src/app/components/layout/private-menu/private-menu.component";

@NgModule({
  declarations: [
    PrivateHeaderComponent,
    PublicHeaderComponent,
    PublicMenuComponent,
    PrivateMenuComponent
  ],
  exports: [
    PrivateHeaderComponent,
    PublicHeaderComponent,
    PublicMenuComponent,
    PrivateMenuComponent
  ],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SharedModule {}
