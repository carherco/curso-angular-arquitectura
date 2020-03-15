import { Injectable } from "@angular/core";

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthSimpleService {
  private lastLoginErrorMessage: string;
  private username: string;
  private token: string;

  constructor() {}

  login(user: UserCredentials): boolean {
    if (user.username === "curso" && user.password === "angular") {
      this.username = user.username;
      this.token = "fake_token";
      return true;
    } else {
      this.lastLoginErrorMessage = "Credenciales incorrectas";
      return false;
    }
  }

  logout() {
    this.username = null;
    this.token = null;
  }

  isLogged(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getToken(): string {
    return this.token;
  }

  getLastLoginErrorMessage(): string {
    return this.lastLoginErrorMessage;
  }
}
