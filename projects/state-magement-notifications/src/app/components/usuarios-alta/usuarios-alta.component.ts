import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User } from "../../model/user";

@Component({
  selector: "app-usuarios-alta",
  templateUrl: "./usuarios-alta.component.html",
  styleUrls: ["./usuarios-alta.component.css"]
})
export class UsuariosAltaComponent {
  @Input()
  user: User = new User();

  @Output()
  addEvent: EventEmitter<User> = new EventEmitter();

  constructor() {}

  add() {
    this.addEvent.emit(this.user);
  }
}
