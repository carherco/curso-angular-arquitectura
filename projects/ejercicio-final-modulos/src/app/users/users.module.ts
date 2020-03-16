import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UserCrudBasicComponent } from "projects/ejercicio-final/src/app/components/private/user-crud-basic/user-crud-basic.component";

@NgModule({
  declarations: [UserCrudBasicComponent],
  exports: [UserCrudBasicComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
