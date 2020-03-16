import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomersListComponent } from "projects/ejercicio-final/src/app/components/private/customers/customers-list/customers-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CustomersListComponent],
  imports: [CommonModule, SharedModule, CustomersRoutingModule],
  exports: [CustomersListComponent]
})
export class CustomersModule {}
