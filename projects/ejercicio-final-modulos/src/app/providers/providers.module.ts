import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProvidersRoutingModule } from "./providers-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProvidersListComponent } from "projects/ejercicio-final/src/app/components/private/providers/providers-list/providers-list.component";

@NgModule({
  declarations: [ProvidersListComponent],
  exports: [ProvidersListComponent],
  imports: [CommonModule, SharedModule, ProvidersRoutingModule]
})
export class ProvidersModule {}
