import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent {

  @Input()
  users: User[] = [];

  @Input()
  selectedUser: User;

  @Output()
  selectEvent: EventEmitter<User> = new EventEmitter();

  @Output()
  deleteEvent: EventEmitter<User> = new EventEmitter();

  constructor() { }

  selectUser(user: User) {
    this.selectEvent.emit(user);
  }

  delete(user: User) {
    this.deleteEvent.emit(user);
  }

}
