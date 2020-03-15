import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import {
  map,
  filter,
  debounceTime,
  distinct,
  distinctUntilChanged,
  tap,
  flatMap
} from "rxjs/operators";
import { User } from "../../model/user";
import { UserHttpService } from "../../services/userHttp.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-usuarios-master",
  templateUrl: "./usuarios-master.component.html",
  styleUrls: ["./usuarios-master.component.css"]
})
export class UsuariosMasterComponent {
  users: User[] = [];
  selectedUser: User;
  newUser: User;
  message: string;
  private lastIndex = 10;

  constructor(private userService: UserService) {
    this.newUser = new User();
    this.users = this.userService.getAll();
  }

  add(user) {
    this.newUser = { ...user, id: ++this.lastIndex };
    this.users.push(this.newUser);
    this.newUser = new User();
  }

  select(user: User) {
    this.selectedUser = { ...user };
  }

  update(user: User) {
    this.userService.edit(user);
    const foundIndex = this.users.findIndex(u => u.id === user.id);
    this.users[foundIndex] = user;
    this.message = "Elemento modificado con éxito";
  }

  delete(user: User) {
    this.userService.delete(user);
    this.users = this.users.filter(item => item.id !== user.id);
    this.message = "Elemento eliminado con éxito";
    if (this.selectedUser && this.selectedUser.id === user.id) {
      this.selectedUser = null;
    }
  }

  closeAlert() {
    this.message = "";
  }
}
