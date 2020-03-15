import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserHttpService {
  url_api: string = environment.api_url + "users";

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    console.log("Llamada a getAll() de UserHttpService");
    return this.http.get<User[]>(this.url_api);
  }

  getFiltered(filter = ""): Observable<User[]> {
    return this.http.get<User[]>(this.url_api + "?" + filter);
  }

  get(id): Observable<User> {
    return this.http.get<User>(this.url_api + "/" + id);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.url_api, user);
  }

  edit(user: User): Observable<User> {
    return this.http.put<User>(this.url_api + "/" + user.id, user);
  }

  delete(user: User): Observable<any> {
    return this.http.delete(this.url_api + "/" + user.id);
  }
}
