import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";

@NgModule({
  declarations: [ProfileEditComponent],
  exports: [ProfileEditComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule]
})
export class ProfileModule {}
