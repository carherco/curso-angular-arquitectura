import { Component, OnInit } from "@angular/core";
import { USERS } from "../../data/users";
import { User } from "../../model/User";

@Component({
  selector: "user-crud-basic",
  templateUrl: "./user-crud-basic.component.html",
  styleUrls: ["./user-crud-basic.component.css"]
})
export class UserCrudBasicComponent implements OnInit {
  title = "CRUD BÁSICO";
  users = USERS;
  lastId = 10;
  newUser: User;
  selectedUser: User;
  hide_without_phone: boolean = false;

  constructor() {
    this.newUser = {
      id: this.lastId + 1,
      name: ""
    };
  }

  ngOnInit() {}

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  add(): void {
    if (this.newUser.name) {
      this.users.push(this.newUser);
      this.lastId = this.lastId + 1;
      this.resetNewUser();
    }
  }

  resetNewUser() {
    this.newUser = {
      id: this.lastId + 1,
      name: ""
    };
  }

  delete(user: User) {
    this.users = this.users.filter(el => el.id != user.id);
  }
}
