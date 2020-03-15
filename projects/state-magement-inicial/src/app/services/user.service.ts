import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { USERS } from "../data/users";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}

  getAll(): User[] {
    return USERS;
  }

  get(id): User {
    return USERS[id - 1];
  }

  add(user: User): User {
    return user;
  }

  edit(user: User): User {
    return user;
  }

  delete(user: User): boolean {
    return true;
  }
}
