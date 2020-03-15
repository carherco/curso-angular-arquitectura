import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../model/user";

@Component({
  selector: "app-usuarios-detalle",
  templateUrl: "./usuarios-detalle.component.html",
  styleUrls: ["./usuarios-detalle.component.css"]
})
export class UsuariosDetalleComponent implements OnInit {
  @Input()
  user: User;

  @Output()
  saveEvent: EventEmitter<User> = new EventEmitter();

  @Output()
  eliminarEvent: EventEmitter<User> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  save() {
    this.saveEvent.emit(this.user);
  }

  eliminar() {
    this.eliminarEvent.emit(this.user);
  }
}
