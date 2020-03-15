# Servicio con cacheo

Este patrón se utiliza a menudo cuando los datos que se necesitan provienen de una API.

La primera vez, se piden los datos a la API y se guardan en memoria (en una propiedad del servicio). A partir de la segunda vez, se devuelven los datos cacheados.

```ts
@Injectable({
  providedIn: "root"
})
export class UserService {
  url_api: string = environment.api_url + "users";

  users: User[] = [];
  selectedUser: User;
  message: string;
  lastIndex = 10;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    // return this.http.get<User[]>(this.url_api);
    if (this.games) {
      return of(this.games);
    }
    return this.http.get<User[]>(this.url_api);
    .pipe(
      tap( data => this.users = data ),
    );
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
```
